import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MOUNTAINS_PATH = resolve('src/data/mountains.ts');
const OUTPUT_PATH = resolve('src/data/generatedMountainGuides.ts');
const DEFAULT_LIMIT = 3;
const DEFAULT_MODEL = 'gemini-2.5-flash';

const linkSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['label', 'url', 'type'],
  properties: {
    label: { type: 'string' },
    url: { type: 'string' },
    type: { type: 'string', enum: ['official', 'blog', 'search'] }
  }
};

const guideSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['mountainId', 'status', 'source', 'generatedAt', 'confidence', 'routes', 'verificationLinks', 'notes'],
  properties: {
    mountainId: { type: 'string' },
    status: { type: 'string', enum: ['draft'] },
    source: { type: 'string', enum: ['ai-draft'] },
    generatedAt: { type: 'string' },
    confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
    routes: {
      type: 'array',
      minItems: 1,
      maxItems: 4,
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'rank',
          'isRecommended',
          'name',
          'path',
          'startPoint',
          'distance',
          'estimatedTime',
          'difficulty',
          'parking',
          'transit',
          'features',
          'sourceLinks',
          'warnings',
          'recommendationReason'
        ],
        properties: {
          rank: { type: 'integer', minimum: 1, maximum: 4 },
          isRecommended: { type: 'boolean' },
          name: { type: 'string' },
          path: { type: 'string' },
          startPoint: { type: 'string' },
          distance: { type: 'string' },
          estimatedTime: { type: 'string' },
          difficulty: { type: 'string', enum: ['easy', 'normal', 'hard', 'unknown'] },
          parking: { type: 'string' },
          transit: { type: 'string' },
          features: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: { type: 'string' }
          },
          sourceLinks: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: linkSchema
          },
          warnings: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: { type: 'string' }
          },
          recommendationReason: { type: 'string' }
        }
      }
    },
    verificationLinks: {
      type: 'array',
      minItems: 1,
      maxItems: 5,
      items: linkSchema
    },
    notes: { type: 'string' }
  }
};

function loadLocalEnv() {
  const envPath = resolve('.env.local');

  try {
    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split('=');
      process.env[key] ??= valueParts.join('=').replace(/^["']|["']$/g, '');
    }
  } catch {
    // .env.local is optional; process.env still works.
  }
}

function parseMountains() {
  const content = readFileSync(MOUNTAINS_PATH, 'utf8');
  const match = content.match(/export const mountains: Mountain\[\] = ([\s\S]*);\s*$/);

  if (!match) {
    throw new Error(`Could not parse ${MOUNTAINS_PATH}`);
  }

  return JSON.parse(match[1]);
}

function parseExistingGuides() {
  if (!existsSync(OUTPUT_PATH)) {
    return {};
  }

  const content = readFileSync(OUTPUT_PATH, 'utf8');
  const match = content.match(/const rawGeneratedMountainGuides = ([\s\S]*?);\s*\n/);
  if (!match) {
    return {};
  }

  try {
    return JSON.parse(JSON.parse(match[1]));
  } catch {
    return {};
  }
}

function parseArgs(argv) {
  const options = {
    all: false,
    force: false,
    limit: DEFAULT_LIMIT,
    mountain: ''
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--all') {
      options.all = true;
      continue;
    }
    if (arg === '--force') {
      options.force = true;
      continue;
    }
    if (arg === '--limit') {
      options.limit = Number(argv[index + 1]);
      index += 1;
      continue;
    }
    if (arg === '--mountain') {
      options.mountain = argv[index + 1] ?? '';
      index += 1;
    }
  }

  if (!Number.isInteger(options.limit) || options.limit < 1) {
    throw new Error('--limit must be a positive integer.');
  }

  return options;
}

function selectMountains(mountains, options, existingGuides) {
  if (options.mountain) {
    const query = options.mountain.trim();
    const selected = mountains.filter((mountain) => mountain.id === query || mountain.name === query);
    if (selected.length === 0) {
      throw new Error(`No mountain found for --mountain ${query}`);
    }
    return selected;
  }

  const pending = options.force ? mountains : mountains.filter((mountain) => !existingGuides[mountain.id]);
  return options.all ? pending : pending.slice(0, options.limit);
}

