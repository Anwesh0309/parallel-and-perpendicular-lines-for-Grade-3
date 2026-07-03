import React from 'react';

export default function AxisDiagram({ errorHint }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 8, border: '1px solid rgba(122,90,248,0.2)' }}>
      <svg viewBox="0 0 240 160" style={{ width: '100%', maxHeight: 160 }} xmlns="http://www.w3.org/2000/svg">
        {/* Gridlines */}
        {[1,2,3,4,5].map(i => (
          <g key={i}>
            <line x1="45" x2="225" y1={140 - i * 22} y2={140 - i * 22}
              stroke={errorHint && i === 3 ? 'rgba(255,201,64,0.5)' : 'rgba(122,90,248,0.25)'}
              strokeWidth={errorHint && i === 3 ? 2 : 1} strokeDasharray="5,3"/>
            <text x="40" y={140 - i * 22 + 4} textAnchor="end" fill="#9D8EC7" fontSize="9">{i * 10}</text>
          </g>
        ))}
        {/* Vertical axis */}
        <line x1="45" y1="10" x2="45" y2="140" stroke="#FFC940" strokeWidth="2.5"/>
        {/* Horizontal axis */}
        <line x1="45" y1="140" x2="225" y2="140" stroke="#FFC940" strokeWidth="2.5"/>
        {/* Right-angle marker */}
        <path d="M45,128 L57,128 L57,140" fill="none" stroke="#22C55E" strokeWidth="2.5"
          style={{ animation: 'drawIn .5s ease' }}/>
        {/* Labels */}
        <text x="135" y="158" textAnchor="middle" fill="#EDE7FF" fontSize="10">Category axis →</text>
        <text x="18" y="75" textAnchor="middle" fill="#EDE7FF" fontSize="10"
          transform="rotate(-90,18,75)">Value axis ↑</text>
        {/* Perpendicular label */}
        <rect x="60" y="12" width="120" height="18" rx="6" fill="rgba(34,197,94,0.15)"/>
        <text x="120" y="25" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="800">
          ⌐ PERPENDICULAR AXES
        </text>
        {/* Parallel gridlines label */}
        <text x="180" y="90" fill="#4FC3F7" fontSize="9" fontWeight="700">∥ Parallel</text>
        <text x="180" y="101" fill="#4FC3F7" fontSize="9" fontWeight="700">gridlines</text>
      </svg>
    </div>
  );
}
