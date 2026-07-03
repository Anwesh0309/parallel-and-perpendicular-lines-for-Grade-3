import React, { useState } from 'react';
import { lineSpotterScenes } from '../../data/lineSpotterScenes.js';
import { SFX, narrateText } from '../../utils/audio.js';

export default function LineSpotterStation({ audioEnabled, onComplete }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const scene = lineSpotterScenes[sceneIdx];

  const handleClassify = (pairId, answer, correct) => {
    if (answers[pairId]) return;
    const isCorrect = answer === correct;
    setAnswers(a => ({ ...a, [pairId]: answer }));
    setFeedback(f => ({ ...f, [pairId]: isCorrect }));

    if (isCorrect) {
      SFX.snapParallel();
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      if (audioEnabled) narrateText(
        answer === 'parallel'
          ? 'Gridline snapped into place — parallel and evenly spaced!'
          : answer === 'perpendicular'
            ? 'Perfect! Your axes are perpendicular — they meet at a perfect corner, just like the walls of a room!'
            : 'Correct! Great work!',
        'encouragement'
      );
    } else {
      SFX.incorrect();
      if (audioEnabled) narrateText('Not quite! Check the graph carefully.', 'thinking');
    }

    // Check if all pairs answered for this scene
    const totalAnswered = Object.keys({ ...answers, [pairId]: answer }).length;
    if (totalAnswered === scene.pairs.length) {
      setTimeout(() => {
        if (sceneIdx < lineSpotterScenes.length - 1) {
          setSceneIdx(s => s + 1);
          setAnswers({});
          setFeedback({});
        } else {
          setDone(true);
          onComplete();
        }
      }, 1200);
    }
  };

  const relColors = {
    parallel: { btn: 'lo-parallel', label: '⬌ Parallel' },
    perpendicular: { btn: 'lo-perp', label: '⌐ Perpendicular' },
    neither: { btn: 'lo-neither', label: '≁ Neither' },
  };

  return (
    <div className="scene-card" style={{ padding: '8px 12px' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--accent-gold)', marginBottom: 2 }}>
        {scene.emoji} {scene.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{scene.description}</div>

      {/* Line pair SVG illustration */}
      <LinePairSVG sceneId={scene.id} answers={answers} feedback={feedback} />

      {/* Pairs to classify */}
      <div style={{ marginTop: 6 }}>
        {scene.pairs.map(pair => (
          <div key={pair.id} style={{
            background: answers[pair.id]
              ? (feedback[pair.id] ? 'rgba(34,197,94,0.1)' : 'rgba(255,77,141,0.1)')
              : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${answers[pair.id] ? (feedback[pair.id] ? '#22C55E' : '#FF4D8D') : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 8, padding: '4px 10px', marginBottom: 4, display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--text-soft)', marginBottom: 2 }}>
              {answers[pair.id] ? (feedback[pair.id] ? '✅' : '❌') : '🔵'} {pair.label}
            </div>
            {!answers[pair.id] && (
              <div className="line-pair-options" style={{ padding: '2px 0' }}>
                {['parallel','perpendicular','neither'].map(rel => (
                  <button key={rel} className={`line-option-btn ${relColors[rel].btn}`}
                    onClick={() => handleClassify(pair.id, rel, pair.answer)}
                    style={{ padding: '4px 6px', fontSize: 11 }}>
                    {relColors[rel].label}
                  </button>
                ))}
              </div>
            )}
            {answers[pair.id] && !feedback[pair.id] && (
              <div style={{ fontSize: 11, color: '#FF4D8D', marginTop: 2 }}>💡 {pair.hint}</div>
            )}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ textAlign: 'right', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
        Scene {sceneIdx + 1} / {lineSpotterScenes.length}
      </div>

      {done && (
        <div style={{ textAlign: 'center', marginTop: 4, color: 'var(--accent-green)', fontWeight: 800, fontSize: 13 }}>
          ✅ Line Spotter Complete! Great work!
        </div>
      )}
    </div>
  );
}

function LinePairSVG({ sceneId, answers, feedback }) {
  const svgs = {
    scene_window: (
      <svg viewBox="0 0 240 100" style={{width:'100%',maxHeight:140}} xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="rgba(255,255,255,0.03)" rx="8"/>
        {/* Window frame */}
        <rect x="20" y="10" width="80" height="80" rx="4" fill="none" stroke="#7A5AF8" strokeWidth="2"/>
        <line x1="60" y1="10" x2="60" y2="90" stroke="#4FC3F7" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="20" y1="50" x2="100" y2="50" stroke="#4FC3F7" strokeWidth="1.5" strokeDasharray="3,3"/>
        <path d="M20,78 L32,78 L32,90" fill="none" stroke="#22C55E" strokeWidth="2"/>
        <text x="120" y="30" fill="#FFC940" fontSize="10" fontWeight="800">Top edge & side edge</text>
        <text x="120" y="55" fill="#4FC3F7" fontSize="10" fontWeight="800">Two horizontal bars</text>
        <text x="120" y="80" fill="#9D8EC7" fontSize="10" fontWeight="800">Diagonal & vertical</text>
      </svg>
    ),
    scene_zebra: (
      <svg viewBox="0 0 240 100" style={{width:'100%',maxHeight:140}} xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="rgba(30,10,60,0.5)" rx="8"/>
        {[20,34,48,62,76].map(x => (
          <rect key={x} x={x} y="10" width="10" height="80" fill="white" opacity="0.85"/>
        ))}
        <rect x="20" y="85" width="70" height="5" rx="2" fill="#888"/>
        <path d="M20,80 L32,80 L32,90" fill="none" stroke="#22C55E" strokeWidth="2"/>
        <text x="115" y="35" fill="white" fontSize="10" fontWeight="800">Two white stripes</text>
        <text x="115" y="55" fill="#22C55E" fontSize="10" fontWeight="800">Stripe & road kerb</text>
        <text x="115" y="75" fill="#9D8EC7" fontSize="10" fontWeight="800">Diagonal footsteps</text>
      </svg>
    ),
    scene_ladder: (
      <svg viewBox="0 0 240 100" style={{width:'100%',maxHeight:140}} xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="rgba(255,255,255,0.03)" rx="8"/>
        <line x1="30" y1="10" x2="30" y2="90" stroke="#C4B5FD" strokeWidth="3"/>
        <line x1="70" y1="10" x2="70" y2="90" stroke="#C4B5FD" strokeWidth="3"/>
        {[25,45,65,85].map(y => (
          <line key={y} x1="30" y1={y} x2="70" y2={y} stroke="#FFC940" strokeWidth="2"/>
        ))}
        <path d="M30,33 L42,33 L42,45" fill="none" stroke="#22C55E" strokeWidth="2"/>
        <text x="95" y="30" fill="#4FC3F7" fontSize="10" fontWeight="800">Left & right rails</text>
        <text x="95" y="52" fill="#22C55E" fontSize="10" fontWeight="800">Rung & rail</text>
        <text x="95" y="74" fill="#9D8EC7" fontSize="10" fontWeight="800">Rung & diagonal crack</text>
      </svg>
    ),
    scene_bookshelf: (
      <svg viewBox="0 0 240 100" style={{width:'100%',maxHeight:140}} xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="rgba(255,255,255,0.03)" rx="8"/>
        <rect x="15" y="10" width="70" height="80" rx="4" fill="none" stroke="#7A5AF8" strokeWidth="2"/>
        {[35,55,75].map(y => (
          <line key={y} x1="15" y1={y} x2="85" y2={y} stroke="#FFC940" strokeWidth="2"/>
        ))}
        <path d="M15,66 L27,66 L27,75" fill="none" stroke="#22C55E" strokeWidth="2"/>
        {/* Leaning book */}
        <rect x="20" y="17" width="10" height="15" rx="2" fill="#FF6B6B" transform="rotate(15,25,25)"/>
        <text x="100" y="30" fill="#4FC3F7" fontSize="10" fontWeight="800">Two shelves</text>
        <text x="100" y="52" fill="#22C55E" fontSize="10" fontWeight="800">Shelf & side panel</text>
        <text x="100" y="74" fill="#9D8EC7" fontSize="10" fontWeight="800">Leaning book & shelf</text>
      </svg>
    ),
    scene_graph: (
      <svg viewBox="0 0 240 100" style={{width:'100%',maxHeight:140}} xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="rgba(255,255,255,0.03)" rx="8"/>
        <line x1="25" y1="10" x2="25" y2="85" stroke="#FFC940" strokeWidth="2.5"/>
        <line x1="25" y1="85" x2="110" y2="85" stroke="#FFC940" strokeWidth="2.5"/>
        {[25,40,55,70].map(y => (
          <line key={y} x1="25" y1={y} x2="110" y2={y} stroke="rgba(122,90,248,0.4)" strokeWidth="1" strokeDasharray="3,2"/>
        ))}
        <path d="M25,73 L37,73 L37,85" fill="none" stroke="#22C55E" strokeWidth="2"/>
        {[35,55,75,95].map((x,i) => (
          <rect key={x} x={x} y={85-[30,50,20,40][i]} width="14" height={[30,50,20,40][i]} rx="3" fill="#7A5AF8" opacity="0.8"/>
        ))}
        <text x="120" y="30" fill="#22C55E" fontSize="10" fontWeight="800">H-axis & V-axis</text>
        <text x="120" y="52" fill="#4FC3F7" fontSize="10" fontWeight="800">Two gridlines</text>
        <text x="120" y="74" fill="#22C55E" fontSize="10" fontWeight="800">Bar & baseline</text>
      </svg>
    ),
  };
  return svgs[sceneId] || null;
}
