import React from 'react';

const COLORS = ['#FF6B6B','#FFC940','#9B59B6','#4FC3F7','#22C55E','#FF8C00'];

export default function BarGraphDiagram({ categories, values, scale, targetIndex, errorType }) {
  if (!categories || !values) return null;

  const maxVal = Math.max(...values);
  const maxSquares = Math.ceil(maxVal / scale);
  const squareH = Math.min(16, Math.floor(120 / (maxSquares + 1)));
  const chartH = 140;
  const barW = Math.min(36, Math.floor(200 / categories.length) - 8);
  const barGap = Math.min(46, Math.floor(220 / categories.length));
  const startX = 52;

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '8px', border: '1px solid rgba(122,90,248,0.2)' }}>
      <svg viewBox={`0 0 ${startX + categories.length * barGap + 20} 175`}
        style={{ width: '100%', maxHeight: 175 }} xmlns="http://www.w3.org/2000/svg">

        {/* Scale labels + gridlines */}
        {Array.from({ length: maxSquares + 1 }).map((_, i) => {
          const y = chartH - i * squareH * (chartH / (maxSquares * squareH));
          const realY = chartH - (i / maxSquares) * chartH + 10;
          return (
            <g key={i}>
              <line x1={startX} x2={startX + categories.length * barGap + 10} y1={realY} y2={realY}
                stroke="rgba(122,90,248,0.2)" strokeWidth="1" strokeDasharray="4,3"/>
              <text x={startX - 4} y={realY + 4} textAnchor="end" fill="#9D8EC7" fontSize="9">
                {i * scale}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={startX} y1="10" x2={startX} y2={chartH + 10} stroke="#FFC940" strokeWidth="2.5"/>
        <line x1={startX} y1={chartH + 10} x2={startX + categories.length * barGap + 10} y2={chartH + 10}
          stroke="#FFC940" strokeWidth="2.5"/>
        {/* Right-angle marker */}
        <path d={`M${startX},${chartH - 2} L${startX + 10},${chartH - 2} L${startX + 10},${chartH + 10}`}
          fill="none" stroke="#22C55E" strokeWidth="1.8"/>

        {/* Bars */}
        {categories.map((cat, i) => {
          const h = (values[i] / (maxSquares * scale)) * chartH;
          const x = startX + 8 + i * barGap;
          const isTarget = i === targetIndex;
          const isLean = errorType === 'unparallel_bar' && i === 1;
          return (
            <g key={cat} transform={isLean ? `skewX(-10)` : ''}>
              <rect x={x} y={chartH + 10 - h} width={barW} height={h} rx="4"
                fill={isTarget ? '#FFC940' : COLORS[i % COLORS.length]}
                opacity={isTarget ? 1 : 0.85}
                style={{ animation: 'barGrow .5s ease' }}/>
              {values[i] > 0 && (
                <text x={x + barW / 2} y={chartH + 4 - h} textAnchor="middle"
                  fill="white" fontSize="9" fontWeight="800">{values[i]}</text>
              )}
              <text x={x + barW / 2} y={chartH + 23} textAnchor="middle"
                fill={isTarget ? '#FFC940' : '#EDE7FF'} fontSize="9" fontWeight={isTarget ? '800' : '600'}>
                {cat}
              </text>
            </g>
          );
        })}

        {/* Scale note */}
        <text x={startX + categories.length * barGap / 2 + 10} y="172" textAnchor="middle"
          fill="#9D8EC7" fontSize="9">Scale: 1 □ = {scale} vote{scale !== 1 ? 's' : ''}</text>
      </svg>
    </div>
  );
}
