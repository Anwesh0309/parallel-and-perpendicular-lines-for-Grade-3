// Narration scripts — Phase-mapped strings for ElevenLabs TTS
// These match 1:1 with on-screen text per audio pipeline spec

export const narrationScripts = {
  // ── INTRO ──
  intro: [
    "Welcome to Grade 3 Mathematics — Parallel and Perpendicular Lines! Join us on an exciting journey through graphs, straight lines, and data. Let's begin!",
  ],

  // ── WONDER ──
  wonder: [
    "Hmm... I wonder... The class voted for their favourite fruit. How can we show who won without counting one by one every time?",
    "What if there were a clever way to draw it? We might need to draw a graph with straight, matching lines!",
  ],

  // ── STORY ──
  story_1: [
    "Emma is running a Fruit Fair stall at school. She asks her classmates which fruit they like best — Apple, Mango, Grapes, or Orange. She makes a tally chart to record every vote. But the list of numbers is hard to read at a glance! She says: I need a graph to show who is winning!",
  ],
  story_2: [
    "Emma draws one line going sideways — that is the category axis. Then she draws one line going straight up. They meet at a perfect square corner, just like the walls of a room. Two lines that meet at a right angle are called perpendicular lines!",
  ],
  story_3: [
    "Now Emma draws a bar for each fruit. Every bar stands straight up from the category axis. Each bar is perfectly straight, and none of the bars lean into each other. Lines that are always the same distance apart and never cross are called parallel lines!",
  ],
  story_4: [
    "Emma's graph is finished! Because the axes are perpendicular and the bars are parallel, it is very easy to read. She can see straight away which fruit got the most votes. The scale says 1 square equals 2 votes, so she counts squares and multiplies! Mango wins — 14 votes!",
  ],

  // ── SIMULATE ──
  sim_intro: [
    "Simulate! Explore and discover — there are no wrong answers here. Let's try all four stations!",
  ],
  sim_A_intro: [
    "Station A — Line Spotter! Tap each pair of glowing lines. Are they parallel, perpendicular, or neither?",
  ],
  sim_B_intro: [
    "Station B — Axis Architect! Drag the sideways line first, then the up-and-down line. Watch for the little square corner — that means your axes are perpendicular!",
  ],
  sim_C_intro: [
    "Station C — Bar Builder! Slide each bar up to match the votes. Keep every bar parallel to its neighbours so the graph stays fair to read.",
  ],
  sim_D_intro: [
    "Station D — Graph Detective! Something is wrong with this graph. Tap the part that breaks the rules of parallel and perpendicular lines.",
  ],

  // ── PLAY ──
  play_intro: [
    "Play phase! Answer questions in each world. Earn stars and XP! Let's go!",
  ],
  play_correct: [
    "Perfectly plotted! Well done!",
    "Correct! Great work!",
    "Excellent! You got it!",
    "Brilliant answer!",
    "Spot on! Amazing!",
  ],
  play_incorrect: [
    "Check the lines again — are they parallel or perpendicular?",
    "Not quite! Think about the scale.",
    "Almost! Try using a hint.",
    "Good try! Look at the bars carefully.",
  ],
  play_hint1: [
    "Here is your first hint — look at the highlighted part of the graph.",
  ],
  play_hint2: [
    "Here is your second hint — think about the scale value and count again.",
  ],

  // ── WORLD INTROS (10 worlds) ──
  world_0: ["World 1 — Fruit Fair! Answer 10 questions about fruit vote graphs. Scale is 1. Good luck!"],
  world_1: ["World 2 — Pet Parade! Which pet got the most votes? Use the bar graph to find out!"],
  world_2: ["World 3 — Sports Day Scores! Read graphs with scale 2. Go, team!"],
  world_3: ["World 4 — Weather Watch! How much sunshine? Read the bar graph carefully!"],
  world_4: ["World 5 — Toy Box Tally! Scale is 5 in this world. Count carefully!"],
  world_5: ["World 6 — Book Nook Graphs! How many books were borrowed? Let's find out!"],
  world_6: ["World 7 — Snack Survey! Big numbers — scale is 10. You can do it!"],
  world_7: ["World 8 — Garden Grid! Focus on parallel and perpendicular line identification!"],
  world_8: ["World 9 — Star Gazers Chart! Hard questions with scale 10. Aim for the stars!"],
  world_9: ["World 10 — Grand Graph Gallery! Mixed questions and two-step word problems. Show what you know!"],

  // ── REFLECT ──
  reflect_intro: [
    "Reflect phase! What did you learn about lines in a graph today?",
  ],
  reflect_congrats: [
    "Journey Complete! You finished all five phases! Fantastic work! You are a true Graph Champion!",
  ],
  reflect_good: [
    "Great start! Try again to improve your score and earn more stars!",
  ],
  reflect_excellent: [
    "Excellent performance! You really understand parallel and perpendicular lines in graphs!",
  ],

  // ── BADGES ──
  badge_unlock: [
    "Badge unlocked! Congratulations!",
  ],
};

// Helper to get a random string from an array
export function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
