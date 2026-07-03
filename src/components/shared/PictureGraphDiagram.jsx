import React from 'react';

export default function PictureGraphDiagram({ categories, values, scale, icon = '⭐' }) {
  if (!categories || !values) return null;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '10px 14px',
      border: '1px solid rgba(122,90,248,0.2)'
    }}>
      {categories.map((cat, i) => {
        const symbolCount = Math.ceil(values[i] / scale);
        return (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ minWidth: 80, fontWeight: 800, fontSize: 13, color: 'var(--text-soft)' }}>
              {cat}
            </span>
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {Array.from({ length: symbolCount }).map((_, j) => (
                <span key={j} style={{ fontSize: 18 }}>{icon}</span>
              ))}
            </div>
            <span style={{ fontWeight: 800, fontSize: 12, color: 'var(--accent-gold)', marginLeft: 4 }}>
              {values[i]}
            </span>
          </div>
        );
      })}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8, marginTop: 4,
        fontSize: 12, fontWeight: 700, color: 'var(--text-muted)'
      }}>
        Key: 1 {icon} = {scale} vote{scale !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
