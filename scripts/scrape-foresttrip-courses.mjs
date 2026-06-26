import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { forestTripOfficialSelections } from '../src/data/forestTripOfficialSelections.ts';

const FORESTTRIP_ORIGIN = 'https://www.foresttrip.go.kr';
const OUTPUT_PATH = 'src/data/forestTripCourses.ts';
const COURSE_KIND_BY_LABEL = {
  '추천코스': 'recommended',
  '기타코스1': 'other1',
  '기타코스2': 'other2',
  '기타코스3': 'other3'
};

const COURSE_KIND_BY_NUMBERED_LABEL = {
  '코스1': 'recommended',
  '코스2': 'other1',
  '코스3': 'other2',
  '코스4': 'other3'
};

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#40;/g, '(')
    .replace(/&#41;/g, ')')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function toAbsoluteForestTripUrl(src) {
  if (!src) {
    return '';
  }
  if (/^https?:\/\//i.test(src)) {
    return src;
  }
  return `${FORESTTRIP_ORIGIN}${src.startsWith('/') ? '' : '/'}${src}`;
}

function extractCourseSection(html) {
  const sectionMatch = html.match(/<em class="label">산행코스<\/em>[\s\S]*?(?=<div class="text-row">\s*<em class="label">교통정보<\/em>)/);
  return sectionMatch?.[0] ?? '';
}

function extractCourseMapImage(section, mountainName, sourceUrl) {
  const imageMatch = section.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"/i);
  if (!imageMatch) {
    return undefined;
  }

  return {
    src: toAbsoluteForestTripUrl(imageMatch[1]),
    alt: `${mountainName} 추천 코스 지도`,
    sourceLabel: '숲나들e 산행코스 지도',
    sourceUrl
  };
}

function extractRoutes(section) {
  const tbodyMatch = section.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  if (!tbodyMatch) {
    return [];
  }

  return [...tbodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map(([, row]) => [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(([, cell]) => stripHtml(cell)))
    .map(([label, path, estimatedTime]) => ({
      label,
      kind: resolveCourseKind(label),
      path,
      estimatedTime
    }))
    .filter((route) => route.kind && route.path && route.estimatedTime);
}

function resolveCourseKind(label) {
  if (COURSE_KIND_BY_LABEL[label]) {
    return COURSE_KIND_BY_LABEL[label];
  }

  const numberedLabel = label.match(/^코스[1-4]/)?.[0];
  return numberedLabel ? COURSE_KIND_BY_NUMBERED_LABEL[numberedLabel] : undefined;
}

function renderDataFile(records) {
  const serialized = JSON.stringify(records, null, 2);
  return `import type { ForestTripCourseKind, MountainGuideImage } from '../types';

export type ForestTripCourseRoute = {
  label: string;
  kind: ForestTripCourseKind;
  path: string;
  estimatedTime: string;
};

export type ForestTripCourseGuide = {
  courseMapImage?: MountainGuideImage;
  routes: ForestTripCourseRoute[];
};

export const forestTripCourses: Record<string, ForestTripCourseGuide> = ${serialized};
`;
}

async function fetchHtml(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch {
    return execFileSync('curl.exe', ['-L', url], {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
  }
}

const records = {};
const failures = [];

for (const [mountainId, selection] of Object.entries(forestTripOfficialSelections)) {
  try {
    const html = await fetchHtml(selection.url);
    const section = extractCourseSection(html);
    const routes = extractRoutes(section);
    const courseMapImage = extractCourseMapImage(section, selection.name, selection.url);

    if (!section || !courseMapImage || routes.length === 0) {
      failures.push({
        mountainId,
        name: selection.name,
        reason: `map=${Boolean(courseMapImage)} routes=${routes.length}`
      });
    }

    records[mountainId] = {
      ...(courseMapImage ? { courseMapImage } : {}),
      routes
    };
  } catch (error) {
    failures.push({
      mountainId,
      name: selection.name,
      reason: error instanceof Error ? error.message : String(error)
    });
  }
}

writeFileSync(OUTPUT_PATH, renderDataFile(records), 'utf8');
console.log(`wrote ${Object.keys(records).length} foresttrip course records to ${OUTPUT_PATH}`);
if (failures.length > 0) {
  console.log(JSON.stringify({ failures }, null, 2));
}
