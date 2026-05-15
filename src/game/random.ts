import type { Mountain, RandomMode, RandomResult } from '../types';

type RandomOptions = {
  mountains: Mountain[];
  completedIds: Set<string>;
  selectedIds: Set<string>;
  mode: RandomMode;
  random?: () => number;
};

export function getRandomCandidates({
  mountains,
  completedIds,
  selectedIds,
  mode
}: Omit<RandomOptions, 'random'>): Mountain[] {
  if (mode === 'incomplete') {
    return mountains.filter((mountain) => !completedIds.has(mountain.id));
  }

  if (mode === 'selected') {
    return mountains.filter((mountain) => selectedIds.has(mountain.id));
  }

  return mountains;
}

export function pickRandomMountain(options: RandomOptions): RandomResult | null {
  const random = options.random ?? Math.random;
  const candidates = getRandomCandidates(options);

  if (candidates.length === 0) {
    return null;
  }

  const winner = candidates[Math.floor(random() * candidates.length)] ?? candidates[0];
  const sequenceLength = Math.max(18, Math.min(42, candidates.length * 4));
  const sequence = Array.from({ length: sequenceLength }, (_, index) => {
    if (index === sequenceLength - 1) {
      return winner;
    }

    return candidates[index % candidates.length];
  });

  return { winner, sequence };
}
