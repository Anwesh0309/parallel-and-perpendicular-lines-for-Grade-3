import React from 'react';

export default function DataTable({ categories, values, scale }) {
  if (!categories || !values) return null;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', borderRadius: 12,
      border: '1px solid rgba(122,90,248,0.2)', overflow: 'hidden', marginBottom: 4
    }}>
      <table className="data-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 14px' }}>Category</th>
            <th style={{ textAlign: 'right', padding: '8px 14px' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat}>
              <td style={{ padding: '7px 14px', fontWeight: 700, color: 'var(--text-soft)' }}>{cat}</td>
              <td style={{ padding: '7px 14px', textAlign: 'right', fontWeight: 800, color: 'var(--accent-gold)', fontSize: 16 }}>
                {values[i]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {scale && scale > 1 && (
        <div style={{ padding: '6px 14px', fontSize: 11, color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          Scale: 1 □ = {scale} votes
        </div>
      )}
    </div>
  );
}
