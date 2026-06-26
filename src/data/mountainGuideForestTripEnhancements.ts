import type { MountainGuide, MountainGuideLink, MountainGuideRoute } from '../types';
import { forestTripCourses, type ForestTripCourseRoute } from './forestTripCourses';
import { createForestTripOfficialLink, forestTripOfficialSelections } from './forestTripOfficialSelections';

type ForestTripGuideEnhancement = {
  name: string;
  url: string;
  selectionReason: string;
  notes: string;
};

const activeGuideForestTripEnhancements: Record<string, ForestTripGuideEnhancement> = {
  '0000000001': createEnhancement('가야산', '71944', '%EA%B0%80%EC%95%BC%EC%82%B0'),
  '0000000002': createEnhancement('가리산', '71945', '%EA%B0%80%EB%A6%AC%EC%82%B0'),
  '0000000003': createEnhancement(
    '가리왕산',
    '71946',
    '%EA%B0%80%EB%A6%AC%EC%99%95%EC%82%B0'
  ),
  '0000000004': createEnhancement('가지산', '71947', '%EA%B0%80%EC%A7%80%EC%82%B0'),
  '0000000005': createEnhancement('감악산', '71948', '%EA%B0%90%EC%95%85%EC%82%B0'),
  '0000000006': createEnhancement('강천산', '71949', '%EA%B0%95%EC%B2%9C%EC%82%B0'),
  '0000000007': createEnhancement('계룡산', '71950', '%EA%B3%84%EB%A3%A1%EC%82%B0'),
  '0000000008': createEnhancement('계방산', '71951', '%EA%B3%84%EB%B0%A9%EC%82%B0'),
  '0000000009': createEnhancement('공작산', '71952', '%EA%B3%B5%EC%9E%91%EC%82%B0'),
  '0000000010': createEnhancement('관악산', '71953', '%EA%B4%80%EC%95%85%EC%82%B0')
};

export function applyForestTripGuideEnhancement(guide: MountainGuide): MountainGuide {
  const officialSelection = forestTripOfficialSelections[guide.mountainId];
  const enhancement = officialSelection ?? activeGuideForestTripEnhancements[guide.mountainId];

  if (!enhancement) {
    return guide;
  }

  const sourceLink = officialSelection ? createForestTripOfficialLink(officialSelection) : createSourceLink(enhancement);
  const forestTripCourse = forestTripCourses[guide.mountainId];
  const forestTripRoutes = forestTripCourse?.routes.length
    ? createForestTripRoutes(forestTripCourse.routes, sourceLink)
    : [];

  return {
    ...guide,
    courseMapImage: forestTripCourse?.courseMapImage ?? guide.courseMapImage,
    selectionReason: enhancement.selectionReason,
    routes:
      forestTripRoutes.length > 0
        ? forestTripRoutes
        : guide.routes.map((route) => ({
            ...route,
            sourceLinks: prependUniqueLink(route.sourceLinks, sourceLink)
          })),
    verificationLinks: prependUniqueLink(guide.verificationLinks ?? [], sourceLink),
    notes: `${enhancement.notes} 숲나들e 산행코스 지도와 코스 표를 산 상세 추천 코스 영역에 직접 연결합니다.`
  };
}

function createForestTripRoutes(
  routes: ForestTripCourseRoute[],
  sourceLink: MountainGuideLink
): MountainGuideRoute[] {
  return routes.map((route, index) => ({
    rank: index + 1,
    isRecommended: route.kind === 'recommended',
    forestTripCourseKind: route.kind,
    name: route.label,
    path: route.path,
    startPoint: getForestTripStartPoint(route.path),
    distance: '숲나들e 미제공',
    estimatedTime: route.estimatedTime,
    difficulty: 'unknown',
    parking: '숲나들e 산행코스 표에는 주차 정보가 별도 제공되지 않습니다.',
    transit: '숲나들e 산행코스 표에는 대중교통 정보가 별도 제공되지 않습니다.',
    features: [`숲나들e 산행코스 표의 ${route.label}입니다.`],
    sourceLinks: [sourceLink],
    warnings: ['방문 전 숲나들e와 현장 안내의 탐방로 통제 여부를 확인하세요.'],
    recommendationReason: `숲나들e 산행코스 표에 ${route.label}로 제공된 공식 코스입니다.`
  }));
}

