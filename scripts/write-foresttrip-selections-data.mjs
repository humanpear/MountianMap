import { readFileSync, writeFileSync } from 'node:fs';
import { forestTripOfficialSelections } from '../src/data/forestTripOfficialSelections.ts';
import { mountains } from '../src/data/mountains.ts';

const scraped = JSON.parse(readFileSync('tmp-foresttrip-selections.json', 'utf8')).results;
const fallback = forestTripOfficialSelections;
const entries = {};

for (const mountain of mountains) {
  const scrapedSelection = scraped[mountain.id];
  const fallbackSelection = fallback[mountain.id];

  if (scrapedSelection) {
    entries[mountain.id] = scrapedSelection;
    continue;
  }

  if (fallbackSelection) {
    entries[mountain.id] = {
      name: fallbackSelection.name,
      url: fallbackSelection.url,
      selectionReason: fallbackSelection.selectionReason
    };
  }
}

function stringLiteral(value) {
  return JSON.stringify(value);
}

const lines = [
  "import type { MountainGuideLink } from '../types';",
  '',
  'export type ForestTripOfficialSelection = {',
  '  name: string;',
  '  url: string;',
  '  selectionReason: string;',
  '  notes: string;',
  '};',
  '',
  'export const forestTripOfficialSelections: Record<string, ForestTripOfficialSelection> = {'
];

for (const mountain of mountains) {
  const selection = entries[mountain.id];

  if (!selection) {
    continue;
  }

  lines.push(
    `  ${stringLiteral(mountain.id)}: createOfficialSelection(`,
    `    ${stringLiteral(selection.name)},`,
    `    ${stringLiteral(selection.url)},`,
    `    ${stringLiteral(selection.selectionReason)}`,
    '  ),'
  );
}

lines.push(
  '};',
  '',
  'function createOfficialSelection(',
  '  name: string,',
  '  url: string,',
  '  selectionReason: string',
  '): ForestTripOfficialSelection {',
  '  return {',
  '    name,',
  '    url,',
  '    selectionReason,',
  "    notes: `숲나들e 100대 명산 상세의 '특징 및 선정이유'를 selectionReason으로 연결했습니다. 코스·거리·시간·주차·대중교통은 상세페이지 수동 검토 전 최신 공식 안내와 현장 자료로 재확인해야 합니다.`",
  '  };',
  '}',
  '',
  'export function createForestTripOfficialLink(',
  '  selection: ForestTripOfficialSelection',
  '): MountainGuideLink {',
  '  return {',
  "    label: `숲나들e ${selection.name} 100대 명산 상세`,",
  '    url: selection.url,',
  "    type: 'official'",
  '  };',
  '}',
  ''
);

writeFileSync('src/data/forestTripOfficialSelections.ts', lines.join('\n'), 'utf8');
console.log(`wrote ${Object.keys(entries).length} selections`);
