// XP Calculation
export function calcXP(attemptNumber, usedHint) {
  if (usedHint) return 5;
  if (attemptNumber === 1) return 10;
  if (attemptNumber === 2) return 7;
  return 5;
}

// Star rating for a world (10 questions)
export function calcStars(correct, total = 10) {
  const pct = correct / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.6) return 1;
  return 0;
}

// World unlock: need ≥ 6/10 (1 star minimum)
export function isWorldUnlocked(worldIndex, worldScores) {
  if (worldIndex === 0) return true;
  const prev = worldScores[worldIndex - 1];
  return prev !== null && prev >= 6;
}
