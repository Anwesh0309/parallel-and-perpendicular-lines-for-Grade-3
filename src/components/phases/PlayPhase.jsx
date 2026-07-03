import React, { useState, useEffect, useCallback } from 'react';
import { SFX, narrate, say, cheer, narrateText, stopNarration } from '../../utils/audio.js';
import { isWorldUnlocked, calcStars } from '../../utils/scoring.js';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import Confetti from '../shared/Confetti.jsx';

const WORLD_META = [
  { name: 'Fruit Fair',         emoji: '🍎', range: 'Q 1–10' },
  { name: 'Pet Parade',         emoji: '🐾', range: 'Q 11–20' },
  { name: 'Sports Day',         emoji: '⚽', range: 'Q 21–30' },
  { name: 'Weather Watch',      emoji: '☀️', range: 'Q 31–40' },
  { name: 'Toy Box Tally',      emoji: '🧸', range: 'Q 41–50' },
  { name: 'Book Nook',          emoji: '📚', range: 'Q 51–60' },
  { name: 'Snack Survey',       emoji: '🍕', range: 'Q 61–70' },
  { name: 'Garden Grid',        emoji: '🌿', range: 'Q 71–80' },
  { name: 'Star Gazers',        emoji: '🌟', range: 'Q 81–90' },
  { name: 'Grand Gallery',      emoji: '🏆', range: 'Q 91–100' },
];

