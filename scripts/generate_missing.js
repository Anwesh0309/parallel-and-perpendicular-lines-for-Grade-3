import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

const STYLES = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

const missing = [
  { key: 'story_2', style: 'statement', text: "Emma draws one line going sideways — that is the category axis. Then she draws one line going straight up. They meet at a perfect square corner, just like the walls of a room. Two lines that meet at a right angle are called perpendicular lines!" },
  { key: 'story_3', style: 'statement', text: "Now Emma draws a bar for each fruit. Every bar stands straight up from the category axis. Each bar is perfectly straight, and none of the bars lean into each other. Lines that are always the same distance apart and never cross are called parallel lines!" },
  { key: 'story_4', style: 'statement', text: "Emma's graph is finished! Because the axes are perpendicular and the bars are parallel, it is very easy to read. She can see straight away which fruit got the most votes. The scale says 1 square equals 2 votes, so she counts squares and multiplies! Mango wins — 14 votes!" },
  { key: 'sim_a_intro', style: 'instruction', text: 'Station A — Line Spotter! Tap each pair of glowing lines. Are they parallel, perpendicular, or neither?' },
  { key: 'sim_b_intro', style: 'instruction', text: 'Station B — Axis Architect! Drag the sideways line first, then the up-and-down line. Watch for the little square corner — that means your axes are perpendicular!' },
  { key: 'sim_c_intro', style: 'instruction', text: 'Station C — Bar Builder! Slide each bar up to match the votes. Keep every bar parallel to its neighbours so the graph stays fair to read.' },
];

async function gen(phrase) {
  const filepath = path.join(OUTPUT_DIR, `${phrase.key}.mp3`);
  if (fs.existsSync(filepath)) { console.log(`✓ exists: ${phrase.key}`); return; }
  const settings = STYLES[phrase.style] || STYLES.statement;
  const body = JSON.stringify({ text: phrase.text, model_id: MODEL_ID, voice_settings: settings });
  return new Promise((resolve) => {
    const opts = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(opts, (res) => {
      if (res.statusCode !== 200) { console.error(`✗ ${res.statusCode} for ${phrase.key}`); res.resume(); resolve(); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => { fs.writeFileSync(filepath, Buffer.concat(chunks)); console.log(`✅ ${phrase.key}.mp3`); resolve(); });
    });
    req.on('error', e => { console.error(e); resolve(); });
    req.write(body); req.end();
  });
}

async function main() {
  for (const p of missing) {
    await gen(p);
    await new Promise(r => setTimeout(r, 700));
  }
  console.log('Done generating missing files.');
}
main().catch(console.error);
