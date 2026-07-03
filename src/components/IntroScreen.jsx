import React, { useEffect } from 'react';
import { narrate, say } from '../utils/audio.js';

export default function IntroScreen({ onStart }) {
  useEffect(() => {
    narrate([
      say("Welcome to Singapore M-O-E Curriculum Grade 3 — Parallel and Perpendicular Lines!"),
      say("Join us on an exciting journey through graphs, straight lines, and data. Let's begin!"),
    ]);
  }, []);

  return (
    <div className="anim-fadeIn" style={{ textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Curriculum badge */}
      <div style={{
        display: 'inline-block', background: 'rgba(122,90,248,0.18)',
        border: '1px solid rgba(122,90,248,0.4)', borderRadius: 20,
        padding: '5px 16px', fontSize: 13, fontWeight: 700,
        color: 'var(--text-soft)', marginBottom: 16
      }}>
        ✨ Singapore MOE Curriculum · Grade 3
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-head)', fontSize: 'clamp(36px,6vw,56px)',
        lineHeight: 1.1, marginBottom: 8
      }}>
        <span style={{ color: '#FF8C00' }}>Parallel </span> 
        <span style={{ color: 'var(--text-white)' }}>&amp; </span>
        <span style={{ color: 'var(--accent-gold)' }}>Perpendicular</span>
      </h1>

      {/* Subtitle */}
      <div style={{
          fontSize: 15, fontWeight: 800, color: 'var(--accent-gold)', marginBottom: 26
      }}>
          GraphQuest · Data Handling Adventure
      </div>

      {/* Mascot bubble */}
      <div className="mascot-wrap" style={{ justifyContent: 'center', marginBottom: 24 }}>
        <div className="mascot-avatar" style={{ fontSize: 30, width: 56, height: 56 }}>🤖</div>
        <div className="mascot-bubble" style={{ fontSize: 15, padding: '12px 20px', background: 'var(--text-white)', color: 'var(--bg-deep)', borderRadius: '24px', border: 'none', marginLeft: '8px' }}>
          Hi! I'm Emma. Ready to graph? 📐
        </div>
      </div>

      {/* Intro Text */}
      <p style={{ color: 'var(--text-soft)', fontSize: 16, marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        Join Emma on a journey to read, build, and decode graphs, connect <strong>parallel lines</strong> to bars,
        and master making axes with <strong>perpendicular lines</strong>!
      </p>

      {/* Journey Map */}
      <div className="card card-wide" style={{ marginBottom: 32, padding: '24px', background: 'rgba(30,16,64,0.6)', border: '1px solid rgba(122,90,248,0.2)' }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--accent-gold)', marginBottom: 16, letterSpacing: 1 }}>
          YOUR LEARNING JOURNEY
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          {[
            { icon:'👁️', label:'Wonder', sub:'A grouping mystery!' },
            { icon:'📖', label:'Story',  sub:'See it in action' },
            { icon:'🧪', label:'Simulate',sub:'4 Interactive labs' },
            { icon:'🎮', label:'Play',   sub:'100 challenges' },
            { icon:'📝', label:'Reflect',sub:'What did you learn?' },
          ].map((step, i) => (
            <React.Fragment key={step.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {step.icon}
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-white)' }}>{step.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{step.sub}</div>
                </div>
              </div>
              {i < 4 && <div style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 4px' }}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="btn-primary" onClick={onStart} style={{ padding: '16px 48px', fontSize: 20, marginBottom: 40, boxShadow: '0 8px 32px rgba(255, 182, 39, 0.4)' }}>
        🚀 Begin Your Journey!
      </button>

      {/* Bottom Tiles */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(122,90,248,0.15)', borderRadius: '16px', padding: '20px 24px', width: 140 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-soft)' }}>100 Questions</div>
        </div>
        <div style={{ background: 'rgba(122,90,248,0.15)', borderRadius: '16px', padding: '20px 24px', width: 140 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📐</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-soft)' }}>Build Graphs</div>
        </div>
        <div style={{ background: 'rgba(122,90,248,0.15)', borderRadius: '16px', padding: '20px 24px', width: 140 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✨</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-soft)' }}>Badges &amp; XP</div>
        </div>
      </div>
    </div>
  );
}

