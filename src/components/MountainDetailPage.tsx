import {
  ArrowLeft,
  Check,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Mountain as MountainIcon,
  Route,
  Search,
  ShieldAlert,
  Sparkles,
  Star
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { getMountainGuide } from '../data/mountainDetails';
import { cn } from '../lib/classNames';
import { isKakaoMapConfigured } from '../services/env';
import { loadKakaoMaps } from '../services/kakaoLoader';
import type {
  Mountain,
  MountainGuideConfidence,
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
  easy: '수월함',
  normal: '보통',
  hard: '어려움',
  unknown: '확인 필요'
};

const confidenceLabels: Record<MountainGuideConfidence, string> = {
  low: '낮음',
  medium: '보통',
  high: '높음'
};

const difficultyShortLabels: Record<MountainGuideDifficulty, string> = {
  easy: '하',
  normal: '중',
  hard: '상',
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
  if (route.rank === 2) {
    return '경관 좋은 코스';
  }
  return `코스 ${route.rank}`;
}

const detailClass = {
  page: 'min-h-[calc(100vh-60px)] overflow-auto bg-white font-sans text-mountain-ink',
  hero:
    'relative min-h-[456px] overflow-hidden bg-[linear-gradient(135deg,rgba(6,38,58,0.95),rgba(16,69,56,0.84)),linear-gradient(135deg,#133628,#06263a)] text-white max-[900px]:min-h-0',
  courseHero:
    'relative min-h-[406px] overflow-hidden bg-[linear-gradient(135deg,rgba(6,38,58,0.95),rgba(16,69,56,0.84)),linear-gradient(135deg,#133628,#06263a)] text-white max-[900px]:min-h-0',
  heroInner: 'relative z-[1] mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-[34px] pt-[18px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4 max-[900px]:pb-8',
  breadcrumb:
    'flex min-h-8 items-center gap-2.5 text-sm font-extrabold text-white/85 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-1.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:font-black [&_button]:text-white',
  heroContent:
    'grid min-h-[384px] grid-cols-[minmax(0,1fr)_304px] items-end gap-[58px] pt-5 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[900px]:pt-8',
  courseHeroContent:
    'grid min-h-[330px] grid-cols-[minmax(0,1fr)_312px] items-end gap-[58px] pt-[26px] max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6',
  elevation: 'mb-4 inline-flex min-h-[42px] items-center rounded-[5px] bg-[#00385d] px-3.5 text-[22px] font-black leading-none text-white shadow-heroPanel',
  heroTitle: 'm-0 text-[78px] font-black leading-[0.96] text-white shadow-black [letter-spacing:0] [text-shadow:0_5px_18px_rgba(0,0,0,0.42)] max-[900px]:text-[clamp(44px,14vw,64px)]',
  courseTitle: 'm-0 max-w-[780px] text-5xl font-black leading-[1.12] text-white [letter-spacing:0] max-[900px]:text-[clamp(34px,11vw,48px)]',
  heroCopy: 'mt-[22px] max-w-[650px] text-lg font-extrabold leading-[31px] text-white/95',
  facts: 'mt-[50px] grid grid-cols-4 gap-[38px] max-[900px]:mt-7 max-[900px]:grid-cols-2 max-[900px]:gap-3.5',
  infoPanel:
    'self-center rounded-[9px] border border-white/20 bg-[#0a0e12]/80 px-[22px] py-[23px] text-white shadow-heroPanel backdrop-blur-md [&_dl]:grid [&_dl]:gap-0 [&_h3]:mb-4 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-white',
  infoButton:
    'mt-[17px] inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border border-white/70 bg-black/10 px-3 text-[15px] font-extrabold text-white',
  content: 'mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-0 pt-[30px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4',
  sectionHeading:
    'mb-[18px] flex items-center gap-[18px] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-1.5 [&_h3]:m-0 [&_h3]:text-[28px] [&_h3]:font-black [&_h3]:leading-[34px] [&_span]:border-l [&_span]:border-[#d8e0da] [&_span]:pl-4 [&_span]:text-[15px] [&_span]:font-semibold [&_span]:text-[#777] max-[900px]:[&_span]:border-l-0 max-[900px]:[&_span]:pl-0',
  routeList: 'grid gap-[17px]',
  selectionReason: 'mb-[26px] [&_.eyebrow]:mb-2.5 [&_.eyebrow]:text-[22px] [&_.eyebrow]:font-black [&_.eyebrow]:leading-[30px] [&_.eyebrow]:text-[#111] [&_p:not(.eyebrow)]:text-base [&_p:not(.eyebrow)]:leading-7 [&_p:not(.eyebrow)]:text-[#444]',
  supportGrid: 'mt-6 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1',
  bottomActions: 'mt-[22px] flex justify-end',
  completeButton:
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-4 font-extrabold text-[#18221d]',
  completeButtonActive: 'border-[#1f8a5b] bg-[#1f8a5b] text-white',
  courseTabs:
    'mb-[22px] flex gap-[30px] border-b border-[#dedede] [&_button]:min-h-[54px] [&_button]:border-0 [&_button]:border-b-4 [&_button]:border-transparent [&_button]:bg-transparent [&_button]:px-6 [&_button]:text-[21px] [&_button]:font-black [&_button]:text-[#627168] [&_button.is-active]:border-b-[#e10f07] [&_button.is-active]:text-[#18221d]',
  courseMapLayout: 'grid grid-cols-[minmax(0,760px)_minmax(310px,1fr)] gap-5 max-[900px]:grid-cols-1',
  card: 'rounded-md border border-[#dedede] bg-white',
  cardPadded: 'rounded-md border border-[#dedede] bg-white p-[22px]',
  mapBox:
    'min-h-[430px] overflow-hidden rounded-[5px] bg-[linear-gradient(rgba(47,107,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,79,0.08)_1px,transparent_1px),#edf3e8] bg-[length:42px_42px]',
  placeholder:
    'grid min-h-[430px] place-items-center content-center gap-2.5 rounded-[5px] bg-[linear-gradient(rgba(47,107,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,79,0.08)_1px,transparent_1px),#edf3e8] bg-[length:42px_42px] p-6 text-center text-[#18221d] [&_p]:m-0 [&_p]:max-w-[420px] [&_p]:text-[#627168] [&_p]:leading-7 [&_strong]:text-xl [&_svg]:text-[#e10f07]',
  evaluationGrid: 'grid grid-cols-[1fr_1fr_1.05fr] gap-4 max-[900px]:grid-cols-1',
  footer: 'mt-9 bg-mountain-navy text-white',
  footerInner:
    'mx-auto grid min-h-[76px] w-[1180px] max-w-[calc(100%-80px)] grid-cols-[minmax(230px,1.5fr)_repeat(4,minmax(110px,1fr))_minmax(90px,auto)] items-center gap-5 text-sm font-extrabold max-[900px]:w-full max-[900px]:max-w-none max-[900px]:grid-cols-1 max-[900px]:px-4 max-[900px]:py-5 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-2.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:text-white [&_strong]:inline-flex [&_strong]:items-center [&_strong]:gap-2.5 [&_strong]:text-[17px] [&_strong]:font-black'
};

const routeThemeClass: Record<string, string> = {
  recommended: '[--route-color:#e10f07]',
  balanced: '[--route-color:#f58600]',
  easy: '[--route-color:#237c18]',
  forest: '[--route-color:#237c18]',
  hard: '[--route-color:#b71212]'
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
      confidence={guide.confidence}
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
  confidence,
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
  confidence?: MountainGuideConfidence;
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
      className={detailClass.page}
      aria-label={`${mountain.name} 상세 정보`}
    >
      <header className={detailClass.hero} style={heroStyle}>
        <div className="pointer-events-none absolute inset-0" />
        <div className={detailClass.heroInner}>
          <div className={detailClass.breadcrumb}>
            <button type="button" onClick={onBack}>
              <ArrowLeft size={17} />
              지도
            </button>
          </div>

          <div className={detailClass.heroContent}>
            <div className="max-w-[760px]">
              <span className={detailClass.elevation}>
                {mountain.elevationMeters.toLocaleString()}m
              </span>
              <h2 className={detailClass.heroTitle}>{mountain.name}</h2>
              
              <p className={detailClass.heroCopy}>{selectionReason}</p>
              <div className={detailClass.facts} aria-label="산 핵심 정보">
                <HeroFact icon={<MapPin size={18} />} label="위치" value={`${mountain.province} ${mountain.city}`} />
                <HeroFact icon={<MountainIcon size={18} />} label="높이" value={`${mountain.elevationMeters.toLocaleString()}m`} />
                <HeroFact icon={<Star size={18} />} label="선정" value="대한민국 100대 명산" />
                <HeroFact icon={<Route size={18} />} label="특징" value={recommendedRoute?.name ?? '대표 코스 확인 필요'} />
              </div>
            </div>

            <aside className={detailClass.infoPanel} aria-label="산 정보">
              <h3>산 정보</h3>
              <dl>
                <HeroInfoRow icon={<MapPin size={16} />} label="위치" value={`${mountain.province} ${mountain.city}`} />
                <HeroInfoRow icon={<MountainIcon size={16} />} label="높이" value={`${mountain.elevationMeters.toLocaleString()}m`} />
                <HeroInfoRow icon={<ShieldAlert size={16} />} label="난이도" value={recommendedRoute ? difficultyLabels[recommendedRoute.difficulty] : '확인 필요'} />
                <HeroInfoRow icon={<Clock size={16} />} label="소요시간" value={recommendedRoute?.estimatedTime ?? '확인 필요'} />
                <HeroInfoRow icon={<Sparkles size={16} />} label="자료" value={getGuideSourceLabel(guideSource)} />
                <HeroInfoRow icon={<Check size={16} />} label="상태" value={getGuideStatusLabel(guideStatus, guideSource)} />
              </dl>
              <button className={detailClass.infoButton} type="button" onClick={() => onShowOnMap(mountain)}>
                지도에서 보기
                <MapPin size={17} />
              </button>
            </aside>
          </div>
        </div>
      </header>

      <main className={detailClass.content}>
        <section className="route-showcase-section" aria-label="추천 코스">
          <div className={detailClass.sectionHeading}>
            <h3>추천 코스</h3>
            <span>{mountain.name}의 대표 코스 정보를 확인하세요.</span>
          </div>
          <ul className={detailClass.routeList}>
            {routes.map((route, index) => (
              <RouteSummaryCard key={route.name} route={route} imageUrl={getRouteImage(route, photoLinks, index)} onOpen={() => onRouteOpen(route)} />
            ))}
          </ul>
        </section>

        <section className={detailClass.selectionReason} aria-label="100대 명산 선정 이유">
          <p className="eyebrow">100대 명산 선정 이유</p>
          <p>{selectionReason}</p>
        </section>

        <div className={detailClass.supportGrid}>
          <DifficultyGuide />
          <VisitWarnings routes={routes} notes={notes} />
          <GuideStatusCard guideSource={guideSource} confidence={confidence} status={guideStatus} />
        </div>

        <PhotoGallery mountainName={mountain.name} links={photoLinks} />
        <SourceLinks links={verificationLinks} />

        <div className={detailClass.bottomActions}>
          <button className={cn(detailClass.completeButton, isCompleted && detailClass.completeButtonActive)} type="button" onClick={() => onToggleCompleted(mountain)}>
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
      className={detailClass.page}
      aria-label={`${mountain.name} ${route.name} 상세 정보`}
    >
      <header className={detailClass.courseHero} style={heroStyle}>
        <div className="pointer-events-none absolute inset-0" />
        <div className={detailClass.heroInner}>
          <nav className={detailClass.breadcrumb} aria-label="현재 위치">
            <button type="button" onClick={onBackToMap}>홈</button>
            <span>추천 코스</span>
            <button type="button" onClick={onBackToMountain}>{mountain.name}</button>
            <strong>{route.name}</strong>
          </nav>

          <div className={detailClass.courseHeroContent}>
            <div>
              <span className={cn('mb-[18px] inline-flex rounded-[5px] bg-white px-2.5 py-1.5 text-sm font-black leading-[18px]', routeThemeClass[getRouteTheme(route)], 'text-[var(--route-color)]')}>{getRouteLabel(route)}</span>
              <h2 className={detailClass.courseTitle}>{mountain.name} {route.name}</h2>
              <p className={cn(detailClass.heroCopy, 'mt-3')}>{getRouteSummary(route)}</p>
              <p className="mt-5 max-w-[650px] text-base font-bold leading-7 text-white/95">{route.summary ?? route.recommendationReason ?? `${route.name}의 주요 경유지와 접근 정보를 확인하세요.`}</p>
              <div className={detailClass.facts}>
                <HeroFact icon={<Route size={19} />} label="거리" value={route.distance} />
                <HeroFact icon={<Clock size={19} />} label="소요시간" value={route.estimatedTime} />
                <HeroFact icon={<MountainIcon size={19} />} label="누적 고도" value={route.elevationGain ?? '확인 필요'} />
                <HeroFact icon={<ShieldAlert size={19} />} label="난이도" value={difficultyLabels[route.difficulty]} />
              </div>
            </div>

            <aside className={detailClass.infoPanel} aria-label="코스 정보 요약">
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

      <main className={detailClass.content}>
        <div className={detailClass.courseTabs} role="tablist" aria-label="코스 상세 탭">
          <button className="is-active" type="button">코스 개요</button>
          <button type="button">포토 갤러리</button>
        </div>

        <section className={detailClass.courseMapLayout} aria-label="코스 지도와 타임라인">
          <div className={detailClass.cardPadded}>
            <h3>코스 지도</h3>
            <KakaoRouteMap route={route} />
          </div>
          <CourseTimelinePanel stops={stops} route={route} />
        </section>

        <section className={cn(detailClass.cardPadded, 'mt-6')} aria-label={`${route.name} 코스 평가`}>
          <h3>{mountain.name} {route.name} 평가</h3>
          <div className={detailClass.evaluationGrid}>
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

        <section className={cn(detailClass.cardPadded, 'mt-6')} aria-label="다른 등산객들의 한줄평">
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
    <footer className={detailClass.footer} aria-label="하단 메뉴">
      <div className={detailClass.footerInner}>
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
    backgroundColor: 'var(--route-color)',
    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.16), transparent 40%)'
  } as CSSProperties;

  return (
    <li className={cn('grid min-h-[188px] grid-cols-[282px_minmax(0,1fr)_316px] overflow-hidden rounded-[5px] border border-[#d6d6d6] bg-white shadow-route max-[900px]:grid-cols-1', routeThemeClass[getRouteTheme(route)])}>
      <div className="flex min-w-0 flex-col justify-center gap-[11px] px-5 py-[23px] text-white" style={routePanelStyle}>
        <span className="self-start rounded-[5px] bg-white px-2.5 py-1.5 text-sm font-black leading-[18px] text-[var(--route-color)]">{getRouteLabel(route)}</span>
        <div className="flex min-w-0 items-center gap-2.5">
          <strong className="text-[28px] leading-[34px]">{route.name}</strong>
          <b className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/20 text-sm font-black text-white">{difficultyShortLabels[route.difficulty]}</b>
        </div>
        <p className="m-0 text-base font-bold leading-6">{getRouteSummary(route)}</p>
        <button className="mt-1 inline-flex min-h-[38px] items-center gap-2 self-start rounded-md border border-white/40 bg-white/10 px-3.5 text-sm font-black text-white [&_svg]:rotate-180" type="button" onClick={onOpen}>
          코스 상세보기
          <ArrowLeft size={16} />
        </button>
      </div>
      <div className="grid min-w-0 content-center gap-6 overflow-hidden bg-[linear-gradient(90deg,#fff,#fbfcfb)] px-7 py-[26px] max-[900px]:p-5">
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          <Metric icon={<Route size={17} />} label="거리" value={route.distance} />
          <Metric icon={<Clock size={17} />} label="소요시간" value={route.estimatedTime} />
          <Metric icon={<ShieldAlert size={17} />} label="난이도" value={difficultyShortLabels[route.difficulty]} />
        </div>
        <RouteTimeline stops={stops} rawPath={route.path} />
      </div>
      <figure className="m-0 block min-w-0 bg-[#f7f7f7] p-2.5">
        {imageUrl ? (
          <img className="block h-full min-h-[164px] w-full rounded-[5px] object-cover" src={imageUrl} alt={`${route.name} 참고 사진`} loading="lazy" />
        ) : (
          <div className="grid h-full min-h-[164px] place-items-center rounded-[5px] bg-[#edf3e8] text-center" aria-hidden="true">
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
      <div className={detailClass.placeholder}>
        <Search size={24} />
        <strong>경로 좌표 준비 중</strong>
        <p>사용자가 입력한 위도/경도 좌표가 추가되면 카카오맵에 코스 동선이 표시됩니다.</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className={detailClass.placeholder}>
        <ShieldAlert size={24} />
        <strong>지도 표시 실패</strong>
        <p>{mapError}</p>
      </div>
    );
  }

  return <div ref={containerRef} className={detailClass.mapBox} aria-label={`${route.name} 카카오맵 경로`} />;
}

