import React, { useState, useCallback } from 'react';
import { SFX, narrateText } from '../../utils/audio.js';

const ERROR_TYPES = ['unparallel_bar','unperpendicular_axis','uneven_gridline','wrong_scaled_height'];

const ERROR_INFO = {
  unparallel_bar: {
    label: 'Bar not parallel',
    fix: 'The bar was leaning! All bars must be perfectly parallel — standing straight up.',
    rule: '⬜ All bars must be PARALLEL to each other!',
    hint: 'One of the bars is leaning sideways. Tap it!',
    errorPart: 'bar',
  },
  unperpendicular_axis: {
    label: 'Axis not perpendicular',
    fix: 'The axes were not at 90°! Axes must be perpendicular — meeting at a right angle.',
    rule: '⌐ Axes must be PERPENDICULAR (90°)!',
    hint: 'The corner where the axes meet is not a right angle. Tap it!',
    errorPart: 'axis',
  },
  uneven_gridline: {
    label: 'Uneven gridlines',
    fix: 'The gridlines were unevenly spaced! Gridlines must be parallel and equally spaced.',
    rule: '= Gridlines must be PARALLEL and evenly spaced!',
    hint: 'One gridline is too close to another. Tap the odd one out!',
    errorPart: 'gridline',
  },
  wrong_scaled_height: {
    label: 'Wrong bar height',
    fix: 'The bar height did not match the scale! Count: value ÷ scale = number of squares.',
    rule: '📊 Bar height must match the scale value!',
    hint: 'One bar is drawn at the wrong height for its value. Tap it!',
    errorPart: 'bar',
  },
};

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function GraphDetectiveStation({ audioEnabled, onComplete }) {
  const [errorType, setErrorType] = useState(() => pickRandom(ERROR_TYPES));
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [autoRevealed, setAutoRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const info = ERROR_INFO[errorType];

  const handleTap = (part) => {
    if (found) return;
    if (part === info.errorPart) {
      SFX.snapPerpendicular();
      if (audioEnabled) narrateText(info.fix, 'celebration');
      setFound(true);
      setDone(true);
      setTimeout(onComplete, 1800);
    } else {
      SFX.incorrect();
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (audioEnabled) narrateText(info.hint, 'thinking');
      if (newAttempts >= 3) {
        setAutoRevealed(true);
        setFound(true);
        setDone(true);
        if (audioEnabled) narrateText('Here is the answer: ' + info.fix, 'statement');
        setTimeout(onComplete, 2000);
      }
    }
  };

  const newGraph = () => {
    setErrorType(pickRandom(ERROR_TYPES));
    setFound(false);
    setAttempts(0);
    setAutoRevealed(false);
    setDone(false);
  };

  const COLORS = ['#FF6B6B','#FFC940','#9B59B6','#4FC3F7'];
  const cats = ['🍎','🥭','🍇','🍊'];
  const vals = [3, 5, 2, 4];

  return (
    <div className="scene-card" style={{ padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--accent-gold)', marginBottom: 2 }}>
        🕵️ Graph Detective — Spot the Error!
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
        Something is wrong in this graph. Tap the broken part! (Attempt {attempts}/3)
      </div>

      {/* Hint */}
      {attempts > 0 && !found && (
        <div style={{ background: 'rgba(255,201,64,0.1)', border: '1px solid rgba(255,201,64,0.3)',
          borderRadius: 8, padding: '4px 10px', fontSize: 11, color: 'var(--accent-gold)', marginBottom: 6 }}>
          💡 Hint: {info.hint}
        </div>
      )}

      {/* Graph */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 6, marginBottom: 6, cursor: 'pointer' }}>
        <svg viewBox="0 0 240 160" style={{ width: '100%', maxHeight: 160 }} xmlns="http://www.w3.org/2000/svg">
          {/* Gridlines — possibly uneven */}
          {[1,2,3,4,5].map((i) => {
            const y = errorType === 'uneven_gridline' && i === 3
              ? 150 - i * 22 - 14  // offset the 3rd gridline
              : 150 - i * 20;
            const isError = errorType === 'uneven_gridline' && i === 3;
            return (
              <g key={i} onClick={() => handleTap('gridline')} style={{ cursor: 'pointer' }}>
                <line x1="40" x2="230" y1={y} y2={y}
                  stroke={isError && !found ? '#FF4D8D' : 'rgba(122,90,248,0.3)'}
                  strokeWidth={isError && !found ? 2 : 1} strokeDasharray="4,3"
                  style={{ transition: 'all .3s' }}/>
                <text x="35" y={y+4} textAnchor="end" fill="#9D8EC7" fontSize="8">{i * 2}</text>
              </g>
            );
          })}

          {/* Axes — possibly not perpendicular */}
          <g onClick={() => handleTap('axis')} style={{ cursor: 'pointer' }}>
            <line x1="40" y1="10" x2="40" y2="150" stroke="#FFC940" strokeWidth="2.5"/>
            <line x1="40" y1="150"
              x2={errorType === 'unperpendicular_axis' && !found ? 230 : 230}
              y2={errorType === 'unperpendicular_axis' && !found ? 160 : 150}
              stroke={errorType === 'unperpendicular_axis' && !found ? '#FF4D8D' : '#FFC940'}
              strokeWidth="2.5"/>
            {/* Right-angle marker — missing if axis error */}
            {errorType !== 'unperpendicular_axis' || found ? (
              <path d="M40,138 L52,138 L52,150" fill="none" stroke="#22C55E" strokeWidth="2"/>
            ) : (
              <path d="M40,138 L52,142 L48,154" fill="none" stroke="#FF4D8D" strokeWidth="2"/>
            )}
          </g>

          {/* Bars */}
          {cats.map((cat, i) => {
            const correctH = vals[i] * 20;
            const isLean = errorType === 'unparallel_bar' && i === 2 && !found;
            const isWrong = errorType === 'wrong_scaled_height' && i === 1 && !found;
            const h = isWrong ? correctH - 20 : correctH;
            const x = 55 + i * 44;
            return (
              <g key={cat} onClick={() => handleTap('bar')} style={{ cursor: 'pointer' }}
                transform={isLean ? `skewX(-12) translate(${x},0)` : ''}>
                <rect x={isLean ? 0 : x} y={150-h} width="28" height={h} rx="4"
                  fill={isLean || isWrong ? '#FF4D8D' : COLORS[i]} opacity="0.85"/>
                <text x={isLean ? 14 : x+14} y={144-h} textAnchor="middle" fill="white" fontSize="9" fontWeight="800">
                  {vals[i] * 2}
                </text>
                <text x={isLean ? 14 : x+14} y="163" textAnchor="middle" fill="#EDE7FF" fontSize="10">{cat}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Fix reveal */}
      {found && (
        <div style={{
          background: autoRevealed ? 'rgba(255,77,141,0.1)' : 'rgba(34,197,94,0.1)',
          border: `1px solid ${autoRevealed ? '#FF4D8D' : '#22C55E'}`,
          borderRadius: 8, padding: '6px 10px', marginBottom: 6,
          animation: 'bounceInLocal .4s ease'
        }}>
          <div style={{ fontWeight: 800, fontSize: 12, color: autoRevealed ? '#FF4D8D' : '#22C55E', marginBottom: 2 }}>
            {autoRevealed ? '🔍 Here is the answer:' : '✅ Well spotted!'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>{info.fix}</div>
          <div style={{ fontWeight: 800, fontSize: 11, color: 'var(--accent-gold)', marginTop: 4 }}>
            Rule: {info.rule}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button className="btn-secondary" onClick={newGraph} style={{ flex: 1, padding: '6px', fontSize: 12 }}>
          🔄 New Graph
        </button>
        {found && (
          <button className="btn-primary" onClick={onComplete} style={{ flex: 1, padding: '6px', fontSize: 12 }}>
            ✅ Station Complete!
          </button>
        )}
      </div>
    </div>
  );
}