function createSearchLinks(mountain) {
  const queries = [
    [`${mountain.name} 등산 코스`, '등산코스 검색'],
    [`${mountain.name} 등산 지도`, '등산지도 검색'],
    [`${mountain.name} 주차장 대중교통`, '주차/교통 검색']
  ];

  return queries.map(([query, label]) => ({
    label,
    type: 'search',
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
  }));
}

function buildPrompt(mountain) {
  return [
    `산 이름: ${mountain.name}`,
    `지역: ${mountain.province} ${mountain.city}`,
    `주소: ${mountain.address}`,
    `고도: ${mountain.elevationMeters}m`,
    '',
    'Google Search로 아래 검색 의도를 확인한 뒤 한국어 JSON만 생성하세요.',
    `- ${mountain.name} 등산 코스`,
    `- ${mountain.name} 등산 지도`,
    `- ${mountain.name} 주차장 대중교통`,
    '',
    '규칙:',
    '- 등산코스는 1~4개만 작성합니다.',
    '- path는 "팔영산 탐방지원센터 -> 능가사 -> 1봉 -> 정상 -> 능가사 -> 팔영산 탐방지원센터" 같은 경유지 순서 문자열로 씁니다.',
    '- 가장 많이 언급되는 것으로 보이는 코스를 rank 1, isRecommended true로 둡니다.',
    '- 추천 근거는 recommendationReason에 짧게 씁니다. 단정하지 말고 "여러 후기에서 자주 언급되는 편"처럼 표현합니다.',
    '- difficulty는 easy, normal, hard, unknown 중 하나만 씁니다.',
    '- parking은 해당 코스 출발지 기준 주차 정보를 씁니다.',
    '- transit은 가장 가까운 기차역 또는 버스터미널에서 출발지까지 접근하는 방법 중심으로 씁니다.',
    '- 폐쇄, 예약제, 통제, 시간표, 요금은 단정하지 말고 warnings에 "방문 전 확인" 문구를 포함합니다.',
    '- sourceLinks는 코스별 확인에 쓸 수 있는 공식/블로그/검색 링크를 최소 1개 넣습니다.',
    '- 출처가 부족하거나 값이 불확실하면 confidence를 low로 둡니다.',
    '- 모든 사용자에게 보이는 문장은 한국어로 씁니다.'
  ].join('\n');
}

function buildGeminiRequestBody(mountain, useSchema) {
  const body = {
    contents: [
      {
        parts: [
          {
            text: buildPrompt(mountain)
          }
        ]
      }
    ],
    tools: [
      {
        google_search: {}
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json'
    }
  };

  if (useSchema) {
    body.generationConfig.responseJsonSchema = guideSchema;
  } else {
    body.contents[0].parts[0].text += [
      '',
      '반드시 아래 JSON 구조를 지키세요.',
      JSON.stringify(guideSchema)
    ].join('\n');
  }

  return body;
}

async function createGuide(apiKey, model, mountain) {
  const firstAttempt = await requestGeminiGuide(apiKey, model, mountain, true);

  if (!firstAttempt.ok && shouldRetryWithoutSchema(firstAttempt.status, firstAttempt.rawText)) {
    console.warn(`Retrying ${mountain.name} without responseJsonSchema because this model rejected schema + search.`);
    const fallbackAttempt = await requestGeminiGuide(apiKey, model, mountain, false);
    if (!fallbackAttempt.ok) {
      throw new Error(formatGeminiError(mountain, fallbackAttempt.status, fallbackAttempt.rawText));
    }
    return parseGeminiGuide(mountain, fallbackAttempt.rawText);
  }

  if (!firstAttempt.ok) {
    throw new Error(formatGeminiError(mountain, firstAttempt.status, firstAttempt.rawText));
  }

  return parseGeminiGuide(mountain, firstAttempt.rawText);
}

async function requestGeminiGuide(apiKey, model, mountain, useSchema) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify(buildGeminiRequestBody(mountain, useSchema))
  });

  return {
    ok: response.ok,
    status: response.status,
    rawText: await response.text()
  };
}

function shouldRetryWithoutSchema(status, rawText) {
  if (status !== 400) {
    return false;
  }

  return /responseJsonSchema|response_json_schema|schema|tool/i.test(rawText);
}

