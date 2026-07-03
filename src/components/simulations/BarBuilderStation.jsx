import React, { useState, useCallback } from 'react';
import { SFX, narrateText } from '../../utils/audio.js';

const SCENARIOS = [
  { name: 'Fruit Fair', cats: ['Apple 🍎','Mango 🥭','Grapes 🍇','Orange 🍊'], scale: 2, target: [4,7,3,5] },
  { name: 'Pet Parade', cats: ['Cat 🐱','Dog 🐶','Rabbit 🐰','Fish 🐟'], scale: 2, target: [5,8,2,6] },
  { name: 'Sports Day', cats: ['Football ⚽','Badminton 🏸','Swimming 🏊','Basketball 🏀'], scale: 5, target: [6,4,3,5] },
  { name: 'Snack Survey', cats: ['Burger 🍔','Pizza 🍕','Noodles 🍜','Rice 🍚'], scale: 10, target: [5,8,4,7] },
];

export default function BarBuilderStation({ audioEnabled, onComplete }) {
  const [scenIdx, setScenIdx] = useState(0);
  const [values, setValues] = useState([0,0,0,0]);
  const [tiltBlocked, setTiltBlocked] = useState(false);
  const [done, setDone] = useState(false);
  const [activityDone, setActivityDone] = useState(false);

  const scenario = SCENARIOS[scenIdx];
  const maxSquares = 10;

  const handleSlider = (i, val) => {
    const newVals = [...values];
    newVals[i] = parseInt(val);
    setValues(newVals);
    setActivityDone(true);
  };

  const handleTilt = () => {
    SFX.incorrect();
    setTiltBlocked(true);
    if (audioEnabled) narrateText('Bars must stay parallel to be fair to compare!', 'emphasis');
    setTimeout(() => setTiltBlocked(false), 2000);
  };

  const newNumber = () => {
    setScenIdx(i => (i + 1) % SCENARIOS.length);
    setValues([0,0,0,0]);
  };

  const handleDone = () => {
    SFX.levelUp();
    setDone(true);
    if (audioEnabled) narrateText('Excellent bar graph! All bars are parallel — great work!', 'celebration');
    setTimeout(onComplete, 1200);
  };
  const COLORS = ['#FF6B6B','#FFC940','#9B59B6','#4FC3F7'];

  return (
    <div className="scene-card" style={{ padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--accent-gold)', marginBottom: 2 }}>
        📊 Bar Builder — {scenario.name}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
        Slide each bar up! Scale: 1 square = {scenario.scale} votes. Keep bars parallel!
      </div>

      <div className="bar-builder-wrap" style={{ gap: 10 }}>
        {/* Bar chart */}
        <div className="bar-chart-area">
          <svg viewBox="0 0 260 170" style={{ width: '100%', maxHeight: 160 }} xmlns="http://www.w3.org/2000/svg">
            {/* Gridlines */}
            {Array.from({ length: maxSquares }).map((_, i) => (
              <line key={i} x1="40" x2="255" y1={150 - (i + 1) * 13} y2={150 - (i + 1) * 13}
                stroke="rgba(122,90,248,0.2)" strokeWidth="1" strokeDasharray="3,2"/>
            ))}
            {/* Scale labels */}
            {[2,4,6,8,10].map((v, i) => (
              <text key={v} x="36" y={150 - (i * 2 + 2) * 13 + 4}
                textAnchor="end" fill="#9D8EC7" fontSize="8">{v * scenario.scale}</text>
            ))}
            {/* Axes */}
            <line x1="40" y1="10" x2="40" y2="150" stroke="#FFC940" strokeWidth="2"/>
            <line x1="40" y1="150" x2="255" y2="150" stroke="#FFC940" strokeWidth="2"/>
            <path d="M40,138 L52,138 L52,150" fill="none" stroke="#22C55E" strokeWidth="2"/>
            {/* Bars */}
            {scenario.cats.map((cat, i) => {
              const h = values[i] * 13;
              const x = 55 + i * 50;
              return (
                <g key={cat}>
                  <rect x={x} y={150 - h} width="30" height={h} rx="4"
                    fill={COLORS[i]} opacity="0.85"
                    style={{ transition: 'height .2s ease, y .2s ease' }}/>
                  {values[i] > 0 && (
                    <text x={x + 15} y={145 - h} textAnchor="middle" fill="white" fontSize="9" fontWeight="800">
                      {values[i] * scenario.scale}
                    </text>
                  )}
                  <text x={x + 15} y="163" textAnchor="middle" fill="#EDE7FF" fontSize="8">
                    {cat.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Data table */}
        <div className="data-table-area">
          <table className="data-table">
            <thead><tr><th>Item</th><th>Votes</th></tr></thead>
            <tbody>
              {scenario.cats.map((cat, i) => (
                <tr key={cat}>
                  <td style={{ color: COLORS[i], fontWeight: 700 }}>{cat}</td>
                  <td style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{values[i] * scenario.scale}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
            Scale: 1□ = {scenario.scale} votes
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
        {scenario.cats.map((cat, i) => (
          <div key={cat} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '4px 8px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS[i], marginBottom: 2 }}>{cat}</div>
            <input type="range" min="0" max={maxSquares} value={values[i]}
              onChange={e => handleSlider(i, e.target.value)}
              style={{ width: '100%', accentColor: COLORS[i] }}/>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
              {values[i]} sq = {values[i] * scenario.scale} votes
            </div>
          </div>
        ))}
      </div>

      {/* Tilt block message */}
      {tiltBlocked && (
        <div style={{
          background: 'rgba(255,77,141,0.15)', border: '1px solid #FF4D8D',
          borderRadius: 8, padding: '4px 10px', marginTop: 6,
          color: '#FF4D8D', fontWeight: 800, fontSize: 11, textAlign: 'center'
        }}>
          ⚠️ Bars must stay parallel to be fair to compare! ⬜⬜⬜
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button className="btn-ghost" onClick={handleTilt} style={{ flex: 1, padding: '6px', fontSize: 11 }}>
          🚫 Try Tilt Bar
        </button>
        <button className="btn-secondary" onClick={newNumber} style={{ flex: 1, padding: '6px', fontSize: 11 }}>
          🔄 New Scenario
        </button>
        <button className="btn-primary" onClick={handleDone} style={{ flex: 1, padding: '6px', fontSize: 11, opacity: activityDone ? 1 : 0.5 }} disabled={!activityDone}>
          ✅ Done!
        </button>
      </div>

      {done && (
        <div style={{ textAlign: 'center', marginTop: 4, color: 'var(--accent-green)', fontWeight: 800, fontSize: 12 }}>
          🎉 Bar Builder Complete! All bars are parallel!
        </div>
      )}
    </div>
  );
}
