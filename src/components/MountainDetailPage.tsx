import {
  ArrowLeft,
  Check,
  CloudSun,
  Clock,
  Droplets,
  ExternalLink,
  MapPin,
  MessageCircle,
  Mountain as MountainIcon,
  Route,
  Search,
  ShieldAlert,
  Sparkles,
  Star,
  Wind
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { getMountainGuide } from '../data/mountainDetails';
import { cn } from '../lib/classNames';
import { isKakaoMapConfigured } from '../services/env';
import { loadKakaoMaps } from '../services/kakaoLoader';
import type {
  Mountain,
  MountainGuideDifficulty,
  MountainGuideLink,
  MountainGuideRoute,
  MountainGuideRouteStop,
  MountainGuideSource,
  MountainGuideStatus
} from '../types';

type MountainDetailPageProps = {
  mountain: Mountain;
  isCompleted: boolean;
  onBack: () => void;
  onShowOnMap: (mountain: Mountain) => void;
  onToggleCompleted: (mountain: Mountain) => void;
};

const difficultyLabels: Record<MountainGuideDifficulty, string> = {
  easy: '하',
  normal: '중',
  hard: '상',
  extreme: '최상',
  unknown: '확인 필요'
};

const difficultyShortLabels: Record<MountainGuideDifficulty, string> = {
  easy: '하',
  normal: '중',
  hard: '상',
  extreme: '최상',
  unknown: '확인'
};

function getGuideStatusLabel(status: MountainGuideStatus, source: MountainGuideSource) {
  if (status === 'verified') {
    return '검증됨';
  }

  return source === 'curated' ? '조사 초안 / 미검증' : 'AI 초안 / 미검증';
}

function getGuideSourceLabel(source: MountainGuideSource) {
  return source === 'curated' ? '웹검색 정리' : 'AI 초안';
}

function getRouteTheme(route: MountainGuideRoute) {
  if (route.isRecommended) {
    return 'recommended';
  }
  if (route.difficulty === 'easy') {
    return 'easy';
  }
  if (route.difficulty === 'extreme') {
    return 'extreme';
  }
  if (route.difficulty === 'hard') {
    return 'hard';
  }
  if (route.rank === 2) {
    return 'balanced';
  }
  return 'forest';
}

function getRouteLabel(route: MountainGuideRoute) {
  if (route.isRecommended) {
    return '최고 인기 코스';
  }
  if (route.difficulty === 'easy') {
    return '비교적 쉬운 코스';
  }
  if (route.difficulty === 'hard') {
    return '난이도 높은 코스';
  }
  if (route.difficulty === 'extreme') {
    return '숙련자용 고난도 코스';
  }
  if (route.rank === 2) {
    return '경관 좋은 코스';
  }
  return `코스 ${route.rank}`;
}

const routeThemeClass: Record<string, string> = {
  recommended: '[--route-color:#c93629] [--route-panel:#d64032] [--route-soft:#fff2ee]',
  balanced: '[--route-color:#d47a17] [--route-panel:#df841d] [--route-soft:#fff5e7]',
  easy: '[--route-color:#4d8b37] [--route-panel:#3f7f2e] [--route-soft:#f0f8ec]',
  forest: '[--route-color:#4d8b37] [--route-panel:#3f7f2e] [--route-soft:#f0f8ec]',
  hard: '[--route-color:#b84a37] [--route-panel:#c5533f] [--route-soft:#fff0eb]',
  extreme: '[--route-color:#9f3835] [--route-panel:#ad3f3b] [--route-soft:#fdebe9]'
};

const difficultyThemeClass: Record<MountainGuideDifficulty, string> = {
  easy: 'border-[#bfdab4] bg-[#e7f3e4] text-[#4d8b37]',
  normal: 'border-[#d7e4ba] bg-[#f0f7e4] text-[#6f9134]',
  hard: 'border-[#f3c79e] bg-[#fff0de] text-[#c46422]',
  extreme: 'border-[#efb9b4] bg-[#fde7e3] text-[#a83a34]',
  unknown: 'border-[#cfd7dc] bg-[#eef2f4] text-[#65717a]'
};

function getRouteStops(path: string) {
  return path
    .split(/\s*(?:->|→)\s*/g)
    .map((stop) => stop.trim())
    .filter(Boolean);
}

function buildRouteStops(route: MountainGuideRoute): MountainGuideRouteStop[] {
  if (route.routeStops?.length) {
    return route.routeStops;
  }

  const stops = getRouteStops(route.path);
  return stops.map((name, index) => ({
    name,
    label: index === 0 ? 'start' : index === stops.length - 1 ? 'finish' : name.includes('정상') ? 'summit' : 'waypoint'
  }));
}

function getRouteSummary(route: MountainGuideRoute) {
  const stops = buildRouteStops(route);
  if (stops.length >= 2) {
    return `${stops[0].name} ~ ${stops[stops.length - 1].name}`;
  }
  return route.startPoint;
}

function getRouteImage(route: MountainGuideRoute, guidePhotos: MountainGuideLink[], index = 0) {
  if (route.heroImageUrl) {
    return route.heroImageUrl;
  }
  if (route.coursePhotos?.[0]?.url) {
    return route.coursePhotos[0].url;
  }
  return guidePhotos[index % Math.max(guidePhotos.length, 1)]?.url;
}

function getHeroImage(route: MountainGuideRoute | undefined, guidePhotos: MountainGuideLink[]) {
  if (route) {
    return getRouteImage(route, guidePhotos);
  }
  return guidePhotos[0]?.url;
}

export function MountainDetailPage({ mountain, isCompleted, onBack, onShowOnMap, onToggleCompleted }: MountainDetailPageProps) {
  const guide = getMountainGuide(mountain);
  const sortedRoutes = useMemo(
    () => [...guide.routes].sort((a, b) => Number(b.isRecommended) - Number(a.isRecommended) || a.rank - b.rank),
    [guide.routes]
  );
  const [activeRouteName, setActiveRouteName] = useState<string | null>(null);
  const activeRoute = sortedRoutes.find((route) => route.name === activeRouteName);

  useEffect(() => {
    setActiveRouteName(null);
  }, [mountain.id]);

  if (activeRoute) {
    return (
      <CourseDetailView
        mountain={mountain}
        route={activeRoute}
        guidePhotos={guide.photoLinks ?? []}
        onBackToMountain={() => setActiveRouteName(null)}
        onBackToMap={onBack}
      />
    );
  }

  return (
    <MountainMainDetailView
      mountain={mountain}
      routes={sortedRoutes}
      guideSource={guide.source}
      guideStatus={guide.status}
      selectionReason={guide.selectionReason ?? mountain.selectionReason}
      notes={guide.notes}
      photoLinks={guide.photoLinks ?? []}
      verificationLinks={guide.verificationLinks ?? []}
      isCompleted={isCompleted}
      onBack={onBack}
      onShowOnMap={onShowOnMap}
      onToggleCompleted={onToggleCompleted}
      onRouteOpen={(route) => setActiveRouteName(route.name)}
    />
  );
}

function MountainMainDetailView({
  mountain,
  routes,
  guideSource,
  guideStatus,
  selectionReason,
  notes,
  photoLinks,
  verificationLinks,
  isCompleted,
  onBack,
  onShowOnMap,
  onToggleCompleted,
  onRouteOpen
}: {
  mountain: Mountain;
  routes: MountainGuideRoute[];
  guideSource: MountainGuideSource;
  guideStatus: MountainGuideStatus;
  selectionReason: string;
  notes?: string;
  photoLinks: MountainGuideLink[];
  verificationLinks: MountainGuideLink[];
  isCompleted: boolean;
  onBack: () => void;
  onShowOnMap: (mountain: Mountain) => void;
  onToggleCompleted: (mountain: Mountain) => void;
  onRouteOpen: (route: MountainGuideRoute) => void;
}) {
  const heroImage = getHeroImage(undefined, photoLinks);
  const heroStyle = heroImage
    ? ({
        backgroundImage: `linear-gradient(90deg, rgba(0, 14, 23, 0.76) 0%, rgba(0, 14, 23, 0.46) 42%, rgba(0, 14, 23, 0.12) 100%), linear-gradient(0deg, rgba(0, 14, 23, 0.5) 0%, rgba(0, 14, 23, 0.04) 54%, rgba(0, 14, 23, 0.2) 100%), url("${heroImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      } as CSSProperties)
    : undefined;
  const recommendedRoute = routes[0];

  return (
    <section
      className="min-h-[calc(100vh-60px)] overflow-auto bg-white font-sans text-mountain-ink"
      aria-label={`${mountain.name} 상세 정보`}
    >
      <header className="relative min-h-[456px] overflow-hidden bg-[linear-gradient(135deg,rgba(6,38,58,0.95),rgba(16,69,56,0.84)),linear-gradient(135deg,#133628,#06263a)] text-white max-[900px]:min-h-0" style={heroStyle}>
        <div className="pointer-events-none absolute inset-0" />
        <div className="relative z-[1] mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-[34px] pt-[18px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4 max-[900px]:pb-8">
          <div className="flex min-h-8 items-center gap-2.5 text-sm font-extrabold text-white/85 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-1.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:font-black [&_button]:text-white">
            <button type="button" onClick={onBack}>
              <ArrowLeft size={17} />
              지도
            </button>
          </div>

          <div className="grid min-h-[384px] grid-cols-[minmax(0,1fr)_304px] items-end gap-[58px] pt-5 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[900px]:pt-8">
            <div className="max-w-[760px]">
              <span className="mb-4 inline-flex min-h-[42px] items-center rounded-[5px] bg-[#00385d] px-3.5 text-[22px] font-black leading-none text-white shadow-heroPanel">
                {mountain.elevationMeters.toLocaleString()}m
              </span>
              <h2 className="m-0 text-[78px] font-black leading-[0.96] text-white shadow-black [letter-spacing:0] [text-shadow:0_5px_18px_rgba(0,0,0,0.42)] max-[900px]:text-[clamp(44px,14vw,64px)]">{mountain.name}</h2>
              
              <p className="mt-[22px] max-w-[650px] text-lg font-extrabold leading-[31px] text-white/95">{selectionReason}</p>
              <div className="mt-[50px] grid grid-cols-4 gap-[38px] max-[900px]:mt-7 max-[900px]:grid-cols-2 max-[900px]:gap-3.5" aria-label="산 핵심 정보">
                <HeroFact icon={<MapPin size={18} />} label="위치" value={`${mountain.province} ${mountain.city}`} />
                <HeroFact icon={<MountainIcon size={18} />} label="높이" value={`${mountain.elevationMeters.toLocaleString()}m`} />
                <HeroFact icon={<Star size={18} />} label="선정" value="대한민국 100대 명산" />
                <HeroFact icon={<Route size={18} />} label="특징" value={recommendedRoute?.name ?? '대표 코스 확인 필요'} />
              </div>
            </div>

            <aside className="self-center rounded-[9px] border border-white/25 bg-black/45 px-[22px] py-[23px] text-white shadow-heroPanel backdrop-blur-xl [&_dl]:grid [&_dl]:gap-0 [&_h3]:mb-4 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-white" aria-label="산 정보">
              <h3>산 정보</h3>
              <dl>
                <HeroInfoRow icon={<MapPin size={16} />} label="위치" value={`${mountain.province} ${mountain.city}`} />
                <HeroInfoRow icon={<MountainIcon size={16} />} label="높이" value={`${mountain.elevationMeters.toLocaleString()}m`} />
                <HeroInfoRow icon={<ShieldAlert size={16} />} label="난이도" value={recommendedRoute ? difficultyLabels[recommendedRoute.difficulty] : '확인 필요'} />
                <HeroInfoRow icon={<Clock size={16} />} label="소요시간" value={recommendedRoute?.estimatedTime ?? '확인 필요'} />
                <HeroInfoRow icon={<Sparkles size={16} />} label="자료" value={getGuideSourceLabel(guideSource)} />
                <HeroInfoRow icon={<Check size={16} />} label="상태" value={getGuideStatusLabel(guideStatus, guideSource)} />
              </dl>
              <button className="mt-[17px] inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border border-white/70 bg-black/10 px-3 text-[15px] font-extrabold text-white" type="button" onClick={() => onShowOnMap(mountain)}>
                지도에서 보기
                <MapPin size={17} />
              </button>
            </aside>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-0 pt-[30px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4">
        <section aria-label="추천 코스">
          <div className="mb-[18px] flex items-center gap-[18px] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-1.5 [&_h3]:m-0 [&_h3]:text-[28px] [&_h3]:font-black [&_h3]:leading-[34px] [&_span]:border-l [&_span]:border-[#d8e0da] [&_span]:pl-4 [&_span]:text-[15px] [&_span]:font-semibold [&_span]:text-[#777] max-[900px]:[&_span]:border-l-0 max-[900px]:[&_span]:pl-0">
            <h3>추천 코스</h3>
            <span>{mountain.name}의 대표 코스 정보를 확인하세요.</span>
          </div>
          <ul className="grid gap-[17px]">
            {routes.map((route, index) => (
              <RouteSummaryCard key={route.name} route={route} imageUrl={getRouteImage(route, photoLinks, index)} onOpen={() => onRouteOpen(route)} />
            ))}
          </ul>
        </section>

        <div className="mt-6 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          <DifficultyGuide />
          <VisitWarnings routes={routes} notes={notes} />
          <WeatherStatusCard mountain={mountain} />
        </div>

        <PhotoGallery mountainName={mountain.name} links={photoLinks} />
        <SourceLinks links={verificationLinks} />

        <div className="mt-[22px] flex justify-end">
          <button className={cn('inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-4 font-extrabold text-[#18221d]', isCompleted && 'border-[#1f8a5b] bg-[#1f8a5b] text-white')} type="button" onClick={() => onToggleCompleted(mountain)}>
            <Check size={18} />
            {isCompleted ? '등반완료 해제' : '등반완료'}
          </button>
        </div>
      </main>
      <DesignFooter />
    </section>
  );
}

function CourseDetailView({
  mountain,
  route,
  guidePhotos,
  onBackToMountain,
  onBackToMap
}: {
  mountain: Mountain;
  route: MountainGuideRoute;
  guidePhotos: MountainGuideLink[];
  onBackToMountain: () => void;
  onBackToMap: () => void;
}) {
  const heroImage = getHeroImage(route, guidePhotos);
  const heroStyle = heroImage
    ? ({
        backgroundImage: `linear-gradient(90deg, rgba(0, 14, 23, 0.76) 0%, rgba(0, 14, 23, 0.46) 42%, rgba(0, 14, 23, 0.12) 100%), linear-gradient(0deg, rgba(0, 14, 23, 0.5) 0%, rgba(0, 14, 23, 0.04) 54%, rgba(0, 14, 23, 0.2) 100%), url("${heroImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      } as CSSProperties)
    : undefined;
  const stops = buildRouteStops(route);
  const photos = route.coursePhotos?.length ? route.coursePhotos : guidePhotos;

  return (
    <section
      className="min-h-[calc(100vh-60px)] overflow-auto bg-white font-sans text-mountain-ink"
      aria-label={`${mountain.name} ${route.name} 상세 정보`}
    >
      <header className="relative min-h-[406px] overflow-hidden bg-[linear-gradient(135deg,rgba(6,38,58,0.95),rgba(16,69,56,0.84)),linear-gradient(135deg,#133628,#06263a)] text-white max-[900px]:min-h-0" style={heroStyle}>
        <div className="pointer-events-none absolute inset-0" />
        <div className="relative z-[1] mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-[34px] pt-[18px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4 max-[900px]:pb-8">
          <nav className="flex min-h-8 items-center gap-2.5 text-sm font-extrabold text-white/85 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-1.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:font-black [&_button]:text-white" aria-label="현재 위치">
            <button type="button" onClick={onBackToMap}>홈</button>
            <span>추천 코스</span>
            <button type="button" onClick={onBackToMountain}>{mountain.name}</button>
            <strong>{route.name}</strong>
          </nav>

          <div className="grid min-h-[330px] grid-cols-[minmax(0,1fr)_312px] items-end gap-[58px] pt-[26px] max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6">
            <div>
              <span className={cn('mb-[18px] inline-flex rounded-[5px] bg-white px-2.5 py-1.5 text-sm font-black leading-[18px]', routeThemeClass[getRouteTheme(route)], 'text-[var(--route-color)]')}>{getRouteLabel(route)}</span>
              <h2 className="m-0 max-w-[780px] text-5xl font-black leading-[1.12] text-white [letter-spacing:0] max-[900px]:text-[clamp(34px,11vw,48px)]">{mountain.name} {route.name}</h2>
              <p className="mt-3 max-w-[650px] text-lg font-extrabold leading-[31px] text-white/95">{getRouteSummary(route)}</p>
              <p className="mt-5 max-w-[650px] text-base font-bold leading-7 text-white/95">{route.summary ?? route.recommendationReason ?? `${route.name}의 주요 경유지와 접근 정보를 확인하세요.`}</p>
              <div className="mt-[50px] grid grid-cols-4 gap-[38px] max-[900px]:mt-7 max-[900px]:grid-cols-2 max-[900px]:gap-3.5">
                <HeroFact icon={<Route size={19} />} label="거리" value={route.distance} />
                <HeroFact icon={<Clock size={19} />} label="소요시간" value={route.estimatedTime} />
                <HeroFact icon={<MountainIcon size={19} />} label="누적 고도" value={route.elevationGain ?? '확인 필요'} />
                <HeroFact icon={<ShieldAlert size={19} />} label="난이도" value={difficultyLabels[route.difficulty]} />
              </div>
            </div>

            <aside className="self-center rounded-[9px] border border-white/25 bg-black/45 px-[22px] py-[23px] text-white shadow-heroPanel backdrop-blur-xl [&_dl]:grid [&_dl]:gap-0 [&_h3]:mb-4 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-white" aria-label="코스 정보 요약">
              <h3>코스 정보 요약</h3>
              <dl>
                <HeroInfoRow icon={<MapPin size={16} />} label="출발지" value={stops[0]?.name ?? route.startPoint} />
                <HeroInfoRow icon={<MapPin size={16} />} label="도착지" value={stops[stops.length - 1]?.name ?? '확인 필요'} />
                <HeroInfoRow icon={<Route size={16} />} label="거리" value={route.distance} />
                <HeroInfoRow icon={<Clock size={16} />} label="소요시간" value={route.estimatedTime} />
                <HeroInfoRow icon={<ShieldAlert size={16} />} label="난이도" value={difficultyLabels[route.difficulty]} />
                <HeroInfoRow icon={<MountainIcon size={16} />} label="최고 고도" value={`${mountain.elevationMeters.toLocaleString()}m`} />
                <HeroInfoRow icon={<Route size={16} />} label="누적 고도" value={route.elevationGain ?? '확인 필요'} />
              </dl>
            </aside>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-0 pt-[30px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4">
        <div className="mb-[22px] flex gap-[30px] border-b border-[#dedede] [&_button]:min-h-[54px] [&_button]:border-0 [&_button]:border-b-4 [&_button]:border-transparent [&_button]:bg-transparent [&_button]:px-6 [&_button]:text-[21px] [&_button]:font-black [&_button]:text-[#627168] [&_button.is-active]:border-b-[#e10f07] [&_button.is-active]:text-[#18221d]" role="tablist" aria-label="코스 상세 탭">
          <button className="is-active" type="button">코스 개요</button>
          <button type="button">포토 갤러리</button>
        </div>

        <section className="grid grid-cols-[minmax(0,760px)_minmax(310px,1fr)] gap-5 max-[900px]:grid-cols-1" aria-label="코스 지도와 타임라인">
          <div className="rounded-md border border-[#dedede] bg-white p-[22px]">
            <h3>코스 지도</h3>
            <KakaoRouteMap route={route} />
          </div>
          <CourseTimelinePanel stops={stops} route={route} />
        </section>

        <section className="mt-6 rounded-md border border-[#dedede] bg-white p-[22px]" aria-label={`${route.name} 코스 평가`}>
          <h3>{mountain.name} {route.name} 평가</h3>
          <div className="grid grid-cols-[1fr_1fr_1.05fr] gap-4 max-[900px]:grid-cols-1">
            <EvaluationPicker title="난이도는 어떠셨나요?" options={['쉬움', '보통', '약간 어려움', '어려움', '매우 어려움']} activeIndex={3} icon="mountain" />
            <EvaluationPicker title="소요시간은 어떠셨나요?" options={['2시간 이하', '2~3시간', '3~4시간', '4~5시간', '5시간 이상']} activeIndex={3} icon="clock" />
            <div className="grid min-w-0 rounded-lg border border-[#d8e0da] bg-white p-5 [&>strong]:mb-4 [&>strong]:block [&>strong]:text-center [&_button]:mt-3 [&_button]:min-h-12 [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-[#e10f07] [&_button]:font-black [&_button]:text-white [&_button:disabled]:opacity-60 [&_span]:mt-1.5 [&_span]:justify-self-end [&_span]:text-xs [&_span]:text-[#627168] [&_textarea]:min-h-28 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-[#d8e0da] [&_textarea]:p-3">
              <strong>한줄평을 남겨주세요!</strong>
              <textarea maxLength={100} placeholder="코스에 대한 느낌을 자유롭게 남겨주세요." disabled />
              <span>0/100</span>
              <button type="button" disabled>등록하기</button>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-md border border-[#dedede] bg-white p-[22px]" aria-label="다른 등산객들의 한줄평">
          <h3>다른 등산객들의 한줄평</h3>
          <div className="flex items-center gap-3 rounded-md border border-[#dedede] bg-white p-4 text-[#627168] [&_p]:m-0 [&_p]:leading-6">
            <MessageCircle size={20} />
            <p>아직 등록된 후기가 없습니다. 후기 저장 기능이 준비되면 이 영역에 표시됩니다.</p>
          </div>
        </section>

        <PhotoGallery mountainName={`${mountain.name} ${route.name}`} links={photos} />
      </main>
      <DesignFooter />
    </section>
  );
}

function DesignFooter() {
  return (
    <footer className="mt-9 bg-mountain-navy text-white" aria-label="하단 메뉴">
      <div className="mx-auto grid min-h-[76px] w-[1180px] max-w-[calc(100%-80px)] grid-cols-[minmax(230px,1.5fr)_repeat(4,minmax(110px,1fr))_minmax(90px,auto)] items-center gap-5 text-sm font-extrabold max-[900px]:w-full max-[900px]:max-w-none max-[900px]:grid-cols-1 max-[900px]:px-4 max-[900px]:py-5 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-2.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:text-white [&_strong]:inline-flex [&_strong]:items-center [&_strong]:gap-2.5 [&_strong]:text-[17px] [&_strong]:font-black">
        <strong>
          <MountainIcon size={26} />
          대한민국 100대 명산
        </strong>
        <span>100대 명산</span>
        <span>추천 코스</span>
        <span>등산 정보</span>
        <span>커뮤니티</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          맨 위로
        </button>
      </div>
    </footer>
  );
}

function RouteSummaryCard({ route, imageUrl, onOpen }: { route: MountainGuideRoute; imageUrl?: string; onOpen: () => void }) {
  const stops = buildRouteStops(route);
  const routePanelStyle = {
    backgroundColor: 'var(--route-panel)',
    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.18), transparent 46%)'
  } as CSSProperties;

  return (
    <li className={cn('grid min-h-[188px] grid-cols-[282px_minmax(0,1fr)_316px] overflow-hidden rounded-[5px] border border-[#d6d6d6] bg-white shadow-route max-[900px]:grid-cols-1', routeThemeClass[getRouteTheme(route)])}>
      <div className="flex min-w-0 flex-col justify-center gap-[11px] px-5 py-[23px] text-white" style={routePanelStyle}>
        <span className="self-start rounded-[5px] bg-white px-2.5 py-1.5 text-sm font-black leading-[18px] text-[var(--route-color)]">{getRouteLabel(route)}</span>
        <div className="flex min-w-0 items-center gap-2.5">
          <strong className="text-[28px] leading-[34px]">{route.name}</strong>
          <DifficultyBadge difficulty={route.difficulty} />
        </div>
        <p className="m-0 text-base font-bold leading-6">{getRouteSummary(route)}</p>
        <button className="mt-1 inline-flex min-h-[38px] items-center gap-2 self-start rounded-md border border-white/40 bg-white/10 px-3.5 text-sm font-black text-white [&_svg]:rotate-180" type="button" onClick={onOpen}>
          코스 상세보기
          <ArrowLeft size={16} />
        </button>
      </div>
      <div className="grid min-w-0 content-center gap-6 overflow-hidden bg-[linear-gradient(90deg,var(--route-soft),rgba(255,255,255,0.72))] px-7 py-[26px] max-[900px]:p-5">
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          <Metric icon={<Route size={17} />} label="거리" value={route.distance} />
          <Metric icon={<Clock size={17} />} label="소요시간" value={route.estimatedTime} />
          <DifficultyMetric difficulty={route.difficulty} />
        </div>
        <RouteTimeline stops={stops} rawPath={route.path} />
      </div>
      <figure className="m-0 block min-w-0 bg-[var(--route-soft)] p-2.5">
        {imageUrl ? (
          <img className="block h-full min-h-[164px] w-full rounded-[5px] object-cover" src={imageUrl} alt={`${route.name} 참고 사진`} loading="lazy" />
        ) : (
          <div className="grid h-full min-h-[164px] place-items-center rounded-[5px] bg-[var(--route-soft)] text-center" aria-hidden="true">
            <span />
            <strong>{route.name}</strong>
          </div>
        )}
      </figure>
    </li>
  );
}

function KakaoRouteMap({ route }: { route: MountainGuideRoute }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlaysRef = useRef<Array<KakaoMarker | KakaoPolyline>>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!route.mapPathCoordinates || route.mapPathCoordinates.length < 2 || !containerRef.current) {
      return;
    }

    if (!isKakaoMapConfigured) {
      setMapError('Kakao Maps 키가 없어 경로 지도를 표시할 수 없습니다.');
      return;
    }

    let disposed = false;
    loadKakaoMaps()
      .then((maps) => {
        if (disposed || !containerRef.current) {
          return;
        }

        const first = route.mapPathCoordinates?.[0];
        if (!first) {
          return;
        }

        const map = new maps.Map(containerRef.current, {
          center: new maps.LatLng(first.latitude, first.longitude),
          level: 7,
          tileAnimation: true
        });
        const path = route.mapPathCoordinates!.map((point) => new maps.LatLng(point.latitude, point.longitude));
        const polyline = new maps.Polyline({
          map,
          path,
          strokeWeight: 5,
          strokeColor: '#D90D0D',
          strokeOpacity: 0.9,
          strokeStyle: 'solid'
        });
        const markers = route.mapPathCoordinates!.map((point, index) => {
          return new maps.Marker({
            map,
            position: new maps.LatLng(point.latitude, point.longitude),
            title: route.routeStops?.[index]?.name ?? `지점 ${index + 1}`
          });
        });
        overlaysRef.current = [polyline, ...markers];
      })
      .catch(() => setMapError('카카오맵을 불러오지 못했습니다.'));

    return () => {
      disposed = true;
      overlaysRef.current.forEach((overlay) => overlay.setMap(null));
      overlaysRef.current = [];
    };
  }, [route]);

  if (!route.mapPathCoordinates || route.mapPathCoordinates.length < 2) {
    return (
      <div className="grid min-h-[430px] place-items-center content-center gap-2.5 rounded-[5px] bg-[linear-gradient(rgba(47,107,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,79,0.08)_1px,transparent_1px),#edf3e8] bg-[length:42px_42px] p-6 text-center text-[#18221d] [&_p]:m-0 [&_p]:max-w-[420px] [&_p]:text-[#627168] [&_p]:leading-7 [&_strong]:text-xl [&_svg]:text-[#e10f07]">
        <Search size={24} />
        <strong>경로 좌표 준비 중</strong>
        <p>사용자가 입력한 위도/경도 좌표가 추가되면 카카오맵에 코스 동선이 표시됩니다.</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="grid min-h-[430px] place-items-center content-center gap-2.5 rounded-[5px] bg-[linear-gradient(rgba(47,107,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,79,0.08)_1px,transparent_1px),#edf3e8] bg-[length:42px_42px] p-6 text-center text-[#18221d] [&_p]:m-0 [&_p]:max-w-[420px] [&_p]:text-[#627168] [&_p]:leading-7 [&_strong]:text-xl [&_svg]:text-[#e10f07]">
        <ShieldAlert size={24} />
        <strong>지도 표시 실패</strong>
        <p>{mapError}</p>
      </div>
    );
  }

  return <div ref={containerRef} className="min-h-[430px] overflow-hidden rounded-[5px] bg-[linear-gradient(rgba(47,107,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,79,0.08)_1px,transparent_1px),#edf3e8] bg-[length:42px_42px]" aria-label={`${route.name} 카카오맵 경로`} />;
}

function RouteTimeline({ stops, rawPath }: { stops: MountainGuideRouteStop[]; rawPath: string }) {
  return (
    <div className="m-0 border-0 bg-transparent p-0">
      <strong className="sr-only">코스</strong>
      {stops.length > 1 ? (
        <>
          <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(84px,1fr))] p-0 before:absolute before:left-[8%] before:right-[8%] before:top-[6px] before:h-0.5 before:bg-[var(--route-color)] before:content-['']" aria-label="코스 경유지">
            {stops.slice(0, 5).map((stop, index) => (
              <li className="relative min-w-0 px-2 text-center" key={`${stop.name}-${index}`}>
                <span className="relative z-[1] mx-auto mb-3 block h-3 w-3 rounded-full border-2 border-white bg-[var(--route-color)] shadow-[0_0_0_2px_var(--route-color)]" />
                <p className="m-0 text-[13px] font-black leading-[19px] text-[#18221d]">{stop.name}</p>
              </li>
            ))}
          </ol>
          <p className="hidden">{rawPath}</p>
        </>
      ) : (
        <p>{rawPath}</p>
      )}
    </div>
  );
}

