// Station A — Line Spotter scenes
// Each scene has an SVG type + 3 line pairs to classify

export const lineSpotterScenes = [
  {
    id: "scene_window",
    title: "HDB Window Grille",
    emoji: "🏠",
    description: "Look at the lines in this window grille.",
    pairs: [
      { id: "wp1", label: "Top edge & side edge", answer: "perpendicular", hint: "They meet at a corner — that's a right angle!" },
      { id: "wp2", label: "Two horizontal bars", answer: "parallel", hint: "They go across side by side and never meet!" },
      { id: "wp3", label: "Diagonal crack & vertical bar", answer: "neither", hint: "They would cross at a slanted angle — not a right angle." }
    ]
  },
  {
    id: "scene_zebra",
    title: "Zebra Crossing",
    emoji: "🦓",
    description: "Look at the lines on this zebra crossing.",
    pairs: [
      { id: "zp1", label: "Two white stripes side by side", answer: "parallel", hint: "Stripes always stay the same distance apart!" },
      { id: "zp2", label: "White stripe & road kerb", answer: "perpendicular", hint: "They meet at a right angle — like a T-junction!" },
      { id: "zp3", label: "Two diagonal footsteps", answer: "neither", hint: "Diagonal lines crossing are neither parallel nor perpendicular." }
    ]
  },
  {
    id: "scene_ladder",
    title: "Ladder Rungs",
    emoji: "🪜",
    description: "Look at the lines on this ladder.",
    pairs: [
      { id: "lp1", label: "Left side & right side rails", answer: "parallel", hint: "Rails stay the same distance apart all the way up!" },
      { id: "lp2", label: "A rung & the left rail", answer: "perpendicular", hint: "Rungs cross the rail at a perfect right angle — ⌐" },
      { id: "lp3", label: "A rung & a diagonal crack", answer: "neither", hint: "That angle is not 90° — so neither parallel nor perpendicular." }
    ]
  },
  {
    id: "scene_bookshelf",
    title: "Bookshelf",
    emoji: "📚",
    description: "Look at the lines on this bookshelf.",
    pairs: [
      { id: "bp1", label: "Two shelves", answer: "parallel", hint: "Shelves go across at the same height — always parallel!" },
      { id: "bp2", label: "A shelf & the side panel", answer: "perpendicular", hint: "Shelf meets the panel at a right angle!" },
      { id: "bp3", label: "A leaning book & the shelf", answer: "neither", hint: "The book leans — it's not 90° and not parallel to the shelf." }
    ]
  },
  {
    id: "scene_graph",
    title: "Bar Graph Axes",
    emoji: "📊",
    description: "Look at the lines on this bar graph.",
    pairs: [
      { id: "gp1", label: "Horizontal axis & vertical axis", answer: "perpendicular", hint: "All graph axes meet at a right angle — that's why graphs work!" },
      { id: "gp2", label: "Two gridlines on the value axis", answer: "parallel", hint: "Gridlines are always evenly spaced and parallel — they never cross!" },
      { id: "gp3", label: "A bar & the horizontal axis", answer: "perpendicular", hint: "Each bar rises straight up at a right angle from the base axis." }
    ]
  }
];