function parseGeminiGuide(mountain, rawText) {
  const payload = JSON.parse(rawText);
  const outputText = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim();

  if (!outputText) {
    throw new Error(`Gemini response for ${mountain.name} did not include text output.`);
  }

  const guide = JSON.parse(extractJson(outputText));
  const groundingLinks = extractGroundingLinks(payload);
  return normalizeGuide(mountain, guide, groundingLinks);
}

function extractJson(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed;
  }

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenced) {
    return fenced[1].trim();
  }

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) {
    return trimmed.slice(start, end + 1);
  }

  throw new Error('Gemini output was not valid JSON.');
}

function extractGroundingLinks(payload) {
  const chunks = payload.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  return chunks
    .map((chunk) => chunk.web)
    .filter((web) => web?.uri)
    .slice(0, 5)
    .map((web, index) => ({
      label: web.title || `검색 출처 ${index + 1}`,
      type: 'search',
      url: web.uri
    }));
}

function formatGeminiError(mountain, status, rawText) {
  let parsedError;

  try {
    parsedError = JSON.parse(rawText)?.error;
  } catch {
    return `Gemini API failed for ${mountain.name}: HTTP ${status}. ${rawText.slice(0, 400)}`;
  }

  if (status === 429) {
    return [
      `Gemini quota or rate limit was exceeded while generating ${mountain.name}.`,
      '원인: 현재 GEMINI_API_KEY가 속한 프로젝트의 무료/유료 요청 한도에 도달했을 가능성이 큽니다.',
      '이미 성공한 산은 파일에 저장되어 있으니, 한도 리셋 후 같은 명령을 다시 실행하면 남은 산부터 이어서 생성합니다.',
      '',
      `원본 메시지: ${parsedError?.message ?? rawText.slice(0, 400)}`
    ].join('\n');
  }

  return `Gemini API failed for ${mountain.name}: HTTP ${status}. ${parsedError?.message ?? rawText.slice(0, 400)}`;
}

function normalizeGuide(mountain, guide, groundingLinks) {
  const searchLinks = createSearchLinks(mountain);
  const fallbackLinks = groundingLinks.length > 0 ? groundingLinks : searchLinks;
  const sourceRoutes = Array.isArray(guide.routes) && guide.routes.length > 0 ? guide.routes : [createFallbackRoute(mountain)];
  const recommendedIndex = sourceRoutes.findIndex((route) => route.isRecommended);
  const sortedRoutes = [...sourceRoutes].sort((a, b) => {
    const aRecommended = recommendedIndex >= 0 ? a.isRecommended : false;
    const bRecommended = recommendedIndex >= 0 ? b.isRecommended : false;
    return Number(bRecommended) - Number(aRecommended) || Number(a.rank ?? 99) - Number(b.rank ?? 99);
  });

  const routes = sortedRoutes.slice(0, 4).map((route, index) => ({
    rank: index + 1,
    isRecommended: index === 0,
    name: stringOrFallback(route.name, index === 0 ? '추천코스' : `코스 ${index + 1}`),
    path: stringOrFallback(route.path, `${mountain.name} 등산 코스 확인 필요`),
    startPoint: stringOrFallback(route.startPoint, '출발지 확인 필요'),
    distance: stringOrFallback(route.distance, '거리 확인 필요'),
    estimatedTime: stringOrFallback(route.estimatedTime, '소요시간 확인 필요'),
    difficulty: normalizeDifficulty(route.difficulty),
    parking: stringOrFallback(route.parking, '주차 정보는 방문 전 확인이 필요합니다.'),
    transit: stringOrFallback(route.transit, '가까운 기차역 또는 버스터미널 기준 접근 방법은 방문 전 확인이 필요합니다.'),
    features: normalizeStringArray(route.features, ['코스 특징은 추가 확인이 필요합니다.']),
    sourceLinks: normalizeLinks(route.sourceLinks, fallbackLinks),
    warnings: ensureVisitCheckWarning(normalizeStringArray(route.warnings, [])),
    recommendationReason: stringOrFallback(
      route.recommendationReason,
      index === 0 ? '검색 결과에서 자주 언급되는 코스로 보이나 방문 전 추가 확인이 필요합니다.' : '보조 코스로 정리했습니다.'
    )
  }));

  return {
    mountainId: mountain.id,
    status: 'draft',
    source: 'ai-draft',
    generatedAt: new Date().toISOString().slice(0, 10),
    confidence: normalizeConfidence(guide.confidence),
    routes,
    verificationLinks: normalizeLinks(guide.verificationLinks, fallbackLinks),
    notes:
      stringOrFallback(
        guide.notes,
        'AI 웹검색 기반 미검증 초안입니다. 실제 코스, 통제, 교통, 주차 정보는 방문 전 공식 안내와 최신 후기로 확인하세요.'
      )
  };
}

