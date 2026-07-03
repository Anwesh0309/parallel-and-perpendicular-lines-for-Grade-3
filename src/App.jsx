import React, { useReducer, useEffect, useCallback } from 'react';
import { questionBank } from './data/questionBank.js';
import { generateSessionQuestions } from './utils/shuffle.js';
import { checkBadges } from './utils/badgeEngine.js';
import { calcXP, calcStars, isWorldUnlocked } from './utils/scoring.js';
import { stopNarration, setAudioEnabled, SFX } from './utils/audio.js';

import IntroScreen from './components/IntroScreen.jsx';
import ProgressMap from './components/ProgressMap.jsx';
import WonderPhase from './components/phases/WonderPhase.jsx';
import StoryPhase from './components/phases/StoryPhase.jsx';
import SimulatePhase from './components/phases/SimulatePhase.jsx';
import PlayPhase from './components/phases/PlayPhase.jsx';
import ReflectPhase from './components/phases/ReflectPhase.jsx';

// ─── Wallpaper numbers ───────────────────────────────────────
const WALLPAPER = [
  {val:'∥', x:'5%',  y:'8%',  rot:'-10deg'},
  {val:'⊥', x:'92%', y:'5%',  rot:'8deg'},
  {val:'90°',x:'15%',y:'85%', rot:'5deg'},
  {val:'∥', x:'80%', y:'80%', rot:'-6deg'},
  {val:'⌐', x:'50%', y:'6%',  rot:'0deg'},
  {val:'▬▬',x:'70%', y:'45%', rot:'0deg'},
  {val:'⊥', x:'3%',  y:'50%', rot:'15deg'},
  {val:'∥', x:'88%', y:'55%', rot:'-12deg'},
];

// ─── Initial State ───────────────────────────────────────────
const initialState = {
  phase: 'intro',
  currentSimStation: 0,
  simStationsComplete: [false, false, false, false],
  questionSet: [],
  currentQuestion: 0,
  currentWorld: 0,
  worldScores: Array(10).fill(null),
  currentWorldCorrect: 0,
  hintsUsed: 0,
  attemptCount: 0,
  lives: 3,
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  phaseComplete: { wonder: false, story: false, simulate: false, play: false, reflect: false },
  audioEnabled: true,
};

// ─── Reducer ─────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'COMPLETE_PHASE': {
      const phaseComplete = { ...state.phaseComplete, [action.payload]: true };
      const newBadges = checkBadges({ ...state, phaseComplete });
      return { ...state, phaseComplete, badges: [...state.badges, ...newBadges] };
    }

    case 'ADVANCE_SIM_STATION':
      return { ...state, currentSimStation: Math.min(3, state.currentSimStation + 1) };

    case 'PREV_SIM_STATION':
      return { ...state, currentSimStation: Math.max(0, state.currentSimStation - 1) };

    case 'SET_SIM_STATION':
      return { ...state, currentSimStation: action.payload };

    case 'COMPLETE_SIM_STATION': {
      const simStationsComplete = [...state.simStationsComplete];
      simStationsComplete[action.payload] = true;
      return { ...state, simStationsComplete };
    }

    case 'LOAD_QUESTIONS':
      return {
        ...state,
        questionSet: generateSessionQuestions(questionBank),
        currentQuestion: 0,
        currentWorld: 0,
        worldScores: Array(10).fill(null),
        currentWorldCorrect: 0,
        lives: 3,
        xp: 0,
        totalStars: 0,
        streak: 0,
        maxStreak: 0,
        hintsUsed: 0,
        attemptCount: 0,
      };

    case 'ANSWER_CORRECT': {
      const newStreak = state.streak + 1;
      const streakBonus = newStreak >= 5 ? 5 : 0;
      const xpGain = calcXP(state.attemptCount + 1, action.usedHint) + streakBonus;
      const newWorldCorrect = state.currentWorldCorrect + 1;
      const newXP = state.xp + xpGain;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);
      const newBadges = checkBadges({ ...state, streak: newStreak, maxStreak: newMaxStreak, xp: newXP });
      return {
        ...state,
        streak: newStreak, maxStreak: newMaxStreak,
        xp: newXP, currentWorldCorrect: newWorldCorrect,
        hintsUsed: 0, attemptCount: 0,
        badges: [...state.badges, ...newBadges.filter(b => !state.badges.includes(b))],
      };
    }

    case 'ANSWER_INCORRECT': {
      const newLives = Math.max(0, state.lives - 1);
      return { ...state, streak: 0, lives: newLives, attemptCount: state.attemptCount + 1 };
    }

    case 'USE_HINT':
      return { ...state, hintsUsed: state.hintsUsed + 1 };

    case 'NEXT_QUESTION': {
      const nextQ = state.currentQuestion + 1;
      const isNewWorld = nextQ % 10 === 0 && nextQ < 100;
      const finishedWorld = nextQ > 0 && nextQ % 10 === 0;
      let worldScores = [...state.worldScores];
      let totalStars = state.totalStars;
      let currentWorldCorrect = state.currentWorldCorrect;
      let currentWorld = state.currentWorld;

      if (finishedWorld) {
        const stars = calcStars(state.currentWorldCorrect);
        worldScores[state.currentWorld] = state.currentWorldCorrect;
        totalStars += stars;
        currentWorldCorrect = 0;
        if (isNewWorld) currentWorld = state.currentWorld + 1;
      }

      return { ...state, currentQuestion: nextQ, worldScores, totalStars, currentWorldCorrect, currentWorld, lives: 3, hintsUsed: 0, attemptCount: 0 };
    }

    case 'SET_WORLD': {
      const wIdx = action.payload;
      if (!isWorldUnlocked(wIdx, state.worldScores)) return state;
      return { ...state, currentWorld: wIdx, currentQuestion: wIdx * 10, currentWorldCorrect: 0, lives: 3 };
    }

    case 'TOGGLE_AUDIO': {
      setAudioEnabled(!state.audioEnabled);
      return { ...state, audioEnabled: !state.audioEnabled };
    }

    case 'PLAY_AGAIN':
      return {
        ...initialState,
        phase: 'intro',
        audioEnabled: state.audioEnabled,
        questionSet: generateSessionQuestions(questionBank),
      };

    default: return state;
  }
}

