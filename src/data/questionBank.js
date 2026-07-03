// ============================================================
// QUESTION BANK — 100 questions, 10 types × 10 each
// Western-region names: Emma, Oliver, Sophie, James, Liam,
// Ava, Noah, Isabella, William, Charlotte, Lucas, Mia
// ============================================================

export const questionBank = [
// ── Q1: Read Bar Value (10) ──────────────────────────────────
{
  id:"Q1_001", type:"read_bar_value", world:0, difficulty:1,
  categories:["Apple","Mango","Grapes","Orange"],
  values:[8,14,6,10], scale:2, targetCategoryIndex:1,
  questionText:"Look at the bar graph. How many students chose Mango?",
  visual:"barGraph",
  options:[12,14,16,7], correctAnswer:14,
  hint1:"Find the Mango bar and count the squares it covers.",
  hint2:"Each square = 2 votes. The Mango bar reaches 7 squares.",
  explanation:"7 squares × 2 votes = 14. Mango got 14 votes."
},
{
  id:"Q1_002", type:"read_bar_value", world:0, difficulty:1,
  categories:["Apple","Mango","Grapes","Orange"],
  values:[8,14,6,10], scale:2, targetCategoryIndex:0,
  questionText:"How many students chose Apple?",
  visual:"barGraph",
  options:[6,8,10,4], correctAnswer:8,
  hint1:"Find the Apple bar. Count the squares.",
  hint2:"Each square = 2 votes. Apple bar = 4 squares.",
  explanation:"4 squares × 2 = 8. Apple got 8 votes."
},
{
  id:"Q1_003", type:"read_bar_value", world:1, difficulty:1,
  categories:["Cat","Dog","Rabbit","Fish"],
  values:[10,16,4,12], scale:2, targetCategoryIndex:1,
  questionText:"The bar graph shows class pets. How many students chose Dog?",
  visual:"barGraph",
  options:[14,16,18,8], correctAnswer:16,
  hint1:"Find the Dog bar. Count how many squares tall it is.",
  hint2:"Dog bar = 8 squares. Each square = 2.",
  explanation:"8 × 2 = 16. Dog got 16 votes."
},
{
  id:"Q1_004", type:"read_bar_value", world:2, difficulty:2,
  categories:["Football","Swimming","Badminton","Basketball"],
  values:[30,20,25,15], scale:5, targetCategoryIndex:0,
  questionText:"Sports Day results — how many students chose Football?",
  visual:"barGraph",
  options:[25,30,35,6], correctAnswer:30,
  hint1:"Find the Football bar.",
  hint2:"Each square = 5. Football bar = 6 squares.",
  explanation:"6 × 5 = 30 students chose Football."
},
{
  id:"Q1_005", type:"read_bar_value", world:2, difficulty:2,
  categories:["Football","Swimming","Badminton","Basketball"],
  values:[30,20,25,15], scale:5, targetCategoryIndex:2,
  questionText:"How many students chose Badminton on Sports Day?",
  visual:"barGraph",
  options:[20,25,30,5], correctAnswer:25,
  hint1:"Find the Badminton bar.",
  hint2:"Each square = 5. Count the squares up to the top of the bar.",
  explanation:"Badminton bar = 5 squares. 5 × 5 = 25."
},
{
  id:"Q1_006", type:"read_bar_value", world:3, difficulty:2,
  categories:["Mon","Tue","Wed","Thu","Fri"],
  values:[20,35,25,40,30], scale:5, targetCategoryIndex:3,
  questionText:"The weather chart shows hours of sunshine. How many hours on Thursday?",
  visual:"barGraph",
  options:[35,40,45,8], correctAnswer:40,
  hint1:"Find the Thu bar.",
  hint2:"Each square = 5. Thu bar = 8 squares.",
  explanation:"8 × 5 = 40 hours of sunshine on Thursday."
},
{
  id:"Q1_007", type:"read_bar_value", world:5, difficulty:2,
  categories:["Mystery","Adventure","Science","Art"],
  values:[20,35,15,25], scale:5, targetCategoryIndex:1,
  questionText:"Library books borrowed — how many Adventure books?",
  visual:"barGraph",
  options:[30,35,40,7], correctAnswer:35,
  hint1:"Find the Adventure bar.",
  hint2:"Each square = 5. Adventure = 7 squares.",
  explanation:"7 × 5 = 35 Adventure books were borrowed."
},
{
  id:"Q1_008", type:"read_bar_value", world:6, difficulty:3,
  categories:["Burger","Pizza","Noodles","Rice"],
  values:[60,80,40,70], scale:10, targetCategoryIndex:1,
  questionText:"Snack survey — how many students chose Pizza?",
  visual:"barGraph",
  options:[70,80,90,8], correctAnswer:80,
  hint1:"Find the Pizza bar.",
  hint2:"Each square = 10. Pizza = 8 squares.",
  explanation:"8 × 10 = 80 students chose Pizza."
},
{
  id:"Q1_009", type:"read_bar_value", world:8, difficulty:3,
  categories:["Drama","Music","Art","Science"],
  values:[50,90,70,60], scale:10, targetCategoryIndex:1,
  questionText:"CCA sign-ups — how many students joined Music?",
  visual:"barGraph",
  options:[80,90,100,9], correctAnswer:90,
  hint1:"Find the Music bar.",
  hint2:"Each square = 10. Music = 9 squares.",
  explanation:"9 × 10 = 90 students signed up for Music."
},
{
  id:"Q1_010", type:"read_bar_value", world:9, difficulty:3,
  categories:["Mon","Tue","Wed","Thu","Fri"],
  values:[40,70,50,90,60], scale:10, targetCategoryIndex:3,
  questionText:"Star-chart rewards — how many stars on Thursday?",
  visual:"barGraph",
  options:[80,90,100,9], correctAnswer:90,
  hint1:"Find the Thu bar.",
  hint2:"Each square = 10. Thu = 9 squares.",
  explanation:"9 × 10 = 90 stars on Thursday."
},
// ── Q2: Parallel/Perpendicular ID (10) ───────────────────────
{
  id:"Q2_001", type:"line_identify", world:0, difficulty:1,
  lineRelationship:"perpendicular",
  questionText:"Which pair of lines meet at a right angle (are perpendicular)?",
  visual:"linePair",
  options:["Window top & side edge","Ladder rungs","Zebra stripes","Shelf & shelf"],
  correctAnswer:"Window top & side edge",
  hint1:"A right angle looks like the corner of a square.",
  hint2:"Look for the small square marker ⌐ between two lines.",
  explanation:"The window top and side edge meet at a perfect 90° right angle — they are perpendicular."
},
{
  id:"Q2_002", type:"line_identify", world:0, difficulty:1,
  lineRelationship:"parallel",
  questionText:"Which pair of lines are parallel (never meet, always same distance apart)?",
  visual:"linePair",
  options:["Two ladder rails","Window top & side","Bar & baseline","Diagonal & vertical"],
  correctAnswer:"Two ladder rails",
  hint1:"Parallel lines look like railway tracks — they never cross.",
  hint2:"Ladder rails go up side by side, always the same distance apart.",
  explanation:"The two rails of a ladder are parallel — they stay the same distance apart all the way up."
},
{
  id:"Q2_003", type:"line_identify", world:1, difficulty:1,
  lineRelationship:"perpendicular",
  questionText:"In a bar graph, which lines are perpendicular?",
  visual:"linePair",
  options:["Horizontal axis & vertical axis","Two gridlines","Two bars","Bar top & bar bottom"],
  correctAnswer:"Horizontal axis & vertical axis",
  hint1:"The two axes form the corner of the graph.",
  hint2:"They meet at a right angle at the origin point.",
  explanation:"The horizontal axis and vertical axis meet at a right angle — they are perpendicular."
},
{
  id:"Q2_004", type:"line_identify", world:1, difficulty:1,
  lineRelationship:"parallel",
  questionText:"Which lines in a bar graph are parallel to each other?",
  visual:"linePair",
  options:["The gridlines","The two axes","A bar & the baseline","A bar & a gridline"],
  correctAnswer:"The gridlines",
  hint1:"Gridlines go across the graph and never cross each other.",
  hint2:"They are evenly spaced, always the same distance apart.",
  explanation:"The horizontal gridlines in a bar graph are parallel — they never meet."
},
{
  id:"Q2_005", type:"line_identify", world:3, difficulty:2,
  lineRelationship:"perpendicular",
  questionText:"A shelf and the side panel of a bookcase — what is their relationship?",
  visual:"linePair",
  options:["Perpendicular","Parallel","Neither","Equal"],
  correctAnswer:"Perpendicular",
  hint1:"Does the shelf and the panel form a corner?",
  hint2:"Look for a right-angle corner — like the letter L.",
  explanation:"The shelf meets the side panel at a right angle (90°) — they are perpendicular."
},
{
  id:"Q2_006", type:"line_identify", world:3, difficulty:2,
  lineRelationship:"parallel",
  questionText:"Two white stripes on a zebra crossing — what is their relationship?",
  visual:"linePair",
  options:["Parallel","Perpendicular","Neither","Crossing"],
  correctAnswer:"Parallel",
  hint1:"Do the stripes ever get closer or farther apart?",
  hint2:"They stay the same distance apart and never cross.",
  explanation:"Zebra crossing stripes are parallel — same distance apart, never crossing."
},
{
  id:"Q2_007", type:"line_identify", world:7, difficulty:2,
  lineRelationship:"perpendicular",
  questionText:"A ladder rung and the ladder rail — are they parallel, perpendicular, or neither?",
  visual:"linePair",
  options:["Perpendicular","Parallel","Neither","Curved"],
  correctAnswer:"Perpendicular",
  hint1:"A rung goes across; a rail goes up. What angle do they form?",
  hint2:"They form a right angle — the corner of a square.",
  explanation:"Rungs cross the rail at a 90° right angle — perpendicular."
},
{
  id:"Q2_008", type:"line_identify", world:7, difficulty:2,
  lineRelationship:"parallel",
  questionText:"Two bars on a bar graph — are they parallel, perpendicular, or neither?",
  visual:"linePair",
  options:["Parallel","Perpendicular","Neither","Diagonal"],
  correctAnswer:"Parallel",
  hint1:"Do the bars lean into each other?",
  hint2:"Each bar stands straight up — same direction, never crossing.",
  explanation:"Bars in a bar graph are parallel — they all stand straight and never cross."
},
{
  id:"Q2_009", type:"line_identify", world:8, difficulty:3,
  lineRelationship:"neither",
  questionText:"A leaning book on a shelf and the horizontal shelf — are they parallel, perpendicular, or neither?",
  visual:"linePair",
  options:["Neither","Parallel","Perpendicular","Equal"],
  correctAnswer:"Neither",
  hint1:"Is the angle between them exactly 90°? Are they the same distance apart?",
  hint2:"A leaning book makes an angle that is not 90° and not 0°.",
  explanation:"A leaning book crosses the shelf at a slanted angle — not 90° and not parallel. So: neither."
},
{
  id:"Q2_010", type:"line_identify", world:9, difficulty:3,
  lineRelationship:"perpendicular",
  questionText:"Oliver says the x-axis and y-axis of every bar graph are perpendicular. Is he correct?",
  visual:"linePair",
  options:["Yes, always perpendicular","No, they are parallel","No, they are neither","Only sometimes"],
  correctAnswer:"Yes, always perpendicular",
  hint1:"What angle do the two axes always form?",
  hint2:"They always meet at a right angle — that is the rule for graphs.",
  explanation:"Oliver is correct. The x-axis and y-axis always meet at exactly 90° — perpendicular. That is what makes graphs accurate."
},
// ── Q3: Picture Graph (10) ───────────────────────────────────
{
  id:"Q3_001", type:"picture_graph", world:0, difficulty:1,
  categories:["Apple","Mango","Grapes"],
  values:[6,8,4], scale:2, icon:"🍎",
  questionText:"Each 🍎 = 2 votes. How many votes did Mango get?",
  visual:"pictureGraph",
  options:[4,8,6,10], correctAnswer:8,
  hint1:"Count the 🍎 symbols in the Mango row.",
  hint2:"There are 4 symbols. 4 × 2 = ?",
  explanation:"4 symbols × 2 votes each = 8 votes for Mango."
},
{
  id:"Q3_002", type:"picture_graph", world:0, difficulty:1,
  categories:["Cat","Dog","Rabbit"],
  values:[4,10,6], scale:2, icon:"🐾",
  questionText:"Each 🐾 = 2 students. How many students chose Dog?",
  visual:"pictureGraph",
  options:[8,10,12,5], correctAnswer:10,
  hint1:"Count the 🐾 in the Dog row.",
  hint2:"5 symbols × 2 = ?",
  explanation:"5 × 2 = 10 students chose Dog."
},
{
  id:"Q3_003", type:"picture_graph", world:1, difficulty:1,
  categories:["Football","Tennis","Badminton"],
  values:[8,4,6], scale:2, icon:"⚽",
  questionText:"Each ⚽ = 2 students. How many chose Badminton?",
  visual:"pictureGraph",
  options:[4,6,8,3], correctAnswer:6,
  hint1:"Count the ⚽ in the Badminton row.",
  hint2:"3 symbols × 2 = ?",
  explanation:"3 × 2 = 6 students chose Badminton."
},
{
  id:"Q3_004", type:"picture_graph", world:2, difficulty:2,
  categories:["Mon","Tue","Wed","Thu"],
  values:[10,15,20,5], scale:5, icon:"☀️",
  questionText:"Each ☀️ = 5 hours. How many hours of sunshine on Wednesday?",
  visual:"pictureGraph",
  options:[15,20,25,4], correctAnswer:20,
  hint1:"Count ☀️ in the Wed row.",
  hint2:"4 symbols × 5 = ?",
  explanation:"4 × 5 = 20 hours of sunshine on Wednesday."
},
{
  id:"Q3_005", type:"picture_graph", world:2, difficulty:2,
  categories:["Mystery","Science","Art","History"],
  values:[10,20,15,5], scale:5, icon:"📚",
  questionText:"Each 📚 = 5 books. How many Science books were borrowed?",
  visual:"pictureGraph",
  options:[15,20,25,4], correctAnswer:20,
  hint1:"Count 📚 in the Science row.",
  hint2:"4 symbols × 5 = ?",
  explanation:"4 × 5 = 20 Science books."
},
{
  id:"Q3_006", type:"picture_graph", world:3, difficulty:2,
  categories:["Banana","Apple","Mango","Orange"],
  values:[15,20,10,25], scale:5, icon:"🍓",
  questionText:"Each 🍓 = 5 votes. How many votes did Orange get?",
  visual:"pictureGraph",
  options:[20,25,30,5], correctAnswer:25,
  hint1:"Count 🍓 in the Orange row.",
  hint2:"5 symbols × 5 = ?",
  explanation:"5 × 5 = 25 votes for Orange."
},
{
  id:"Q3_007", type:"picture_graph", world:4, difficulty:2,
  categories:["Pencil","Ruler","Eraser","Scissors"],
  values:[15,10,20,5], scale:5, icon:"✏️",
  questionText:"Each ✏️ = 5 items. How many Erasers are in the box?",
  visual:"pictureGraph",
  options:[15,20,25,4], correctAnswer:20,
  hint1:"Count ✏️ in the Eraser row.",
  hint2:"4 symbols × 5 = ?",
  explanation:"4 × 5 = 20 Erasers."
},
{
  id:"Q3_008", type:"picture_graph", world:6, difficulty:3,
  categories:["Drama","Music","Art","Science"],
  values:[30,50,40,20], scale:10, icon:"🌟",
  questionText:"Each 🌟 = 10 students. How many students joined Music CCA?",
  visual:"pictureGraph",
  options:[40,50,60,5], correctAnswer:50,
  hint1:"Count 🌟 in the Music row.",
  hint2:"5 symbols × 10 = ?",
  explanation:"5 × 10 = 50 students in Music."
},
{
  id:"Q3_009", type:"picture_graph", world:8, difficulty:3,
  categories:["Apple","Orange","Pear","Grapes"],
  values:[40,70,50,60], scale:10, icon:"🍇",
  questionText:"Each 🍇 = 10 votes. How many votes did Orange get?",
  visual:"pictureGraph",
  options:[60,70,80,7], correctAnswer:70,
  hint1:"Count 🍇 in the Orange row.",
  hint2:"7 symbols × 10 = ?",
  explanation:"7 × 10 = 70 votes for Orange."
},
{
  id:"Q3_010", type:"picture_graph", world:9, difficulty:3,
  categories:["Mon","Tue","Wed","Thu","Fri"],
  values:[30,60,40,80,50], scale:10, icon:"⭐",
  questionText:"Each ⭐ = 10 stars. How many reward stars were earned on Thursday?",
  visual:"pictureGraph",
  options:[70,80,90,8], correctAnswer:80,
  hint1:"Count ⭐ in the Thu row.",
  hint2:"8 symbols × 10 = ?",
  explanation:"8 × 10 = 80 stars on Thursday."
},
// ── Q4: Most/Least Comparison (10) ──────────────────────────
{
  id:"Q4_001", type:"compare_most_least", world:0, difficulty:1,
  categories:["Apple","Mango","Grapes","Orange"],
  values:[8,14,6,10], scale:2,
  questionText:"Which fruit got the FEWEST votes?",
  visual:"barGraph",
  options:["Apple","Mango","Grapes","Orange"], correctAnswer:"Grapes",
  hint1:"Look for the shortest bar in the graph.",
  hint2:"Grapes has only 6 votes — the shortest bar.",
  explanation:"Grapes got 6 votes — the lowest bar, so the fewest votes."
},
{
  id:"Q4_002", type:"compare_most_least", world:0, difficulty:1,
  categories:["Apple","Mango","Grapes","Orange"],
  values:[8,14,6,10], scale:2,
  questionText:"Which fruit got the MOST votes?",
  visual:"barGraph",
  options:["Apple","Mango","Grapes","Orange"], correctAnswer:"Mango",
  hint1:"Look for the tallest bar.",
  hint2:"Mango bar is the tallest at 14 votes.",
  explanation:"Mango got 14 votes — the tallest bar, so the most votes."
},
{
  id:"Q4_003", type:"compare_most_least", world:1, difficulty:1,
  categories:["Cat","Dog","Rabbit","Fish"],
  values:[10,16,4,12], scale:2,
  questionText:"Which pet did the FEWEST students choose?",
  visual:"barGraph",
  options:["Cat","Dog","Rabbit","Fish"], correctAnswer:"Rabbit",
  hint1:"Find the shortest bar.",
  hint2:"Rabbit only has 4 votes.",
  explanation:"Rabbit got only 4 votes — the shortest bar."
},
{
  id:"Q4_004", type:"compare_most_least", world:2, difficulty:2,
  categories:["Football","Swimming","Badminton","Basketball"],
  values:[30,20,25,15], scale:5,
  questionText:"Which sport had the MOST votes on Sports Day?",
  visual:"barGraph",
  options:["Football","Swimming","Badminton","Basketball"], correctAnswer:"Football",
  hint1:"Which bar is the tallest?",
  hint2:"Football bar reaches 30 — the highest.",
  explanation:"Football had 30 votes — the most popular sport."
},
{
  id:"Q4_005", type:"compare_most_least", world:2, difficulty:2,
  categories:["Football","Swimming","Badminton","Basketball"],
  values:[30,20,25,15], scale:5,
  questionText:"Which sport had the FEWEST votes?",
  visual:"barGraph",
  options:["Football","Swimming","Badminton","Basketball"], correctAnswer:"Basketball",
  hint1:"Find the shortest bar.",
  hint2:"Basketball only has 15 votes.",
  explanation:"Basketball got 15 votes — the fewest."
},
{
  id:"Q4_006", type:"compare_most_least", world:3, difficulty:2,
  categories:["Mon","Tue","Wed","Thu","Fri"],
  values:[20,35,25,40,30], scale:5,
  questionText:"On which day was there the MOST sunshine?",
  visual:"barGraph",
  options:["Monday","Tuesday","Wednesday","Thursday","Friday"], correctAnswer:"Thursday",
  hint1:"Find the tallest bar.",
  hint2:"Thursday bar reaches 40 — the highest.",
  explanation:"Thursday had 40 hours — the most sunshine."
},
{
  id:"Q4_007", type:"compare_most_least", world:5, difficulty:2,
  categories:["Mystery","Adventure","Science","Art"],
  values:[20,35,15,25], scale:5,
  questionText:"Which type of book was borrowed the LEAST?",
  visual:"barGraph",
  options:["Mystery","Adventure","Science","Art"], correctAnswer:"Science",
  hint1:"Look for the shortest bar.",
  hint2:"Science bar is only 15.",
  explanation:"Science books were borrowed the least — only 15."
},
{
  id:"Q4_008", type:"compare_most_least", world:6, difficulty:3,
  categories:["Burger","Pizza","Noodles","Rice"],
  values:[60,80,40,70], scale:10,
  questionText:"Which snack was chosen by the MOST students?",
  visual:"barGraph",
  options:["Burger","Pizza","Noodles","Rice"], correctAnswer:"Pizza",
  hint1:"Find the tallest bar.",
  hint2:"Pizza reaches 80 — the highest bar.",
  explanation:"Pizza was chosen by 80 students — the most popular snack."
},
{
  id:"Q4_009", type:"compare_most_least", world:8, difficulty:3,
  categories:["Drama","Music","Art","Science"],
  values:[50,90,70,60], scale:10,
  questionText:"Which CCA had the FEWEST sign-ups?",
  visual:"barGraph",
  options:["Drama","Music","Art","Science"], correctAnswer:"Drama",
  hint1:"Find the shortest bar.",
  hint2:"Drama bar is only 50.",
  explanation:"Drama had only 50 sign-ups — the fewest."
},
{
  id:"Q4_010", type:"compare_most_least", world:9, difficulty:3,
  categories:["Apple","Mango","Grapes","Orange","Pear"],
  values:[60,80,40,90,50], scale:10,
  questionText:"Which fruit had the fewest votes in the grand poll?",
  visual:"barGraph",
  options:["Apple","Mango","Grapes","Orange","Pear"], correctAnswer:"Grapes",
  hint1:"Find the shortest bar.",
  hint2:"Grapes bar is only 40.",
  explanation:"Grapes got only 40 votes — the fewest in the grand poll."
},
// ── Q5: Word Problems (10) ───────────────────────────────────
{
  id:"Q5_001", type:"word_problem", world:0, difficulty:1,
  questionText:"Emma collected 9 stickers on Monday and 6 stickers on Tuesday. How many stickers did she collect in total?",
  visual:"table", categories:["Monday","Tuesday"], values:[9,6], scale:1,
  options:[13,14,15,16], correctAnswer:15,
  hint1:"You need to add the two amounts together.",
  hint2:"9 + 6 = ?",
  explanation:"9 + 6 = 15 stickers in total."
},
{
  id:"Q5_002", type:"word_problem", world:0, difficulty:1,
  questionText:"Oliver sold 15 tickets on Monday and 9 on Tuesday. How many tickets did he sell in total?",
  visual:"table", categories:["Monday","Tuesday"], values:[15,9], scale:1,
  options:[22,23,24,25], correctAnswer:24,
  hint1:"Add 15 and 9.",
  hint2:"15 + 9 = ?",
  explanation:"15 + 9 = 24 tickets in total."
},
{
  id:"Q5_003", type:"word_problem", world:1, difficulty:1,
  questionText:"Sophie scored 12 goals this week and 8 last week. How many goals in total?",
  visual:"table", categories:["This week","Last week"], values:[12,8], scale:1,
  options:[18,19,20,21], correctAnswer:20,
  hint1:"Add both amounts.",
  hint2:"12 + 8 = ?",
  explanation:"12 + 8 = 20 goals in total."
},
{
  id:"Q5_004", type:"word_problem", world:2, difficulty:2,
  questionText:"James recycled 24 bottles in Week 1 and 18 in Week 2. How many bottles did he recycle altogether?",
  visual:"table", categories:["Week 1","Week 2"], values:[24,18], scale:1,
  options:[40,41,42,43], correctAnswer:42,
  hint1:"Add 24 and 18.",
  hint2:"24 + 18 = ?",
  explanation:"24 + 18 = 42 bottles altogether."
},
{
  id:"Q5_005", type:"word_problem", world:3, difficulty:2,
  questionText:"Liam earned 35 points on Monday and 27 on Tuesday. How many points did he earn in all?",
  visual:"table", categories:["Monday","Tuesday"], values:[35,27], scale:1,
  options:[60,61,62,63], correctAnswer:62,
  hint1:"Add 35 and 27.",
  hint2:"35 + 27 = ?",
  explanation:"35 + 27 = 62 points in all."
},
{
  id:"Q5_006", type:"word_problem", world:4, difficulty:2,
  questionText:"Ava planted 18 seedlings on Saturday and 24 on Sunday. How many seedlings did she plant in total?",
  visual:"table", categories:["Saturday","Sunday"], values:[18,24], scale:1,
  options:[40,41,42,43], correctAnswer:42,
  hint1:"Add 18 and 24.",
  hint2:"18 + 24 = ?",
  explanation:"18 + 24 = 42 seedlings in total."
},
{
  id:"Q5_007", type:"word_problem", world:5, difficulty:2,
  questionText:"Noah borrowed 15 books in March and 22 books in April. How many books did he borrow altogether?",
  visual:"table", categories:["March","April"], values:[15,22], scale:1,
  options:[35,36,37,38], correctAnswer:37,
  hint1:"Add 15 and 22.",
  hint2:"15 + 22 = ?",
  explanation:"15 + 22 = 37 books altogether."
},
{
  id:"Q5_008", type:"word_problem", world:6, difficulty:3,
  questionText:"Isabella counted 46 votes for Pizza and 34 votes for Burgers. How many votes were there in total?",
  visual:"table", categories:["Pizza","Burgers"], values:[46,34], scale:1,
  options:[78,79,80,81], correctAnswer:80,
  hint1:"Add 46 and 34.",
  hint2:"46 + 34 = ?",
  explanation:"46 + 34 = 80 votes in total."
},
{
  id:"Q5_009", type:"word_problem", world:8, difficulty:3,
  questionText:"William collected 57 cans on Day 1 and 43 cans on Day 2 for the recycling drive. How many cans in all?",
  visual:"table", categories:["Day 1","Day 2"], values:[57,43], scale:1,
  options:[98,99,100,101], correctAnswer:100,
  hint1:"Add 57 and 43.",
  hint2:"57 + 43 = ?",
  explanation:"57 + 43 = 100 cans in all."
},
{
  id:"Q5_010", type:"word_problem", world:9, difficulty:3,
  questionText:"Charlotte earned 63 XP on Monday and 37 XP on Tuesday in the reading challenge. What is her total XP?",
  visual:"table", categories:["Monday","Tuesday"], values:[63,37], scale:1,
  options:[98,99,100,101], correctAnswer:100,
  hint1:"Add 63 and 37.",
  hint2:"63 + 37 = ?",
  explanation:"63 + 37 = 100 XP in total. A perfect century!"
},
// ── Q6: True/False (10) ──────────────────────────────────────
{
  id:"Q6_001", type:"true_false", world:0, difficulty:1,
  questionText:"True or False: The bars in a bar graph are parallel to each other.",
  visual:"barGraph", categories:["A","B","C","D"], values:[4,6,8,5], scale:1,
  options:["True","False"], correctAnswer:"True",
  hint1:"Think: do bars lean into each other or stand straight?",
  hint2:"All bars stand straight up — same direction, never crossing.",
  explanation:"TRUE. Bars in a bar graph always stand parallel — they all go straight up in the same direction and never cross."
},
{
  id:"Q6_002", type:"true_false", world:0, difficulty:1,
  questionText:"True or False: The horizontal axis and vertical axis of a graph are parallel.",
  visual:"axisDiagram",
  options:["True","False"], correctAnswer:"False",
  hint1:"Do the two axes ever cross each other?",
  hint2:"They meet at the origin — at a right angle!",
  explanation:"FALSE. The axes are PERPENDICULAR, not parallel. They cross at a right angle at the origin."
},
{
  id:"Q6_003", type:"true_false", world:1, difficulty:1,
  questionText:"True or False: Two gridlines on the value axis of a bar graph are parallel.",
  visual:"axisDiagram",
  options:["True","False"], correctAnswer:"True",
  hint1:"Do gridlines ever get closer or farther apart?",
  hint2:"Gridlines are always evenly spaced and never cross.",
  explanation:"TRUE. Gridlines on the value axis are parallel — they stay the same distance apart and never cross."
},
{
  id:"Q6_004", type:"true_false", world:1, difficulty:1,
  questionText:"True or False: A bar and the horizontal axis (baseline) of a graph are perpendicular.",
  visual:"barGraph", categories:["A","B","C"], values:[3,5,4], scale:1,
  options:["True","False"], correctAnswer:"True",
  hint1:"Does the bar stand straight up from the baseline?",
  hint2:"Straight up from a horizontal line makes a right angle.",
  explanation:"TRUE. Each bar rises perpendicularly from the horizontal axis — a right angle (90°)."
},
{
  id:"Q6_005", type:"true_false", world:2, difficulty:2,
  questionText:"True or False: Railway tracks are an example of parallel lines.",
  visual:"linePair",
  options:["True","False"], correctAnswer:"True",
  hint1:"Do railway tracks ever meet?",
  hint2:"They stay the same distance apart all the way along.",
  explanation:"TRUE. Railway tracks are a classic example of parallel lines — same distance apart, never meeting."
},
{
  id:"Q6_006", type:"true_false", world:3, difficulty:2,
  questionText:"True or False: The rungs of a ladder and the rails of the ladder are perpendicular.",
  visual:"linePair",
  options:["True","False"], correctAnswer:"True",
  hint1:"What angle does a rung form with the rail?",
  hint2:"They form a right angle — 90°.",
  explanation:"TRUE. Ladder rungs cross the rails at right angles (90°) — they are perpendicular."
},
{
  id:"Q6_007", type:"true_false", world:4, difficulty:2,
  questionText:"True or False: You can make a correct bar graph with bars that lean at different angles.",
  visual:"barGraph", categories:["A","B","C"], values:[3,5,4], scale:1,
  options:["True","False"], correctAnswer:"False",
  hint1:"If bars lean, are they parallel?",
  hint2:"Leaning bars are NOT parallel — the graph would be wrong!",
  explanation:"FALSE. If bars lean, they are not parallel to each other. The graph would be incorrect and unfair to read."
},
{
  id:"Q6_008", type:"true_false", world:5, difficulty:2,
  questionText:"True or False: Perpendicular lines always meet at exactly 90 degrees.",
  visual:"linePair",
  options:["True","False"], correctAnswer:"True",
  hint1:"What is the definition of perpendicular?",
  hint2:"Perpendicular = right angle = 90°.",
  explanation:"TRUE. Perpendicular lines always and only meet at exactly 90° — that is the definition."
},
{
  id:"Q6_009", type:"true_false", world:7, difficulty:3,
  questionText:"True or False: Parallel lines will eventually cross if you extend them far enough.",
  visual:"linePair",
  options:["True","False"], correctAnswer:"False",
  hint1:"What is the rule for parallel lines?",
  hint2:"Parallel lines NEVER cross, no matter how far you extend them.",
  explanation:"FALSE. By definition, parallel lines NEVER cross — not even if extended forever."
},
{
  id:"Q6_010", type:"true_false", world:9, difficulty:3,
  questionText:"True or False: In a correct picture graph, each row of symbols represents data that is proportional to the scale key.",
  visual:"pictureGraph", categories:["A","B","C"], values:[10,20,15], scale:5, icon:"⭐",
  options:["True","False"], correctAnswer:"True",
  hint1:"How do we read a picture graph?",
  hint2:"Number of symbols × scale value = data value.",
  explanation:"TRUE. In a picture graph, each symbol represents a fixed value (the key). You multiply symbols by the key to get the data value."
},
// ── Q7: Match Graph to Description (10) ─────────────────────
{
  id:"Q7_001", type:"match_graph", world:0, difficulty:1,
  questionText:"Which description matches: 'Mango > Apple, Apple > Grapes'?",
  visual:"barGraph", categories:["Apple","Mango","Grapes"], values:[8,14,6], scale:2,
  options:["Mango: 14, Apple: 8, Grapes: 6","Apple: 14, Mango: 8, Grapes: 6","Grapes: 14, Apple: 8, Mango: 6","All equal"],
  correctAnswer:"Mango: 14, Apple: 8, Grapes: 6",
  hint1:"Mango must be the tallest bar.",
  hint2:"Apple must be taller than Grapes.",
  explanation:"Mango = 14 (tallest), Apple = 8 (middle), Grapes = 6 (shortest). Mango > Apple > Grapes. ✓"
},
{
  id:"Q7_002", type:"match_graph", world:1, difficulty:1,
  questionText:"Which description matches: 'Dog has twice as many votes as Rabbit'?",
  visual:"barGraph", categories:["Rabbit","Dog","Cat"], values:[4,8,6], scale:2,
  options:["Rabbit: 4, Dog: 8","Rabbit: 6, Dog: 8","Rabbit: 4, Dog: 6","Rabbit: 8, Dog: 4"],
  correctAnswer:"Rabbit: 4, Dog: 8",
  hint1:"If Dog = twice Rabbit, then Dog ÷ 2 = Rabbit.",
  hint2:"8 ÷ 2 = 4. So Dog = 8, Rabbit = 4.",
  explanation:"Dog (8) is exactly twice Rabbit (4). 8 ÷ 2 = 4. ✓"
},
{
  id:"Q7_003", type:"match_graph", world:1, difficulty:1,
  questionText:"Emma's graph shows: 'Books = Pencils, Pencils > Erasers'. Which matches?",
  visual:"table", categories:["Books","Pencils","Erasers"], values:[10,10,6], scale:2,
  options:["Books:10, Pencils:10, Erasers:6","Books:6, Pencils:10, Erasers:10","Books:10, Pencils:6, Erasers:6","Books:10, Pencils:12, Erasers:6"],
  correctAnswer:"Books:10, Pencils:10, Erasers:6",
  hint1:"Books = Pencils means they must have the same value.",
  hint2:"Pencils > Erasers means Pencils bar is taller than Erasers.",
  explanation:"Books = Pencils = 10. Pencils (10) > Erasers (6). ✓"
},
{
  id:"Q7_004", type:"match_graph", world:2, difficulty:2,
  questionText:"Which graph shows: Football 30, Swimming 20, Badminton 25, Basketball 15 (scale = 5)?",
  visual:"barGraph", categories:["Football","Swimming","Badminton","Basketball"], values:[30,20,25,15], scale:5,
  options:["Football:30, Swimming:20, Badminton:25, Basketball:15","Football:20, Swimming:30, Badminton:15, Basketball:25","Football:25, Swimming:15, Badminton:30, Basketball:20","Football:15, Swimming:25, Badminton:20, Basketball:30"],
  correctAnswer:"Football:30, Swimming:20, Badminton:25, Basketball:15",
  hint1:"Check each value against the scale.",
  hint2:"Football bar = 6 squares × 5 = 30.",
  explanation:"Football:30, Swimming:20, Badminton:25, Basketball:15. Each matches 6,4,5,3 squares × scale 5."
},
{
  id:"Q7_005", type:"match_graph", world:3, difficulty:2,
  questionText:"Oliver says: 'Thursday has the most sunshine, Monday the least'. Which graph matches?",
  visual:"barGraph", categories:["Mon","Tue","Wed","Thu","Fri"], values:[10,25,20,35,15], scale:5,
  options:["Thu tallest, Mon shortest","Mon tallest, Thu shortest","All bars equal","Wed tallest, Fri shortest"],
  correctAnswer:"Thu tallest, Mon shortest",
  hint1:"Thursday bar must be the tallest.",
  hint2:"Monday bar must be the shortest.",
  explanation:"Thursday = 35 (tallest), Monday = 10 (shortest). Oliver is correct. ✓"
},
{
  id:"Q7_006", type:"match_graph", world:4, difficulty:2,
  questionText:"Which description fits: 'Toys: Cars = 10, Dolls = 15, Blocks = 5, Trains = 20'?",
  visual:"barGraph", categories:["Cars","Dolls","Blocks","Trains"], values:[10,15,5,20], scale:5,
  options:["Trains tallest, Blocks shortest","Cars tallest, Dolls shortest","Dolls tallest, Trains shortest","All equal"],
  correctAnswer:"Trains tallest, Blocks shortest",
  hint1:"Which has the biggest value?",
  hint2:"Trains = 20 (biggest). Blocks = 5 (smallest).",
  explanation:"Trains (20) is tallest, Blocks (5) is shortest. ✓"
},
{
  id:"Q7_007", type:"match_graph", world:5, difficulty:2,
  questionText:"Library: 'Science borrowed 3 times as many as Art'. Which matches?",
  visual:"table", categories:["Science","Art"], values:[15,5], scale:5,
  options:["Science:15, Art:5","Science:5, Art:15","Science:10, Art:5","Science:15, Art:10"],
  correctAnswer:"Science:15, Art:5",
  hint1:"3 times means Science = 3 × Art.",
  hint2:"3 × 5 = 15.",
  explanation:"Science (15) = 3 × Art (5). ✓"
},
{
  id:"Q7_008", type:"match_graph", world:7, difficulty:3,
  questionText:"Which graph correctly shows perpendicular axes AND parallel bars?",
  visual:"axisDiagram",
  options:["Axes at 90°, bars upright","Axes at 45°, bars upright","Axes at 90°, bars leaning","Axes at 60°, bars leaning"],
  correctAnswer:"Axes at 90°, bars upright",
  hint1:"A correct bar graph always has perpendicular axes.",
  hint2:"And bars that are parallel (upright, not leaning).",
  explanation:"A correct bar graph has axes meeting at 90° (perpendicular) and bars standing straight (parallel). ✓"
},
{
  id:"Q7_009", type:"match_graph", world:8, difficulty:3,
  questionText:"CCA sign-ups — 'Music has 3 times the sign-ups of Drama'. Which matches if Drama = 30?",
  visual:"barGraph", categories:["Drama","Music"], values:[30,90], scale:10,
  options:["Drama:30, Music:90","Drama:30, Music:60","Drama:90, Music:30","Drama:30, Music:30"],
  correctAnswer:"Drama:30, Music:90",
  hint1:"3 times Drama = Music.",
  hint2:"3 × 30 = 90.",
  explanation:"Music (90) = 3 × Drama (30). ✓"
},
{
  id:"Q7_010", type:"match_graph", world:9, difficulty:3,
  questionText:"Grand Gallery: 'Orange > Apple > Grapes, Orange = 90, Apple = 60, Grapes = 40'. Which correctly matches a bar graph with scale 10?",
  visual:"barGraph", categories:["Grapes","Apple","Orange"], values:[40,60,90], scale:10,
  options:["Orange tallest (9 sq), Apple middle (6 sq), Grapes shortest (4 sq)","Grapes tallest, Orange shortest","Apple tallest, Orange shortest","All same height"],
  correctAnswer:"Orange tallest (9 sq), Apple middle (6 sq), Grapes shortest (4 sq)",
  hint1:"Scale = 10. Divide each value by 10 to get number of squares.",
  hint2:"90÷10=9, 60÷10=6, 40÷10=4.",
  explanation:"Orange = 9 sq, Apple = 6 sq, Grapes = 4 sq. Order: Orange > Apple > Grapes. ✓"
},
// ── Q8: Total from Table (10) ────────────────────────────────
{
  id:"Q8_001", type:"total_from_table", world:0, difficulty:1,
  questionText:"Add up all the fruit votes in the table. What is the total?",
  visual:"table", categories:["Apple","Mango","Grapes","Orange"], values:[8,14,6,10], scale:2,
  options:[36,38,40,42], correctAnswer:38,
  hint1:"Add all four values: 8 + 14 + 6 + 10.",
  hint2:"8 + 14 = 22. 22 + 6 = 28. 28 + 10 = ?",
  explanation:"8 + 14 + 6 + 10 = 38 total votes."
},
{
  id:"Q8_002", type:"total_from_table", world:0, difficulty:1,
  questionText:"How many students voted for pets in total?",
  visual:"table", categories:["Cat","Dog","Rabbit","Fish"], values:[10,16,4,12], scale:2,
  options:[40,42,44,46], correctAnswer:42,
  hint1:"Add: 10 + 16 + 4 + 12.",
  hint2:"10 + 16 = 26. 26 + 4 = 30. 30 + 12 = ?",
  explanation:"10 + 16 + 4 + 12 = 42 students voted."
},
{
  id:"Q8_003", type:"total_from_table", world:1, difficulty:1,
  questionText:"How many students voted for sports in total?",
  visual:"table", categories:["Football","Swimming","Badminton","Basketball"], values:[14,10,8,12], scale:2,
  options:[42,44,46,48], correctAnswer:44,
  hint1:"Add all four: 14 + 10 + 8 + 12.",
  hint2:"14 + 10 = 24. 24 + 8 = 32. 32 + 12 = ?",
  explanation:"14 + 10 + 8 + 12 = 44 students total."
},
{
  id:"Q8_004", type:"total_from_table", world:2, difficulty:2,
  questionText:"What is the total sunshine hours for the whole week?",
  visual:"table", categories:["Mon","Tue","Wed","Thu","Fri"], values:[20,35,25,40,30], scale:5,
  options:[145,150,155,160], correctAnswer:150,
  hint1:"Add: 20 + 35 + 25 + 40 + 30.",
  hint2:"20+35=55. 55+25=80. 80+40=120. 120+30=?",
  explanation:"20 + 35 + 25 + 40 + 30 = 150 total hours."
},
{
  id:"Q8_005", type:"total_from_table", world:3, difficulty:2,
  questionText:"How many books were borrowed in total from the library?",
  visual:"table", categories:["Mystery","Adventure","Science","Art"], values:[20,35,15,25], scale:5,
  options:[90,95,100,105], correctAnswer:95,
  hint1:"Add: 20 + 35 + 15 + 25.",
  hint2:"20+35=55. 55+15=70. 70+25=?",
  explanation:"20 + 35 + 15 + 25 = 95 books borrowed."
},
{
  id:"Q8_006", type:"total_from_table", world:4, difficulty:2,
  questionText:"How many toys are in the toy box altogether?",
  visual:"table", categories:["Cars","Dolls","Blocks","Trains"], values:[10,15,5,20], scale:5,
  options:[45,50,55,60], correctAnswer:50,
  hint1:"Add: 10 + 15 + 5 + 20.",
  hint2:"10+15=25. 25+5=30. 30+20=?",
  explanation:"10 + 15 + 5 + 20 = 50 toys altogether."
},
{
  id:"Q8_007", type:"total_from_table", world:6, difficulty:3,
  questionText:"How many students voted in the snack survey in total?",
  visual:"table", categories:["Burger","Pizza","Noodles","Rice"], values:[60,80,40,70], scale:10,
  options:[240,250,260,270], correctAnswer:250,
  hint1:"Add: 60 + 80 + 40 + 70.",
  hint2:"60+80=140. 140+40=180. 180+70=?",
  explanation:"60 + 80 + 40 + 70 = 250 students voted."
},
{
  id:"Q8_008", type:"total_from_table", world:7, difficulty:3,
  questionText:"How many CCA sign-ups were there in total?",
  visual:"table", categories:["Drama","Music","Art","Science"], values:[50,90,70,60], scale:10,
  options:[260,270,280,290], correctAnswer:270,
  hint1:"Add: 50 + 90 + 70 + 60.",
  hint2:"50+90=140. 140+70=210. 210+60=?",
  explanation:"50 + 90 + 70 + 60 = 270 total sign-ups."
},
{
  id:"Q8_009", type:"total_from_table", world:8, difficulty:3,
  questionText:"How many stars were earned across the whole week?",
  visual:"table", categories:["Mon","Tue","Wed","Thu","Fri"], values:[40,70,50,90,60], scale:10,
  options:[300,310,320,330], correctAnswer:310,
  hint1:"Add all five values.",
  hint2:"40+70=110. 110+50=160. 160+90=250. 250+60=?",
  explanation:"40 + 70 + 50 + 90 + 60 = 310 stars total."
},
{
  id:"Q8_010", type:"total_from_table", world:9, difficulty:3,
  questionText:"Grand Gallery — what is the total of all fruit votes combined?",
  visual:"table", categories:["Apple","Mango","Grapes","Orange","Pear"], values:[60,80,40,90,50], scale:10,
  options:[310,320,330,340], correctAnswer:320,
  hint1:"Add all five values.",
  hint2:"60+80=140. 140+40=180. 180+90=270. 270+50=?",
  explanation:"60 + 80 + 40 + 90 + 50 = 320 total votes."
},
// ── Q9: Difference Between Categories (10) ──────────────────
{
  id:"Q9_001", type:"difference", world:0, difficulty:1,
  categories:["Apple","Mango","Grapes","Orange"],
  values:[8,14,6,10], scale:2,
  questionText:"How many MORE votes did Mango get than Grapes?",
  visual:"barGraph",
  options:[6,8,10,4], correctAnswer:8,
  hint1:"Subtract the smaller from the larger.",
  hint2:"14 − 6 = ?",
  explanation:"14 − 6 = 8. Mango got 8 more votes than Grapes."
},
{
  id:"Q9_002", type:"difference", world:1, difficulty:1,
  categories:["Cat","Dog","Rabbit","Fish"],
  values:[10,16,4,12], scale:2,
  questionText:"How many more students chose Dog than Rabbit?",
  visual:"barGraph",
  options:[10,12,14,6], correctAnswer:12,
  hint1:"Find Dog and Rabbit values. Subtract.",
  hint2:"16 − 4 = ?",
  explanation:"16 − 4 = 12 more students chose Dog."
},
{
  id:"Q9_003", type:"difference", world:1, difficulty:1,
  categories:["Football","Swimming","Badminton","Basketball"],
  values:[14,10,8,12], scale:2,
  questionText:"How many more students chose Football than Badminton?",
  visual:"table",
  options:[4,6,8,10], correctAnswer:6,
  hint1:"Find Football (14) and Badminton (8). Subtract.",
  hint2:"14 − 8 = ?",
  explanation:"14 − 8 = 6 more students chose Football."
},
{
  id:"Q9_004", type:"difference", world:2, difficulty:2,
  categories:["Football","Swimming","Badminton","Basketball"],
  values:[30,20,25,15], scale:5,
  questionText:"How many more students chose Football than Swimming?",
  visual:"barGraph",
  options:[6,8,10,12], correctAnswer:10,
  hint1:"Football = 30. Swimming = 20. Subtract.",
  hint2:"30 − 20 = ?",
  explanation:"30 − 20 = 10 more students chose Football."
},
{
  id:"Q9_005", type:"difference", world:3, difficulty:2,
  categories:["Mon","Tue","Wed","Thu","Fri"],
  values:[20,35,25,40,30], scale:5,
  questionText:"How many more hours of sunshine were there on Thursday than Monday?",
  visual:"barGraph",
  options:[18,20,22,24], correctAnswer:20,
  hint1:"Thursday = 40. Monday = 20. Subtract.",
  hint2:"40 − 20 = ?",
  explanation:"40 − 20 = 20 more hours on Thursday than Monday."
},
{
  id:"Q9_006", type:"difference", world:4, difficulty:2,
  categories:["Mystery","Adventure","Science","Art"],
  values:[20,35,15,25], scale:5,
  questionText:"How many more Adventure books were borrowed than Science books?",
  visual:"table",
  options:[18,20,22,24], correctAnswer:20,
  hint1:"Adventure = 35. Science = 15. Subtract.",
  hint2:"35 − 15 = ?",
  explanation:"35 − 15 = 20 more Adventure books."
},
{
  id:"Q9_007", type:"difference", world:5, difficulty:2,
  categories:["Cars","Dolls","Blocks","Trains"],
  values:[10,15,5,20], scale:5,
  questionText:"How many more Trains are in the box than Blocks?",
  visual:"table",
  options:[12,14,15,16], correctAnswer:15,
  hint1:"Trains = 20. Blocks = 5. Subtract.",
  hint2:"20 − 5 = ?",
  explanation:"20 − 5 = 15 more Trains than Blocks."
},
{
  id:"Q9_008", type:"difference", world:6, difficulty:3,
  categories:["Burger","Pizza","Noodles","Rice"],
  values:[60,80,40,70], scale:10,
  questionText:"How many more students chose Pizza than Noodles?",
  visual:"barGraph",
  options:[30,40,50,60], correctAnswer:40,
  hint1:"Pizza = 80. Noodles = 40. Subtract.",
  hint2:"80 − 40 = ?",
  explanation:"80 − 40 = 40 more students chose Pizza."
},
{
  id:"Q9_009", type:"difference", world:8, difficulty:3,
  categories:["Drama","Music","Art","Science"],
  values:[50,90,70,60], scale:10,
  questionText:"How many more students signed up for Music than Drama?",
  visual:"barGraph",
  options:[30,40,50,60], correctAnswer:40,
  hint1:"Music = 90. Drama = 50. Subtract.",
  hint2:"90 − 50 = ?",
  explanation:"90 − 50 = 40 more students chose Music."
},
{
  id:"Q9_010", type:"difference", world:9, difficulty:3,
  categories:["Apple","Mango","Grapes","Orange","Pear"],
  values:[60,80,40,90,50], scale:10,
  questionText:"How many more votes did Orange get than Grapes in the Grand Gallery?",
  visual:"barGraph",
  options:[40,50,60,70], correctAnswer:50,
  hint1:"Orange = 90. Grapes = 40. Subtract.",
  hint2:"90 − 40 = ?",
  explanation:"90 − 40 = 50 more votes for Orange than Grapes."
},
// ── Q10: Axis Check (10) ─────────────────────────────────────
{
  id:"Q10_001", type:"axis_check", world:0, difficulty:1,
  questionText:"Which picture shows correctly drawn PERPENDICULAR axes for a bar graph?",
  visual:"axisDiagram",
  options:["Axes at 90° with right-angle marker","Axes at 45° leaning","Only one axis","Two parallel axes"],
  correctAnswer:"Axes at 90° with right-angle marker",
  hint1:"Look for the small square corner marker ⌐.",
  hint2:"Perpendicular axes form a perfect right angle.",
  explanation:"Correct perpendicular axes meet at exactly 90° — shown by the square right-angle marker ⌐."
},
{
  id:"Q10_002", type:"axis_check", world:0, difficulty:1,
  questionText:"Emma drew her bar graph axes at a 45-degree angle. Is this correct?",
  visual:"axisDiagram",
  options:["No — axes must be perpendicular (90°)","Yes — any angle is fine","Yes — 45° is better","No — axes should be parallel"],
  correctAnswer:"No — axes must be perpendicular (90°)",
  hint1:"What angle must graph axes form?",
  hint2:"Axes must meet at a right angle (90°).",
  explanation:"Emma's axes are wrong. Graph axes must always be perpendicular — meeting at exactly 90°."
},
{
  id:"Q10_003", type:"axis_check", world:1, difficulty:1,
  questionText:"Which is true about the value axis (y-axis) of a correctly drawn bar graph?",
  visual:"axisDiagram",
  options:["It is perpendicular to the category axis","It is parallel to the category axis","It leans slightly","It goes diagonally"],
  correctAnswer:"It is perpendicular to the category axis",
  hint1:"What is the relationship between the x and y axes?",
  hint2:"They meet at a right angle — 90°.",
  explanation:"The y-axis (value axis) is always perpendicular to the x-axis (category axis) — they meet at 90°."
},
{
  id:"Q10_004", type:"axis_check", world:2, difficulty:2,
  questionText:"Oliver's graph has gridlines at 0, 5, 12, 20, 25. Is this a correct scale?",
  visual:"axisDiagram",
  options:["No — gridlines must be evenly spaced","Yes — any spacing works","Yes — as long as there are 5 lines","No — there should only be 3 lines"],
  correctAnswer:"No — gridlines must be evenly spaced",
  hint1:"What rule do parallel gridlines follow?",
  hint2:"Gridlines must be evenly spaced — like the rule for parallel lines.",
  explanation:"0, 5, 12, 20, 25 are NOT evenly spaced. Correct gridlines must be evenly spaced (e.g. 0, 5, 10, 15, 20, 25)."
},
{
  id:"Q10_005", type:"axis_check", world:3, difficulty:2,
  questionText:"Which axis diagram shows bars that are parallel to each other?",
  visual:"barGraph", categories:["A","B","C","D"], values:[4,6,8,5], scale:1,
  options:["All bars straight and upright","Bars leaning left","Bars leaning right","Bars at different angles"],
  correctAnswer:"All bars straight and upright",
  hint1:"Parallel bars must all go in the same direction.",
  hint2:"Upright bars all point straight up — they are parallel.",
  explanation:"Parallel bars are all perfectly upright (vertical) — they all go in the same direction and never cross."
},
{
  id:"Q10_006", type:"axis_check", world:4, difficulty:2,
  questionText:"Sophie's bar graph has the horizontal axis on top and vertical axis on the side. The corner shows a right angle. Is this perpendicular?",
  visual:"axisDiagram",
  options:["Yes — any right-angle corner is perpendicular","No — only if horizontal is at bottom","No — only vertical on right","Yes — only if both axes are the same length"],
  correctAnswer:"Yes — any right-angle corner is perpendicular",
  hint1:"What does perpendicular mean?",
  hint2:"Any two lines meeting at 90° are perpendicular — regardless of position.",
  explanation:"Yes! As long as the corner is exactly 90°, the axes are perpendicular — position doesn't matter."
},
{
  id:"Q10_007", type:"axis_check", world:5, difficulty:2,
  questionText:"Which shows correctly PARALLEL gridlines for a bar graph?",
  visual:"axisDiagram",
  options:["Evenly spaced horizontal lines","Lines getting farther apart","Lines getting closer together","Diagonal lines"],
  correctAnswer:"Evenly spaced horizontal lines",
  hint1:"Parallel lines are always the same distance apart.",
  hint2:"Gridlines must be horizontal AND evenly spaced.",
  explanation:"Correct gridlines are evenly spaced horizontal lines — all parallel to the baseline."
},
{
  id:"Q10_008", type:"axis_check", world:7, difficulty:3,
  questionText:"A graph has axes meeting at 88 degrees instead of 90 degrees. What is the problem?",
  visual:"axisDiagram",
  options:["The axes are not perpendicular — the graph will be inaccurate","88° is close enough — no problem","The bars will be wrong colour","The scale must be fixed"],
  correctAnswer:"The axes are not perpendicular — the graph will be inaccurate",
  hint1:"What exact angle is needed for perpendicular?",
  hint2:"Perpendicular = exactly 90°. 88° is not a right angle.",
  explanation:"88° is not a right angle. The axes must be exactly perpendicular (90°) or the graph scale is distorted and inaccurate."
},
{
  id:"Q10_009", type:"axis_check", world:8, difficulty:3,
  questionText:"Lucas draws a bar graph where the category axis is vertical and the value axis is horizontal. Are they still perpendicular?",
  visual:"axisDiagram",
  options:["Yes — they still meet at 90°","No — category must always be horizontal","No — only bar graphs on paper count","Yes — but only if bars are vertical"],
  correctAnswer:"Yes — they still meet at 90°",
  hint1:"Does the orientation change whether they form 90°?",
  hint2:"Perpendicular just means 90° — left-right vs up-down does not matter.",
  explanation:"Yes! Even if swapped, if the two axes meet at exactly 90°, they are still perpendicular."
},
{
  id:"Q10_010", type:"axis_check", world:9, difficulty:3,
  questionText:"In a correctly drawn bar graph with scale = 10, which set of gridline labels shows evenly spaced PARALLEL gridlines?",
  visual:"axisDiagram",
  options:["0, 10, 20, 30, 40, 50","0, 5, 15, 30, 50","0, 10, 25, 40","0, 10, 20, 35, 50"],
  correctAnswer:"0, 10, 20, 30, 40, 50",
  hint1:"Evenly spaced means the difference between each label is always the same.",
  hint2:"10-0=10, 20-10=10, 30-20=10 — all equal. That is evenly spaced.",
  explanation:"0, 10, 20, 30, 40, 50 — each step is exactly 10. These are evenly spaced (parallel) gridlines. ✓"
}
]; // end questionBank

export default questionBank;
