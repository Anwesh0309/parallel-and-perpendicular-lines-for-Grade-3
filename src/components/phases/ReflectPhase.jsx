import React, { useEffect } from 'react';
import { calcStars } from '../../utils/scoring.js';
import { narrate, say, cheer } from '../../utils/audio.js';
import { BADGES } from '../../utils/badgeEngine.js';
import Confetti from '../shared/Confetti.jsx';

const WORLD_NAMES = [
  'Fruit Fair','Pet Parade','Sports Day','Weather Watch','Toy Box Tally',
  'Book Nook','Snack Survey','Garden Grid','Star Gazers','Grand Gallery'
];
const WORLD_EMOJIS = ['🍎','🐾','⚽','☀️','🧸','📚','🍕','🌿','🌟','🏆'];

export default function ReflectPhase({ state, audioEnabled, onPlayAgain, onHome }) {
  const { xp, maxStreak, worldScores, badges, phaseComplete } = state;

  // Compute totals
  const totalAnswered = worldScores.reduce((a, s) => a + (s !== null ? 10 : 0), 0);
  const totalCorrect  = worldScores.reduce((a, s) => a + (s ?? 0), 0);
  const totalStars    = worldScores.reduce((a, s) => a + (s !== null ? calcStars(s) : 0), 0);
  const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const masteryMsg = pct >= 80
    ? 'Excellent! You really understand parallel and perpendicular lines!'
    : pct >= 60
    ? 'Great effort! Keep practising to master all 10 worlds!'
    : 'Good start! Try again to improve your score!';

  useEffect(() => {
    if (audioEnabled) {
      narrate([
        { text: 'Journey Complete! You finished all five phases! Fantastic work! You are a true Graph Champion!', style: 'celebration' },
        { text: masteryMsg, style: pct >= 80 ? 'celebration' : 'encouragement' },
      ]);
    }
  }, [audioEnabled]);

  // Mastery ring radius
  const R = 38; const C = 2 * Math.PI * R;
  const filled = C * (pct / 100);

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      {pct >= 80 && <Confetti />}

      <div className="card card-narrow anim-fadeIn" style={{ textAlign: 'center', padding: '20px 22px', maxWidth: 520 }}>
        {/* Trophy */}
        <div style={{ fontSize: 40, marginBottom: 6 }}>🏆</div>

        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 26, color: 'var(--text-white)', marginBottom: 4 }}>
          Journey Complete!
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>You finished all 5 phases!</p>

        {/* Mastery ring */}
        <div className="score-ring-wrap">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
            <circle cx="50" cy="50" r={R} fill="none" stroke="#FFC940" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${filled} ${C}`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 1s ease' }}/>
            <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="900"
              fontFamily="Fredoka One,cursive">{pct}%</text>
            <text x="50" y="62" textAnchor="middle" fill="#9D8EC7" fontSize="9">
              {totalCorrect}/{totalAnswered}
            </text>
          </svg>
        </div>

        {/* Stars */}
        <div style={{ fontSize: 22, margin: '6px 0 12px', letterSpacing: 4 }}>
          {'⭐'.repeat(Math.min(3, Math.round(totalStars / 3)))}{'☆'.repeat(3 - Math.min(3, Math.round(totalStars / 3)))}
        </div>

        {/* Stat tiles */}
        <div className="stat-tiles">
          <div className="stat-tile">
            <div className="stat-val">{xp}</div>
            <div className="stat-label">XP Earned</div>
          </div>
          <div className="stat-tile">
            <div className="stat-val">🔥{maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
          <div className="stat-tile">
            <div className="stat-val">{totalStars}</div>
            <div className="stat-label">Stars</div>
          </div>
        </div>

        {/* World score rows */}
        <div style={{ marginTop: 12, maxHeight: 180, overflowY: 'auto' }}>
          {WORLD_NAMES.map((name, i) => {
            const score = worldScores[i];
            if (score === null) return null;
            const stars = calcStars(score);
            return (
              <div key={i} className="world-score-row">
                <span style={{ fontWeight: 700, fontSize: 12 }}>
                  {WORLD_EMOJIS[i]} {name}
                </span>
                <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{score}/10</span>
                  <span className="world-score-stars" style={{ fontSize: 13 }}>
                    {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6 }}>
              🏅 BADGES EARNED
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {badges.map(bId => {
                const b = BADGES.find(x => x.id === bId);
                return b ? (
                  <div key={bId} className="badge-item" style={{ fontSize: 11 }}>
                    {b.emoji} {b.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Mascot message */}
        <div className="mascot-wrap" style={{ justifyContent: 'center', marginTop: 14 }}>
          <div className="mascot-avatar">🤖</div>
          <div className="mascot-bubble" style={{ fontSize: 12 }}>{masteryMsg}</div>
        </div>

        {/* Reflect question */}
        <div style={{
          background: 'rgba(122,90,248,0.1)', border: '1px solid rgba(122,90,248,0.3)',
          borderRadius: 10, padding: '10px 14px', margin: '14px 0', fontSize: 13,
          color: 'var(--text-soft)', fontWeight: 700
        }}>
          💭 "What did you learn about lines in a graph today?"
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" onClick={onPlayAgain} style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
            🔄 Play Again
          </button>
          <button className="btn-secondary" onClick={onHome} style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