function RouteTimeline({ stops, rawPath }: { stops: MountainGuideRouteStop[]; rawPath: string }) {
  return (
    <div className="m-0 border-0 bg-transparent p-0">
      <strong className="sr-only">코스</strong>
      {stops.length > 1 ? (
        <>
          <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(84px,1fr))] p-0 before:absolute before:left-[8%] before:right-[8%] before:top-2 before:h-0.5 before:bg-[var(--route-color)] before:content-['']" aria-label="코스 경유지">
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
    <aside className={cn(detailClass.card, 'px-6 py-[26px]')} aria-label="코스 한눈에 보기">
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

function DifficultyGuide() {
  return (
    <section className="min-h-[216px] rounded-none border border-[#d9dee2] bg-white px-6 pb-5 pt-0 [&_h3]:mx-[-24px] [&_h3]:mb-[18px] [&_h3]:mt-0 [&_h3]:bg-[#f1f5f7] [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px] [&_dd]:m-0 [&_dd]:text-sm [&_dd]:leading-6 [&_dt]:font-black" aria-label="코스 난이도 안내">
      <h3>코스 난이도 안내</h3>
      <dl className="grid gap-3 [&>div]:grid [&>div]:grid-cols-[44px_minmax(0,1fr)] [&>div]:items-center [&>div]:gap-3">
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full bg-[#e6f4e5] px-3 text-sm font-black text-[#237c18]">하</dt>
          <dd>초보자도 비교적 쉽게 오를 수 있는 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full bg-[#eef7e5] px-3 text-sm font-black text-[#4d8b20]">중</dt>
          <dd>기본 체력이 필요한 일반적인 산행 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full bg-[#fff0e1] px-3 text-sm font-black text-[#e10f07]">상</dt>
          <dd>경사, 거리, 암릉 등으로 경험이 필요한 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full bg-[#ffe9e9] px-3 text-sm font-black text-[#b71212]">확인</dt>
          <dd>자료가 부족해 방문 전 추가 확인이 필요한 코스</dd>
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

function GuideStatusCard({
  guideSource,
  confidence,
  status
}: {
  guideSource: MountainGuideSource;
  confidence?: MountainGuideConfidence;
  status: MountainGuideStatus;
}) {
  return (
    <section className="min-h-[216px] rounded-none border border-[#00385d] bg-[#00385d] px-6 pb-5 pt-0 text-white [&_h3]:mx-[-24px] [&_h3]:mb-[18px] [&_h3]:mt-0 [&_h3]:bg-transparent [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px] [&_dd]:m-0 [&_dd]:text-white/90 [&_dt]:text-white/90" aria-label="정보 상태">
      <h3>정보 상태</h3>
      <dl className="grid gap-3">
        <div>
          <dt>출처</dt>
          <dd>{getGuideSourceLabel(guideSource)}</dd>
        </div>
        <div>
          <dt>검증</dt>
          <dd>{status === 'verified' ? '검증됨' : '미검증 초안'}</dd>
        </div>
        <div>
          <dt>신뢰도</dt>
          <dd>{confidence ? confidenceLabels[confidence] : '확인 필요'}</dd>
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
