/**
 * ElevenLabs Audio Pre-Generation Script
 * Generates all narration .mp3 files for the module
 * Run: node scripts/generate_audio.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY || 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

// Voice style presets
const STYLES = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

// All phrases to pre-generate
const phrases = [
  // ── INTRO ──
  { key: 'intro_welcome', style: 'statement', text: 'Welcome to Grade 3 Mathematics — Parallel and Perpendicular Lines! Join us on an exciting journey through graphs, straight lines, and data. Let\'s begin!' },

  // ── WONDER ──
  { key: 'wonder_q1', style: 'question', text: 'Hmm... I wonder... The class voted for their favourite fruit. How can we show who won without counting one by one every time?' },
  { key: 'wonder_hint', style: 'statement', text: 'What if there were a clever way to draw it? We might need to draw a graph with straight, matching lines!' },

  // ── STORY ──
  { key: 'story_1', style: 'statement', text: "Emma is running a Fruit Fair stall at school. She asks her classmates which fruit they like best — Apple, Mango, Grapes, or Orange. She makes a tally chart to record every vote. But the list of numbers is hard to read at a glance! She says: I need a graph to show who is winning!" },
  { key: 'story_2', style: 'statement', text: "Emma draws one line going sideways — that is the category axis. Then she draws one line going straight up. They meet at a perfect square corner, just like the walls of a room. Two lines that meet at a right angle are called perpendicular lines!" },
  { key: 'story_3', style: 'statement', text: "Now Emma draws a bar for each fruit. Every bar stands straight up from the category axis. Each bar is perfectly straight, and none of the bars lean into each other. Lines that are always the same distance apart and never cross are called parallel lines!" },
  { key: 'story_4', style: 'statement', text: "Emma's graph is finished! Because the axes are perpendicular and the bars are parallel, it is very easy to read. She can see straight away which fruit got the most votes. The scale says 1 square equals 2 votes, so she counts squares and multiplies! Mango wins — 14 votes!" },

  // ── SIMULATE ──
  { key: 'sim_a_intro', style: 'instruction', text: 'Station A — Line Spotter! Tap each pair of glowing lines. Are they parallel, perpendicular, or neither?' },
  { key: 'sim_b_intro', style: 'instruction', text: 'Station B — Axis Architect! Drag the sideways line first, then the up-and-down line. Watch for the little square corner — that means your axes are perpendicular!' },
  { key: 'sim_c_intro', style: 'instruction', text: 'Station C — Bar Builder! Slide each bar up to match the votes. Keep every bar parallel to its neighbours so the graph stays fair to read.' },
  { key: 'sim_d_intro', style: 'instruction', text: 'Station D — Graph Detective! Something is wrong with this graph. Tap the part that breaks the rules of parallel and perpendicular lines.' },

  { key: 'sim_perp_snap', style: 'celebration', text: 'Perfect! Your axes are perpendicular — they meet at a perfect corner, just like the walls of a room!' },
  { key: 'sim_parallel_snap', style: 'encouragement', text: 'Gridline snapped into place — parallel and evenly spaced!' },
  { key: 'sim_axis_done', style: 'celebration', text: 'All gridlines placed! They are all parallel and evenly spaced. Your axis frame is complete!' },
  { key: 'sim_tilt_block', style: 'emphasis', text: 'Bars must stay parallel to be fair to compare!' },
  { key: 'sim_bar_done', style: 'celebration', text: 'Excellent bar graph! All bars are parallel — great work!' },

  // ── PLAY PHASE ──
  { key: 'play_intro', style: 'statement', text: 'Play phase! Choose your world. Earn stars and XP!' },
  { key: 'play_correct_1', style: 'celebration', text: 'Perfectly plotted! Well done!' },
  { key: 'play_correct_2', style: 'celebration', text: 'Correct! Great work!' },
  { key: 'play_correct_3', style: 'celebration', text: 'Excellent! You got it!' },
  { key: 'play_correct_4', style: 'celebration', text: 'Brilliant answer!' },
  { key: 'play_incorrect_1', style: 'encouragement', text: 'Not quite! Check the graph carefully.' },
  { key: 'play_hint_1', style: 'thinking', text: 'Here is your first hint — look at the highlighted part of the graph.' },
  { key: 'play_hint_2', style: 'thinking', text: 'Here is your second hint — think about the scale value and count again.' },
  { key: 'play_badge', style: 'celebration', text: 'Badge unlocked! Congratulations!' },

  // ── WORLD INTROS ──
  { key: 'world_0', style: 'statement', text: 'World 1 — Fruit Fair! Answer 10 questions about fruit vote graphs. Scale is 1. Good luck!' },
  { key: 'world_1', style: 'statement', text: 'World 2 — Pet Parade! Which pet got the most votes? Use the bar graph to find out!' },
  { key: 'world_2', style: 'statement', text: 'World 3 — Sports Day Scores! Read graphs with scale 2. Go, team!' },
  { key: 'world_3', style: 'statement', text: 'World 4 — Weather Watch! How much sunshine? Read the bar graph carefully!' },
  { key: 'world_4', style: 'statement', text: 'World 5 — Toy Box Tally! Scale is 5 in this world. Count carefully!' },
  { key: 'world_5', style: 'statement', text: 'World 6 — Book Nook Graphs! How many books were borrowed? Let\'s find out!' },
  { key: 'world_6', style: 'statement', text: 'World 7 — Snack Survey! Big numbers — scale is 10. You can do it!' },
  { key: 'world_7', style: 'statement', text: 'World 8 — Garden Grid! Focus on parallel and perpendicular line identification!' },
  { key: 'world_8', style: 'statement', text: 'World 9 — Star Gazers Chart! Hard questions with scale 10. Aim for the stars!' },
  { key: 'world_9', style: 'statement', text: 'World 10 — Grand Graph Gallery! Mixed questions and two-step word problems. Show what you know!' },

  // ── 100 QUESTION NARRATIONS ──
  // Q1 — Read bar value
  { key: 'q1_001', style: 'question', text: 'Look at the bar graph. How many students chose Mango?' },
  { key: 'q1_002', style: 'question', text: 'How many students chose Apple?' },
  { key: 'q1_003', style: 'question', text: 'The bar graph shows class pets. How many students chose Dog?' },
  { key: 'q1_004', style: 'question', text: 'Sports Day results — how many students chose Football?' },
  { key: 'q1_005', style: 'question', text: 'How many students chose Badminton on Sports Day?' },
  { key: 'q1_006', style: 'question', text: 'The weather chart shows hours of sunshine. How many hours on Thursday?' },
  { key: 'q1_007', style: 'question', text: 'Library books borrowed — how many Adventure books?' },
  { key: 'q1_008', style: 'question', text: 'Snack survey — how many students chose Pizza?' },
  { key: 'q1_009', style: 'question', text: 'CCA sign-ups — how many students joined Music?' },
  { key: 'q1_010', style: 'question', text: 'Star-chart rewards — how many stars on Thursday?' },

  // Q2 — Line identify
  { key: 'q2_001', style: 'question', text: 'Which pair of lines meet at a right angle — are perpendicular?' },
  { key: 'q2_002', style: 'question', text: 'Which pair of lines are parallel — never meet, always same distance apart?' },
  { key: 'q2_003', style: 'question', text: 'In a bar graph, which lines are perpendicular?' },
  { key: 'q2_004', style: 'question', text: 'Which lines in a bar graph are parallel to each other?' },
  { key: 'q2_005', style: 'question', text: 'A shelf and the side panel of a bookcase — what is their relationship?' },
  { key: 'q2_006', style: 'question', text: 'Two white stripes on a zebra crossing — what is their relationship?' },
  { key: 'q2_007', style: 'question', text: 'A ladder rung and the ladder rail — are they parallel, perpendicular, or neither?' },
  { key: 'q2_008', style: 'question', text: 'Two bars on a bar graph — are they parallel, perpendicular, or neither?' },
  { key: 'q2_009', style: 'question', text: 'A leaning book on a shelf and the horizontal shelf — are they parallel, perpendicular, or neither?' },
  { key: 'q2_010', style: 'question', text: 'Oliver says the x-axis and y-axis of every bar graph are perpendicular. Is he correct?' },

  // Q3 — Picture graph
  { key: 'q3_001', style: 'question', text: 'Each fruit symbol equals 2 votes. How many votes did Mango get?' },
  { key: 'q3_002', style: 'question', text: 'Each paw symbol equals 2 students. How many students chose Dog?' },
  { key: 'q3_003', style: 'question', text: 'Each football equals 2 students. How many chose Badminton?' },
  { key: 'q3_004', style: 'question', text: 'Each sunshine symbol equals 5 hours. How many hours of sunshine on Wednesday?' },
  { key: 'q3_005', style: 'question', text: 'Each book symbol equals 5 books. How many Science books were borrowed?' },
  { key: 'q3_006', style: 'question', text: 'Each strawberry equals 5 votes. How many votes did Orange get?' },
  { key: 'q3_007', style: 'question', text: 'Each pencil equals 5 items. How many Erasers are in the box?' },
  { key: 'q3_008', style: 'question', text: 'Each star equals 10 students. How many students joined Music CCA?' },
  { key: 'q3_009', style: 'question', text: 'Each grape symbol equals 10 votes. How many votes did Orange get?' },
  { key: 'q3_010', style: 'question', text: 'Each star equals 10 stars. How many reward stars were earned on Thursday?' },

  // Q4 — Compare
  { key: 'q4_001', style: 'question', text: 'Which fruit got the FEWEST votes?' },
  { key: 'q4_002', style: 'question', text: 'Which fruit got the MOST votes?' },
  { key: 'q4_003', style: 'question', text: 'Which pet did the FEWEST students choose?' },
  { key: 'q4_004', style: 'question', text: 'Which sport had the MOST votes on Sports Day?' },
  { key: 'q4_005', style: 'question', text: 'Which sport had the FEWEST votes?' },
  { key: 'q4_006', style: 'question', text: 'On which day was there the MOST sunshine?' },
  { key: 'q4_007', style: 'question', text: 'Which type of book was borrowed the LEAST?' },
  { key: 'q4_008', style: 'question', text: 'Which snack was chosen by the MOST students?' },
  { key: 'q4_009', style: 'question', text: 'Which CCA had the FEWEST sign-ups?' },
  { key: 'q4_010', style: 'question', text: 'Which fruit had the fewest votes in the grand poll?' },

  // Q5 — Word problems
  { key: 'q5_001', style: 'question', text: 'Emma collected 9 stickers on Monday and 6 stickers on Tuesday. How many stickers did she collect in total?' },
  { key: 'q5_002', style: 'question', text: 'Oliver sold 15 tickets on Monday and 9 on Tuesday. How many tickets did he sell in total?' },
  { key: 'q5_003', style: 'question', text: 'Sophie scored 12 goals this week and 8 last week. How many goals in total?' },
  { key: 'q5_004', style: 'question', text: 'James recycled 24 bottles in Week 1 and 18 in Week 2. How many bottles did he recycle altogether?' },
  { key: 'q5_005', style: 'question', text: 'Liam earned 35 points on Monday and 27 on Tuesday. How many points did he earn in all?' },
  { key: 'q5_006', style: 'question', text: 'Ava planted 18 seedlings on Saturday and 24 on Sunday. How many seedlings did she plant in total?' },
  { key: 'q5_007', style: 'question', text: 'Noah borrowed 15 books in March and 22 books in April. How many books did he borrow altogether?' },
  { key: 'q5_008', style: 'question', text: 'Isabella counted 46 votes for Pizza and 34 votes for Burgers. How many votes were there in total?' },
  { key: 'q5_009', style: 'question', text: 'William collected 57 cans on Day 1 and 43 cans on Day 2 for the recycling drive. How many cans in all?' },
  { key: 'q5_010', style: 'question', text: 'Charlotte earned 63 XP on Monday and 37 XP on Tuesday in the reading challenge. What is her total XP?' },

  // Q6 — True/False
  { key: 'q6_001', style: 'question', text: 'True or False: The bars in a bar graph are parallel to each other.' },
  { key: 'q6_002', style: 'question', text: 'True or False: The horizontal axis and vertical axis of a graph are parallel.' },
  { key: 'q6_003', style: 'question', text: 'True or False: Two gridlines on the value axis of a bar graph are parallel.' },
  { key: 'q6_004', style: 'question', text: 'True or False: A bar and the horizontal axis of a graph are perpendicular.' },
  { key: 'q6_005', style: 'question', text: 'True or False: Railway tracks are an example of parallel lines.' },
  { key: 'q6_006', style: 'question', text: 'True or False: The rungs of a ladder and the rails of the ladder are perpendicular.' },
  { key: 'q6_007', style: 'question', text: 'True or False: You can make a correct bar graph with bars that lean at different angles.' },
  { key: 'q6_008', style: 'question', text: 'True or False: Perpendicular lines always meet at exactly 90 degrees.' },
  { key: 'q6_009', style: 'question', text: 'True or False: Parallel lines will eventually cross if you extend them far enough.' },
  { key: 'q6_010', style: 'question', text: 'True or False: In a correct picture graph, each row of symbols represents data proportional to the scale key.' },

  // Q7 — Match graph
  { key: 'q7_001', style: 'question', text: 'Which description matches: Mango is greater than Apple, Apple is greater than Grapes?' },
  { key: 'q7_002', style: 'question', text: 'Which description matches: Dog has twice as many votes as Rabbit?' },
  { key: 'q7_003', style: 'question', text: "Emma's graph shows: Books equals Pencils, Pencils are greater than Erasers. Which matches?" },
  { key: 'q7_004', style: 'question', text: 'Which graph shows: Football 30, Swimming 20, Badminton 25, Basketball 15, scale equals 5?' },
  { key: 'q7_005', style: 'question', text: "Oliver says: Thursday has the most sunshine, Monday the least. Which graph matches?" },
  { key: 'q7_006', style: 'question', text: 'Which description fits: Toys — Cars equal 10, Dolls equal 15, Blocks equal 5, Trains equal 20?' },
  { key: 'q7_007', style: 'question', text: 'Library: Science books borrowed 3 times as many as Art. Which matches?' },
  { key: 'q7_008', style: 'question', text: 'Which graph correctly shows perpendicular axes AND parallel bars?' },
  { key: 'q7_009', style: 'question', text: 'CCA sign-ups — Music has 3 times the sign-ups of Drama. Which matches if Drama equals 30?' },
  { key: 'q7_010', style: 'question', text: 'Grand Gallery: Orange is greater than Apple, Apple is greater than Grapes. Orange equals 90, Apple equals 60, Grapes equals 40. Which correctly matches a bar graph with scale 10?' },

  // Q8 — Total from table
  { key: 'q8_001', style: 'question', text: 'Add up all the fruit votes in the table. What is the total?' },
  { key: 'q8_002', style: 'question', text: 'How many students voted for pets in total?' },
  { key: 'q8_003', style: 'question', text: 'How many students voted for sports in total?' },
  { key: 'q8_004', style: 'question', text: 'What is the total sunshine hours for the whole week?' },
  { key: 'q8_005', style: 'question', text: 'How many books were borrowed in total from the library?' },
  { key: 'q8_006', style: 'question', text: 'How many toys are in the toy box altogether?' },
  { key: 'q8_007', style: 'question', text: 'How many students voted in the snack survey in total?' },
  { key: 'q8_008', style: 'question', text: 'How many CCA sign-ups were there in total?' },
  { key: 'q8_009', style: 'question', text: 'How many stars were earned across the whole week?' },
  { key: 'q8_010', style: 'question', text: 'Grand Gallery — what is the total of all fruit votes combined?' },

  // Q9 — Difference
  { key: 'q9_001', style: 'question', text: 'How many MORE votes did Mango get than Grapes?' },
  { key: 'q9_002', style: 'question', text: 'How many more students chose Dog than Rabbit?' },
  { key: 'q9_003', style: 'question', text: 'How many more students chose Football than Badminton?' },
  { key: 'q9_004', style: 'question', text: 'How many more students chose Football than Swimming?' },
  { key: 'q9_005', style: 'question', text: 'How many more hours of sunshine were there on Thursday than Monday?' },
  { key: 'q9_006', style: 'question', text: 'How many more Adventure books were borrowed than Science books?' },
  { key: 'q9_007', style: 'question', text: 'How many more Trains are in the box than Blocks?' },
  { key: 'q9_008', style: 'question', text: 'How many more students chose Pizza than Noodles?' },
  { key: 'q9_009', style: 'question', text: 'How many more students signed up for Music than Drama?' },
  { key: 'q9_010', style: 'question', text: 'How many more votes did Orange get than Grapes in the Grand Gallery?' },

  // Q10 — Axis check
  { key: 'q10_001', style: 'question', text: 'Which picture shows correctly drawn perpendicular axes for a bar graph?' },
  { key: 'q10_002', style: 'question', text: "Emma drew her bar graph axes at a 45-degree angle. Is this correct?" },
  { key: 'q10_003', style: 'question', text: 'Which is true about the value axis of a correctly drawn bar graph?' },
  { key: 'q10_004', style: 'question', text: "Oliver's graph has gridlines at 0, 5, 12, 20, 25. Is this a correct scale?" },
  { key: 'q10_005', style: 'question', text: 'Which axis diagram shows bars that are parallel to each other?' },
  { key: 'q10_006', style: 'question', text: "Sophie's bar graph has the horizontal axis on top and vertical axis on the side. The corner shows a right angle. Is this perpendicular?" },
  { key: 'q10_007', style: 'question', text: 'Which shows correctly parallel gridlines for a bar graph?' },
  { key: 'q10_008', style: 'question', text: 'A graph has axes meeting at 88 degrees instead of 90 degrees. What is the problem?' },
  { key: 'q10_009', style: 'question', text: "Lucas draws a bar graph where the category axis is vertical and the value axis is horizontal. Are they still perpendicular?" },
  { key: 'q10_010', style: 'question', text: 'In a correctly drawn bar graph with scale equal to 10, which set of gridline labels shows evenly spaced parallel gridlines?' },

  // ── REFLECT ──
  { key: 'reflect_congrats', style: 'celebration', text: 'Journey Complete! You finished all five phases! Fantastic work! You are a true Graph Champion!' },
  { key: 'reflect_excellent', style: 'celebration', text: 'Excellent! You really understand parallel and perpendicular lines in graphs!' },
  { key: 'reflect_good', style: 'encouragement', text: 'Great effort! Keep practising to master all 10 worlds!' },
  { key: 'reflect_q', style: 'question', text: 'What did you learn about lines in a graph today?' },
];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function generateAudio(phrase) {
  const filename = `${phrase.key}.mp3`;
  const filepath = path.join(OUTPUT_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`✓ Exists: ${filename}`);
    return { key: phrase.text.trim().toLowerCase().replace(/\s+/g,' '), file: filename };
  }

  const settings = STYLES[phrase.style] || STYLES.statement;
  const body = JSON.stringify({
    text: phrase.text,
    model_id: MODEL_ID,
    voice_settings: settings,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        console.error(`✗ Error ${res.statusCode} for: ${phrase.key}`);
        res.resume();
        resolve(null);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(filepath, buf);
        console.log(`✅ Generated: ${filename}`);
        resolve({ key: phrase.text.trim().toLowerCase().replace(/\s+/g,' '), file: filename });
      });
    });
    req.on('error', e => { console.error('Request error:', e); resolve(null); });
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`🎵 Generating ${phrases.length} audio files...`);
  const map = {};
  
  for (const phrase of phrases) {
    const result = await generateAudio(phrase);
    if (result) map[result.key] = result.file;
    // Rate limit: 2 requests/second
    await new Promise(r => setTimeout(r, 550));
  }

  // Write audioMap.js
  const mapPath = path.join(__dirname, '..', 'src', 'utils', 'audioMap.js');
  const mapContent = `// Auto-generated — do not edit manually\nexport const audioMap = ${JSON.stringify(map, null, 2)};\nexport default audioMap;\n`;
  fs.writeFileSync(mapPath, mapContent);
  console.log(`\n✅ Done! Generated ${Object.keys(map).length} audio files.`);
  console.log(`📁 audioMap.js updated with ${Object.keys(map).length} entries.`);
}

main().catch(console.error);
