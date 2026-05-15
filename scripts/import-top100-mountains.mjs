import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const API_BASE_URL = 'https://apis.data.go.kr/B553662/top100FamtListBasiInfoService';
const API_OPERATION = 'getTop100FamtListBasiInfoList';
const OUTPUT_PATH = resolve('src/data/mountains.ts');

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
    // .env.local is optional for CI; process.env still works.
  }
}

function readField(row, names) {
  for (const name of names) {
    const value = row[name];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return '';
}

function parseNumber(value, fieldName, mountainName) {
  const normalized = String(value).replace(/,/g, '').trim();
  const number = Number(normalized);

  if (!Number.isFinite(number)) {
    throw new Error(`${mountainName}의 ${fieldName} 값이 숫자가 아닙니다: ${value}`);
  }

  return number;
}

function toItemArray(payload) {
  const items = payload?.response?.body?.items?.item ?? payload?.body?.items?.item ?? payload?.items?.item ?? [];
  return Array.isArray(items) ? items : [items];
}

function toMountain(row, index) {
  const id =
    readField(row, ['mntnId', 'mountainId', 'frtrlId', 'id']) ||
    readField(row, ['mntnCd', 'mountainCode', 'frtrlCd']) ||
    `top100-${String(index + 1).padStart(3, '0')}`;
  const name = readField(row, ['mntnNm', 'mountainName', 'frtrlNm', 'name']);
  const province = readField(row, ['ctpvNm', 'sidoNm', 'province']) || '대한민국';
  const address = readField(row, ['addrNm', 'address', 'addr']) || province;
  const latitude = parseNumber(readField(row, ['lat', 'latitude', 'lttd']), '위도', name || id);
  const longitude = parseNumber(readField(row, ['lot', 'lon', 'lng', 'longitude', 'lntd']), '경도', name || id);
  const elevationMeters = Math.round(
    parseNumber(readField(row, ['aslAltide', 'elevation', 'elevationMeters', 'altitude']), '해발고도', name || id)
  );

  return {
    id,
    name,
    province,
    city: address.replace(province, '').trim().split(/\s+/).slice(0, 2).join(' ') || province,
    latitude,
    longitude,
    elevationMeters,
    address,
    shortDescription: `${province} ${address}에 위치한 해발 ${elevationMeters.toLocaleString('ko-KR')}m의 100대 명산입니다.`,
    selectionReason: '한국등산트레킹지원센터 100대명산 목록정보 서비스에서 제공하는 100대 명산 기본정보입니다.',
    detailStatus: 'basic'
  };
}

function validateMountains(mountains) {
  const ids = new Set();

  for (const mountain of mountains) {
    if (!mountain.id || !mountain.name) {
      throw new Error(`필수 필드가 누락된 산 데이터가 있습니다: ${JSON.stringify(mountain)}`);
    }
    if (ids.has(mountain.id)) {
      throw new Error(`중복 산 id가 있습니다: ${mountain.id}`);
    }
    if (mountain.latitude < 33 || mountain.latitude > 39 || mountain.longitude < 124 || mountain.longitude > 132) {
      throw new Error(`${mountain.name}의 좌표가 대한민국 범위를 벗어났습니다.`);
    }
    ids.add(mountain.id);
  }
}

function renderMountainFile(mountains) {
  return `import type { Mountain } from '../types';\n\nexport const mountains: Mountain[] = ${JSON.stringify(
    mountains,
    null,
    2
  )};\n`;
}

async function main() {
  loadLocalEnv();

  const serviceKey = process.env.DATA_GO_KR_SERVICE_KEY;
  if (!serviceKey) {
    throw new Error('DATA_GO_KR_SERVICE_KEY를 .env.local 또는 환경 변수에 설정하세요.');
  }

  const url = new URL(`${API_BASE_URL}/${API_OPERATION}`);
  url.searchParams.set('serviceKey', serviceKey);
  url.searchParams.set('pageNo', '1');
  url.searchParams.set('numOfRows', '120');
  url.searchParams.set('type', 'json');

  const response = await fetch(url);
  const rawText = await response.text();

  if (!response.ok) {
    throw new Error(
      `API 호출 실패: HTTP ${response.status}. 공공데이터포털 활용신청 승인 여부와 인증키 종류를 확인하세요.`
    );
  }

  let payload;
  try {
    payload = JSON.parse(rawText);
  } catch {
    throw new Error(`JSON 응답을 파싱하지 못했습니다. 응답 일부: ${rawText.slice(0, 200)}`);
  }

  const resultCode = payload?.response?.header?.resultCode;
  if (resultCode && resultCode !== '00' && resultCode !== '0') {
    throw new Error(`API 결과 오류: ${resultCode} ${payload?.response?.header?.resultMsg ?? ''}`.trim());
  }

  const rows = toItemArray(payload);
  const mountains = rows.map(toMountain).sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
  validateMountains(mountains);
  writeFileSync(OUTPUT_PATH, renderMountainFile(mountains), 'utf8');

  console.log(`${OUTPUT_PATH}에 ${mountains.length}개 산 데이터를 저장했습니다.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
