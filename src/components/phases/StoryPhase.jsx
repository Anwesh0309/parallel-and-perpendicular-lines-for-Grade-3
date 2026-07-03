import React, { useState, useEffect, useCallback } from 'react';
import { storyPanels } from '../../data/storyContent.js';
import { narrate, say } from '../../utils/audio.js';
import { stopNarration } from '../../utils/audio.js';
import StoryImage from '../shared/StoryImage.jsx';

export default function StoryPhase({ audioEnabled, onComplete }) {
  const [panel, setPanel] = useState(0);
  const total = storyPanels.length;

  const narratePanel = useCallback((idx) => {
    if (!audioEnabled) return;
    stopNarration();
    // Use pre-generated audio map keys
    const keys = [
      "Emma is running a Fruit Fair stall at school. She asks her classmates which fruit they like best — Apple, Mango, Grapes, or Orange. She makes a tally chart to record every vote. But the list of numbers is hard to read at a glance! She says: I need a graph to show who is winning!",
      "Emma draws one line going sideways — that is the category axis. Then she draws one line going straight up. They meet at a perfect square corner, just like the walls of a room. Two lines that meet at a right angle are called perpendicular lines!",
      "Now Emma draws a bar for each fruit. Every bar stands straight up from the category axis. Each bar is perfectly straight, and none of the bars lean into each other. Lines that are always the same distance apart and never cross are called parallel lines!",
      "Emma's graph is finished! Because the axes are perpendicular and the bars are parallel, it is very easy to read. She can see straight away which fruit got the most votes. The scale says 1 square equals 2 votes, so she counts squares and multiplies! Mango wins — 14 votes!",
    ];
    narrate([{ text: keys[idx], style: 'statement' }]);
  }, [audioEnabled]);

  useEffect(() => {
    narratePanel(panel);
  }, [panel, narratePanel]);

  const goNext = () => {
    if (panel < total - 1) setPanel(p => p + 1);
    else onComplete();
  };
  const goPrev = () => {
    if (panel > 0) setPanel(p => p - 1);
  };

  const current = storyPanels[panel];

  return (
    <div className="card card-wide anim-fadeIn" style={{ padding: '20px 24px' }}>
      {/* Progress bar */}
      <div className="progress-bar-wrap" style={{ marginBottom: 10 }}>
        <div className="progress-bar-fill" style={{ width: `${((panel + 1) / total) * 100}%` }} />
      </div>
      <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>
        {panel + 1} / {total}
      </div>

      {/* Panel content */}
      <div className="story-panel" key={panel} style={{ animation: 'fadeIn .35s ease' }}>
        {/* Image */}
        <div className="story-image-box">
          <StoryImage panelId={current.image} />
        </div>

        {/* Text */}
        <div className="story-text-box">
          <div className="story-title">{current.title}</div>
          <p className="story-body" style={{ marginBottom: 12 }}>{current.body}</p>
          <div className="story-quote">
            <span style={{ fontSize: 16 }}>✨</span>
            <span>{current.quote}</span>
            <span style={{ fontSize: 16 }}>✨</span>
          </div>

          {/* Mascot */}
          <div className="mascot-wrap" style={{ marginTop: 12 }}>
            <div className="mascot-avatar" style={{ width: 36, height: 36, fontSize: 20 }}>🤖</div>
            <div className="mascot-bubble" style={{ fontSize: 12 }}>
              {panel === 0 && "Let's help Emma make her graph! 📊"}
              {panel === 1 && "Watch the axes snap into a right angle! 📐"}
              {panel === 2 && "See how the bars stay parallel? ⬜⬜⬜"}
              {panel === 3 && "Emma's graph is perfect! Can you read it? 🎉"}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="story-nav">
        <button className="btn-ghost" onClick={goPrev} disabled={panel === 0}
          style={{ opacity: panel === 0 ? 0.3 : 1 }}>
          ← Back
        </button>

        <div className="story-dots">
          {storyPanels.map((_, i) => (
            <div key={i} className={`story-dot ${i === panel ? 'active' : ''}`}
              onClick={() => setPanel(i)} />
          ))}
        </div>

        <button className="btn-primary" onClick={goNext}>
          {panel < total - 1 ? 'Next →' : 'Start Simulating! →'}
        </button>
      </div>
    </div>
  );
}
