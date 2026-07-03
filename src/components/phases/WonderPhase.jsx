import React, { useEffect } from 'react';
import { narrate, ask, say } from '../../utils/audio.js';

export default function WonderPhase({ audioEnabled, onComplete }) {
  useEffect(() => {
    if (audioEnabled) {
      narrate([
        { text: "Hmm... I wonder... The class voted for their favourite fruit. How can we show who won without counting one by one every time?", style: 'question' },
        { text: "What if there were a clever way to draw it? We might need to draw a graph with straight, matching lines!", style: 'statement' },
      ]);
    }
  }, [audioEnabled]);

  return (
    <div className="card card-narrow anim-fadeIn" style={{ textAlign: 'center' }}>
      {/* Mascot */}
      <div className="mascot-wrap" style={{ justifyContent: 'center', marginBottom: 20 }}>
        <div className="mascot-avatar" style={{ animation: 'celebrate 1.2s ease infinite alternate' }}>🤖</div>
        <div className="mascot-bubble">Hmm... I wonder... 🤔</div>
      </div>

      {/* Question mark icon */}
      <div style={{
        width: 90, height: 90, borderRadius: '50%',
        background: 'rgba(122,90,248,0.25)', border: '3px solid rgba(122,90,248,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, margin: '0 auto 20px', boxShadow: '0 0 30px rgba(122,90,248,0.3)'
      }}>
        ❓
      </div>

      {/* Wonder question */}
      <h2 style={{
        fontFamily: 'var(--font-head)', fontSize: 'clamp(18px,3vw,26px)',
        color: 'var(--text-white)', lineHeight: 1.3, marginBottom: 8
      }}>
        The class voted for their favourite fruit.
      </h2>
      <h2 style={{
        fontFamily: 'var(--font-head)', fontSize: 'clamp(18px,3vw,26px)',
        color: 'var(--accent-gold)', lineHeight: 1.3, marginBottom: 16
      }}>
        How can we show <em>who won</em> without counting one by one every time? 🍇
      </h2>

      {/* Hint chip */}
      <div style={{
        background: 'rgba(122,90,248,0.18)', border: '1px solid rgba(122,90,248,0.4)',
        borderRadius: 10, padding: '10px 18px', display: 'inline-block',
        fontSize: 14, fontWeight: 700, color: 'var(--text-soft)', marginBottom: 24
      }}>
        ✨ We might need to draw a graph with straight, matching lines! ✨
      </div>

      <br />
      <button className="btn-primary" onClick={onComplete}>
        🔍 Let's Investigate!
      </button>
    </div>
  );
}