export default function PlayPhase({ state, dispatch, onComplete }) {
  const [mode, setMode] = useState('worldMap'); // 'worldMap' | 'playing' | 'worldComplete'
  const [feedbackState, setFeedbackState] = useState(null); // null | {correct, explanation, auto}
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [localAttempts, setLocalAttempts] = useState(0);

  const { questionSet, currentQuestion, currentWorld, worldScores,
          xp, streak, maxStreak, lives, currentWorldCorrect, audioEnabled } = state;

  const question = questionSet[currentQuestion];
  const worldIdx = Math.floor(currentQuestion / 10);
  const questionInWorld = (currentQuestion % 10) + 1;

  useEffect(() => {
    if (mode === 'worldMap' && audioEnabled) {
      narrate([say(`Play phase! Choose your world. Earn stars and XP!`)]);
    }
  }, [mode, audioEnabled]);

  useEffect(() => {
    if (mode === 'playing' && question && audioEnabled) {
      stopNarration();
      narrate([say(question.questionText)]);
    }
  }, [currentQuestion, mode, audioEnabled]);

  const startWorld = useCallback((wIdx) => {
    if (!isWorldUnlocked(wIdx, worldScores)) return;
    dispatch({ type: 'SET_WORLD', payload: wIdx });
    setMode('playing');
    setFeedbackState(null);
    setHintsShown(0);
    setLocalAttempts(0);
    if (audioEnabled) {
      narrate([say(WORLD_META[wIdx].name + ' — let\'s go!')]);
    }
  }, [worldScores, dispatch, audioEnabled]);

  const handleAnswer = useCallback((answer) => {
    if (feedbackState) return;
    const correct = String(answer) === String(question.correctAnswer);

    if (correct) {
      SFX.correct();
      dispatch({ type: 'ANSWER_CORRECT', usedHint: hintsShown > 0 });
      if (audioEnabled) narrateText('That correct you doing nice', 'celebration');
      setFeedbackState({ correct: true, explanation: question.explanation, auto: true });
      setHintsShown(0);
      setLocalAttempts(0);
      setTimeout(() => {
        setFeedbackState(null);
        advanceQuestion();
      }, 1000);
    } else {
      SFX.incorrect();
      const newAttempts = localAttempts + 1;
      setLocalAttempts(newAttempts);
      dispatch({ type: 'ANSWER_INCORRECT' });
      if (audioEnabled) narrateText('not quite lets try again', 'encouragement');
      if (newAttempts >= 2) {
        setFeedbackState({ correct: false, explanation: question.explanation, auto: true });
        setTimeout(() => {
          setFeedbackState(null);
          advanceQuestion();
        }, 1000);
      } else {
        setFeedbackState({ correct: false, explanation: question.explanation, auto: false });
        setTimeout(() => setFeedbackState(null), 1000);
      }
    }
  }, [question, feedbackState, hintsShown, localAttempts, lives, dispatch, audioEnabled]);

  const advanceQuestion = useCallback(() => {
    const nextQ = currentQuestion + 1;
    if (nextQ > 0 && nextQ % 10 === 0) {
      // World complete
      dispatch({ type: 'NEXT_QUESTION' });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
      if (nextQ >= 100) {
        setTimeout(() => onComplete(), 1500);
      } else {
        setMode('worldMap');
      }
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
      setHintsShown(0);
      setLocalAttempts(0);
    }
  }, [currentQuestion, dispatch, onComplete]);

  const showHint = () => {
    const newH = hintsShown + 1;
    setHintsShown(newH);
    dispatch({ type: 'USE_HINT' });
    if (audioEnabled) {
      narrateText(newH === 1 ? question.hint1 : question.hint2, 'thinking');
    }
  };

  // ── WORLD MAP ──
  if (mode === 'worldMap') {
    return (
      <div className="card card-wide anim-fadeIn" style={{ padding: '16px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, color: 'var(--accent-gold)' }}>
            🎮 Play — Choose Your World!
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Answer questions in each world. Earn stars and XP!</div>
        </div>

        <div className="world-grid">
          {WORLD_META.map((w, i) => {
            const unlocked = isWorldUnlocked(i, worldScores);
            const score = worldScores[i];
            const stars = score !== null ? calcStars(score) : -1;
            const isActive = i === currentWorld;
            return (
              <div key={i}
                className={`world-card ${unlocked ? 'unlocked' : 'locked'} ${isActive ? 'active-world' : ''}`}
                onClick={() => unlocked && startWorld(i)}>
                {!unlocked && <span className="world-lock">🔒</span>}
                <span className="world-emoji">{w.emoji}</span>
                <div className="world-name">{w.name}</div>
                <div className="world-qs">{w.range}</div>
                {stars >= 0 && (
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
                  </div>
                )}
                {isActive && unlocked && score === null && (
                  <button className="btn-primary"
                    style={{ marginTop: 8, padding: '6px 14px', fontSize: 12, width: '100%', justifyContent: 'center' }}
                    onClick={(e) => { e.stopPropagation(); startWorld(i); }}>
                    ▶ PLAY
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── PLAYING ──
  if (!question) return null;

  const progressPct = ((questionInWorld - 1) / 10) * 100;

  return (
    <div className="card anim-fadeIn" style={{ padding: '14px 18px', maxWidth: 680 }}>
      {showConfetti && <Confetti />}

      {/* World label */}
      <div style={{
        textAlign: 'center', marginBottom: 10,
        background: 'rgba(122,90,248,0.15)', borderRadius: 20,
        padding: '4px 14px', display: 'inline-block',
        fontWeight: 800, fontSize: 13, color: 'var(--text-soft)'
      }}>
        {WORLD_META[worldIdx]?.emoji} {WORLD_META[worldIdx]?.name}
      </div>

      {/* HUD */}
      <div className="play-hud">
        <div className="hud-stars">⭐ {xp} XP</div>
        
        <div className="hud-streak">🔥 {streak}x</div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}/>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginBottom:10 }}>
        <span>Question {questionInWorld}/10</span>
        <span>{Math.round(progressPct)}%</span>
      </div>

      {/* Question */}
      <QuestionRenderer
        question={question}
        onAnswer={handleAnswer}
        disabled={!!feedbackState}
        hintsShown={hintsShown}
      />

      {/* Hint button */}
      {!feedbackState && hintsShown < 2 && (
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button className="btn-ghost" onClick={showHint} style={{ fontSize: 12 }}>
            💡 Hint {hintsShown + 1}/2
          </button>
        </div>
      )}

      {/* Hint display */}
      {hintsShown > 0 && (
        <div style={{
          background: 'rgba(255,201,64,0.08)', border: '1px solid rgba(255,201,64,0.25)',
          borderRadius: 10, padding: '8px 14px', marginTop: 8, fontSize: 13, color: 'var(--accent-gold)'
        }}>
          💡 {hintsShown === 1 ? question.hint1 : question.hint2}
        </div>
      )}

      {/* Feedback popup Overlay */}
      {feedbackState && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(10, 5, 25, 0.7)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            background: feedbackState.correct ? '#4CAF50' : '#E53935',
            color: 'white',
            padding: '30px 40px',
            borderRadius: '24px',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
              {feedbackState.correct ? '🎉' : '🥺'}
            </div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>
              {feedbackState.correct ? 'Correct! 🎉' : 'Not quite!'}
            </div>
            {feedbackState.explanation && (
              <div style={{ fontSize: '14px', lineHeight: 1.5, fontWeight: 600 }}>
                {feedbackState.explanation}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