function getForestTripStartPoint(path: string) {
  return path.split(/\s+-\s+/)[0]?.trim() || '숲나들e 코스 표 기준';
}

function createEnhancement(
  name: string,
  fmmntSeq: string,
  encodedName: string
): ForestTripGuideEnhancement {
  const url = `https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=${fmmntSeq}&fmmntArcd=01&srchWrd=${encodedName}&srchArea=01&preSrchWrd=${encodedName}&preSrchArea=01&nowPage=1`;

  return {
    name,
    url,
    selectionReason: `숲나들e 100대 명산 공식 상세와 기존 검색 보강 자료를 기준으로 ${name}의 대표 코스, 접근, 주차, 교통, 수동 검증 항목을 정리했습니다.`,
    notes: `숲나들e ${name} 공식 상세 원문(fmmntArcd=01, fmmntSeq=${fmmntSeq})과 기존 검색 보강 자료를 기준으로 active guide를 재정리했습니다. 숲나들e 산행코스 지도와 공식 코스 표는 별도 수집 데이터에서 직접 연결합니다. 승격 전 숲나들e 원문 코스 표와 현재 공식 안내의 불일치 여부, 최신 주차·대중교통, 산불방지·기상·예약제 통제, 실제 거리와 누적고도를 수동 검증해야 합니다.`
  };
}

function createSourceLink(enhancement: ForestTripGuideEnhancement): MountainGuideLink {
  return {
    label: `숲나들e ${enhancement.name} 100대 명산 상세`,
    url: enhancement.url,
    type: 'official'
  };
}

function prependUniqueLink(
  links: MountainGuideLink[],
  link: MountainGuideLink
): MountainGuideLink[] {
  if (links.some((existing) => existing.url === link.url)) {
    return links;
  }

  return [link, ...links];
}

function appendUniqueRoutes(
  routes: MountainGuideRoute[],
  supplementalRoutes: MountainGuideRoute[]
): MountainGuideRoute[] {
  const existingNames = new Set(routes.map((route) => route.name));

  return [
    ...routes,
    ...supplementalRoutes.filter((route) => !existingNames.has(route.name))
  ];
}

