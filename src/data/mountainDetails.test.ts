import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { mountains } from './mountains';
import { getMountainGuide } from './mountainDetails';
import { mountainGuides } from './mountainGuides';
import { draftMountainGuides } from './draftMountainGuides';
import { forestTripCourses } from './forestTripCourses';
import { forestTripOfficialSelections } from './forestTripOfficialSelections';
import type { Mountain } from '../types';

describe('mountain guide drafts', () => {
  const visibleGuides = mountains.map((mountain) => getMountainGuide(mountain));

  it('keeps exactly 100 top mountain records with stable ids', () => {
    expect(mountains).toHaveLength(100);
    expect(new Set(mountains.map((mountain) => mountain.id)).size).toBe(100);
  });

  it('provides a visible guide for every top 100 mountain', () => {
    for (const mountain of mountains) {
      const guide = getMountainGuide(mountain);
      const sourceGuide = mountainGuides[mountain.id] ?? draftMountainGuides[mountain.id];

      expect(guide.mountainId).toBe(mountain.id);
      expect(sourceGuide).toBeDefined();
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

  it('uses active guides first and draft guides as detail-page fallback', () => {
    expect(mountainGuides).not.toBe(draftMountainGuides);

    const mountainDetailsSource = readFileSync(join(process.cwd(), 'src/data/mountainDetails.ts'), 'utf8');
    expect(mountainDetailsSource).toContain('./mountainGuides');
    expect(mountainDetailsSource).toContain('./draftMountainGuides');

    const activeMountain = mountains.find((mountain) => mountainGuides[mountain.id]);
    const draftOnlyMountain = mountains.find(
      (mountain) => draftMountainGuides[mountain.id] && !mountainGuides[mountain.id]
    );

    expect(activeMountain).toBeDefined();
    expect(draftOnlyMountain).toBeDefined();
    expect(getMountainGuide(activeMountain!).mountainId).toBe(mountainGuides[activeMountain!.id].mountainId);
    expect(getMountainGuide(draftOnlyMountain!).mountainId).toBe(draftMountainGuides[draftOnlyMountain!.id].mountainId);
  });

  it('adds foresttrip official links to the first ten visible active guides', () => {
    const firstTenActiveIds = [
      '0000000001',
      '0000000002',
      '0000000003',
      '0000000004',
      '0000000005',
      '0000000006',
      '0000000007',
      '0000000008',
      '0000000009',
      '0000000010'
    ];

    for (const mountainId of firstTenActiveIds) {
      const mountain = mountains.find((candidate) => candidate.id === mountainId);

      expect(mountain).toBeDefined();

      const guide = getMountainGuide(mountain!);

      expect(guide.selectionReason?.length).toBeGreaterThan(0);
      expect(guide.notes).toContain('숲나들e');
      expect(guide.verificationLinks?.[0]?.url).toMatch(/foresttrip\.go\.kr|forest\.go\.kr/);
      expect(guide.routes[0].sourceLinks[0].url).toMatch(/foresttrip\.go\.kr|forest\.go\.kr/);
      expect(guide.routes[0].forestTripCourseKind).toBe('recommended');
    }
  });

  it('connects all 100 mountains to a foresttrip official source', () => {
    expect(Object.keys(forestTripOfficialSelections)).toHaveLength(100);

    for (const mountain of mountains) {
      const selection = forestTripOfficialSelections[mountain.id];

      expect(selection, mountain.name).toBeDefined();
      expect(selection.url, mountain.name).toContain('foresttrip.go.kr');
    }
  });

  it('requires source links and warnings on every visible guide route', () => {
    for (const guide of visibleGuides) {
      for (const route of guide.routes) {
        expect(route.sourceLinks.length).toBeGreaterThan(0);
        expect(route.warnings.length).toBeGreaterThan(0);
      }
    }
  });

  it('uses local course map images only when a verified file exists', () => {
    for (const guide of visibleGuides) {
      for (const route of guide.routes) {
        if (!route.courseMapImage) {
          continue;
        }

        expect(route.courseMapImage.src).toMatch(/^\/course-images\/\d{10}\/[-a-z0-9]+-map\.webp$/);
        expect(
          existsSync(join(process.cwd(), 'public', route.courseMapImage.src.replace(/^\//, '')))
        ).toBe(true);
        expect(route.courseMapImage.alt).toContain('코스 지도');
        expect(route.courseMapImage.src).not.toContain('foresttrip.go.kr');
        expect(route.courseMapImage.sourceUrl ?? '').not.toContain('foresttrip.go.kr');
      }
    }
  });

  it('uses foresttrip course map images directly for the recommendation map', () => {
    expect(Object.keys(forestTripCourses)).toHaveLength(100);

    for (const guide of visibleGuides) {
      if (!guide.courseMapImage) {
        continue;
      }

      expect(guide.courseMapImage.src).toContain('foresttrip.go.kr');
      expect(guide.courseMapImage.sourceUrl ?? '').toContain('foresttrip.go.kr');
      expect(guide.courseMapImage.alt).toContain('코스 지도');
    }
  });

  it('uses only foresttrip recommendation course kinds in the recommendation table data', () => {
    const allowedKinds = new Set(['recommended', 'other1', 'other2', 'other3']);

    for (const guide of visibleGuides) {
      const forestTripRoutes = guide.routes.filter((route) => route.forestTripCourseKind);

      for (const route of forestTripRoutes) {
        expect(allowedKinds.has(route.forestTripCourseKind!)).toBe(true);
        expect(route.sourceLinks).toHaveLength(1);
        expect(route.sourceLinks[0].url).toContain('foresttrip.go.kr');
      }
    }
  });

  it('uses local mountain hero images only when a verified file exists', () => {
    for (const guide of visibleGuides) {
      if (!guide.heroImage) {
        continue;
      }

      expect(guide.heroImage.src).toMatch(/^\/mountain-images\/\d{10}\/hero\.png$/);
      expect(existsSync(join(process.cwd(), 'public', guide.heroImage.src.replace(/^\//, '')))).toBe(
        true
      );
      expect(guide.heroImage.alt).toContain('대표 이미지');
      expect(guide.heroImage.src).not.toContain('foresttrip.go.kr');
      expect(guide.heroImage.sourceUrl ?? '').not.toContain('foresttrip.go.kr');
    }
  });

  it('does not expose GeoJSON route tracks in visible guide data or course detail UI', () => {
    for (const guide of visibleGuides) {
      for (const route of guide.routes) {
        const rawRoute = route as Record<string, unknown>;

        expect(rawRoute.routeTrackUrl).toBeUndefined();
        expect(rawRoute.routeTrackSource).toBeUndefined();
        expect(rawRoute.routeTrackQuality).toBeUndefined();
        expect(rawRoute.mapPathCoordinates).toBeUndefined();
      }
    }

    const detailPageSource = readFileSync(join(process.cwd(), 'src/components/MountainDetailPage.tsx'), 'utf8');
    expect(detailPageSource).not.toContain('KakaoRouteMap');
    expect(detailPageSource).not.toContain('RouteMapFallback');
    expect(detailPageSource).not.toContain('routeTrackUrl');
    expect(detailPageSource).not.toContain('mapPathCoordinates');
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
