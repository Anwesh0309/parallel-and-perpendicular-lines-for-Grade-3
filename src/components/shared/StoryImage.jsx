import React from 'react';

export default function StoryImage({ panelId }) {
  // panelId comes in as panel1, panel2, panel3, panel4
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={`/assets/images/${panelId}.png`}
        alt={panelId}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }}
      />
    </div>
  );
}
