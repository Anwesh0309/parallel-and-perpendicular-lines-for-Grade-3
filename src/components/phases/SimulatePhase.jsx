import React, { useEffect } from 'react';
import { narrate, instruct } from '../../utils/audio.js';
import LineSpotterStation from '../simulations/LineSpotterStation.jsx';
import AxisArchitectStation from '../simulations/AxisArchitectStation.jsx';
import BarBuilderStation from '../simulations/BarBuilderStation.jsx';
import GraphDetectiveStation from '../simulations/GraphDetectiveStation.jsx';

const STATIONS = [
  { id: 'A', label: 'Line Spotter',    icon: '🔍', component: LineSpotterStation },
  { id: 'B', label: 'Axis Architect',  icon: '📐', component: AxisArchitectStation },
  { id: 'C', label: 'Bar Builder',     icon: '📊', component: BarBuilderStation },
  { id: 'D', label: 'Graph Detective', icon: '🕵️', component: GraphDetectiveStation },
];

export default function SimulatePhase({
  currentStation, stationsComplete, audioEnabled,
  onSetStation, onCompleteStation, onComplete
}) {
  useEffect(() => {
    if (audioEnabled) {
      const intros = [
        "Station A — Line Spotter! Tap each pair of glowing lines. Are they parallel, perpendicular, or neither?",
        "Station B — Axis Architect! Drag the sideways line first, then the up-and-down line. Watch for the little square corner — that means your axes are perpendicular!",
        "Station C — Bar Builder! Slide each bar up to match the votes. Keep every bar parallel to its neighbours so the graph stays fair to read.",
        "Station D — Graph Detective! Something is wrong with this graph. Tap the part that breaks the rules of parallel and perpendicular lines.",
      ];
      narrate([{ text: intros[currentStation], style: 'instruction' }]);
    }
  }, [currentStation, audioEnabled]);

  const Station = STATIONS[currentStation].component;
  const allDone = stationsComplete.every(Boolean);

  const canGoNext = stationsComplete[currentStation];

  return (
    <div className="card card-wide anim-fadeIn" style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 6 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, color: 'var(--accent-gold)' }}>
          ✏️ Simulate
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Explore and discover — solve each station to unlock the next!</div>
      </div>

      {/* Tab bar */}
      <div className="sim-tabs" style={{ marginBottom: 6 }}>
        {STATIONS.map((s, i) => {
          // A tab is clickable if it's the current one, or if it's already complete,
          // or if the previous one is complete (unlocking it).
          const isUnlocked = i === 0 || stationsComplete[i - 1];
          return (
            <button key={s.id}
              disabled={!isUnlocked}
              className={`sim-tab ${currentStation === i ? 'active' : ''} ${stationsComplete[i] ? 'done' : ''}`}
              onClick={() => isUnlocked && onSetStation(i)}
              style={{ opacity: isUnlocked ? 1 : 0.4, cursor: isUnlocked ? 'pointer' : 'not-allowed', padding: '6px 8px', fontSize: 12 }}>
              {stationsComplete[i] ? '✓' : s.id} {s.icon} {s.label}
            </button>
          );
        })}
      </div>

      {/* Active station */}
      <div key={currentStation}>
        <Station
          audioEnabled={audioEnabled}
          onComplete={() => {
            onCompleteStation(currentStation);
            // We removed the auto-advance here to let the user manually click next,
            // or we auto advance but only if it was just completed. 
            // The Next Station button below will be active now.
          }}
        />
      </div>

      {/* Footer navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 6 }}>
        <button className="btn-ghost" onClick={() => onSetStation(Math.max(0, currentStation - 1))}
          disabled={currentStation === 0} style={{ opacity: currentStation === 0 ? 0.3 : 1, padding: '6px 12px', fontSize: 12 }}>
          ← Previous Station
        </button>

        {currentStation === 3 ? (
          <button className="btn-primary" onClick={onComplete} disabled={!allDone} style={{ opacity: allDone ? 1 : 0.5, padding: '6px 12px', fontSize: 12 }}>
            🎮 Go to Play Phase →
          </button>
        ) : (
          <button className="btn-secondary"
            onClick={() => onSetStation(Math.min(3, currentStation + 1))}
            disabled={!canGoNext}
            style={{ opacity: canGoNext ? 1 : 0.5, padding: '6px 12px', fontSize: 12 }}>
            Next Station →
          </button>
        )}
      </div>
    </div>
  );
}
