import type { MountainGuide } from '../types';

export const mountainGuides: Record<string, MountainGuide> = {
  '0000000002': {
    mountainId: '0000000002',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '가리산 자연휴양림 능선 추천코스',
        path: '가리산 자연휴양림 주차장 -> 새득이봉 -> 가삽고개 -> 가리산 정상 -> 합수곡 -> 가리산 자연휴양림 원점회귀',
        startPoint: '가리산 자연휴양림 주차장',
        distance: '약 7~9km 원점회귀',
        estimatedTime: '약 4~5시간',
        difficulty: 'normal',
        routeStops: [
        {
          name: '가리산 자연휴양림 주차장',
          label: 'start',
          elevation: '확인 필요',
          latitude: 37.8700,
          longitude: 127.9560,
        },
        {
          name: '새득이봉',
          label: 'waypoint',
          latitude: 37.8750,
          longitude: 127.9650,
        },
        {
          name: '가삽고개',
          label: 'waypoint',
          latitude: 37.8790,
          longitude: 127.9720,
        },
        {
          name: '가리산 정상',
          label: 'summit',
          elevation: '1,051m',
          latitude: 37.8800,
          longitude: 127.9810,
        },
        {
          name: '가리산 자연휴양림 주차장',
          label: 'finish',
          latitude: 37.8700,
          longitude: 127.9560,
        },
      ],
        parking: '가리산 자연휴양림 1·2주차장을 이용합니다. 주차료와 입장료는 시기별 운영 여부가 달라질 수 있어 방문 전 확인이 필요합니다.',
        transit: '홍천터미널에서 두촌 방면 버스 또는 택시로 가리산 자연휴양림까지 접근하는 방식이 현실적입니다. 배차가 적을 수 있어 시간표를 확인하세요.',
        features: [
          '새득이봉과 가삽고개를 거쳐 정상으로 오르는 능선형 코스입니다.',
          '정상부 1·2·3봉 주변은 암릉과 급경사 구간이 있어 초보자는 천천히 진행하는 편이 좋습니다.',
          '여러 산행 후기에서 자연휴양림 원점회귀 코스가 가장 자주 언급됩니다.'
        ],
        sourceLinks: [
          {
            label: '가리산 코스 정리',
            url: 'https://landyplay.com/%EA%B0%80%EB%A6%AC%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-100%EB%8C%80%EB%AA%85%EC%82%B0-%ED%99%8D%EC%B2%9C-%EA%B0%80%EB%A6%AC%EC%82%B0-%ED%9C%B4%EC%96%91%EB%A6%BC/',
            type: 'blog'
          },
          {
            label: '가리산 산행 후기',
            url: 'https://secondoflife.tistory.com/45',
            type: 'blog'
          }
        ],
        warnings: [
          '정상부 암릉, 계단, 로프 구간은 비·눈·결빙 시 위험할 수 있습니다.',
          '입장료, 주차료, 휴양림 운영 여부, 등산로 통제는 방문 전 확인하세요.'
        ],
        recommendationReason: '자연휴양림 원점회귀와 새득이봉·가삽고개 조합이 여러 후기에서 자주 언급되는 편입니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '합수곡·가삽고개 최단형 코스',
        path: '가리산 자연휴양림 주차장 -> 합수곡 -> 가삽고개 -> 가리산 정상 -> 가삽고개 -> 자연휴양림 원점회귀',
        startPoint: '가리산 자연휴양림 주차장',
        distance: '약 7~8km 원점회귀',
        estimatedTime: '약 3시간 30분~4시간',
        difficulty: 'normal',
        parking: '가리산 자연휴양림 주차장을 이용합니다. 등산만 하는 경우 등산로와 가까운 주차 위치를 현장에서 확인하세요.',
        transit: '홍천터미널에서 두촌면 방향 대중교통을 확인하고, 막차 시간이 맞지 않으면 택시 이동을 고려해야 합니다.',
        features: [
          '합수곡과 가삽고개를 거쳐 정상에 접근하는 비교적 짧은 코스입니다.',
          '정상 직전 급경사 구간을 제외하면 휴양림 숲길 중심으로 진행됩니다.'
        ],
        sourceLinks: [
          {
            label: '가리산 코스 정리',
            url: 'https://landyplay.com/%EA%B0%80%EB%A6%AC%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-100%EB%8C%80%EB%AA%85%EC%82%B0-%ED%99%8D%EC%B2%9C-%EA%B0%80%EB%A6%AC%EC%82%B0-%ED%9C%B4%EC%96%91%EB%A6%BC/',
            type: 'blog'
          }
        ],
        warnings: ['거리와 시간은 후기마다 차이가 있으므로 방문 전 최신 등산지도와 통제 정보를 확인하세요.'],
        recommendationReason: '정상까지 짧게 다녀오려는 후기에서 자주 보이는 보조 코스입니다.'
      }
    ],
    verificationLinks: [
      {
        label: '가리산 등산코스 검색',
        url: 'https://www.google.com/search?q=%EA%B0%80%EB%A6%AC%EC%82%B0+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
        type: 'search'
      },
      {
        label: '가리산 자연휴양림 검색',
        url: 'https://www.google.com/search?q=%EA%B0%80%EB%A6%AC%EC%82%B0+%EC%9E%90%EC%97%B0%ED%9C%B4%EC%96%91%EB%A6%BC+%EC%A3%BC%EC%B0%A8',
        type: 'search'
      }
    ],
    notes: '웹검색으로 정리한 미검증 초안입니다. 가리산은 자연휴양림 운영·입장·주차 조건이 변동될 수 있으니 방문 전 공식 안내를 확인하세요.'
  },
  '0000000003': {
    mountainId: '0000000003',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '장구목이·정상·어은골 종주형 코스',
        path: '장구목이 입구 -> 이끼계곡 -> 가리왕산 정상 -> 마항치 -> 어은골 -> 가리왕산 자연휴양림',
        startPoint: '장구목이 입구',
        distance: '약 10~11km',
        estimatedTime: '약 5~6시간',
        difficulty: 'hard',
        parking: '장구목이 들머리는 별도 대형 주차장이 부족하다는 후기가 많습니다. 갓길 주차 가능 여부와 통제 여부를 반드시 확인하세요.',
        transit: '정선터미널 또는 정선역에서 숙암리·장구목이 방면 이동을 확인하고, 배차가 맞지 않으면 택시 이동이 필요할 수 있습니다.',
        features: [
          '장구목이에서 정상까지 고도를 크게 올리는 코스입니다.',
          '이끼계곡과 주목 군락, 가리왕산 정상 조망을 함께 볼 수 있는 대표 산행으로 자주 언급됩니다.',
          '하산을 어은골·휴양림 방향으로 잡으면 원점회귀가 어려워 차량 회수 계획이 필요합니다.'
        ],
        sourceLinks: [
          {
            label: '장구목이 코스 후기',
            url: 'https://landyplay.com/100%EB%8C%80-%EB%AA%85%EC%82%B0-%EC%A0%95%EC%84%A0-%EA%B0%80%EB%A6%AC%EC%99%95%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%9E%A5%EA%B5%AC%EB%AA%A9%EC%9D%B4-%EC%A0%95%EC%83%81-%EC%96%B4/',
            type: 'blog'
          }
        ],
        warnings: [
          '계곡을 건너는 구간은 비가 온 뒤 위험할 수 있습니다.',
          '들머리·날머리 주차, 택시, 버스, 입산 통제는 방문 전 확인하세요.'
        ],
        recommendationReason: '장구목이와 어은골을 연결하는 산행기가 가리왕산 후기에서 자주 보입니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '가리왕산 자연휴양림 왕복 코스',
        path: '가리왕산 자연휴양림 -> 어은골 -> 마항치 -> 가리왕산 정상 -> 마항치 -> 자연휴양림 원점회귀',
        startPoint: '가리왕산 자연휴양림',
        distance: '약 8~10km',
        estimatedTime: '약 5시간 안팎',
        difficulty: 'hard',
        parking: '가리왕산 자연휴양림 주차장을 이용합니다. 휴양림 입장·주차·운영시간은 방문 전 확인하세요.',
        transit: '정선터미널에서 회동리·가리왕산자연휴양림 방면 교통을 확인하고, 대중교통이 맞지 않으면 택시를 고려하세요.',
        features: [
          '자연휴양림을 출발해 어은골·마항치 방향으로 정상에 접근하는 코스입니다.',
          '장구목이보다 원점회귀 계획을 세우기 쉽지만 정상까지 오르막 부담은 큽니다.'
        ],
        sourceLinks: [
          {
            label: '가리왕산 관광 정보',
            url: 'https://aiernews.kr/travel/attractions/gangwon/%EA%B0%80%EB%A6%AC%EC%99%95%EC%82%B0-127508/',
            type: 'search'
          },
          {
            label: '가리왕산 코스 정리',
            url: 'https://ddunirecord.tistory.com/entry/%EA%B0%80%EB%A6%AC%EC%99%95%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%B6%94%EC%B2%9C-%EC%9E%90%EC%97%B0%ED%9C%B4%EC%96%91%EB%A6%BC-%EC%BC%80%EC%9D%B4%EB%B8%94%EC%B9%B4-%EC%B5%9C%EB%8B%A8%EC%BD%94%EC%8A%A4-%EB%82%9C%EC%9D%B4%EB%8F%84-%EC%8B%9C%EA%B0%84-%EC%A7%80%EB%8F%84-%EC%A3%BC%EC%B0%A8%EC%9E%A5',
            type: 'blog'
          }
        ],
        warnings: ['휴양림 운영시간, 주차요금, 산불방지 입산통제 기간은 방문 전 확인하세요.'],
        recommendationReason: '자연휴양림 출발 코스는 주차와 원점회귀를 중시하는 산행에서 보조 선택지로 언급됩니다.'
      }
    ],
    verificationLinks: [
      {
        label: '가리왕산 등산코스 검색',
        url: 'https://www.google.com/search?q=%EA%B0%80%EB%A6%AC%EC%99%95%EC%82%B0+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
        type: 'search'
      }
    ],
    notes: '가리왕산은 들머리와 날머리의 교통 편차가 큽니다. 종주형 코스는 차량 회수와 택시 가능 여부를 먼저 확인해야 합니다.'
  },
  '0000000001': {
    mountainId: '0000000001',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '백운동·만물상·칠불봉·상왕봉 코스',
        path: '백운동 탐방지원센터 -> 만물상 -> 서성재 -> 칠불봉 -> 상왕봉 -> 용기골 -> 백운동 원점회귀',
        startPoint: '백운동 탐방지원센터',
        distance: '약 8~10km',
        estimatedTime: '약 5~6시간',
        difficulty: 'hard',
        parking: '백운동 탐방지원센터·백운동 주차장 방면을 이용합니다. 단풍철과 주말에는 혼잡할 수 있습니다.',
        transit: '성주 또는 합천 방면 터미널에서 백운동 탐방지원센터 접근 교통을 확인하세요. 대중교통이 제한적이면 택시 이동이 필요합니다.',
        features: [
          '만물상 암릉과 서성재, 칠불봉, 상왕봉을 엮는 가야산의 대표 조망 코스입니다.',
          '경사가 크고 암릉이 많아 체력과 날씨 영향을 많이 받습니다.',
          '만물상 구간은 예약제·통제가 적용될 수 있어 사전 확인이 필요합니다.'
        ],
        sourceLinks: [
          {
            label: '가야산 코스 정리',
            url: 'https://koreahike.com/%EA%B0%80%EC%95%BC%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4/',
            type: 'blog'
          },
          {
            label: '만물상 예약제 참고',
            url: 'https://rainbowmemories.tistory.com/entry/%EA%B0%80%EC%9D%84%EC%97%90%EB%A7%8C-%EA%B1%B8%EC%9D%84-%EC%88%98-%EC%9E%88%EB%8A%94-%ED%8A%B9%EB%B3%84%ED%95%9C-%EA%B8%B8-%EA%B5%AD%EB%A6%BD%EA%B3%B5%EC%9B%90-%E2%80%98%ED%83%90%EB%B0%A9%EC%98%88%EC%95%BD%EC%A0%9C-%EC%BD%94%EC%8A%A4%E2%80%99-%EC%B4%9D%EC%A0%95%EB%A6%AC',
            type: 'blog'
          }
        ],
        warnings: [
          '만물상 구간 예약제, 낙석·암릉 위험, 입산 시간은 방문 전 국립공원공단 안내로 확인하세요.',
          '단풍철 주차와 셔틀·버스 운영은 현장 상황에 따라 달라질 수 있습니다.'
        ],
        recommendationReason: '만물상과 정상부를 함께 연결하는 코스가 가야산 대표 산행으로 자주 언급됩니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '해인사·토신골·상왕봉 코스',
        path: '해인사 -> 토신골 -> 상왕봉 -> 토신골 -> 해인사 원점회귀',
        startPoint: '해인사 또는 토신골 탐방지원센터',
        distance: '약 8km 안팎',
        estimatedTime: '약 4~5시간',
        difficulty: 'normal',
        parking: '해인사 주차장을 이용합니다. 주차요금과 문화재·사찰 구역 운영 정보는 방문 전 확인하세요.',
        transit: '합천터미널에서 해인사 방면 버스를 확인하고, 배차 간격과 막차 시간을 먼저 확인하세요.',
        features: [
          '해인사와 홍류동 계곡을 함께 고려할 수 있는 문화·산행 결합 코스입니다.',
          '만물상보다 암릉 부담은 상대적으로 낮지만 정상부 오르막은 체력이 필요합니다.'
        ],
        sourceLinks: [
          {
            label: '가야산 코스 가이드',
            url: 'https://goou.tistory.com/155',
            type: 'blog'
          },
          {
            label: '가야산 교통·주차 정리',
            url: 'https://semohoo.tistory.com/entry/%EA%B0%80%EC%95%BC%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EA%B5%90%ED%86%B5%ED%8E%B8-%EC%A3%BC%EC%B0%A8%EC%A0%95%EB%B3%B4',
            type: 'blog'
          }
        ],
        warnings: ['해인사 방면 주차, 버스 시간표, 국립공원 입산 시간은 방문 전 확인하세요.'],
        recommendationReason: '해인사와 연계한 정상 산행을 원하는 이용자에게 보조 코스로 적합합니다.'
      },
      {
        rank: 3,
        isRecommended: false,
        name: '가야산 소리길 산책 코스',
        path: '대장경테마파크 또는 소리길 입구 -> 농산정 -> 홍류동 계곡 -> 영산교 -> 해인사 방면',
        startPoint: '소리길 입구 또는 대장경테마파크',
        distance: '약 6km',
        estimatedTime: '약 2시간 30분',
        difficulty: 'easy',
        parking: '대장경테마파크 주차장 또는 소리길 인근 주차장을 확인하세요.',
        transit: '합천터미널에서 해인사·대장경테마파크 방면 버스를 확인하세요.',
        features: [
          '정상 등정이 아니라 홍류동 계곡을 따라 걷는 저지대 탐방로입니다.',
          '초보자, 가족, 산행 전후 가벼운 걷기 코스로 적합합니다.'
        ],
        sourceLinks: [
          {
            label: '가야산 소리길 정보',
            url: 'https://semohoo.tistory.com/entry/%EA%B0%80%EC%95%BC%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EA%B5%90%ED%86%B5%ED%8E%B8-%EC%A3%BC%EC%B0%A8%EC%A0%95%EB%B3%B4',
            type: 'blog'
          }
        ],
        warnings: ['계곡 탐방로도 기상 악화, 낙석, 통제 여부를 방문 전 확인하세요.'],
        recommendationReason: '정상 산행이 부담스러운 이용자를 위한 쉬운 보조 코스입니다.'
      }
    ],
    verificationLinks: [
      {
        label: '가야산 국립공원 코스 검색',
        url: 'https://www.google.com/search?q=%EA%B0%80%EC%95%BC%EC%82%B0%EA%B5%AD%EB%A6%BD%EA%B3%B5%EC%9B%90+%ED%83%90%EB%B0%A9%EC%BD%94%EC%8A%A4',
        type: 'search'
      }
    ],
    notes: '가야산은 국립공원 구역이므로 입산 시간, 예약제, 통제 구간을 국립공원공단 최신 안내로 다시 확인해야 합니다.'
  },
  '0000000004': {
    mountainId: '0000000004',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '석남터널 최단 원점회귀 코스',
        path: '석남터널 입구 -> 석남고개 -> 중봉 -> 가지산 정상 -> 중봉 -> 석남터널 원점회귀',
        startPoint: '석남터널 입구',
        distance: '약 6.8~7.4km 원점회귀',
        estimatedTime: '약 3시간 30분~4시간',
        difficulty: 'normal',
        parking: '석남터널 입구 주차공간을 이용합니다. 공간이 협소하다는 후기가 많아 주말에는 이른 도착이 필요합니다.',
        transit: '울산역에서 석남터널 방면 버스·택시 접근을 확인하세요. 후기 기준 택시 이동도 자주 언급됩니다.',
        features: [
          '석남고개와 중봉을 거쳐 가지산 정상에 오르는 가장 대중적인 최단 코스입니다.',
          '초반 계단과 고도 상승이 뚜렷하지만 전체 거리가 짧아 당일 산행에 많이 선택됩니다.',
          '영남알프스 최고봉 조망을 짧은 시간에 노릴 수 있습니다.'
        ],
        sourceLinks: [
          {
            label: '오늘등산 석남터널 코스',
            url: 'https://ohiking.today/mountain_course/390',
            type: 'search'
          },
          {
            label: '석남터널 산행 후기',
            url: 'https://mountaintraveler.tistory.com/95',
            type: 'blog'
          }
        ],
        warnings: [
          '석남터널 주차 가능 대수, 화장실 이용, 겨울 결빙 여부는 방문 전 확인하세요.',
          '정상부 바람과 기상 변화가 빠를 수 있습니다.'
        ],
        recommendationReason: '석남터널 코스가 가지산 최단·대표 코스로 가장 많이 언급되는 편입니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '석남사·쌀바위 코스',
        path: '석남사 주차장 -> 쌀바위 -> 가지산 정상 -> 쌀바위 -> 석남사 원점회귀',
        startPoint: '석남사 주차장',
        distance: '약 8~10km 왕복',
        estimatedTime: '약 5시간 안팎',
        difficulty: 'hard',
        parking: '석남사 주차장 이용 여부와 요금, 사찰 주변 혼잡도를 방문 전 확인하세요.',
        transit: '울산역 또는 언양터미널에서 석남사 방면 버스를 확인하세요.',
        features: [
          '석남사에서 쌀바위를 지나 정상으로 접근하는 전통적인 산행 코스입니다.',
          '석남터널보다 길고 누적 오르막 부담이 커 체력 여유가 필요합니다.'
        ],
        sourceLinks: [
          {
            label: '가지산 코스 정리',
            url: 'https://ihelpline.ch-crash.com/%EA%B0%80%EC%A7%80%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%8B%9C%EA%B0%84-%EB%82%9C%EC%9D%B4%EB%8F%84-%EC%A3%BC%EC%B0%A8%EC%9E%A5-%EA%B0%80%EC%A7%80%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94/',
            type: 'blog'
          }
        ],
        warnings: ['사찰 주차, 버스 시간표, 산불방지 통제는 방문 전 확인하세요.'],
        recommendationReason: '쌀바위와 석남사를 함께 보는 보조 코스로 언급됩니다.'
      },
      {
        rank: 3,
        isRecommended: false,
        name: '운문령·상운산·쌀바위 코스',
        path: '운문령 -> 귀바위 -> 상운산 -> 쌀바위 -> 가지산 정상 -> 운문령 또는 석남사 방향 하산',
        startPoint: '운문령',
        distance: '약 10~12km',
        estimatedTime: '약 5~6시간',
        difficulty: 'hard',
        parking: '운문령 주변 주차 가능 공간을 현장 상황에 맞춰 확인해야 합니다.',
        transit: '청도·언양 방면에서 운문령 접근 교통은 제한적일 수 있어 택시와 차량 회수 계획을 확인하세요.',
        features: [
          '상운산과 쌀바위를 거쳐 가지산 정상으로 이어지는 능선 산행입니다.',
          '석남터널보다 길지만 능선 조망과 연계 산행 느낌이 강합니다.'
        ],
        sourceLinks: [
          {
            label: '가지산 코스 목록',
            url: 'https://koreahike.com/%EA%B0%80%EC%A7%80%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4/',
            type: 'blog'
          }
        ],
        warnings: ['운문령 출발 코스는 대중교통과 하산 계획을 방문 전 확인하세요.'],
        recommendationReason: '긴 능선 산행을 원하는 경우 보조 선택지로 정리했습니다.'
      }
    ],
    verificationLinks: [
      {
        label: '가지산 등산코스 검색',
        url: 'https://www.google.com/search?q=%EA%B0%80%EC%A7%80%EC%82%B0+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4+%EC%84%9D%EB%82%A8%ED%84%B0%EB%84%90',
        type: 'search'
      }
    ],
    notes: '가지산은 영남알프스 인기 산행지라 주말 주차 혼잡이 큽니다. 석남터널 주차와 버스 운행을 먼저 확인하세요.'
  },
  '0000000005': {
    mountainId: '0000000005',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-12',
    confidence: 'high',
    selectionReason:
      "예로부터 경기 5악의 하나로서 폭포·계곡·암벽 등을 고루 갖추고 있으며, 임진강·개성 송악산 등의 조망이 좋은 점 등을 고려하여 선정. 수량이 풍부한 운계폭포가 있고, 정상에는 글자가 모두 마멸되어 판독이 불가능한 비뜰대왕비(파주군 향토유적 제8호)가 있는데 `설인귀(薛仁貴)'설과 `진흥왕 순수비'설이 나뉘어 속전되고 있음. 임꺽정이 관군의 추격을 피하기 위해 숨어 지냈다는 장군봉 아래 임꺽정 굴이 있음.",
    photoLinks: [
      {
        label: '숲나들e 감악산 사진 1',
        url: 'https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165880&ATTCH_FILE_MSTER_ID=FILEMSTER_00160495',
        type: 'official'
      },
      {
        label: '숲나들e 감악산 사진 2',
        url: 'https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165881&ATTCH_FILE_MSTER_ID=FILEMSTER_00160495',
        type: 'official'
      },
      {
        label: '숲나들e 감악산 사진 3',
        url: 'https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165882&ATTCH_FILE_MSTER_ID=FILEMSTER_00160495',
        type: 'official'
      }
    ],
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '운계폭포·범륜사·까치봉·정상·임꺽정봉 원점회귀 코스',
        path:
          '운계폭포 입구 주차장 -> 범륜사 -> 만남의 숲 -> 까치봉 능선 삼거리 -> 까치봉 -> 감악산 정상 -> 임꺽정봉 -> 만남의 숲 -> 범륜사 -> 운계폭포 입구 주차장 원점회귀',
        startPoint: '운계폭포 입구 주차장',
        distance: '약 6~8km 원점회귀',
        estimatedTime: '약 2시간 55분~4시간',
        difficulty: 'normal',
        parking:
          '운계폭포 입구 주차장 또는 감악산 출렁다리 주차장을 이용합니다. 검색 자료에는 출렁다리 주차장 주소가 파주시 적성면 설마리 48-6 또는 48-44 일대로 안내되며, 주차요금은 시기와 운영 주체에 따라 달라질 수 있어 방문 전 확인하세요.',
        transit:
          '숲나들e는 의정부에서 적성 방면 25번 시내버스를 안내합니다. 검색 자료에서는 의정부역·녹양역·양주역을 지나는 25번, 덕정역 방면 25-1번·2-2번, 주말·공휴일 문산역 7700/7701번 감악산행 버스가 언급됩니다. 실제 운행 여부와 막차는 방문 전 확인하세요.',
        features: [
          '숲나들e 표에서 추천코스로 제공되는 원점회귀 동선입니다.',
          '운계폭포, 범륜사, 만남의 숲, 까치봉, 정상, 임꺽정봉을 한 번에 연결합니다.',
          '검색 후기 기준 비슷한 출렁다리·범륜사·정상 원점회귀 코스는 약 6.1~8.5km, 3시간 30분~4시간대 기록이 많습니다.'
        ],
        sourceLinks: [
          {
            label: '숲나들e 감악산 상세',
            url: 'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=71947&fmmntArcd=01&srchWrd=&srchArea=01&preSrchWrd=&preSrchArea=01&nowPage=1',
            type: 'official'
          },
          {
            label: '감악산 출렁다리 코스·주차 정리',
            url: 'https://landyplay.com/%EA%B0%90%EC%95%85%EC%82%B0-%EC%B6%9C%EB%A0%81%EB%8B%A4%EB%A6%AC-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EA%B0%90%EC%95%85%EC%82%B0-%EC%B6%9C%EB%A0%81%EB%8B%A4%EB%A6%AC-%EC%A3%BC%EC%B0%A8%EC%9E%A5/',
            type: 'blog'
          },
          {
            label: '감악산 대중교통 후기',
            url: 'https://kchgg.tistory.com/entry/%ED%8C%8C%EC%A3%BC-%EA%B0%90%EC%95%85%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
            type: 'blog'
          }
        ],
        warnings: [
          '숲나들e 자료의 교통 배차, 입장료, 주차 조건은 현재와 다를 수 있으니 방문 전 확인하세요.',
          '정상부와 임꺽정봉 주변은 바위 구간이 있어 우천·결빙 시 주의하세요.',
          '코스 이미지는 준비 중이므로 현장 이정표와 최신 등산지도를 우선하세요.'
        ],
        recommendationReason: '숲나들e 산행코스 표에서 추천코스로 표시된 동선이며, 검색 결과에서도 운계폭포·범륜사·정상 원점회귀 계열이 가장 자주 보입니다.',
        routeStops: [
          {
            name: '운계폭포 입구 주차장',
            label: 'start',
            elevation: '확인 필요',
            estimatedArrival: '09:00',
            latitude: 37.9344,
            longitude: 126.9551
          },
          {
            name: '범륜사',
            label: 'waypoint',
            elevation: '확인 필요',
            distanceFromPrevious: '약 1.1km',
            estimatedArrival: '09:30',
            latitude: 37.9377,
            longitude: 126.9607
          },
          {
            name: '만남의 숲',
            label: 'waypoint',
            distanceFromPrevious: '약 0.9km',
            estimatedArrival: '10:00',
            latitude: 37.9398,
            longitude: 126.9648
          },
          {
            name: '까치봉',
            label: 'waypoint',
            distanceFromPrevious: '약 1.2km',
            estimatedArrival: '10:45',
            latitude: 37.9442,
            longitude: 126.9664
          },
          {
            name: '감악산 정상',
            label: 'summit',
            elevation: '675m',
            distanceFromPrevious: '약 0.8km',
            estimatedArrival: '11:15',
            latitude: 37.9411,
            longitude: 126.97
          },
          {
            name: '임꺽정봉',
            label: 'waypoint',
            elevation: '676m',
            distanceFromPrevious: '약 0.6km',
            estimatedArrival: '11:35',
            latitude: 37.9378,
            longitude: 126.9735
          },
          {
            name: '운계폭포 입구 주차장',
            label: 'finish',
            distanceFromPrevious: '약 2.5km',
            estimatedArrival: '13:00',
            latitude: 37.9344,
            longitude: 126.9551
          }
        ],
      },
      {
        rank: 2,
        isRecommended: false,
        name: '설마리·범륜사·정상·임꺽정봉·신암리 코스',
        path: '설마리 -> 범륜사 -> 감악산 정상 -> 임꺽정봉 -> 신암리',
        startPoint: '설마리',
        distance: '거리 확인 필요',
        estimatedTime: '약 3시간 40분',
        difficulty: 'normal',
        parking: '설마리 또는 범륜사 주변 주차 가능 여부를 확인하세요. 도착지가 신암리인 횡단형 코스라 자차 이용 시 차량 회수 계획이 필요합니다.',
        transit: '의정부·문산·동두천 방면에서 감악산 입구 또는 설마리 접근 버스를 확인하고, 하산지 신암리에서 복귀 가능한 버스·택시를 별도로 확인하세요.',
        features: [
          '숲나들e 표의 기타코스1을 기반으로 정리한 횡단형 코스입니다.',
          '범륜사에서 정상과 임꺽정봉을 거쳐 신암리로 내려갑니다.',
          '거리 정보는 검색 결과에서 일관되게 확인되지 않아 현장 등산지도 기준 추가 확인이 필요합니다.'
        ],
        sourceLinks: [
          {
            label: '숲나들e 감악산 상세',
            url: 'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=71947&fmmntArcd=01&srchWrd=&srchArea=01&preSrchWrd=&preSrchArea=01&nowPage=1',
            type: 'official'
          },
          {
            label: '감악산 범륜사·임꺽정봉 산행 후기',
            url: 'https://lotus9217.tistory.com/14',
            type: 'blog'
          }
        ],
        warnings: [
          '출발지와 도착지가 다르므로 대중교통, 택시, 차량 회수 가능 여부를 방문 전 확인하세요.',
          '코스 이미지는 준비 중이므로 현장 이정표와 최신 등산지도를 우선하세요.'
        ],
        recommendationReason: '숲나들e 산행코스 표의 기타코스1이며, 세부 교통은 검색 자료를 바탕으로 보수적으로 정리했습니다.',
        routeStops: [
          {
            name: '설마리',
            label: 'start',
            estimatedArrival: '09:00',
            latitude: 37.9318,
            longitude: 126.9564
          },
          {
            name: '범륜사',
            label: 'waypoint',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '09:35',
            latitude: 37.9377,
            longitude: 126.9607
          },
          {
            name: '감악산 정상',
            label: 'summit',
            elevation: '675m',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '11:15',
            latitude: 37.9411,
            longitude: 126.97
          },
          {
            name: '임꺽정봉',
            label: 'waypoint',
            elevation: '676m',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '11:45',
            latitude: 37.9378,
            longitude: 126.9735
          },
          {
            name: '신암리',
            label: 'finish',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '12:40',
            latitude: 37.9284,
            longitude: 126.9832
          }
        ],
      },
      {
        rank: 3,
        isRecommended: false,
        name: '신암리·신암저수지·정상·범륜사·운계폭포·설마리 코스',
        path: '신암리 -> 신암저수지 -> 감악산 정상 -> 범륜사 -> 운계폭포 -> 설마리',
        startPoint: '신암리',
        distance: '거리 확인 필요',
        estimatedTime: '약 4시간',
        difficulty: 'normal',
        parking: '신암리 또는 설마리 방면 주차 가능 여부를 확인하세요. 출발지와 하산지가 달라 자차 이용 시 차량 회수나 택시 계획이 필요합니다.',
        transit: '신암리 접근 교통과 설마리 하산 후 복귀 교통을 함께 확인하세요. 검색 자료가 많지 않아 버스 시간표와 택시 가능 여부를 방문 전 확인해야 합니다.',
        features: [
          '숲나들e 표의 기타코스2를 기반으로 정리한 긴 횡단형 코스입니다.',
          '신암저수지에서 정상으로 오른 뒤 범륜사와 운계폭포를 거쳐 설마리로 내려옵니다.',
          '운계폭포·범륜사 구간은 검색 후기에서 자주 확인되지만 신암리 출발 전체 동선은 추가 검증이 필요합니다.'
        ],
        sourceLinks: [
          {
            label: '숲나들e 감악산 상세',
            url: 'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=71947&fmmntArcd=01&srchWrd=&srchArea=01&preSrchWrd=&preSrchArea=01&nowPage=1',
            type: 'official'
          },
          {
            label: '감악산 신암리 코스 검색',
            url: 'https://www.google.com/search?q=%EA%B0%90%EC%95%85%EC%82%B0+%EC%8B%A0%EC%95%94%EB%A6%AC+%EC%8B%A0%EC%95%94%EC%A0%80%EC%88%98%EC%A7%80+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
            type: 'search'
          }
        ],
        warnings: [
          '하산지가 출발지와 다르므로 교통편, 택시 가능 여부, 등산로 통제를 방문 전 확인하세요.',
          '코스 이미지는 준비 중이므로 현장 이정표와 최신 등산지도를 우선하세요.'
        ],
        recommendationReason: '숲나들e 산행코스 표의 기타코스2이며, 검색 자료가 부족한 구간은 확인 필요로 표시했습니다.',
        routeStops: [
          {
            name: '신암리',
            label: 'start',
            estimatedArrival: '09:00',
            latitude: 37.9284,
            longitude: 126.9832
          },
          {
            name: '신암저수지',
            label: 'waypoint',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '09:35',
            latitude: 37.9321,
            longitude: 126.9792
          },
          {
            name: '감악산 정상',
            label: 'summit',
            elevation: '675m',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '10:55',
            latitude: 37.9411,
            longitude: 126.97
          },
          {
            name: '범륜사',
            label: 'waypoint',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '12:05',
            latitude: 37.9377,
            longitude: 126.9607
          },
          {
            name: '운계폭포',
            label: 'waypoint',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '12:25',
            latitude: 37.9358,
            longitude: 126.9579
          },
          {
            name: '설마리',
            label: 'finish',
            distanceFromPrevious: '확인 필요',
            estimatedArrival: '13:00',
            latitude: 37.9318,
            longitude: 126.9564
          }
        ],
      }
    ],
    verificationLinks: [
      {
        label: '숲나들e 감악산 상세',
        url: 'https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=71947&fmmntArcd=01&srchWrd=&srchArea=01&preSrchWrd=&preSrchArea=01&nowPage=1',
        type: 'official'
      }
    ],
    notes:
      '숲나들e 감악산 페이지의 선정이유와 산행코스 표를 기준으로 하고, 주차·대중교통·거리 설명은 검색 자료를 함께 보아 보강한 초안입니다.'
  },
  '0000000006': {
    mountainId: '0000000006',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'high',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '병풍폭포·강천사·구름다리·구장군폭포 코스',
        path: '강천산군립공원 매표소 -> 병풍폭포 -> 강천사 -> 구름다리 -> 구장군폭포 -> 매표소 원점회귀',
        startPoint: '강천산군립공원 매표소',
        distance: '약 5.5km',
        estimatedTime: '약 2시간',
        difficulty: 'easy',
        parking: '강천산군립공원 주차장을 이용합니다. 공식 관광 정보 기준 소형·대형·임시주차장이 있으나 성수기 혼잡은 확인하세요.',
        transit: '순창터미널에서 강천산 방면 군내버스 또는 택시를 확인하세요. 버스 배차가 적을 수 있습니다.',
        features: [
          '병풍폭포, 강천사, 구름다리, 구장군폭포를 잇는 강천산 대표 탐방 동선입니다.',
          '정상 산행보다 관광·계곡 산책 성격이 강하고 초보자에게 부담이 적습니다.',
          '강천산을 처음 방문하는 이용자에게 가장 많이 추천되는 흐름입니다.'
        ],
        sourceLinks: [
          {
            label: '강천산 공식 관광 정보',
            url: 'https://www.tripinfo.co.kr/info.html?content_id=126249&content_type_id=12&device=pc',
            type: 'official'
          },
          {
            label: '강천산 코스 정리',
            url: 'https://dodo0302.tistory.com/entry/%EA%B0%95%EC%B2%9C%EC%82%B0-%EA%B5%B0%EB%A6%BD%EA%B3%B5%EC%9B%90-%EC%82%B0%ED%96%89%EC%BD%94%EC%8A%A4-%EB%AA%A8%EB%93%A0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%A7%80%EB%8F%84-%EB%82%9C%EC%9D%B4%EB%8F%84%EB%B3%84-%EB%A7%A8%EB%B0%9C%EC%82%B0%EC%B1%85%EB%A1%9C',
            type: 'blog'
          }
        ],
        warnings: [
          '입장시간, 입장료, 상품권 환급, 기상 통제는 방문 전 확인하세요.',
          '구름다리와 폭포 주변은 성수기 혼잡이 큽니다.'
        ],
        recommendationReason: '공식 관광 정보와 후기에서 가장 기본 동선으로 반복 확인되는 코스입니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '왕자봉 코스 1',
        path: '강천산군립공원 매표소 -> 병풍폭포 -> 깃대봉 -> 왕자봉 -> 구름다리 -> 매표소 원점회귀',
        startPoint: '강천산군립공원 매표소',
        distance: '약 6.2km',
        estimatedTime: '약 3시간',
        difficulty: 'normal',
        parking: '강천산군립공원 주차장을 이용합니다. 단풍철에는 3·4주차장 등 외곽 주차 후 이동할 수 있습니다.',
        transit: '순창터미널에서 강천산 방면 교통을 확인하고, 막차 시간을 먼저 확인하세요.',
        features: [
          '병풍폭포에서 깃대봉과 왕자봉을 거쳐 구름다리·매표소로 돌아오는 정상 산행 코스입니다.',
          '강천산 산행 인증과 관광 동선을 함께 원하는 경우 적합합니다.'
        ],
        sourceLinks: [
          {
            label: '강천산 공식 관광 정보',
            url: 'https://www.tripinfo.co.kr/info.html?content_id=126249&content_type_id=12&device=pc',
            type: 'official'
          }
        ],
        warnings: ['왕자봉 오르막, 단풍철 혼잡, 입장 마감 시간을 방문 전 확인하세요.'],
        recommendationReason: '정상 산행을 포함하면서도 시간이 비교적 짧은 보조 코스입니다.'
      },
      {
        rank: 3,
        isRecommended: false,
        name: '왕자봉·형제봉·구장군폭포 코스',
        path: '강천산군립공원 매표소 -> 병풍폭포 -> 깃대봉 -> 왕자봉 -> 형제봉 -> 제2호수 -> 구장군폭포 -> 매표소 원점회귀',
        startPoint: '강천산군립공원 매표소',
        distance: '약 8.7km',
        estimatedTime: '약 4시간',
        difficulty: 'hard',
        parking: '강천산군립공원 주차장을 이용합니다. 성수기에는 외곽 주차장 이동 시간을 고려하세요.',
        transit: '순창터미널에서 강천산 방면 버스·택시를 확인하세요.',
        features: [
          '깃대봉, 왕자봉, 형제봉, 제2호수, 구장군폭포를 연결하는 긴 원점회귀 코스입니다.',
          '강천산의 산행 요소와 폭포·계곡 경관을 넓게 보는 코스입니다.'
        ],
        sourceLinks: [
          {
            label: '강천산 공식 관광 정보',
            url: 'https://www.tripinfo.co.kr/info.html?content_id=126249&content_type_id=12&device=pc',
            type: 'official'
          },
          {
            label: '왕자봉 원점회귀 후기',
            url: 'https://maxcamp.tistory.com/213',
            type: 'blog'
          }
        ],
        warnings: ['긴 코스이므로 입장 마감, 하산 시간, 기상 상황을 방문 전 확인하세요.'],
        recommendationReason: '강천산 정상부 능선을 더 길게 걷고 싶은 이용자를 위한 코스입니다.'
      }
    ],
    verificationLinks: [
      {
        label: '강천산군립공원 공식 정보',
        url: 'https://www.tripinfo.co.kr/info.html?content_id=126249&content_type_id=12&device=pc',
        type: 'official'
      }
    ],
    notes: '강천산은 공식 관광 정보에 코스 거리와 시간이 비교적 잘 정리되어 있어 신뢰도를 높게 두었습니다. 그래도 입장·주차·통제는 방문 전 확인하세요.'
  },
  '0000000007': {
    mountainId: '0000000007',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '천정·남매탑·삼불봉·관음봉·동학사 순환 코스',
        path: '천정탐방지원센터 -> 남매탑 -> 삼불봉 -> 자연성릉 -> 관음봉 -> 은선폭포 -> 동학사 -> 동학사 주차장',
        startPoint: '천정탐방지원센터 또는 동학사 주차장',
        distance: '약 9.2km',
        estimatedTime: '약 5시간 30분~6시간',
        difficulty: 'hard',
        parking: '동학사 주차장을 이용합니다. 주차요금과 문화재 관람료·입산시간은 방문 전 확인하세요.',
        transit: '대전 유성·공주 방면에서 동학사행 버스를 이용하는 방식이 일반적입니다. 배차와 막차를 확인하세요.',
        features: [
          '남매탑, 삼불봉, 자연성릉, 관음봉, 은선폭포, 동학사를 연결하는 대표 순환 산행입니다.',
          '계룡산의 주요 조망과 능선 구간을 한 번에 경험할 수 있습니다.',
          '자연성릉 구간은 조망이 좋지만 바람과 노출감이 있어 기상 영향을 받습니다.'
        ],
        sourceLinks: [
          {
            label: '계룡산 순환 코스 후기',
            url: 'https://baegdu.tistory.com/entry/%EA%B3%84%EB%A3%A1%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%A0%95%EB%B3%B4%EB%8C%80%EC%A4%91%EA%B5%90%ED%86%B5%EC%B2%9C%EC%A0%95%ED%83%90%EB%B0%A9-%EC%A7%80%EC%9B%90%EC%84%BC%ED%84%B0-%EC%82%BC%EB%B6%88%EB%B4%89-%EA%B4%80%EC%9D%8C%EB%B4%89-%EB%8F%99%ED%95%99%EC%82%AC',
            type: 'blog'
          },
          {
            label: '계룡산 코스 정리',
            url: 'https://semohoo.tistory.com/entry/%EA%B3%84%EB%A3%A1%EC%82%B0-%EA%B5%AD%EB%A6%BD%EA%B3%B5%EC%9B%90-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EA%B5%90%ED%86%B5%ED%8E%B8-%EC%A3%BC%EC%B0%A8%EC%A0%95%EB%B3%B4',
            type: 'blog'
          }
        ],
        warnings: [
          '국립공원 입산시간, 통제구간, 사찰 관람료, 주차요금은 방문 전 확인하세요.',
          '천황봉 일대 일부 구간은 통제될 수 있으므로 허용 탐방로만 이용하세요.'
        ],
        recommendationReason: '동학사·남매탑·삼불봉·관음봉을 잇는 순환 산행이 계룡산 대표 코스로 자주 언급됩니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '동학사 1코스',
        path: '동학사 주차장 -> 동학사 -> 은선폭포 -> 관음봉 -> 동학사 방향 원점회귀',
        startPoint: '동학사 주차장',
        distance: '약 4.4km 편도',
        estimatedTime: '약 2시간 30분 편도',
        difficulty: 'normal',
        parking: '동학사 주차장을 이용합니다. 주말과 단풍철 혼잡을 고려하세요.',
        transit: '유성온천역·공주 방면에서 동학사 버스 접근을 확인하세요.',
        features: [
          '동학사 계곡, 동학사, 은선폭포, 관음봉을 잇는 대표 단일 코스입니다.',
          '순환 코스보다 짧게 관음봉을 목표로 잡을 수 있습니다.'
        ],
        sourceLinks: [
          {
            label: '동학사 1코스 정리',
            url: 'https://semohoo.tistory.com/entry/%EA%B3%84%EB%A3%A1%EC%82%B0-%EA%B5%AD%EB%A6%BD%EA%B3%B5%EC%9B%90-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EA%B5%90%ED%86%B5%ED%8E%B8-%EC%A3%BC%EC%B0%A8%EC%A0%95%EB%B3%B4',
            type: 'blog'
          }
        ],
        warnings: ['편도 코스 기준이므로 왕복 시간과 하산 계획을 방문 전 확인하세요.'],
        recommendationReason: '동학사 지구에서 짧게 관음봉을 오르는 대표 보조 코스입니다.'
      },
      {
        rank: 3,
        isRecommended: false,
        name: '갑사·금잔디고개·삼불봉·동학사 코스',
        path: '갑사 주차장 -> 갑사계곡 -> 금잔디고개 -> 삼불봉 -> 남매탑 -> 동학사',
        startPoint: '갑사 주차장',
        distance: '약 4.7km 편도',
        estimatedTime: '약 3시간 40분',
        difficulty: 'normal',
        parking: '갑사주차장을 이용합니다. 주차 가능 여부와 사찰 주변 요금은 방문 전 확인하세요.',
        transit: '공주터미널에서 갑사 방면 버스 또는 택시를 확인하고, 동학사로 하산하면 차량 회수 계획이 필요합니다.',
        features: [
          '갑사계곡, 금잔디고개, 삼불봉, 남매탑을 거쳐 동학사로 넘어가는 횡단 코스입니다.',
          '갑사와 동학사 양쪽 사찰 지구를 연결합니다.'
        ],
        sourceLinks: [
          {
            label: '갑사계곡 탐방 정보',
            url: 'https://place.tripmate.co.kr/ko/detail.php?contentId=125833&contentTypeId=12',
            type: 'official'
          }
        ],
        warnings: ['출발지와 도착지가 다르므로 버스 시간표, 택시, 차량 회수를 방문 전 확인하세요.'],
        recommendationReason: '갑사 지구에서 계룡산을 넘는 횡단형 보조 코스입니다.'
      }
    ],
    verificationLinks: [
      {
        label: '계룡산 국립공원 코스 검색',
        url: 'https://www.google.com/search?q=%EA%B3%84%EB%A3%A1%EC%82%B0%EA%B5%AD%EB%A6%BD%EA%B3%B5%EC%9B%90+%ED%83%90%EB%B0%A9%EC%BD%94%EC%8A%A4',
        type: 'search'
      }
    ],
    notes: '계룡산은 국립공원입니다. 입산시간, 통제구간, 사찰 관람료, 주차요금은 반드시 최신 공식 안내로 확인하세요.'
  },
  '0000000008': {
    mountainId: '0000000008',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '운두령 최단 원점회귀 코스',
        path: '계방산생태관리센터 또는 운두령쉼터 -> 전망대 -> 계방산 정상 -> 전망대 -> 운두령 원점회귀',
        startPoint: '계방산생태관리센터 또는 운두령쉼터',
        distance: '약 8.3km 원점회귀',
        estimatedTime: '약 3시간 30분~4시간',
        difficulty: 'normal',
        parking: '계방산생태관리센터·운두령쉼터 주변 소규모 주차공간을 이용합니다. 주말과 겨울 성수기에는 매우 일찍 도착하는 편이 좋습니다.',
        transit: '진부역·진부터미널 또는 홍천 방면에서 운두령 접근 교통을 확인하세요. 대중교통이 제한적일 수 있어 택시 이용 가능성을 확인해야 합니다.',
        features: [
          '출발 고도가 높아 계방산 정상까지 가장 짧게 접근하는 대표 코스입니다.',
          '겨울 설경 산행으로 자주 언급되며, 전망대와 정상 조망을 원점회귀로 볼 수 있습니다.',
          '전체 난도는 보통이지만 중간 경사 구간은 가파를 수 있습니다.'
        ],
        sourceLinks: [
          {
            label: '계방산 코스 정리',
            url: 'https://polyhousetistorycom.tistory.com/entry/%EA%B3%84%EB%B0%A9%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
            type: 'blog'
          },
          {
            label: '운두령 주차 후기',
            url: 'https://zealot88.tistory.com/entry/%EC%A7%A7%EA%B3%A0-%EA%B5%B5%EC%9D%80-%EA%B2%A8%EC%9A%B8%EC%82%B0%ED%96%89-%EC%B6%94%EC%B2%9C-%EA%B3%84%EB%B0%A9%EC%82%B0-%EC%B5%9C%EB%8B%A8%EC%BD%94%EC%8A%A4-%EC%9A%B4%EB%91%90%EB%A0%B9-%EC%A3%BC%EC%B0%A8%EC%9E%A5-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%ED%99%94%EC%9E%A5%EC%8B%A4',
            type: 'blog'
          }
        ],
        warnings: [
          '겨울에는 강풍, 결빙, 눈길 장비 여부를 방문 전 확인하세요.',
          '운두령 주차 가능 대수, 화장실, 버스 운행은 방문 전 확인하세요.'
        ],
        recommendationReason: '운두령 원점회귀가 계방산 최단·대표 코스로 가장 많이 언급되는 편입니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '운두령·정상·노동계곡 하산 코스',
        path: '운두령 -> 전망대 -> 계방산 정상 -> 주목군락 -> 노동계곡 -> 아랫삼거리 방향 하산',
        startPoint: '운두령',
        distance: '약 10~12km',
        estimatedTime: '약 5시간 안팎',
        difficulty: 'hard',
        parking: '운두령에 주차 후 다른 지점으로 하산하면 차량 회수 계획이 필요합니다.',
        transit: '진부·홍천 방면 대중교통과 택시 가능 여부를 모두 확인하세요.',
        features: [
          '운두령에서 정상에 오른 뒤 노동계곡 방향으로 길게 내려가는 종주형 코스입니다.',
          '원점회귀보다 산행감은 크지만 교통 계획 난도가 높습니다.'
        ],
        sourceLinks: [
          {
            label: '계방산 등산코스 검색',
            url: 'https://www.google.com/search?q=%EA%B3%84%EB%B0%A9%EC%82%B0+%EC%9A%B4%EB%91%90%EB%A0%B9+%EB%85%B8%EB%8F%99%EA%B3%84%EA%B3%A1+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
            type: 'search'
          }
        ],
        warnings: ['하산지 교통, 택시 호출 가능 여부, 산불방지 통제는 방문 전 확인하세요.'],
        recommendationReason: '원점회귀보다 긴 산행을 원하는 경우에만 고려할 보조 코스입니다.'
      }
    ],
    verificationLinks: [
      {
        label: '계방산 운두령 코스 검색',
        url: 'https://www.google.com/search?q=%EA%B3%84%EB%B0%A9%EC%82%B0+%EC%9A%B4%EB%91%90%EB%A0%B9+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
        type: 'search'
      }
    ],
    notes: '계방산은 겨울 산행 후기가 많습니다. 눈·결빙·주차 혼잡 정보를 방문 전 다시 확인하세요.'
  },
  '0000000009': {
    mountainId: '0000000009',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'low',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '공작현 최단 원점회귀 코스',
        path: '공작현 주차장 -> 공작산 정상 -> 공작현 주차장 원점회귀',
        startPoint: '공작현 주차장',
        distance: '약 5.4km 원점회귀',
        estimatedTime: '약 2시간 30분~3시간',
        difficulty: 'normal',
        parking: '공작현 주차장은 소규모로 알려져 있습니다. 내비게이션 검색이 불안정할 수 있어 주소와 위치를 방문 전 확인하세요.',
        transit: '홍천터미널에서 공작현까지 직접 대중교통 접근은 제한적일 수 있습니다. 수타사·노천리 방면 버스와 택시 가능 여부를 확인하세요.',
        features: [
          '공작현에서 정상까지 왕복하는 가장 짧은 산행으로 자주 언급됩니다.',
          '정상까지 거리는 짧지만 중간 고개와 오르내림이 있어 체력 배분이 필요합니다.',
          '등산 중 편의시설이 적다는 후기가 있어 물과 간식을 충분히 준비하는 편이 좋습니다.'
        ],
        sourceLinks: [
          {
            label: '공작현 코스 후기',
            url: 'https://maxcamp.tistory.com/175',
            type: 'blog'
          }
        ],
        warnings: [
          '공작현 주차 가능 대수, 화장실, 등산로 상태는 방문 전 확인하세요.',
          '공작산은 이번 조사에서 출처가 상대적으로 적어 현장 정보 검증이 더 필요합니다.'
        ],
        recommendationReason: '검색 결과에서 공작현 최단 코스 후기가 가장 구체적으로 확인됩니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '수타사·공작산 생태숲 산책형 코스',
        path: '수타사 주차장 -> 수타사 -> 공작산 생태숲 -> 수타계곡 -> 수타사 주차장 원점회귀',
        startPoint: '수타사 주차장',
        distance: '약 5~7km',
        estimatedTime: '약 2~3시간',
        difficulty: 'easy',
        parking: '수타사 주차장 이용 가능 여부와 요금을 확인하세요.',
        transit: '홍천터미널에서 수타사 방면 버스 또는 택시를 확인하세요.',
        features: [
          '정상 등정이 아니라 수타사와 계곡·생태숲을 중심으로 걷는 산책형 코스입니다.',
          '공작산 정상 산행이 부담스러울 때 대체 탐방으로 고려할 수 있습니다.'
        ],
        sourceLinks: [
          {
            label: '공작산 수타사 코스 검색',
            url: 'https://www.google.com/search?q=%EA%B3%B5%EC%9E%91%EC%82%B0+%EC%88%98%ED%83%80%EC%82%AC+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4',
            type: 'search'
          }
        ],
        warnings: ['정상 등정 코스가 아니므로 목적에 맞는지 방문 전 등산지도를 확인하세요.'],
        recommendationReason: '공작산 주변에서 접근성과 편의성이 좋은 보조 탐방지로 정리했습니다.'
      }
    ],
    verificationLinks: [
      {
        label: '공작산 등산코스 검색',
        url: 'https://www.google.com/search?q=%EA%B3%B5%EC%9E%91%EC%82%B0+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4+%EA%B3%B5%EC%9E%91%ED%98%84',
        type: 'search'
      }
    ],
    notes: '공작산은 다른 산보다 웹에서 확인 가능한 상세 코스 출처가 적었습니다. 공작현 코스는 초안으로만 보고 현장 주차와 등산로 정보를 추가 검증하세요.'
  },
  '0000000010': {
    mountainId: '0000000010',
    status: 'draft',
    source: 'curated',
    generatedAt: '2026-05-08',
    confidence: 'medium',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: '서울대·연주대 원점회귀 코스',
        path: '서울대 공학관 또는 관악산공원 입구 -> 깔딱고개 -> 연주암 -> 연주대 -> 서울대 방향 원점회귀',
        startPoint: '서울대 공학관 또는 관악산공원 입구',
        distance: '약 5~6km 원점회귀',
        estimatedTime: '약 2시간 30분~3시간 30분',
        difficulty: 'normal',
        parking: '서울대 공학관 주변 주차장 또는 관악산공원 인근 주차장을 이용합니다. 학교·공원 주차 정책과 요금은 방문 전 확인하세요.',
        transit: '지하철 2호선 서울대입구역에서 관악산공원·서울대 방면 버스 이용이 일반적입니다.',
        features: [
          '서울 쪽에서 연주대에 가장 짧게 접근하는 대표 코스입니다.',
          '대중교통 접근성이 좋고 산행 후 서울대입구역 방면으로 복귀하기 쉽습니다.',
          '주말에는 등산객이 많아 초행자도 길 찾기가 상대적으로 수월한 편입니다.'
        ],
        sourceLinks: [
          {
            label: '관악산 코스·주차 정리',
            url: 'https://mo5.ch-crash.com/entry/%EA%B4%80%EC%95%85%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4%EA%B4%80%EC%95%85%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%A7%80%EB%8F%84-%EC%A3%BC%EC%B0%A8%EC%9E%A5-%EC%A0%95%EB%B3%B4',
            type: 'blog'
          }
        ],
        warnings: [
          '서울대 내부 주차 정책, 요금, 통제는 방문 전 확인하세요.',
          '연주대 주변 바위 구간은 우천·결빙 시 주의하세요.'
        ],
        recommendationReason: '서울대 코스가 관악산 최단·대표 코스로 자주 언급됩니다.'
      },
      {
        rank: 2,
        isRecommended: false,
        name: '사당역·관음사·연주대 종주 코스',
        path: '사당역 -> 관음사 -> 사당능선 -> 연주대 -> 서울대 또는 과천 방향 하산',
        startPoint: '사당역',
        distance: '약 8~9km',
        estimatedTime: '약 4시간 안팎',
        difficulty: 'hard',
        parking: '사당역 출발은 대중교통 이용을 권장합니다. 자차 이용 시 관악산 으뜸공원 주차장 등 인근 공영주차장을 확인하세요.',
        transit: '지하철 2·4호선 사당역에서 바로 접근하는 방식이 일반적입니다. 하산지를 서울대나 과천으로 잡을 수 있어 복귀 교통을 먼저 정하세요.',
        features: [
          '사당능선을 따라 연주대까지 오르는 서울 도심형 능선 산행입니다.',
          '서울대 코스보다 길고 바위 구간이 많아 산행감이 큽니다.',
          '대중교통 접근성이 가장 좋은 편입니다.'
        ],
        sourceLinks: [
          {
            label: '관악산 주차·코스 정리',
            url: 'https://mynicetrip.com/%EA%B4%80%EC%95%85%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%A3%BC%EC%B0%A8-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%BD%94%EC%8A%A4%EB%B3%84-%EC%A3%BC%EC%B0%A8%EC%9E%A5-%EC%9C%84/',
            type: 'blog'
          }
        ],
        warnings: ['사당능선 암릉, 우천·결빙, 하산 방향별 막차 시간을 방문 전 확인하세요.'],
        recommendationReason: '대중교통 접근과 능선 산행을 중시하는 이용자에게 자주 선택되는 코스입니다.'
      },
      {
        rank: 3,
        isRecommended: false,
        name: '과천향교·연주암·연주대 코스',
        path: '과천향교 -> 과천계곡 -> 연주암 -> 연주대 -> 과천향교 방향 원점회귀',
        startPoint: '과천향교',
        distance: '약 5~6km 원점회귀',
        estimatedTime: '약 3시간~3시간 30분',
        difficulty: 'normal',
        parking: '과천시청 주차장 또는 과천향교 주변 주차 가능 여부를 확인하세요. 주말 무료 여부는 방문 전 확인이 필요합니다.',
        transit: '지하철 4호선 과천역에서 과천향교 방면으로 접근합니다.',
        features: [
          '과천 계곡길과 연주암을 거쳐 연주대에 오르는 코스입니다.',
          '서울대·사당 코스와 다른 하산 동선을 잡기 좋습니다.'
        ],
        sourceLinks: [
          {
            label: '관악산 코스·주차 정리',
            url: 'https://mo5.ch-crash.com/entry/%EA%B4%80%EC%95%85%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4%EA%B4%80%EC%95%85%EC%82%B0-%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4-%EC%A7%80%EB%8F%84-%EC%A3%BC%EC%B0%A8%EC%9E%A5-%EC%A0%95%EB%B3%B4',
            type: 'blog'
          }
        ],
        warnings: ['과천시청 주차 운영, 연주암 주변 혼잡, 계곡길 결빙 여부는 방문 전 확인하세요.'],
        recommendationReason: '과천역 접근성과 연주암 동선을 원하는 이용자를 위한 보조 코스입니다.'
      }
    ],
    verificationLinks: [
      {
        label: '관악산 등산코스 검색',
        url: 'https://www.google.com/search?q=%EA%B4%80%EC%95%85%EC%82%B0+%EB%93%B1%EC%82%B0%EC%BD%94%EC%8A%A4+%EC%84%9C%EC%9A%B8%EB%8C%80+%EC%82%AC%EB%8B%B9+%EA%B3%BC%EC%B2%9C%ED%96%A5%EA%B5%90',
        type: 'search'
      }
    ],
    notes: '관악산은 출발지가 많아 주차와 하산지가 코스 선택의 핵심입니다. 대중교통 이용이 더 안정적인 경우가 많습니다.'
  }
};
