import React, { useMemo } from 'react';

const COLORS = ['#FFC940','#FF4D8D','#22C55E','#7A5AF8','#4FC3F7','#FF6B6B','#FFB627'];

export default function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  })), []);

  return (
    <div className="confetti-wrap">
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            background: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
