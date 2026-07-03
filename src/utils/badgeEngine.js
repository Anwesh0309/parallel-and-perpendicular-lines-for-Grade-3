// Badge unlock logic
export const BADGES = [
  { id: 'line_detective',    emoji: '🏅', name: 'Line Detective',      desc: 'Complete Wonder + Story phases' },
  { id: 'graph_builder',     emoji: '🥈', name: 'Graph Builder',       desc: 'Complete all 4 Simulate stations' },
  { id: 'data_star',         emoji: '🥇', name: 'Data Star',           desc: 'Score 80%+ on Play phase overall' },
  { id: 'perfect_plot',      emoji: '💎', name: 'Perfect Plot',        desc: '100% on any 10-question world' },
  { id: 'streak_legend',     emoji: '🔥', name: 'Streak Legend',       desc: 'Achieve a streak of 10+' },
  { id: 'right_angle_ranger',emoji: '📐', name: 'Right-Angle Ranger',  desc: '10 perpendicular/parallel ID Qs correct in a row' },
  { id: 'full_journey',      emoji: '🌟', name: 'Full Journey',        desc: 'Complete all 5 phases' },
];

export function checkBadges(state) {
  const newBadges = [];
  const has = (id) => state.badges.includes(id);

  if (!has('line_detective') && state.phaseComplete.wonder && state.phaseComplete.story)
    newBadges.push('line_detective');

  if (!has('graph_builder') && state.simStationsComplete.every(Boolean))
    newBadges.push('graph_builder');

  const totalQ = state.worldScores.reduce((a, s) => a + (s ?? 0), 0);
  const totalPossible = state.worldScores.filter(s => s !== null).length * 10;
  if (!has('data_star') && totalPossible >= 10 && totalQ / totalPossible >= 0.8)
    newBadges.push('data_star');

  if (!has('perfect_plot') && state.worldScores.some(s => s === 10))
    newBadges.push('perfect_plot');

  if (!has('streak_legend') && state.maxStreak >= 10)
    newBadges.push('streak_legend');

  if (!has('full_journey') &&
    state.phaseComplete.wonder && state.phaseComplete.story &&
    state.phaseComplete.simulate && state.phaseComplete.play && state.phaseComplete.reflect)
    newBadges.push('full_journey');

  return newBadges;
}