function createFallbackRoute(mountain) {
  return {
    rank: 1,
    isRecommended: true,
    name: `${mountain.name} 대표 코스`,
    path: `${mountain.name} 등산 코스 확인 필요`,
    startPoint: '출발지 확인 필요',
    distance: '거리 확인 필요',
    estimatedTime: '소요시간 확인 필요',
    difficulty: 'unknown',
    parking: '주차 정보는 방문 전 확인이 필요합니다.',
    transit: '가까운 기차역 또는 버스터미널 기준 접근 방법은 방문 전 확인이 필요합니다.',
    features: ['검색 결과가 부족해 대표 코스 초안만 생성했습니다.'],
    sourceLinks: createSearchLinks(mountain),
    warnings: ['코스 통제, 예약제, 교통 시간표, 주차 가능 여부는 방문 전 확인하세요.'],
    recommendationReason: '검색 결과가 부족해 추천 근거 확인이 필요합니다.'
  };
}

function normalizeDifficulty(value) {
  return ['easy', 'normal', 'hard', 'unknown'].includes(value) ? value : 'unknown';
}

function normalizeConfidence(value) {
  return ['low', 'medium', 'high'].includes(value) ? value : 'low';
}

function stringOrFallback(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function normalizeStringArray(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim());
  return items.length > 0 ? items : fallback;
}

function normalizeLinks(value, fallback) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const links = value
    .filter((link) => typeof link?.url === 'string' && link.url.trim())
    .map((link) => ({
      label: stringOrFallback(link.label, '참고 링크'),
      type: ['official', 'blog', 'search'].includes(link.type) ? link.type : 'search',
      url: link.url.trim()
    }));

  return links.length > 0 ? links.slice(0, 5) : fallback;
}

function ensureVisitCheckWarning(warnings) {
  const hasVisitCheck = warnings.some((warning) => warning.includes('방문 전 확인'));
  if (hasVisitCheck) {
    return warnings.slice(0, 5);
  }

  return [...warnings, '코스 통제, 예약제, 교통 시간표, 주차 가능 여부는 방문 전 확인하세요.'].slice(0, 5);
}

function renderGuideFile(guides) {
  const serializedGuides = JSON.stringify(JSON.stringify(guides));

  return `import type { MountainGuide } from '../types';\n\nconst rawGeneratedMountainGuides = ${serializedGuides};\n\nexport const generatedMountainGuides = JSON.parse(rawGeneratedMountainGuides) as Record<string, MountainGuide>;\n`;
}

async function main() {
  loadLocalEnv();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY를 .env.local 또는 환경 변수에 설정하세요.');
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const options = parseArgs(process.argv.slice(2));
  const existingGuides = parseExistingGuides();
  const mountains = selectMountains(parseMountains(), options, existingGuides);
  const guides = { ...existingGuides };

  if (mountains.length === 0) {
    console.log('No pending mountains to generate. Use --force to regenerate existing guides.');
    return;
  }

  for (const mountain of mountains) {
    if (!options.force && guides[mountain.id]) {
      console.log(`Skipping ${mountain.name}; guide already exists. Use --force to regenerate.`);
      continue;
    }

    console.log(`Generating ${mountain.name} with Gemini ${model}...`);
    guides[mountain.id] = await createGuide(apiKey, model, mountain);
    writeFileSync(OUTPUT_PATH, renderGuideFile(guides), 'utf8');
    console.log(`Saved ${mountain.name}. Total generated guides: ${Object.keys(guides).length}`);
  }

  console.log(`Wrote ${mountains.length} Gemini web-search mountain guides to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
