import { describe, expect, it } from 'vitest';
import { mountains } from './mountains';
import { getMountainGuide } from './mountainDetails';
import type { Mountain } from '../types';

describe('mountain guide drafts', () => {
  it('provides a draft guide for every top 100 mountain', () => {
    for (const mountain of mountains) {
      const guide = getMountainGuide(mountain);

      expect(guide.mountainId).toBe(mountain.id);
      expect(['ai-draft', 'curated']).toContain(guide.source);
      expect(guide.status).toBe('draft');
      expect(guide.routes.length).toBeGreaterThan(0);
      expect(guide.routes[0].isRecommended).toBe(true);
      expect(guide.routes[0].parking.length).toBeGreaterThan(0);
      expect(guide.routes[0].transit.length).toBeGreaterThan(0);
      expect(guide.routes[0].warnings?.length).toBeGreaterThan(0);
      expect(guide.verificationLinks?.length).toBeGreaterThan(0);
    }
  });

  it('keeps a safe fallback when a mountain has no generated guide', () => {
    const mountainWithoutGuide: Mountain = {
      ...mountains[0],
      id: 'missing-guide',
      name: '테스트산'
    };
    const guide = getMountainGuide(mountainWithoutGuide);

    expect(guide.source).toBe('ai-draft');
    expect(guide.confidence).toBe('low');
    expect(guide.notes).toContain('미검증');
    expect(guide.routes[0].difficulty).toBe('unknown');
    expect(guide.routes[0].sourceLinks.length).toBeGreaterThan(0);
  });
});
