import { describe, expect, it } from 'vitest';
import { mountains } from '../data/mountains';
import { getCandidateIdsForRandomMode, getRandomCandidates, pickRandomMountain } from './random';

describe('random mountain selection', () => {
  it('excludes completed mountains in incomplete mode', () => {
    const candidates = getRandomCandidates({
      mountains,
      completedIds: new Set([mountains[0].id, mountains[1].id]),
      selectedIds: new Set(),
      mode: 'incomplete'
    });

    expect(candidates).toHaveLength(mountains.length - 2);
    expect(candidates.some((mountain) => mountain.id === mountains[0].id)).toBe(false);
  });

  it('uses only manually selected candidates in selected mode', () => {
    const selectedIds = new Set([mountains[2].id, mountains[4].id]);
    const candidates = getRandomCandidates({
      mountains,
      completedIds: new Set(),
      selectedIds,
      mode: 'selected'
    });

    expect(candidates.map((mountain) => mountain.id).sort()).toEqual([...selectedIds].sort());
  });

  it('returns a deterministic winner when random is injected', () => {
    const result = pickRandomMountain({
      mountains,
      completedIds: new Set(),
      selectedIds: new Set(),
      mode: 'all',
      random: () => 0
    });

    expect(result?.winner.id).toBe(mountains[0].id);
    expect(result?.sequence.at(-1)?.id).toBe(mountains[0].id);
  });

  it('returns null when selected mode has no candidates', () => {
    const result = pickRandomMountain({
      mountains,
      completedIds: new Set(),
      selectedIds: new Set(),
      mode: 'selected',
      random: () => 0
    });

    expect(result).toBeNull();
  });

  it('clears manually selected candidates when leaving selected mode', () => {
    const selectedIds = new Set([mountains[2].id, mountains[4].id]);

    expect([...getCandidateIdsForRandomMode('all', selectedIds)]).toEqual([]);
    expect([...getCandidateIdsForRandomMode('incomplete', selectedIds)]).toEqual([]);
    expect([...getCandidateIdsForRandomMode('selected', selectedIds)].sort()).toEqual([...selectedIds].sort());
  });
});
