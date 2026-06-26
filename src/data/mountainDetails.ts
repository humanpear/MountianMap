import type { Mountain, MountainGuide, MountainGuideLink } from '../types';
import { draftMountainGuides } from './draftMountainGuides';
import { applyForestTripGuideEnhancement } from './mountainGuideForestTripEnhancements';
import { mountainGuides } from './mountainGuides';

const activeMountainGuides: Record<string, MountainGuide> = mountainGuides;
const draftGuides: Record<string, MountainGuide> = draftMountainGuides;

export function getMountainGuide(mountain: Mountain): MountainGuide {
  const curatedGuide = activeMountainGuides[mountain.id];

  if (curatedGuide) {
    return applyForestTripGuideEnhancement(curatedGuide);
  }

  const draftGuide = draftGuides[mountain.id];

  if (draftGuide) {
    return applyForestTripGuideEnhancement(draftGuide);
  }

  return {
    mountainId: mountain.id,
    status: 'draft',
    source: 'ai-draft',
    generatedAt: '2026-05-08',
    confidence: 'low',
    routes: [
      {
        rank: 1,
        isRecommended: true,
        name: `${mountain.name} 추천코스 정리 예정`,
        path: `${mountain.name} 등산 코스 확인 필요`,
        startPoint: '확인 필요',
        distance: '확인 필요',
        estimatedTime: '확인 필요',
        difficulty: 'unknown',
        parking: '방문 전 주차 가능 위치와 혼잡도를 확인하세요.',
        transit: '가까운 기차역 또는 버스터미널에서 들머리까지의 이동 방법을 확인하세요.',
        features: ['AI 웹검색 기반 코스 초안을 아직 생성하지 않았습니다.'],
        sourceLinks: createDefaultLinks(mountain),
        warnings: [
          '실제 코스, 통제, 예약제, 교통 시간표는 방문 전 공식 안내와 최신 후기로 확인하세요.'
        ],
        recommendationReason: '생성 전 fallback 코스입니다.'
      }
    ],
    verificationLinks: createDefaultLinks(mountain),
    notes: 'AI 초안 기반의 미검증 정보입니다. 실제 코스, 통제, 교통, 주차 정보는 방문 전 공식 안내와 최신 후기로 확인하세요.'
  };
}

function createDefaultLinks(mountain: Mountain): MountainGuideLink[] {
  const baseQuery = `${mountain.name} ${mountain.city} 등산코스 주차장`;
  const blogQuery = `${mountain.name} 등산코스 후기`;

  return [
    {
      label: '네이버 포스팅 검색',
      type: 'blog',
      url: `https://section.blog.naver.com/Search/Post.naver?pageNo=1&rangeType=ALL&orderBy=sim&keyword=${encodeURIComponent(
        blogQuery
      )}`
    },
    {
      label: '구글 등산 정보 검색',
      type: 'search',
      url: `https://www.google.com/search?q=${encodeURIComponent(baseQuery)}`
    }
  ];
}
