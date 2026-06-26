import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { draftMountainGuides } from '../src/data/draftMountainGuides.ts';
import { forestTripOfficialSelections } from '../src/data/forestTripOfficialSelections.ts';
import { mountains } from '../src/data/mountains.ts';

const browseExe = resolve(
  process.env.USERPROFILE ?? '',
  '.codex/skills/gstack/browse/dist/browse.exe'
);
const serverScript = resolve(
  process.env.USERPROFILE ?? '',
  '.codex/skills/gstack/browse/dist/server-node.mjs'
);

if (!existsSync(browseExe) || !existsSync(serverScript)) {
  throw new Error('gstack browse executable or server script was not found.');
}

const officialFirstTenUrls = Object.fromEntries(
  Object.entries(forestTripOfficialSelections)
    .filter(([, selection]) => selection.url.includes('foresttrip.go.kr'))
    .map(([mountainId, selection]) => [mountainId, selection.url])
);

const manualForestTripUrls = {
  '0000000004':
    'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71946&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd=',
  '0000000053':
    'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71996&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd=',
  '0000000054':
    'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71997&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd=',
  '0000000055':
    'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71998&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd='
};

function findForestTripUrl(mountainId) {
  if (officialFirstTenUrls[mountainId]) {
    return officialFirstTenUrls[mountainId];
  }
  if (manualForestTripUrls[mountainId]) {
    return manualForestTripUrls[mountainId];
  }

  const guide = draftMountainGuides[mountainId];
  const links = [
    ...(guide?.verificationLinks ?? []),
    ...(guide?.routes ?? []).flatMap((route) => route.sourceLinks ?? [])
  ];

  return links.find((link) => link.url.includes('foresttrip.go.kr'))?.url;
}

function runBrowse(args) {
  return execFileSync(
    browseExe,
    args,
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: {
        ...process.env,
        BROWSE_SERVER_SCRIPT: serverScript
      },
      maxBuffer: 20 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );
}

function extractReason(text) {
  const normalized = text
    .replace(/\r/g, '')
    .replace(/--- BEGIN[\s\S]*?---\n/, '')
    .replace(/--- END[\s\S]*$/, '')
    .trim();
  const match = normalized.match(/특징 및 선정이유\s+([\s\S]*?)\n산 개요/);

  return match?.[1]?.replace(/\s+/g, ' ').trim();
}

const results = {};
const failures = [];

for (const mountain of mountains) {
  const url = findForestTripUrl(mountain.id);

  if (!url) {
    failures.push({ id: mountain.id, name: mountain.name, reason: 'missing foresttrip url' });
    continue;
  }

  try {
    console.log(`scrape ${mountain.id} ${mountain.name}`);
    runBrowse(['goto', url]);
    const text = runBrowse(['text']);
    const selectionReason = extractReason(text);

    if (!selectionReason) {
      failures.push({ id: mountain.id, name: mountain.name, url, reason: 'missing selection reason' });
      continue;
    }

    results[mountain.id] = {
      name: mountain.name,
      url,
      selectionReason
    };
  } catch (error) {
    failures.push({ id: mountain.id, name: mountain.name, url, reason: error.message });
  }
}

writeFileSync(
  'tmp-foresttrip-selections.json',
  JSON.stringify({ results, failures }, null, 2),
  'utf8'
);

console.log(`done results=${Object.keys(results).length} failures=${failures.length}`);
