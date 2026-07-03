import React from 'react';

const PHASE_LABELS = {
  wonder:   { num: '01', icon: '👁️', label: 'Wonder' },
  story:    { num: '02', icon: '📖', label: 'Story' },
  simulate: { num: '03', icon: '✏️', label: 'Simulate' },
  play:     { num: '04', icon: '🎮', label: 'Play' },
  reflect:  { num: '05', icon: '💭', label: 'Reflect' },
};

export default function ProgressMap({ phases, current, complete }) {
  return (
    <div className="phase-tracker">
      {phases.map((p, i) => {
        const { num, icon, label } = PHASE_LABELS[p];
        const isActive = current === p;
        const isDone = complete[p];
        return (
          <React.Fragment key={p}>
            {i > 0 && <span className="phase-sep">—</span>}
            <div className={`phase-pill ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
              {isDone ? '✓' : num} {icon} {label}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
