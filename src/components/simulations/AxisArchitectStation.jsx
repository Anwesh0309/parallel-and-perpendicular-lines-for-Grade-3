import React, { useState } from 'react';
import { SFX, narrateText } from '../../utils/audio.js';

export default function AxisArchitectStation({ audioEnabled, onComplete }) {
  const [step, setStep] = useState(0);
  // 0 = place h-axis, 1 = place v-axis, 2 = place gridlines, 3 = done
  const [gridlines, setGridlines] = useState(0);
  const [done, setDone] = useState(false);

  const placeHAxis = () => {
    SFX.snapParallel();
    if (audioEnabled) narrateText('Great! The horizontal category axis is placed!', 'encouragement');
    setStep(1);
  };

  const placeVAxis = () => {
    SFX.snapPerpendicular();
    if (audioEnabled) narrateText('Perfect! Your axes are perpendicular — they meet at a perfect corner, just like the walls of a room!', 'celebration');
    setStep(2);
  };

  const addGridline = () => {
    const newCount = gridlines + 1;
    SFX.snapParallel();
    if (audioEnabled && newCount < 5) narrateText('Gridline snapped into place — parallel and evenly spaced!', 'encouragement');
    setGridlines(newCount);
    if (newCount >= 5) {
      if (audioEnabled) narrateText('All gridlines placed! They are all parallel and evenly spaced. Your axis frame is complete!', 'celebration');
      setStep(3);
      setDone(true);
      setTimeout(onComplete, 1500);
    }
  };
  return (
    <div className="scene-card" style={{ padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--accent-gold)', marginBottom: 2 }}>
        📐 Axis Architect — Build the Perpendicular Frame
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
        Drag the axes into place. Watch for the right-angle marker ⌐!
      </div>

      {/* SVG Canvas */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 4, marginBottom: 8 }}>
        <svg viewBox="0 0 280 180" style={{ width: '100%', maxHeight: 160 }} xmlns="http://www.w3.org/2000/svg">
          {/* Grid background */}
          <rect width="280" height="180" fill="transparent" rx="8"/>

          {/* Gridlines (parallel) */}
          {step >= 2 && Array.from({ length: gridlines }).map((_, i) => (
            <g key={i} style={{ animation: 'fadeIn .3s ease' }}>
              <line x1="50" x2="260" y1={155 - (i + 1) * 22} y2={155 - (i + 1) * 22}
                stroke="#7A5AF8" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.6"/>
              <text x="44" y={155 - (i + 1) * 22 + 4} textAnchor="end" fill="#9D8EC7" fontSize="9">
                {(i + 1) * 2}
              </text>
            </g>
          ))}

          {/* Horizontal axis */}
          {step >= 1 && (
            <line x1="50" y1="155" x2="260" y2="155" stroke="#FFC940" strokeWidth="3"
              style={{ animation: 'fadeIn .3s ease' }}/>
          )}

          {/* Vertical axis */}
          {step >= 2 && (
            <line x1="50" y1="20" x2="50" y2="155" stroke="#FFC940" strokeWidth="3"
              style={{ animation: 'fadeIn .3s ease' }}/>
          )}

          {/* Right-angle marker */}
          {step >= 2 && (
            <path d="M50,143 L62,143 L62,155" fill="none" stroke="#22C55E" strokeWidth="2.5"
              style={{ animation: 'drawIn .5s ease' }}/>
          )}

          {/* Axis labels */}
          {step >= 1 && <text x="155" y="175" textAnchor="middle" fill="#EDE7FF" fontSize="10">Categories →</text>}
          {step >= 2 && <text x="20" y="90" textAnchor="middle" fill="#EDE7FF" fontSize="10"
            transform="rotate(-90,20,90)">Values ↑</text>}

          {/* Confirmation message */}
          {step === 2 && gridlines === 0 && (
            <text x="140" y="80" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="800">
              ✓ Axes are PERPENDICULAR!
            </text>
          )}

          {/* Drag hints */}
          {step === 0 && (
            <>
              <rect x="80" y="145" width="140" height="12" rx="4" fill="#FFC940" opacity="0.3" strokeDasharray="4,3" stroke="#FFC940" strokeWidth="1"/>
              <text x="150" y="155" textAnchor="middle" fill="#FFC940" fontSize="11" fontWeight="800">← Drag here to place H-axis →</text>
            </>
          )}
          {step === 1 && (
            <>
              <rect x="44" y="20" width="12" height="120" rx="4" fill="#FFC940" opacity="0.3" strokeDasharray="4,3" stroke="#FFC940" strokeWidth="1"/>
              <text x="50" y="90" textAnchor="middle" fill="#FFC940" fontSize="10" fontWeight="800"
                transform="rotate(-90,50,90)">↑ Drag here for V-axis ↓</text>
            </>
          )}
        </svg>
      </div>

      {/* Step instructions */}
      <div style={{ background: 'rgba(122,90,248,0.1)', borderRadius: 8, padding: '6px 10px', marginBottom: 8 }}>
        {step === 0 && <p style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: 12 }}>Step 1: Place the horizontal (sideways) axis first!</p>}
        {step === 1 && <p style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: 12 }}>Step 2: Place the vertical (up-down) axis. Watch it snap to 90°!</p>}
        {step === 2 && <p style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: 12 }}>Step 3: Add {5 - gridlines} more evenly-spaced gridline{5 - gridlines !== 1 ? 's' : ''}! They must be parallel.</p>}
        {step === 3 && <p style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: 12 }}>✅ Perfect! Your axes are perpendicular and gridlines are parallel!</p>}
      </div>

      {/* Action buttons */}
      {step === 0 && (
        <button className="btn-primary" onClick={placeHAxis} style={{ width: '100%', justifyContent: 'center', padding: '6px' }}>
          ➕ Place Horizontal Axis
        </button>
      )}
      {step === 1 && (
        <button className="btn-primary" onClick={placeVAxis} style={{ width: '100%', justifyContent: 'center', padding: '6px' }}>
          ➕ Place Vertical Axis (perpendicular!)
        </button>
      )}
      {step === 2 && (
        <button className="btn-primary" onClick={addGridline} style={{ width: '100%', justifyContent: 'center', padding: '6px' }}>
          ➕ Add Parallel Gridline ({gridlines}/5)
        </button>
      )}
      {step === 3 && (
        <div style={{ textAlign: 'center', color: 'var(--accent-green)', fontWeight: 800, fontSize: 13 }}>
          🎉 Axis frame complete! ⌐ Perpendicular axes + parallel gridlines = perfect graph!
        </div>
      )}
    </div>
  );
}