function createSupplementalRoutes(
  mountainId: string,
  enhancement: ForestTripGuideEnhancement
): MountainGuideRoute[] {
  const forestTripLink = createSourceLink(enhancement);
  const searchLink = createSearchLink(enhancement.name);

  const route = (
    rank: number,
    name: string,
    path: string,
    startPoint: string,
    estimatedTime: string,
    difficulty: MountainGuideRoute['difficulty'],
    features: string[],
    warnings: string[],
    recommendationReason: string
  ): MountainGuideRoute => ({
    rank,
    isRecommended: false,
    name,
    path,
    startPoint,
    distance: '숲나들e 원문과 최신 산행 자료 기준 수동 검증 필요',
    estimatedTime,
    difficulty,
    parking: `${startPoint} 주변 주차 가능 위치와 혼잡, 유료 여부를 방문 전 확인합니다.`,
    transit: `${enhancement.name} 들머리 접근 버스, 택시, 하산 회수 가능 여부를 최신 시간표로 확인합니다.`,
    features,
    sourceLinks: [forestTripLink, searchLink],
    warnings,
    recommendationReason
  });

  switch (mountainId) {
    case '0000000001':
      return [
        route(
          90,
          '해인사·토신골·상왕봉 문화유산 왕복 후보',
          '해인사 또는 치인리 -> 토신골 -> 상왕봉 -> 해인사 또는 치인리',
          '해인사 또는 치인리',
          '약 4시간~5시간 수동 검증 필요',
          'hard',
          [
            '가야산 북쪽 해인사권 문화유산과 상왕봉 정상 산행을 연결하는 후보입니다.',
            '백운동 만물상 코스와 달리 해인사 방문 동선, 사찰 예절, 국립공원 통제를 함께 확인해야 합니다.'
          ],
          [
            '해인사 문화재 관람 동선, 국립공원 입산시간, 산불방지 통제를 확인해야 합니다.',
            '만물상 예약제와 별개로 해인사권 등산로의 현재 개방 상태를 대조해야 합니다.'
          ],
          '가야산은 백운동뿐 아니라 해인사권 수요가 크므로 문화유산 중심 보조 후보를 추가합니다.'
        )
      ];
    case '0000000002':
      return [
        route(
          90,
          '가리산자연휴양림·합수곡 숲길 저강도 탐방',
          '가리산자연휴양림 주차장 -> 합수곡 또는 숲길 일부 -> 원점회귀',
          '가리산자연휴양림 주차장',
          '약 1시간~2시간 수동 검증 필요',
          'easy',
          [
            '정상 암릉 산행이 어려운 이용자를 위한 자연휴양림 주변 보조 탐방입니다.',
            '정상 인증 코스와 분리해 가족 동행, 악천후 대체 일정으로 관리합니다.'
          ],
          [
            '정상 등정 코스가 아니므로 100대 명산 인증 코스로 표시하면 안 됩니다.',
            '휴양림 운영일, 입장료, 주차장 운영, 산불통제 여부를 확인해야 합니다.'
          ],
          '가리산 정상부 암릉 부담이 큰 이용자에게 휴양림 기반 대체 동선을 제공합니다.'
        )
      ];
    case '0000000003':
      return [
        route(
          90,
          '발심사·마항치·가리왕산 정상 왕복 후보',
          '발심사 또는 하봉 들머리 -> 마항치 -> 가리왕산 정상 -> 원점회귀',
          '발심사 또는 하봉 들머리',
          '약 4시간~5시간 수동 검증 필요',
          'hard',
          [
            '장구목이·어은골 종주보다 회수 부담을 줄이는 남쪽 접근 후보입니다.',
            '가리왕산 정상부 주목 군락과 능선 조망을 중심으로 정리합니다.'
          ],
          [
            '가리왕산은 산림유전자원보호구역과 산불통제가 잦아 현재 개방 상태 확인이 필요합니다.',
            '들머리 주차와 임도 통행 가능 여부를 현장 기준으로 확인해야 합니다.'
          ],
          '종주형 코스만으로는 차량 회수 부담이 커 원점회귀형 보조 후보를 보강합니다.'
        )
      ];
    case '0000000004':
      return [
        route(
          90,
          '석남터널·중봉·가지산 정상 최단 왕복 후보',
          '석남터널 -> 중봉 -> 가지산 정상 -> 석남터널',
          '석남터널',
          '약 3시간~4시간 수동 검증 필요',
          'normal',
          [
            '영남알프스 인증 수요가 큰 석남터널 출발 정상 왕복 후보입니다.',
            '쌀바위·운문령 장거리보다 짧아 시간 제한이 있는 이용자에게 맞습니다.'
          ],
          [
            '석남터널 주변 주차 가능 공간과 도로 통행 안전을 확인해야 합니다.',
            '겨울 결빙, 강풍, 영남알프스 인증철 혼잡을 확인해야 합니다.'
          ],
          '가지산 대표 코스 외에 실제 이용 빈도가 높은 최단 왕복 후보를 추가합니다.'
        )
      ];
    case '0000000005':
      return [
        route(
          90,
          '감악산 출렁다리·운계폭포·법륜사 저강도 탐방',
          '감악산 출렁다리 주차장 -> 출렁다리 -> 운계폭포 -> 법륜사 -> 원점회귀',
          '감악산 출렁다리 주차장',
          '약 1시간~2시간 수동 검증 필요',
          'easy',
          [
            '정상 산행이 어려운 이용자를 위한 출렁다리·운계폭포 중심 보조 탐방입니다.',
            '감악산 대표 관광 요소를 정상 인증 코스와 분리해 관리합니다.'
          ],
          [
            '정상 등정 코스가 아니므로 100대 명산 정상 인증으로 안내하면 안 됩니다.',
            '출렁다리 운영, 주차장 혼잡, 폭우 후 폭포 주변 미끄럼을 확인해야 합니다.'
          ],
          '감악산은 관광형 방문 수요가 크므로 정상 산행과 저강도 탐방을 분리합니다.'
        )
      ];
    case '0000000006':
      return [
        route(
          90,
          '강천사·구름다리·병풍폭포 가족 탐방',
          '강천산군립공원 주차장 -> 병풍폭포 -> 강천사 -> 구름다리 -> 원점회귀',
          '강천산군립공원 주차장',
          '약 1시간 30분~2시간 30분 수동 검증 필요',
          'easy',
          [
            '왕자봉 정상 산행 전후로 활용할 수 있는 강천산 대표 저강도 탐방입니다.',
            '병풍폭포, 강천사, 구름다리 등 군립공원 핵심 관광 자원을 포함합니다.'
          ],
          [
            '정상 인증 코스가 아니라 관광 탐방 후보입니다.',
            '입장료, 주차, 단풍철 혼잡, 구름다리 통제 여부를 확인해야 합니다.'
          ],
          '강천산은 군립공원 관광 수요가 커 정상 산행과 가족 탐방을 분리해 보여줍니다.'
        )
      ];
    case '0000000007':
      return [
        route(
          90,
          '동학사·은선폭포·관음봉 왕복 후보',
          '동학사 주차장 -> 동학사 -> 은선폭포 -> 관음봉 -> 원점회귀',
          '동학사 주차장',
          '약 4시간~5시간 수동 검증 필요',
          'hard',
          [
            '계룡산 동학사권 대표 정상 접근 후보입니다.',
            '은선폭포와 관음봉 조망을 포함해 갑사권 코스와 다른 접근축을 제공합니다.'
          ],
          [
            '국립공원 입산시간, 탐방로 통제, 사찰 문화재 관람 동선을 확인해야 합니다.',
            '관음봉 전후 계단과 결빙 위험을 확인해야 합니다.'
          ],
          '계룡산은 갑사·동학사 양축 수요가 커 동학사권 후보를 명시적으로 보강합니다.'
        )
      ];
    case '0000000008':
      return [
        route(
          90,
          '운두령·계방산 정상·주목군락 왕복 후보',
          '운두령 -> 1492봉 -> 계방산 정상 -> 주목군락 또는 원점회귀',
          '운두령',
          '약 3시간~4시간 수동 검증 필요',
          'normal',
          [
            '계방산 겨울 산행에서 가장 자주 쓰이는 운두령 출발 정상 왕복 후보입니다.',
            '고도가 높은 들머리에서 출발해 정상 조망과 주목군락을 확인합니다.'
          ],
          [
            '겨울 적설·결빙, 운두령 도로 통제, 주차 공간 부족을 확인해야 합니다.',
            '오대산국립공원 통제와 산불방지 기간을 확인해야 합니다.'
          ],
          '계방산은 겨울 운두령 산행 수요가 커 대표 접근축을 보강합니다.'
        )
      ];
    case '0000000009':
      return [
        route(
          90,
          '공작현·공작산 정상·수타사 하산 후보',
          '공작현 -> 공작산 정상 -> 안공작재 -> 수타사 또는 생태숲',
          '공작현',
          '약 4시간~5시간 수동 검증 필요',
          'hard',
          [
            '공작현에서 정상에 오른 뒤 수타사권으로 내려오는 대표 횡단 후보입니다.',
            '공작산 정상 암릉과 수타사 생태숲·계곡권을 연결합니다.'
          ],
          [
            '공작현 주차와 수타사 하산 후 차량 회수 교통을 확인해야 합니다.',
            '정상부 암릉, 낙엽 미끄럼, 길찾기 갈림길을 현장 기준으로 확인해야 합니다.'
          ],
          '공작산은 자료가 적어 기존 초안만으로 부족하므로 정상·수타사 연결 후보를 보강합니다.'
        )
      ];
    case '0000000010':
      return [
        route(
          90,
          '서울대입구·연주대·사당 능선 횡단 후보',
          '서울대입구 또는 관악산공원 -> 깔딱고개 -> 연주대 -> 관악문 -> 사당역',
          '서울대입구 또는 관악산공원',
          '약 4시간~5시간 수동 검증 필요',
          'hard',
          [
            '관악산의 대표 서울 도심 횡단형 산행 후보입니다.',
            '연주대 정상 인증과 사당 능선 암릉·조망을 함께 포함합니다.'
          ],
          [
            '암릉 우회로, 강풍, 우천 시 미끄럼, 주말 정상 혼잡을 확인해야 합니다.',
            '하산지가 달라 대중교통 이동을 전제로 안내해야 합니다.'
          ],
          '관악산은 들머리가 많아 서울대입구-사당 횡단형 대표 수요를 별도 후보로 보강합니다.'
        )
      ];
    default:
      return [];
  }
}

function createSearchLink(name: string): MountainGuideLink {
  return {
    label: `${name} 등산코스 검색 보강`,
    url: `https://www.google.com/search?q=${encodeURIComponent(`${name} 등산코스 주차 교통`)}`,
    type: 'search'
  };
}
