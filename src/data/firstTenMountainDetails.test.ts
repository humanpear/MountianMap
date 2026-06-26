import { describe, expect, it } from 'vitest';
import { mountains } from './mountains';
import { getMountainGuide } from './mountainDetails';
import { forestTripOfficialSelections } from './forestTripOfficialSelections';

function toText(value: string | string[] | undefined) {
  return Array.isArray(value) ? value.join('\n') : (value ?? '');
}

describe('first ten mountain detail data', () => {
  it('connects official foresttrip selection reasons for all mountains', () => {
    expect(Object.keys(forestTripOfficialSelections)).toHaveLength(100);

    for (const mountain of mountains) {
      const guide = getMountainGuide(mountain);
      const officialSelection = forestTripOfficialSelections[mountain.id];

      expect(officialSelection, mountain.name).toBeDefined();
      expect(guide.selectionReason, mountain.name).toBe(officialSelection.selectionReason);
      expect(guide.verificationLinks?.[0]?.url, mountain.name).toBe(officialSelection.url);
    }
  });

  it('matches the app-visible first ten mountain order', () => {
    expect(mountains.slice(0, 10).map((mountain) => `${mountain.id}:${mountain.name}`)).toEqual([
      '0000000002:가리산',
      '0000000003:가리왕산',
      '0000000001:가야산',
      '0000000004:가지산',
      '0000000005:감악산',
      '0000000006:강천산',
      '0000000007:계룡산',
      '0000000008:계방산',
      '0000000009:공작산',
      '0000000010:관악산'
    ]);
  });

  it('has complete review-ready detail content for the first ten mountains', () => {
    for (const mountain of mountains.slice(0, 10)) {
      const guide = getMountainGuide(mountain);
      const sourceText = [
        toText(guide?.notes),
        guide?.verificationLinks?.map((link) => link.url).join('\n'),
        guide?.routes.flatMap((route) => route.sourceLinks.map((link) => link.url)).join('\n')
      ].join('\n');

      expect(guide, mountain.name).toBeDefined();
      expect(guide?.selectionReason, mountain.name).toBe(forestTripOfficialSelections[mountain.id]?.selectionReason);
      expect(guide?.selectionReason?.trim().length, mountain.name).toBeGreaterThan(20);
      expect(sourceText, mountain.name).toContain(forestTripOfficialSelections[mountain.id]?.url);
      expect(toText(guide?.notes), mountain.name).toContain('숲나들e');
      expect(guide?.routes.length, mountain.name).toBeGreaterThanOrEqual(2);
      expect(guide?.routes.some((route) => route.warnings.length > 0), mountain.name).toBe(true);
      expect(
        guide?.routes.some((route) => route.parking || route.transit),
        mountain.name
      ).toBe(true);
    }
  });
});