function CourseTimelinePanel({ stops, route }: { stops: MountainGuideRouteStop[]; route: MountainGuideRoute }) {
  const displayStops = stops.length ? stops : buildRouteStops(route);

  return (
    <aside className="rounded-md border border-[#dedede] bg-white px-6 py-[26px]" aria-label="코스 한눈에 보기">
      <h3>코스 한눈에 보기</h3>
      <ol className="relative m-0 grid list-none gap-0 pl-[22px] before:absolute before:bottom-2.5 before:left-[7px] before:top-2.5 before:w-[3px] before:bg-[#a9adb0] before:content-['']">
        {displayStops.map((stop, index) => (
          <li className={cn("relative grid min-h-[70px] grid-cols-[minmax(0,1fr)_auto] gap-x-2.5 gap-y-1 pb-3 before:absolute before:-left-[22px] before:top-[3px] before:h-3.5 before:w-3.5 before:rounded-full before:border-[3px] before:border-white before:bg-[#90979b] before:shadow-[0_0_0_2px_#90979b] before:content-[''] [&.is-start]:before:bg-[#e10f07] [&.is-start]:before:shadow-[0_0_0_2px_#e10f07] [&.is-finish]:before:bg-[#e10f07] [&.is-finish]:before:shadow-[0_0_0_2px_#e10f07]", `is-${stop.label ?? 'waypoint'}`)} key={`${stop.name}-${index}`}>
            <span className="justify-self-start rounded-[5px] bg-[#e10f07] px-2 py-1 text-[13px] font-black text-white">{stop.label === 'start' ? '출발' : stop.label === 'finish' ? '도착' : ''}</span>
            <strong className="col-start-1 text-base leading-6 text-[#18221d]">{stop.name}</strong>
            {stop.elevation ? <em className="col-start-1 text-sm not-italic text-[#627168]">{stop.elevation}</em> : null}
            {stop.distanceFromPrevious ? <small className="col-start-1 text-sm text-[#627168]">{stop.distanceFromPrevious}</small> : null}
            {stop.estimatedArrival ? <time className="col-start-2 row-span-2 row-start-1 font-numeric font-extrabold text-[#18221d]">{stop.estimatedArrival}</time> : null}
          </li>
        ))}
      </ol>
      <p className="mt-1.5 text-sm leading-[22px] text-[#627168]">소요시간은 개인 체력과 휴식 시간에 따라 달라질 수 있습니다.</p>
    </aside>
  );
}

