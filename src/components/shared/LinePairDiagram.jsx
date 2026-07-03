import React from 'react';

export default function LinePairDiagram() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 8, border: '1px solid rgba(122,90,248,0.2)' }}>
      <svg viewBox="0 0 240 110" style={{ width: '100%', maxHeight: 110 }} xmlns="http://www.w3.org/2000/svg">
        {/* Parallel example */}
        <rect x="10" y="5" width="100" height="100" rx="8" fill="rgba(79,195,247,0.08)"/>
        <text x="60" y="20" textAnchor="middle" fill="#4FC3F7" fontSize="10" fontWeight="800">PARALLEL ∥</text>
        <line x1="25" y1="40" x2="95" y2="40" stroke="#4FC3F7" strokeWidth="2.5"/>
        <line x1="25" y1="60" x2="95" y2="60" stroke="#4FC3F7" strokeWidth="2.5"/>
        <line x1="25" y1="80" x2="95" y2="80" stroke="#4FC3F7" strokeWidth="2.5"/>
        <text x="60" y="98" textAnchor="middle" fill="#4FC3F7" fontSize="9">Never cross, same distance</text>

        {/* Perpendicular example */}
        <rect x="130" y="5" width="100" height="100" rx="8" fill="rgba(34,197,94,0.08)"/>
        <text x="180" y="20" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="800">PERPENDICULAR ⊥</text>
        <line x1="145" y1="55" x2="225" y2="55" stroke="#22C55E" strokeWidth="2.5"/>
        <line x1="185" y1="30" x2="185" y2="90" stroke="#22C55E" strokeWidth="2.5"/>
        <path d="M185,55 L197,55 L197,67" fill="none" stroke="#FFC940" strokeWidth="2"/>
        <text x="180" y="98" textAnchor="middle" fill="#22C55E" fontSize="9">Meet at exactly 90°</text>
      </svg>
    </div>
  );
}