// ─── App Component ───────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load questions on mount
  useEffect(() => {
    dispatch({ type: 'LOAD_QUESTIONS' });
  }, []);

  // Stop audio on phase change
  useEffect(() => {
    stopNarration();
  }, [state.phase]);

  const goHome = useCallback(() => {
    stopNarration();
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }, []);

  const phaseList = ['wonder','story','simulate','play','reflect'];
  const showTopBar = state.phase !== 'intro';

  return (
    <div className="app-bg">
      {/* Wallpaper */}
      {WALLPAPER.map((w, i) => (
        <span key={i} className="wallpaper-num"
          style={{ left: w.x, top: w.y, transform: `rotate(${w.rot})`,
                   animationDelay: `${i * 1.3}s` }}>
          {w.val}
        </span>
      ))}

      {/* Top Bar */}
      {showTopBar && (
        <div className="top-bar">
          <button className="home-btn" onClick={goHome}>🏠 Home</button>
          <ProgressMap
            phases={phaseList}
            current={state.phase}
            complete={state.phaseComplete}
          />
          <button className="audio-btn" onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            title={state.audioEnabled ? 'Mute' : 'Unmute'}>
            {state.audioEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {state.phase === 'intro' && (
          <IntroScreen onStart={() => dispatch({ type: 'SET_PHASE', payload: 'wonder' })} />
        )}
        {state.phase === 'wonder' && (
          <WonderPhase
            audioEnabled={state.audioEnabled}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
              dispatch({ type: 'SET_PHASE', payload: 'story' });
            }}
          />
        )}
        {state.phase === 'story' && (
          <StoryPhase
            audioEnabled={state.audioEnabled}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'story' });
              dispatch({ type: 'SET_PHASE', payload: 'simulate' });
            }}
          />
        )}
        {state.phase === 'simulate' && (
          <SimulatePhase
            currentStation={state.currentSimStation}
            stationsComplete={state.simStationsComplete}
            audioEnabled={state.audioEnabled}
            onSetStation={(i) => dispatch({ type: 'SET_SIM_STATION', payload: i })}
            onCompleteStation={(i) => dispatch({ type: 'COMPLETE_SIM_STATION', payload: i })}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'simulate' });
              dispatch({ type: 'SET_PHASE', payload: 'play' });
            }}
          />
        )}
        {state.phase === 'play' && (
          <PlayPhase
            state={state}
            dispatch={dispatch}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'play' });
              dispatch({ type: 'SET_PHASE', payload: 'reflect' });
            }}
          />
        )}
        {state.phase === 'reflect' && (
          <ReflectPhase
            state={state}
            audioEnabled={state.audioEnabled}
            onPlayAgain={() => dispatch({ type: 'PLAY_AGAIN' })}
            onHome={goHome}
          />
        )}
      </div>
    </div>
  );
}