function EvaluationPicker({ title, options, activeIndex, icon }: { title: string; options: string[]; activeIndex: number; icon: 'mountain' | 'clock' }) {
  return (
    <div className="min-w-0 rounded-lg border border-[#d8e0da] bg-white p-5 [&>strong]:mb-4 [&>strong]:block [&>strong]:text-center [&>strong]:text-[17px]">
      <strong>{title}</strong>
      <div className="grid grid-cols-5 gap-2.5">
        {options.map((option, index) => (
          <button key={option} className={cn('grid min-w-0 justify-items-center gap-2 border-0 bg-transparent text-[#627168] [&_svg]:h-[42px] [&_svg]:w-[42px] [&_svg]:rounded-full [&_svg]:border [&_svg]:border-[#d8e0da] [&_svg]:bg-[#f7f8f7] [&_svg]:p-[9px] [&_span]:text-xs [&_span]:leading-4', index === activeIndex && '[&_svg]:border-[#e10f07] [&_svg]:bg-[#fff1f1] [&_svg]:text-[#e10f07]')} type="button" disabled>
            {icon === 'mountain' ? <MountainIcon size={22} /> : <Clock size={22} />}
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroFact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 text-white [&_svg]:row-span-2 [&_svg]:mt-1 [&_span]:text-[13px] [&_span]:font-black [&_span]:text-white/80 [&_strong]:text-base [&_strong]:font-extrabold [&_strong]:leading-6">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function HeroInfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="grid min-h-[34px] grid-cols-[76px_minmax(0,1fr)] border-b border-white/10 py-1.5">
      <dt className="flex items-center gap-1.5 text-[13px] leading-[22px] text-white/80 [&_svg]:text-[#a4d137]">
        {icon}
        {label}
      </dt>
      <dd className="m-0 text-[13px] leading-[22px] text-white/90">{value}</dd>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-nowrap items-center gap-2 text-[#18221d] max-[900px]:min-h-11 max-[900px]:rounded-lg max-[900px]:border max-[900px]:border-[#276c8f]/15 max-[900px]:bg-[#f4f8f6] max-[900px]:px-3 max-[900px]:py-2 [&_svg]:flex-none [&_span]:whitespace-nowrap [&_span]:text-base [&_span]:font-black [&_strong]:font-numeric [&_strong]:text-base [&_strong]:font-black [&_strong]:leading-5">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: MountainGuideDifficulty }) {
  return (
    <b className={cn('inline-flex min-h-7 min-w-7 flex-none items-center justify-center rounded-full border px-2 text-sm font-black', difficultyThemeClass[difficulty])}>
      {difficultyShortLabels[difficulty]}
    </b>
  );
}

function DifficultyMetric({ difficulty }: { difficulty: MountainGuideDifficulty }) {
  return (
    <div className="flex min-w-0 flex-nowrap items-center gap-2 text-[#18221d] max-[900px]:min-h-11 max-[900px]:rounded-lg max-[900px]:border max-[900px]:border-[#276c8f]/15 max-[900px]:bg-[#f4f8f6] max-[900px]:px-3 max-[900px]:py-2 [&_svg]:flex-none [&_span]:whitespace-nowrap [&_span]:text-base [&_span]:font-black">
      <ShieldAlert size={17} />
      <span>난이도</span>
      <strong className={cn('inline-flex min-h-7 items-center rounded-full border px-2.5 text-sm font-black leading-none', difficultyThemeClass[difficulty])}>
        {difficultyShortLabels[difficulty]}
      </strong>
    </div>
  );
}

function DifficultyGuide() {
  return (
    <section className="min-h-[216px] rounded-none border border-[#d9dee2] bg-white px-6 pb-5 pt-0 [&_h3]:mx-[-24px] [&_h3]:mb-[18px] [&_h3]:mt-0 [&_h3]:bg-[#f1f5f7] [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px] [&_dd]:m-0 [&_dd]:text-sm [&_dd]:leading-6 [&_dt]:font-black" aria-label="코스 난이도 안내">
      <h3>코스 난이도 안내</h3>
      <dl className="grid gap-3 [&>div]:grid [&>div]:grid-cols-[44px_minmax(0,1fr)] [&>div]:items-center [&>div]:gap-3">
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#bfdab4] bg-[#e7f3e4] px-3 text-sm font-black text-[#4d8b37]">하</dt>
          <dd>초보자도 비교적 쉽게 오를 수 있는 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#d7e4ba] bg-[#f0f7e4] px-3 text-sm font-black text-[#6f9134]">중</dt>
          <dd>기본 체력이 필요한 일반적인 산행 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#f3c79e] bg-[#fff0de] px-3 text-sm font-black text-[#c46422]">상</dt>
          <dd>경사, 거리, 암릉 등으로 경험이 필요한 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#efb9b4] bg-[#fde7e3] px-3 text-sm font-black text-[#a83a34]">최상</dt>
          <dd>숙련자에게 적합한 고난도 코스</dd>
        </div>
      </dl>
    </section>
  );
}

function VisitWarnings({ routes, notes }: { routes: MountainGuideRoute[]; notes?: string }) {
  const warnings = routes.flatMap((route) => route.warnings ?? []).slice(0, 5);

  return (
    <section className="min-h-[216px] rounded-none border border-[#d9dee2] bg-white px-6 pb-5 pt-0 [&_h3]:mx-[-24px] [&_h3]:mb-[18px] [&_h3]:mt-0 [&_h3]:bg-[#f1f5f7] [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px] [&_li]:flex [&_li]:gap-2 [&_li]:text-sm [&_li]:leading-6 [&_p]:text-sm [&_p]:leading-6 [&_ul]:m-0 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:p-0" aria-label="등산 시 유의사항">
      <h3>등산 시 유의사항</h3>
      <ul>
        {(warnings.length > 0 ? warnings : ['방문 전 탐방로 통제, 주차, 대중교통 운행 여부를 확인하세요.']).map((warning) => (
          <li key={warning}>
            <Check size={17} />
            <span>{warning}</span>
          </li>
        ))}
      </ul>
      {notes ? <p>{notes}</p> : null}
    </section>
  );
}

function WeatherStatusCard({ mountain }: { mountain: Mountain }) {
  return (
    <section className="min-h-[216px] rounded-none border border-[#00385d] bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.22),transparent_30%),linear-gradient(135deg,#00385d,#075073)] px-6 pb-5 pt-0 text-white [&_h3]:mx-[-24px] [&_h3]:mb-[14px] [&_h3]:mt-0 [&_h3]:bg-transparent [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px]" aria-label={`${mountain.name} 날씨`}>
      <div className="mx-[-24px] mb-3 flex items-center justify-between gap-3 px-6 py-3.5">
        <h3 className="!m-0 !p-0">오늘의 {mountain.name} 날씨</h3>
        <span className="text-xs font-bold text-white/80">예보 API 연결 예정</span>
      </div>
      <div className="mb-4 flex items-center gap-5">
        <CloudSun className="h-16 w-16 text-white/90" strokeWidth={1.6} />
        <div>
          <strong className="block text-[42px] font-black leading-none">--°C</strong>
          <p className="m-0 mt-1 text-sm font-bold text-white/85">{mountain.province} {mountain.city} 일대 예보 대기</p>
        </div>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-center">
        <div>
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <CloudSun size={14} />
            체감
          </dt>
          <dd className="m-0 text-sm font-black text-white">--°C</dd>
        </div>
        <div>
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <Droplets size={14} />
            습도
          </dt>
          <dd className="m-0 text-sm font-black text-white">--%</dd>
        </div>
        <div>
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <Wind size={14} />
            풍속
          </dt>
          <dd className="m-0 text-sm font-black text-white">--m/s</dd>
        </div>
      </dl>
    </section>
  );
}

function PhotoGallery({ mountainName, links }: { mountainName: string; links: MountainGuideLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="mt-[26px]" aria-label={`${mountainName} 갤러리`}>
      <div className="mb-3.5 flex items-center gap-2 [&_h3]:m-0 [&_h3]:text-[23px] [&_h3]:font-black [&_h3]:leading-[30px]">
        <MountainIcon size={18} />
        <h3>{mountainName} 갤러리</h3>
      </div>
      <div className="grid grid-cols-5 gap-2 max-[900px]:grid-cols-2">
        {links.map((link, index) => (
          <a className="block h-[116px] overflow-hidden rounded" key={link.url} href={link.url} target="_blank" rel="noreferrer">
            <img className="h-full w-full object-cover" src={link.url} alt={`${mountainName} 사진 ${index + 1}`} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}

function SourceLinks({ links }: { links: MountainGuideLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="mt-5" aria-label="검증용 링크">
      <div className="mb-3 flex items-center gap-2 [&_h3]:m-0 [&_h3]:text-xl [&_h3]:font-black">
        <ExternalLink size={18} />
        <h3>검증용 링크</h3>
      </div>
      <ul className="m-0 grid list-none gap-2 p-0">
        {links.map((link) => (
          <ResourceLink key={link.url} link={link} />
        ))}
      </ul>
    </section>
  );
}

function ResourceLink({ link }: { link: MountainGuideLink }) {
  return (
    <li>
      <a className="inline-flex items-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-3 py-2 font-extrabold text-[#276c8f]" href={link.url} target="_blank" rel="noreferrer">
        <span>{link.label}</span>
        <ExternalLink size={15} />
      </a>
    </li>
  );
}
