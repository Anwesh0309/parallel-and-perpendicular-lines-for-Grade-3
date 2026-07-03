// Audio engine — ElevenLabs + Web Speech fallback
// Matches reference audio pipeline architecture

import audioMap from './audioMap.js';

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

// Style presets
const VOICE_SETTINGS = {
  celebration:  { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement:{ stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:     { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:     { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:     { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:    { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:  { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

// Segment helpers
export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

// State
let currentAudio = null;
let isPlaying = false;
let audioEnabled = true;
let queue = [];
let queueRunning = false;
let currentNarrateId = 0;

export function setAudioEnabled(val) { audioEnabled = val; }
export function getAudioEnabled() { return audioEnabled; }

export function stopNarration() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  isPlaying = false;
  queue = [];
  queueRunning = false;
  currentNarrateId++;
}

// Get URL: check audioMap first, else use dynamic fallback
export function getAudioUrl(text) {
  const key = text.trim().toLowerCase().replace(/\s+/g, ' ');
  if (audioMap[key]) return `/assets/audio/${audioMap[key]}`;
  // Also try partial match for question narration keys
  for (const [k, v] of Object.entries(audioMap)) {
    if (k.includes(key.substring(0, 40))) return `/assets/audio/${v}`;
  }
  return null; // Will use dynamic TTS
}

// Web Speech API fallback
function webSpeechFallback(text) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.9; utt.pitch = 1.1; utt.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
                 || voices.find(v => v.lang.startsWith('en'))
                 || voices[0];
    if (enVoice) utt.voice = enVoice;
    utt.onend = resolve;
    utt.onerror = resolve;
    window.speechSynthesis.speak(utt);
  });
}

// Dynamic ElevenLabs TTS
async function elevenLabsTTS(text, style = 'statement') {
  if (!API_KEY) return null;
  const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: settings,
        }),
      }
    );
    if (!response.ok) return null;
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

// Play a single segment
async function playSegment(segment, playId) {
  if (!audioEnabled) return;
  const { text, style } = segment;

  // 1. Try pre-generated audio map
  const staticUrl = getAudioUrl(text);
  if (staticUrl) {
    if (playId !== currentNarrateId) return;
    return new Promise((resolve) => {
      currentAudio = new Audio(staticUrl);
      currentAudio.onended = resolve;
      currentAudio.onerror = resolve;
      currentAudio.play().catch(resolve);
    });
  }

  // 2. Try ElevenLabs dynamic
  const dynamicUrl = await elevenLabsTTS(text, style);
  if (dynamicUrl) {
    if (playId !== currentNarrateId) {
      URL.revokeObjectURL(dynamicUrl);
      return;
    }
    return new Promise((resolve) => {
      currentAudio = new Audio(dynamicUrl);
      currentAudio.onended = () => { URL.revokeObjectURL(dynamicUrl); resolve(); };
      currentAudio.onerror = resolve;
      currentAudio.play().catch(resolve);
    });
  }

  // 3. Web Speech fallback
  if (playId !== currentNarrateId) return;
  return webSpeechFallback(text);
}

// Sequential queue runner — prevents overlap
async function runQueue(playId) {
  if (queueRunning) return;
  queueRunning = true;
  while (queue.length > 0) {
    if (playId !== currentNarrateId) break;
    const seg = queue.shift();
    await playSegment(seg, playId);
  }
  queueRunning = false;
}

// Main narrate function — clears existing audio first
export function narrate(segments) {
  if (!audioEnabled) return;
  stopNarration();
  const playId = currentNarrateId;
  queue = Array.isArray(segments) ? [...segments] : [segments];
  runQueue(playId);
}

// Convenience: narrate a single string
export function narrateText(text, style = 'statement') {
  narrate([{ text, style }]);
}

// SFX using Web Audio API
function playTone(freqs, durations) {
  if (!audioEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let t = ctx.currentTime;
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + durations[i] / 1000);
      osc.start(t); osc.stop(t + durations[i] / 1000);
      t += durations[i] / 1000;
    });
  } catch {}
}

export const SFX = {
  correct:           () => playTone([659, 784], [100, 150]),
  incorrect:         () => playTone([311, 262], [120, 180]),
  badge:             () => playTone([523, 659, 784, 1047], [100, 100, 100, 200]),
  streak:            () => playTone([440, 880], [100, 200]),
  levelUp:           () => playTone([523, 659, 784, 1047, 1319], [80, 80, 80, 80, 300]),
  snapPerpendicular: () => playTone([784, 1047], [90, 160]),
  snapParallel:      () => playTone([659, 880], [90, 160]),
  click:             () => playTone([440], [60]),
};
