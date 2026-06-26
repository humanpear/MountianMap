import {
  ArrowLeft,
  Camera,
  Check,
  ChevronDown,
  CloudSun,
  Clock,
  Droplets,
  ExternalLink,
  Heart,
  Lightbulb,
  MapPin,
  MessageCircle,
  Minus,
  Mountain as MountainIcon,
  Plus,
  Route,
  ShieldAlert,
  Wind,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { getMountainGuide } from "../data/mountainDetails";
import { cn } from "../lib/classNames";
import { MountainNameWithHanja } from "./MountainNameWithHanja";
import {
  fetchMountainWeather,
  getMountainWeatherPageUrl,
  getMountainWeatherStationForName,
  type MountainWeather,
} from "../services/mountainWeather";
import type {
  ForestTripCourseKind,
  Mountain,
  MountainGuideDifficulty,
  MountainGuideImage,
  MountainGuideLink,
  MountainGuideRoute,
  MountainGuideRouteStop,
  MountainGuideSource,
  MountainGuideStatus,
} from "../types";

type MountainDetailPageProps = {
  mountain: Mountain;
  isCompleted: boolean;
  onBack: () => void;
  onShowOnMap: (mountain: Mountain) => void;
  onToggleCompleted: (mountain: Mountain) => void;
};

type CourseDetailTab = "overview" | "gallery";

type CourseReview = {
  id: string;
  nickname: string;
  createdAt: string;
  difficulty: string;
  duration: string;
  body: string;
  likes: number;
  comments: number;
};

type CourseFeedbackPhoto = {
  id: string;
  name: string;
  url: string;
};

type ScrollHeroState = {
  progress: number;
  expandedHeight: number;
  height: number;
  stickyOffset: number;
  imageBrightness: number;
  imageOpacity: number;
};

const initialScrollHeroState: ScrollHeroState = {
  progress: 0,
  expandedHeight: 600,
  height: 600,
  stickyOffset: 0,
  imageBrightness: 1,
  imageOpacity: 1,
};

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const defaultHeroImageRatio = 9 / 16;

function getExpandedHeroHeight(imageRatio = defaultHeroImageRatio) {
  if (typeof window === "undefined") {
    return initialScrollHeroState.height;
  }

  return clampNumber(window.innerWidth * imageRatio, 520, 860);
}

const difficultyLabels: Record<MountainGuideDifficulty, string> = {
  easy: "하",
  normal: "중",
  hard: "상",
  extreme: "최상",
  unknown: "확인 필요",
};

const difficultyShortLabels: Record<MountainGuideDifficulty, string> = {
  easy: "하",
  normal: "중",
  hard: "상",
  extreme: "최상",
  unknown: "확인",
};

function getGuideStatusLabel(
  status: MountainGuideStatus,
  source: MountainGuideSource,
) {
  if (status === "verified") {
    return "검증됨";
  }

  return source === "curated" ? "조사 초안 / 미검증" : "AI 초안 / 미검증";
}

function getGuideSourceLabel(source: MountainGuideSource) {
  return source === "curated" ? "웹검색 정리" : "AI 초안";
}

function getRouteTheme(route: MountainGuideRoute) {
  if (route.isRecommended || route.rank === 1) {
    return "recommended";
  }
  if (route.rank === 2) {
    return "balanced";
  }
  if (route.rank === 3) {
    return "forest";
  }
  if (route.rank >= 90) {
    return "easy";
  }
  if (route.difficulty === "easy") {
    return "easy";
  }
  if (route.difficulty === "extreme") {
    return "extreme";
  }
  if (route.difficulty === "hard") {
    return "hard";
  }
  return "forest";
}

function getRouteLabel(route: MountainGuideRoute) {
  if (route.isRecommended) {
    return "최고 인기 코스";
  }
  if (route.difficulty === "easy") {
    return "비교적 쉬운 코스";
  }
  if (route.difficulty === "hard") {
    return "난이도 높은 코스";
  }
  if (route.difficulty === "extreme") {
    return "숙련자용 고난도 코스";
  }
  if (route.rank === 2) {
    return "경관 좋은 코스";
  }
  return `코스 ${route.rank}`;
}

const routeThemeClass: Record<string, string> = {
  recommended:
    "[--route-color:#e10f07] [--route-panel:#e10f07] [--route-panel-dark:#c90000] [--route-soft:#fff7f5]",
  balanced:
    "[--route-color:#f58600] [--route-panel:#ff9100] [--route-panel-dark:#f07800] [--route-soft:#fffaf0]",
  easy: "[--route-color:#237c18] [--route-panel:#2f941f] [--route-panel-dark:#166d0d] [--route-soft:#f5fbef]",
  forest:
    "[--route-color:#237c18] [--route-panel:#2f941f] [--route-panel-dark:#166d0d] [--route-soft:#f5fbef]",
  hard: "[--route-color:#e10f07] [--route-panel:#e10f07] [--route-panel-dark:#c90000] [--route-soft:#fff7f5]",
  extreme:
    "[--route-color:#b70000] [--route-panel:#c90000] [--route-panel-dark:#8f0000] [--route-soft:#fff2f2]",
};

const difficultyThemeClass: Record<MountainGuideDifficulty, string> = {
  easy: "border-[#bfdab4] bg-[#e7f3e4] text-[#4d8b37]",
  normal: "border-[#d7e4ba] bg-[#f0f7e4] text-[#6f9134]",
  hard: "border-[#f3c79e] bg-[#fff0de] text-[#c46422]",
  extreme: "border-[#efb9b4] bg-[#fde7e3] text-[#a83a34]",
  unknown: "border-[#cfd7dc] bg-[#eef2f4] text-[#65717a]",
};

const difficultyEvaluationOptions = [
  "쉬움",
  "보통",
  "약간 어려움",
  "어려움",
  "매우 어려움",
];

const difficultyEvaluationIconSrcs = [
  "/course-feedback-icons/difficulty/easy.png",
  "/course-feedback-icons/difficulty/normal.png",
  "/course-feedback-icons/difficulty/slightly-hard.png",
  "/course-feedback-icons/difficulty/hard.png",
  "/course-feedback-icons/difficulty/extreme.png",
];

const durationQuickOptions = [
  { label: "2시간", minutes: 120 },
  { label: "2시간 30분", minutes: 150 },
  { label: "3시간", minutes: 180 },
  { label: "3시간 30분", minutes: 210 },
  { label: "4시간", minutes: 240 },
  { label: "4시간 30분", minutes: 270 },
  { label: "5시간", minutes: 300 },
  { label: "5시간 이상", minutes: 330 },
];

const difficultyDefaultIndex: Record<MountainGuideDifficulty, number> = {
  easy: 0,
  normal: 1,
  hard: 3,
  extreme: 4,
  unknown: 2,
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
    label:
      index === 0
        ? "start"
        : index === stops.length - 1
          ? "finish"
          : name.includes("정상")
            ? "summit"
            : "waypoint",
  }));
}

function getRouteSummary(route: MountainGuideRoute) {
  const stops = buildRouteStops(route);
  if (stops.length >= 2) {
    return `${stops[0].name} ~ ${stops[stops.length - 1].name}`;
  }
  return route.startPoint;
}

function isRoundTripRoute(
  route: MountainGuideRoute,
  stops = buildRouteStops(route),
) {
  const normalize = (value: string | undefined) =>
    value?.replace(/\s+/g, "").trim();
  const firstStop = normalize(stops[0]?.name);
  const lastStop = normalize(stops[stops.length - 1]?.name);

  return (
    route.name.includes("원점회귀") ||
    route.name.includes("왕복") ||
    (Boolean(firstStop) && firstStop === lastStop)
  );
}

function getPrimaryStartPoint(
  route: MountainGuideRoute,
  stops = buildRouteStops(route),
) {
  const startPoint = route.startPoint.trim() || stops[0]?.name || route.name;
  return startPoint.split(/\s*(?:또는|\/|,)\s*/)[0]?.trim() || startPoint;
}

function getRouteDisplayName(route: MountainGuideRoute) {
  const stops = buildRouteStops(route);
  const startPoint = getPrimaryStartPoint(route, stops);
  return `${startPoint}${isRoundTripRoute(route, stops) ? " 원점회귀" : ""} 코스`;
}

function getSummaryMetricValue(value: string) {
  return value
    .replace(/^약\s*/, "")
    .replace(/\s*원점회귀$/, "")
    .replace(/\s*안팎$/, "")
    .trim();
}

function getRouteImage(
  route: MountainGuideRoute,
  guidePhotos: MountainGuideLink[],
  index = 0,
) {
  if (route.heroImageUrl) {
    return route.heroImageUrl;
  }
  if (route.courseMapImage?.src) {
    return route.courseMapImage.src;
  }
  return guidePhotos[index % Math.max(guidePhotos.length, 1)]?.url;
}

function getHeroImage(
  route: MountainGuideRoute | undefined,
  guidePhotos: MountainGuideLink[],
  guideHeroImage?: MountainGuideImage,
) {
  if (route) {
    return getRouteImage(route, guidePhotos);
  }
  return guideHeroImage?.src ?? guidePhotos[0]?.url;
}

export function getMountainMainHeroImage(
  mountainId: string,
  guideHeroImage?: MountainGuideImage,
) {
  return guideHeroImage?.src ?? `/mountain-images/${mountainId}/hero.png`;
}

function getCourseReviewStorageKey(mountainId: string, routeName: string) {
  return `mountain-map:course-reviews:${mountainId}:${routeName}`;
}

function createPhotoPreviewUrl(file: File) {
  return typeof URL.createObjectURL === "function"
    ? URL.createObjectURL(file)
    : "";
}

function revokePhotoPreviewUrl(url: string) {
  if (url && typeof URL.revokeObjectURL === "function") {
    URL.revokeObjectURL(url);
  }
}

function getDefaultDurationMinutes(estimatedTime: string) {
  const hourMatch = estimatedTime.match(/(\d+(?:\.\d+)?)/);
  const hours = hourMatch ? Number(hourMatch[1]) : Number.NaN;

  if (!Number.isFinite(hours)) {
    return 180;
  }

  const minuteMatch = estimatedTime.match(/(\d+)\s*분/);
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  return clampNumber(Math.round(hours * 60 + minutes), 30, 600);
}

function formatDurationMinutes(minutes: number) {
  const safeMinutes = clampNumber(Math.round(minutes), 0, 600);
  const hours = Math.floor(safeMinutes / 60);
  const remainder = safeMinutes % 60;

  if (hours <= 0) {
    return `${remainder}분`;
  }
  if (remainder === 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${remainder}분`;
}

function parseStoredReviews(value: string | null): CourseReview[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((review): review is CourseReview => {
      return (
        typeof review?.id === "string" &&
        typeof review.nickname === "string" &&
        typeof review.createdAt === "string" &&
        typeof review.difficulty === "string" &&
        typeof review.duration === "string" &&
        typeof review.body === "string" &&
        typeof review.likes === "number" &&
        typeof review.comments === "number"
      );
    });
  } catch {
    return [];
  }
}

function formatReviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "");
}

export function MountainDetailPage({
  mountain,
  isCompleted,
  onBack,
  onShowOnMap,
  onToggleCompleted,
}: MountainDetailPageProps) {
  const guide = getMountainGuide(mountain);
  const sortedRoutes = useMemo(
    () =>
      [...guide.routes].sort(
        (a, b) =>
          Number(b.isRecommended) - Number(a.isRecommended) || a.rank - b.rank,
      ),
    [guide.routes],
  );
  const [activeRouteName, setActiveRouteName] = useState<string | null>(null);
  const activeRoute = sortedRoutes.find(
    (route) => route.name === activeRouteName,
  );

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
      heroImage={guide.heroImage}
      courseMapImage={guide.courseMapImage}
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
  heroImage: guideHeroImage,
  courseMapImage,
  photoLinks,
  verificationLinks,
  isCompleted,
  onBack,
  onShowOnMap,
  onToggleCompleted,
  onRouteOpen,
}: {
  mountain: Mountain;
  routes: MountainGuideRoute[];
  guideSource: MountainGuideSource;
  guideStatus: MountainGuideStatus;
  selectionReason: string;
  notes?: string;
  heroImage?: MountainGuideImage;
  courseMapImage?: MountainGuideImage;
  photoLinks: MountainGuideLink[];
  verificationLinks: MountainGuideLink[];
  isCompleted: boolean;
  onBack: () => void;
  onShowOnMap: (mountain: Mountain) => void;
  onToggleCompleted: (mountain: Mountain) => void;
  onRouteOpen: (route: MountainGuideRoute) => void;
}) {
  const heroImage = getMountainMainHeroImage(mountain.id, guideHeroImage);
  const recommendedRoute = routes[0];
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const [heroImageRatio, setHeroImageRatio] = useState(defaultHeroImageRatio);
  const [heroState, setHeroState] = useState<ScrollHeroState>(() => ({
    ...initialScrollHeroState,
    expandedHeight: getExpandedHeroHeight(defaultHeroImageRatio),
    height: getExpandedHeroHeight(defaultHeroImageRatio),
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    let animationFrameId = 0;

    const updateHeroState = () => {
      animationFrameId = 0;

      const expandedHeight = getExpandedHeroHeight(heroImageRatio);
      const measuredContentHeight = heroContentRef.current?.offsetHeight ?? 0;
      const contentHeight =
        measuredContentHeight > 0 ? measuredContentHeight : 360;
      const visualExpandedHeight = Math.max(expandedHeight, contentHeight);
      const collapsedHeight = Math.min(visualExpandedHeight, contentHeight);
      const collapseDistance = Math.max(
        1,
        visualExpandedHeight - collapsedHeight,
      );
      const scrollTop = section.scrollTop;
      const progress = clampNumber(scrollTop / collapseDistance, 0, 1);
      const nextHeight =
        visualExpandedHeight -
        (visualExpandedHeight - collapsedHeight) * progress;
      const nextState: ScrollHeroState = {
        progress,
        expandedHeight: visualExpandedHeight,
        height: nextHeight,
        stickyOffset: Math.min(scrollTop, collapseDistance),
        imageBrightness: 1 - 0.45 * progress,
        imageOpacity: 1 - 0.28 * progress,
      };

      setHeroState((currentState) => {
        const hasMeaningfulChange =
          Math.abs(currentState.progress - nextState.progress) > 0.002 ||
          Math.abs(currentState.expandedHeight - nextState.expandedHeight) >
            0.5 ||
          Math.abs(currentState.height - nextState.height) > 0.5 ||
          Math.abs(currentState.stickyOffset - nextState.stickyOffset) > 0.5 ||
          Math.abs(currentState.imageBrightness - nextState.imageBrightness) >
            0.002 ||
          Math.abs(currentState.imageOpacity - nextState.imageOpacity) > 0.002;

        return hasMeaningfulChange ? nextState : currentState;
      });
    };

    const scheduleHeroUpdate = () => {
      if (animationFrameId === 0) {
        animationFrameId = window.requestAnimationFrame(updateHeroState);
      }
    };

    updateHeroState();
    section.addEventListener("scroll", scheduleHeroUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeroUpdate);

    const contentResizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(scheduleHeroUpdate);
    if (heroContentRef.current && contentResizeObserver) {
      contentResizeObserver.observe(heroContentRef.current);
    }

    return () => {
      section.removeEventListener("scroll", scheduleHeroUpdate);
      window.removeEventListener("resize", scheduleHeroUpdate);
      contentResizeObserver?.disconnect();
      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [heroImageRatio, mountain.id, routes.length, selectionReason]);

  const handleHeroImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = event.currentTarget;
    if (naturalHeight > 0 && naturalWidth > 0) {
      setHeroImageRatio(naturalHeight / naturalWidth);
    }
  };

  const heroFrameStyle = {
    height: `${heroState.expandedHeight}px`,
    "--hero-frame-height": `${heroState.height}px`,
    "--hero-image-url": `url("${heroImage}")`,
    "--hero-sticky-offset": `${heroState.stickyOffset}px`,
    "--hero-image-brightness": heroState.imageBrightness.toFixed(3),
    "--hero-image-opacity": heroState.imageOpacity.toFixed(3),
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="h-[calc(100vh-60px)] overflow-auto bg-white font-sans text-mountain-ink"
      aria-label={`${mountain.name} 상세 정보`}
    >
      <header className="relative bg-black text-white" style={heroFrameStyle}>
        <div
          data-scroll-hero-frame
          className="sticky top-0 flex items-end overflow-hidden bg-black text-white"
          style={
            {
              height: "var(--hero-frame-height)",
            } as CSSProperties
          }
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
            {heroImage ? (
              <img
                className="absolute left-0 top-1/2 w-full max-w-none -translate-y-1/2"
                src={heroImage}
                alt={`${mountain.name} 대표 이미지`}
                onLoad={handleHeroImageLoad}
                style={
                  {
                    filter: "brightness(var(--hero-image-brightness))",
                    opacity: "var(--hero-image-opacity)",
                  } as CSSProperties
                }
              />
            ) : (
              <div className="h-full w-full bg-[linear-gradient(135deg,#133628,#06263a)]" />
            )}
          </div>
          <div
            ref={heroContentRef}
            data-scroll-hero-content
            className="relative z-[1] mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-[34px] pt-[18px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4 max-[900px]:pb-8"
          >
            <div className="grid min-h-[384px] grid-cols-[minmax(0,1fr)_304px] grid-rows-[auto_auto] items-end gap-x-[58px] gap-y-0 pt-5 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:grid-rows-none max-[900px]:gap-6 max-[900px]:pt-8">
              <div className="col-start-1 row-start-1 max-w-[760px] max-[900px]:col-start-auto max-[900px]:row-start-auto">
                <span className="mb-10 inline-flex min-h-[42px] items-center rounded-[5px] bg-[#00385d] px-3.5 text-[22px] font-black leading-none text-white shadow-heroPanel">
                  {mountain.elevationMeters.toLocaleString()}m
                </span>
              </div>
              <div className="col-start-1 row-start-2 flex max-w-[760px] self-stretch flex-col justify-between gap-10 max-[900px]:col-start-auto max-[900px]:row-start-auto max-[900px]:gap-6">
                <h2 className="m-0 text-[78px] font-black leading-[0.96] text-white shadow-black [letter-spacing:0] [text-shadow:0_5px_18px_rgba(0,0,0,0.42)] max-[900px]:text-[clamp(44px,14vw,64px)]">
                  <MountainNameWithHanja
                    mountain={mountain}
                    className="flex-wrap"
                    hanjaClassName="text-[0.35em] leading-none text-white/95"
                  />
                </h2>
                <p className="m-0 max-w-[650px] text-lg font-extrabold leading-[31px] break-keep text-white/95">
                  {selectionReason}
                </p>
              </div>

              <aside
                className="col-start-2 row-start-2 self-stretch rounded-[9px] border border-white/25 bg-black/45 px-[22px] py-[23px] text-white shadow-heroPanel backdrop-blur-sm max-[900px]:col-start-auto max-[900px]:row-start-auto max-[900px]:self-auto [&_dl]:grid [&_dl]:gap-0 [&_h3]:mb-4 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-white"
                aria-label="산 정보"
              >
                <h3>산 정보</h3>
                <dl>
                  <HeroInfoRow
                    icon={<MapPin size={16} />}
                    label="위치"
                    value={`${mountain.province} ${mountain.city}`}
                  />
                  <HeroInfoRow
                    icon={<MountainIcon size={16} />}
                    label="높이"
                    value={`${mountain.elevationMeters.toLocaleString()}m`}
                  />
                  <HeroInfoRow
                    icon={<ShieldAlert size={16} />}
                    label="난이도"
                    value={
                      recommendedRoute
                        ? difficultyLabels[recommendedRoute.difficulty]
                        : "확인 필요"
                    }
                  />
                  <HeroInfoRow
                    icon={<Clock size={16} />}
                    label="소요시간"
                    value={recommendedRoute?.estimatedTime ?? "확인 필요"}
                  />
                </dl>
                <button
                  className="mt-[17px] inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border border-white/70 bg-black/10 px-3 text-[15px] font-extrabold text-white"
                  type="button"
                  onClick={() => onShowOnMap(mountain)}
                >
                  지도에서 보기
                  <MapPin size={17} />
                </button>
              </aside>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[1180px] max-w-[calc(100%-80px)] pb-0 pt-[30px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4">
        <RecommendedCourseSection
          mountainName={mountain.name}
          courseMapImage={courseMapImage}
          routes={routes}
        />

        <div className="mt-6 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          <DifficultyGuide />
          <VisitWarnings routes={routes} notes={notes} />
          <WeatherStatusCard mountain={mountain} />
        </div>

        <CourseFeedbackSection mountain={mountain} routes={routes} />

        <PhotoGallery mountainName={mountain.name} links={photoLinks} />
        <SourceLinks links={verificationLinks} />

        <div className="mt-[22px] flex justify-end">
          <button
            className={cn(
              "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 font-extrabold",
              isCompleted
                ? "border-[#1f8a5b] bg-[#1f8a5b] text-white"
                : "border-[#d8e0da] bg-white text-[#18221d]",
            )}
            type="button"
            onClick={() => onToggleCompleted(mountain)}
          >
            <Check size={18} />
            {isCompleted ? "등반완료 해제" : "등반완료"}
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
  onBackToMap,
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
        backgroundPosition: "center",
        backgroundSize: "cover",
      } as CSSProperties)
    : undefined;
  const stops = buildRouteStops(route);
  const photos = guidePhotos;
  const [activeTab, setActiveTab] = useState<CourseDetailTab>("overview");

  useEffect(() => {
    setActiveTab("overview");
  }, [route.name]);

  return (
    <section
      className="min-h-[calc(100vh-68px)] overflow-auto bg-white font-sans text-mountain-ink"
      aria-label={`${mountain.name} ${route.name} 상세 정보`}
    >
      <header
        className="relative min-h-[394px] overflow-hidden bg-[linear-gradient(135deg,rgba(6,38,58,0.95),rgba(16,69,56,0.84)),linear-gradient(135deg,#133628,#06263a)] text-white max-[900px]:min-h-0"
        style={heroStyle}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,12,22,0.62)_0%,rgba(0,12,22,0.22)_58%,rgba(0,12,22,0.36)_100%)]" />
        <div className="relative z-[1] mx-auto w-[1180px] max-w-[calc(100%-60px)] pb-[34px] pt-[18px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4 max-[900px]:pb-8">
          <nav
            className="flex min-h-8 flex-wrap items-center gap-2 text-sm font-extrabold text-white/85 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-1.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:p-0 [&_button]:font-black [&_button]:text-white"
            aria-label="현재 위치"
          >
            <button type="button" onClick={onBackToMap}>
              홈
            </button>
            <span aria-hidden="true">›</span>
            <span>추천 코스</span>
            <span aria-hidden="true">›</span>
            <button type="button" onClick={onBackToMountain}>
              {mountain.name}
            </button>
            <span aria-hidden="true">›</span>
            <strong>{getRouteDisplayName(route)}</strong>
          </nav>

          <div className="grid min-h-[318px] grid-cols-[minmax(0,1fr)_312px] items-end gap-[58px] pt-[26px] max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-6">
            <div>
              <span
                className={cn(
                  "mb-[18px] inline-flex rounded-[5px] bg-[#e10f07] px-2.5 py-1.5 text-sm font-black leading-[18px] text-white shadow-[0_8px_18px_rgba(0,0,0,0.26)]",
                  routeThemeClass[getRouteTheme(route)],
                )}
              >
                {getRouteLabel(route)}
              </span>
              <h2 className="m-0 max-w-[780px] text-[46px] font-black leading-[1.12] text-white [letter-spacing:0] [text-shadow:0_5px_18px_rgba(0,0,0,0.42)] max-[900px]:text-[clamp(34px,11vw,48px)]">
                <span>
                  {mountain.name} {getRouteDisplayName(route)}
                </span>
                <b className="ml-3 inline-flex min-h-9 min-w-9 translate-y-[-4px] items-center justify-center rounded-[8px] bg-[#e10f07] px-2.5 text-[18px] font-black leading-none text-white shadow-[0_8px_18px_rgba(0,0,0,0.24)]">
                  {difficultyShortLabels[route.difficulty]}
                </b>
              </h2>
              <p className="mt-3 max-w-[650px] text-lg font-extrabold leading-[31px] text-white/95">
                {getRouteSummary(route)}
              </p>
              <p className="mt-5 max-w-[650px] text-base font-bold leading-7 text-white/95">
                {route.summary ??
                  route.recommendationReason ??
                  `${route.name}의 주요 경유지와 접근 정보를 확인하세요.`}
              </p>
              <div className="mt-[46px] grid grid-cols-4 gap-[38px] max-[900px]:mt-7 max-[900px]:grid-cols-2 max-[900px]:gap-3.5">
                <HeroFact
                  icon={<Route size={19} />}
                  label="거리"
                  value={route.distance}
                />
                <HeroFact
                  icon={<Clock size={19} />}
                  label="소요시간"
                  value={route.estimatedTime}
                />
                <HeroFact
                  icon={<MountainIcon size={19} />}
                  label="누적 고도"
                  value={route.elevationGain ?? "확인 필요"}
                />
                <HeroFact
                  icon={<ShieldAlert size={19} />}
                  label="난이도"
                  value={difficultyLabels[route.difficulty]}
                />
              </div>
            </div>

            <aside
              className="self-center rounded-[8px] border border-white/20 bg-black/60 px-[22px] py-[23px] text-white shadow-heroPanel backdrop-blur-xl [&_dl]:grid [&_dl]:gap-0 [&_h3]:mb-4 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-white"
              aria-label="코스 정보 요약"
            >
              <h3>코스 정보 요약</h3>
              <dl>
                <HeroInfoRow
                  icon={<MapPin size={16} />}
                  label="출발지"
                  value={stops[0]?.name ?? route.startPoint}
                />
                <HeroInfoRow
                  icon={<MapPin size={16} />}
                  label="도착지"
                  value={stops[stops.length - 1]?.name ?? "확인 필요"}
                />
                <HeroInfoRow
                  icon={<Route size={16} />}
                  label="거리"
                  value={route.distance}
                />
                <HeroInfoRow
                  icon={<Clock size={16} />}
                  label="소요시간"
                  value={route.estimatedTime}
                />
                <HeroInfoRow
                  icon={<ShieldAlert size={16} />}
                  label="난이도"
                  value={difficultyLabels[route.difficulty]}
                />
                <HeroInfoRow
                  icon={<MountainIcon size={16} />}
                  label="최고 고도"
                  value={`${mountain.elevationMeters.toLocaleString()}m`}
                />
                <HeroInfoRow
                  icon={<Route size={16} />}
                  label="누적 고도"
                  value={route.elevationGain ?? "확인 필요"}
                />
              </dl>
            </aside>
          </div>
        </div>
      </header>

      <main className="pb-0">
        <div
          className="border-b border-[#dedede] bg-white"
          role="tablist"
          aria-label="코스 상세 탭"
        >
          <div className="mx-auto flex w-[1180px] max-w-[calc(100%-60px)] gap-[30px] overflow-x-auto [&_button]:min-h-[54px] [&_button]:shrink-0 [&_button]:border-0 [&_button]:border-b-4 [&_button]:border-transparent [&_button]:bg-transparent [&_button]:px-6 [&_button]:text-[21px] [&_button]:font-black [&_button]:text-[#627168] [&_button.is-active]:border-b-[#e10f07] [&_button.is-active]:text-[#18221d] max-[900px]:max-w-none max-[900px]:px-4 max-[560px]:gap-3 max-[560px]:[&_button]:px-2 max-[560px]:[&_button]:text-[18px]">
            <button
              className={cn(activeTab === "overview" && "is-active")}
              type="button"
              role="tab"
              aria-selected={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              코스 개요
            </button>
            <button
              className={cn(activeTab === "gallery" && "is-active")}
              type="button"
              role="tab"
              aria-selected={activeTab === "gallery"}
              onClick={() => setActiveTab("gallery")}
            >
              포토 갤러리
            </button>
          </div>
        </div>

        <div className="mx-auto w-[1180px] max-w-[calc(100%-60px)] pt-[22px] max-[900px]:w-full max-[900px]:max-w-none max-[900px]:px-4">
          {activeTab === "overview" ? (
            <>
              <section
                className="grid grid-cols-[minmax(0,760px)_minmax(310px,1fr)] gap-5 max-[900px]:grid-cols-1"
                aria-label="코스 지도와 타임라인"
              >
                <div className="rounded-md border border-[#dedede] bg-white p-[22px] shadow-[0_10px_28px_rgba(24,34,29,0.04)] max-[560px]:p-4">
                  <h3 className="m-0 mb-4 text-[22px] font-black">
                    코스 이미지
                  </h3>
                  <CourseMapImagePanel route={route} />
                </div>
                <CourseTimelinePanel stops={stops} route={route} />
              </section>
            </>
          ) : (
            <CoursePhotoGalleryPanel
              mountainName={`${mountain.name} ${route.name}`}
              links={photos}
            />
          )}
        </div>
      </main>
      <DesignFooter />
    </section>
  );
}

function getDefaultFeedbackRouteName(routes: MountainGuideRoute[]) {
  return (
    routes.find(
      (route) =>
        route.forestTripCourseKind === "recommended" || route.isRecommended,
    )?.name ??
    routes[0]?.name ??
    null
  );
}

function CourseFeedbackSection({
  mountain,
  routes,
}: {
  mountain: Mountain;
  routes: MountainGuideRoute[];
}) {
  const feedbackRoutes = useMemo(
    () => routes.filter((route) => route.forestTripCourseKind),
    [routes],
  );
  const displayRoutes = feedbackRoutes.length > 0 ? feedbackRoutes : routes;
  const defaultRouteName = getDefaultFeedbackRouteName(displayRoutes);
  const [selectedRouteName, setSelectedRouteName] = useState<string | null>(
    defaultRouteName,
  );
  const selectedRoute =
    displayRoutes.find((route) => route.name === selectedRouteName) ??
    displayRoutes[0];
  const [difficultyIndex, setDifficultyIndex] = useState(
    difficultyDefaultIndex[selectedRoute?.difficulty ?? "unknown"],
  );
  const [durationMinutes, setDurationMinutes] = useState(
    getDefaultDurationMinutes(selectedRoute?.estimatedTime ?? ""),
  );
  const [reviewText, setReviewText] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<CourseFeedbackPhoto[]>([]);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedPhotosRef = useRef<CourseFeedbackPhoto[]>([]);
  const trimmedReviewText = reviewText.trim();
  const storageKey = selectedRoute
    ? getCourseReviewStorageKey(mountain.id, selectedRoute.name)
    : null;

  useEffect(() => {
    setSelectedRouteName((currentRouteName) => {
      if (
        currentRouteName &&
        displayRoutes.some((route) => route.name === currentRouteName)
      ) {
        return currentRouteName;
      }

      return defaultRouteName;
    });
  }, [defaultRouteName, displayRoutes]);

  useEffect(() => {
    uploadedPhotosRef.current = uploadedPhotos;
  }, [uploadedPhotos]);

  useEffect(() => {
    return () => {
      uploadedPhotosRef.current.forEach((photo) =>
        revokePhotoPreviewUrl(photo.url),
      );
    };
  }, []);

  useEffect(() => {
    if (!selectedRoute || !storageKey) {
      setReviews([]);
      setReviewText("");
      setUploadedPhotos((photos) => {
        photos.forEach((photo) => revokePhotoPreviewUrl(photo.url));
        return [];
      });
      return;
    }

    setDifficultyIndex(difficultyDefaultIndex[selectedRoute.difficulty]);
    setDurationMinutes(getDefaultDurationMinutes(selectedRoute.estimatedTime));
    setReviewText("");
    setUploadedPhotos((photos) => {
      photos.forEach((photo) => revokePhotoPreviewUrl(photo.url));
      return [];
    });
    setReviews(parseStoredReviews(window.localStorage.getItem(storageKey)));
  }, [
    mountain.id,
    selectedRoute?.difficulty,
    selectedRoute?.estimatedTime,
    selectedRoute?.name,
    storageKey,
  ]);

  const adjustDurationMinutes = (delta: number) => {
    setDurationMinutes((minutes) => clampNumber(minutes + delta, 30, 600));
  };

  const handlePhotoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const remainingSlots = Math.max(5 - uploadedPhotos.length, 0);
    const nextPhotos = selectedFiles
      .filter((file) => {
        const isSupportedType = file.type === "image/jpeg" || file.type === "image/png";
        return isSupportedType && file.size <= 10 * 1024 * 1024;
      })
      .slice(0, remainingSlots)
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        url: createPhotoPreviewUrl(file),
      }));

    if (nextPhotos.length > 0) {
      setUploadedPhotos((photos) => [...photos, ...nextPhotos]);
    }

    event.target.value = "";
  };

  const removeUploadedPhoto = (photoId: string) => {
    setUploadedPhotos((photos) => {
      const photoToRemove = photos.find((photo) => photo.id === photoId);
      if (photoToRemove) {
        revokePhotoPreviewUrl(photoToRemove.url);
      }

      return photos.filter((photo) => photo.id !== photoId);
    });
  };

  const handleReviewSubmit = () => {
    if (!selectedRoute || !storageKey || !trimmedReviewText) {
      return;
    }

    const nextReview: CourseReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nickname: "익명 등산객",
      createdAt: new Date().toISOString(),
      difficulty: difficultyEvaluationOptions[difficultyIndex],
      duration: formatDurationMinutes(durationMinutes),
      body: trimmedReviewText,
      likes: 0,
      comments: 0,
    };
    const nextReviews = [nextReview, ...reviews].slice(0, 20);

    setReviews(nextReviews);
    window.localStorage.setItem(storageKey, JSON.stringify(nextReviews));
    setReviewText("");
    setUploadedPhotos((photos) => {
      photos.forEach((photo) => revokePhotoPreviewUrl(photo.url));
      return [];
    });
  };

  if (!selectedRoute) {
    return null;
  }

  return (
    <section
      className="mt-6 rounded-none border border-[#d9dee2] bg-white px-0 pb-5 pt-0"
      aria-label={`${mountain.name} 코스 평가와 한줄평`}
    >
      <h3 className="m-0 bg-[#f1f5f7] px-6 py-3.5 text-lg font-black leading-[26px] text-[#18221d]">
        코스 평가
      </h3>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1.08fr)] gap-3 px-5 pt-5 max-[1100px]:grid-cols-1 max-[560px]:px-4 max-[560px]:pt-4">
        <div className="grid min-w-0 gap-3">
          <div className="rounded-md border border-[#d8e0da] bg-white p-4 shadow-[0_6px_18px_rgba(24,34,29,0.035)]">
            <label
              className="mb-3 block text-center text-base font-extrabold leading-6 text-[#18221d]"
              htmlFor="course-feedback-route"
            >
              코스를 선택해주세요
            </label>
            <div className="relative">
              <select
                id="course-feedback-route"
                className="h-11 w-full appearance-none rounded-md border border-[#d8e0da] bg-white px-3 pr-10 text-sm font-bold text-[#18221d] outline-none transition focus:border-[#245c46] focus:ring-2 focus:ring-[#245c46]/15"
                value={selectedRoute.name}
                onChange={(event) => setSelectedRouteName(event.target.value)}
              >
                {displayRoutes.map((route) => {
                  const kind = getForestTripCourseKind(route);
                  const theme = forestTripCourseTheme[kind];

                  return (
                    <option key={`${route.name}-${route.path}`} value={route.name}>
                      {theme.label} · {route.name}
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#18221d]"
                size={18}
                aria-hidden="true"
              />
            </div>
          </div>

          <EvaluationPicker
            title="난이도는 어떠셨나요?"
            options={difficultyEvaluationOptions}
            activeIndex={difficultyIndex}
            onChange={setDifficultyIndex}
          />
        </div>

        <div className="rounded-md border border-[#d8e0da] bg-white p-4 shadow-[0_6px_18px_rgba(24,34,29,0.035)]">
          <strong className="block text-center text-lg font-extrabold leading-7 text-[#18221d]">
            소요시간은 얼마나 걸렸나요?
          </strong>
          <p className="mx-auto mb-4 mt-2 max-w-[380px] break-keep text-center text-[15px] font-semibold leading-6 text-[#2d3932]">
            산행 시작부터 하산 완료까지 걸린 전체 시간입니다. 휴식, 사진 촬영,
            식사 시간을 포함해서 입력해주세요.
          </p>

          <div className="mx-auto grid max-w-[340px] grid-cols-2 items-end gap-x-5 gap-y-1.5 max-[560px]:grid-cols-1">
            <span className="col-start-1 text-center text-sm font-bold text-[#18221d]">
              시간
            </span>
            <span className="col-start-2 text-center text-sm font-bold text-[#18221d] max-[560px]:col-start-1">
              분
            </span>
            <DurationStepper
              ariaLabel="소요시간 시간 줄이기"
              value={Math.floor(durationMinutes / 60)}
              unit="시간"
              onDecrease={() => adjustDurationMinutes(-60)}
              onIncrease={() => adjustDurationMinutes(60)}
            />
            <DurationStepper
              ariaLabel="소요시간 분 줄이기"
              value={durationMinutes % 60}
              unit="분"
              onDecrease={() => adjustDurationMinutes(-10)}
              onIncrease={() => adjustDurationMinutes(10)}
            />
          </div>

          <div className="mt-4">
            <strong className="mb-2 block text-sm font-extrabold text-[#18221d]">
              빠른 선택
            </strong>
            <div className="grid grid-cols-4 gap-2 max-[560px]:grid-cols-2">
              {durationQuickOptions.map((option) => {
                const isActive = durationMinutes === option.minutes;

                return (
                  <button
                    key={option.label}
                    className={cn(
                      "min-h-11 rounded-md border px-2.5 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245c46]/25",
                      isActive
                        ? "border-[#245c46] bg-[#eff8f2] text-[#245c46]"
                        : "border-[#d8e0da] bg-white text-[#18221d] hover:bg-[#f7faf8]",
                    )}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setDurationMinutes(option.minutes)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[auto_1fr] gap-2.5 rounded-md bg-[#f2f7f3] p-3 text-[#245c46]">
            <Lightbulb size={21} aria-hidden="true" />
            <p className="m-0 break-keep text-[13px] font-semibold leading-5 text-[#4c5f55]">
              입력하신 소요시간은 분 단위로 저장되어 코스별 평균 소요시간 계산에
              활용됩니다.
              <br />
              예) {formatDurationMinutes(durationMinutes)} = {durationMinutes}분
            </p>
          </div>
        </div>

        <div className="rounded-md border border-[#d8e0da] bg-white p-4 shadow-[0_6px_18px_rgba(24,34,29,0.035)]">
          <strong className="mb-3 block text-center text-lg font-extrabold leading-7 text-[#18221d]">
            한줄평을 남겨주세요!
          </strong>
          <textarea
            maxLength={100}
            value={reviewText}
            placeholder="코스에 대한 느낌을 자유롭게 남겨주세요."
            className="min-h-[108px] w-full resize-y rounded-md border border-[#d8e0da] p-3 text-[15px] font-medium leading-6 text-[#18221d] outline-none transition placeholder:text-[#8a9690] focus:border-[#245c46] focus:ring-2 focus:ring-[#245c46]/15"
            onChange={(event) => setReviewText(event.target.value)}
          />
          <span className="mt-1 block text-right font-numeric text-sm font-bold text-[#5d6a62]">
            {reviewText.length}/100
          </span>

          <div className="mt-2.5">
            <div className="mb-2 flex flex-wrap items-baseline gap-2">
              <strong className="text-[15px] font-extrabold text-[#18221d]">
                사진을 추가해주세요!
              </strong>
              <span className="text-xs font-bold text-[#5d6a62]">
                (최대 5장)
              </span>
            </div>
            <input
              ref={photoInputRef}
              className="sr-only"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={handlePhotoSelect}
            />
            <div className="grid grid-cols-[92px_repeat(3,minmax(0,1fr))] gap-2 max-[560px]:grid-cols-2">
              <button
                className="grid min-h-[82px] place-items-center content-center gap-1 rounded-md border border-[#d8e0da] bg-white px-2 text-xs font-extrabold text-[#5d6a62] transition hover:bg-[#f7faf8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245c46]/25 disabled:cursor-not-allowed disabled:opacity-45"
                type="button"
                disabled={uploadedPhotos.length >= 5}
                onClick={() => photoInputRef.current?.click()}
              >
                <Camera size={20} aria-hidden="true" />
                사진 추가
              </button>
              {uploadedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative min-h-[82px] overflow-hidden rounded-md bg-[#eef3f0]"
                >
                  <img
                    className="h-full min-h-[82px] w-full object-cover"
                    src={photo.url}
                    alt={photo.name}
                  />
                  <button
                    className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full border-0 bg-black/70 text-white"
                    type="button"
                    aria-label={`${photo.name} 사진 제거`}
                    onClick={() => removeUploadedPhoto(photo.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <ul className="m-0 mt-2 grid list-none gap-1 p-0 text-xs font-semibold leading-5 text-[#5d6a62]">
              <li>· JPG, PNG 파일만 가능 (최대 10MB)</li>
              <li>· 다른 등산객들에게 산행 정보 제공에 큰 도움이 됩니다.</li>
            </ul>
          </div>

          <button
            className="mt-3 min-h-11 w-full rounded-md border-0 bg-[#166b3d] px-4 text-sm font-black text-white transition hover:bg-[#125b34] disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={!trimmedReviewText}
            onClick={handleReviewSubmit}
          >
            등록하기
          </button>
        </div>
      </div>

      <CourseReviewSection reviews={reviews} routeName={selectedRoute.name} />
    </section>
  );
}

function CourseReviewSection({
  reviews,
  routeName,
}: {
  reviews: CourseReview[];
  routeName: string;
}) {
  return (
    <section
      className="mt-6 bg-white px-6 pb-[22px] max-[560px]:px-4 max-[560px]:pb-4"
      aria-label="다른 등산객들의 한줄평"
    >
      <div className="mb-4 flex items-center justify-between gap-3 max-[560px]:items-start">
        <h3 className="m-0 text-[22px] font-black">다른 등산객들의 한줄평</h3>
        {reviews.length > 0 ? (
          <span className="shrink-0 rounded-full bg-[#f1f5f7] px-3 py-1 text-sm font-black text-[#627168]">
            {reviews.length}개
          </span>
        ) : null}
      </div>
      {reviews.length > 0 ? (
        <ul className="m-0 grid list-none grid-cols-5 gap-5 p-0 max-[1100px]:grid-cols-[repeat(5,minmax(190px,1fr))] max-[1100px]:overflow-x-auto max-[900px]:grid-cols-1">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="min-h-[214px] rounded-md border border-[#d8e0da] bg-white p-4 shadow-[0_10px_24px_rgba(24,34,29,0.06)]"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d7dadd] text-[#8b9297]">
                    <MountainIcon size={18} />
                  </span>
                  <div className="min-w-0">
                    <strong className="block truncate text-[14px] font-black text-[#18221d]">
                      {review.nickname}
                    </strong>
                    <time className="mt-0.5 block font-numeric text-xs font-bold text-[#49524d]">
                      {formatReviewDate(review.createdAt)}
                    </time>
                  </div>
                </div>
                <span className="inline-flex min-h-7 shrink-0 items-center rounded-[5px] bg-[#e10f07] px-2 text-xs font-black text-white">
                  {review.difficulty}
                </span>
              </div>
              <div className="mb-3 flex items-center gap-1.5 text-sm font-bold text-[#18221d]">
                <Clock size={15} />
                {review.duration}
              </div>
              <p className="m-0 min-h-[72px] break-keep text-[14px] font-bold leading-6 text-[#2d3932]">
                {review.body}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm font-black text-[#627168]">
                <span className="inline-flex items-center gap-1.5">
                  <Heart size={16} />
                  {review.likes}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle size={16} />
                  {review.comments}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid min-h-[160px] place-items-center content-center gap-2 rounded-md border border-dashed border-[#d8e0da] bg-[#f7faf8] p-6 text-center text-[#627168]">
          <MessageCircle size={24} className="text-[#2f6b4f]" />
          <strong className="text-[#18221d]">
            아직 {routeName}에 등록된 후기가 없습니다.
          </strong>
          <p className="m-0 leading-6">첫 한줄평을 남기면 이곳에 표시됩니다.</p>
        </div>
      )}
    </section>
  );
}

function CoursePhotoGalleryPanel({
  mountainName,
  links,
}: {
  mountainName: string;
  links: MountainGuideLink[];
}) {
  if (links.length === 0) {
    return (
      <section
        className="rounded-md border border-[#dedede] bg-white p-[22px] text-[#627168] max-[560px]:p-4"
        aria-label={`${mountainName} 갤러리`}
      >
        <h3 className="mt-0 text-[#18221d]">포토 갤러리</h3>
        <div className="grid min-h-[220px] place-items-center content-center gap-2 rounded-md bg-[#f4f8f6] p-6 text-center">
          <MountainIcon size={26} className="text-[#2f6b4f]" />
          <strong className="text-[#18221d]">
            등록된 코스 사진이 없습니다.
          </strong>
          <p className="m-0 max-w-[360px] leading-6">
            대표 산 사진이나 코스 사진이 추가되면 이 탭에서 크게 확인할 수
            있습니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-md border border-[#dedede] bg-white p-[22px] max-[560px]:p-4">
      <PhotoGallery mountainName={mountainName} links={links} />
    </section>
  );
}

//TODO: Footer 삭제
function DesignFooter() {
  return (
    <footer className="mt-9 bg-mountain-navy text-white" aria-label="하단 메뉴">
      <div className="mx-auto grid min-h-[76px] w-[1180px] max-w-[calc(100%-80px)] grid-cols-[minmax(230px,1fr)_minmax(90px,auto)] items-center gap-5 text-sm font-extrabold max-[900px]:w-full max-[900px]:max-w-none max-[900px]:grid-cols-1 max-[900px]:px-4 max-[900px]:py-5 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-2.5 [&_button]:border-0 [&_button]:bg-transparent [&_button]:text-white [&_strong]:inline-flex [&_strong]:items-center [&_strong]:gap-2.5 [&_strong]:text-[17px] [&_strong]:font-black">
        <strong>
          <MountainIcon size={26} />
          대한민국 100대 명산
        </strong>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          맨 위로
        </button>
      </div>
    </footer>
  );
}

const forestTripCourseTheme: Record<
  ForestTripCourseKind,
  { label: string; color: string; soft: string }
> = {
  recommended: {
    label: "추천코스",
    color: "#C51B7D",
    soft: "#FFF0F7",
  },
  other1: {
    label: "기타코스1",
    color: "#2F9E44",
    soft: "#F0FAF2",
  },
  other2: {
    label: "기타코스2",
    color: "#1F6FD1",
    soft: "#EFF6FF",
  },
  other3: {
    label: "기타코스3",
    color: "#F2C200",
    soft: "#FFF9D8",
  },
};

function getForestTripCourseKind(
  route: MountainGuideRoute,
): ForestTripCourseKind {
  if (route.forestTripCourseKind) {
    return route.forestTripCourseKind;
  }
  if (route.isRecommended || route.rank === 1) {
    return "recommended";
  }
  if (route.rank === 2) {
    return "other1";
  }
  if (route.rank === 3) {
    return "other2";
  }
  return "other3";
}

function RecommendedCourseSection({
  mountainName,
  courseMapImage,
  routes,
}: {
  mountainName: string;
  courseMapImage?: MountainGuideImage;
  routes: MountainGuideRoute[];
}) {
  const [mapFailed, setMapFailed] = useState(false);
  const forestTripRoutes = routes.filter((route) => route.forestTripCourseKind);
  const displayRoutes = forestTripRoutes.length > 0 ? forestTripRoutes : [];
  const hasCourseMap = Boolean(courseMapImage?.src) && !mapFailed;

  return (
    <section className="grid gap-[18px]" aria-label="추천 코스">
      <div className="flex items-center gap-[18px] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-1.5 [&_h3]:m-0 [&_h3]:text-[28px] [&_h3]:font-black [&_h3]:leading-[34px] [&_span]:border-l [&_span]:border-[#d8e0da] [&_span]:pl-4 [&_span]:text-[15px] [&_span]:font-semibold [&_span]:text-[#777] max-[900px]:[&_span]:border-l-0 max-[900px]:[&_span]:pl-0">
        <h3>추천 코스</h3>
        <span>
          {mountainName}의 숲나들e 산행코스 지도와 공식 코스 표입니다.
        </span>
      </div>

      <article className="rounded-none border border-[#d9dee2] bg-white px-6 pb-5 pt-0">
        <h4 className="mx-[-24px] mb-[18px] mt-0 bg-[#f1f5f7] px-6 py-3.5 text-lg font-black leading-[26px] text-[#18221d]">
          추천 코스 지도
        </h4>
        {hasCourseMap ? (
          <figure className="m-0 overflow-hidden rounded-[5px] border border-[#d8e0da] bg-[#f4f8f6]">
            <img
              className="block h-auto w-full"
              src={courseMapImage!.src}
              alt={courseMapImage!.alt}
              loading="lazy"
              onError={() => setMapFailed(true)}
            />
            {courseMapImage?.sourceUrl ? (
              <figcaption className="border-t border-[#d8e0da] bg-white px-3 py-2 text-xs font-bold text-[#627168]">
                출처:{" "}
                <a
                  className="text-[#276c8f]"
                  href={courseMapImage.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {courseMapImage.sourceLabel ?? "숲나들e"}
                </a>
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <div className="grid min-h-[220px] place-items-center rounded-[5px] border border-dashed border-[#b9c6bd] bg-[#f4f8f6] px-5 py-10 text-center">
            <div>
              <Route className="mx-auto mb-3 text-[#245c46]" size={28} />
              <strong className="block text-lg font-black text-[#18221d]">
                추천 코스 지도 준비 중
              </strong>
              <p className="m-0 mt-2 text-base font-semibold leading-6 text-[#627168]">
                숲나들e 지도 이미지를 불러오지 못했습니다.
              </p>
            </div>
          </div>
        )}
      </article>

      <article className="rounded-md border border-[#d9dee2] bg-white px-6 pb-5 pt-5 shadow-[0_1px_3px_rgba(24,34,29,0.05)] max-[720px]:px-4 max-[720px]:pb-4 max-[720px]:pt-4">
        <h4 className="mb-[18px] mt-0 text-[22px] font-black leading-[30px] text-[#06263a] max-[720px]:mb-3 max-[720px]:text-[18px] max-[720px]:leading-6">
          추천 코스 정보
        </h4>
        {displayRoutes.length > 0 ? (
          <ul className="m-0 grid list-none gap-4 p-0 max-[720px]:gap-3">
            {displayRoutes.map((route, index) => (
              <ForestTripCourseInfoCard
                key={`${route.forestTripCourseKind}-${route.path}`}
                route={route}
                index={index}
              />
            ))}
          </ul>
        ) : (
          <div className="rounded-[5px] border border-dashed border-[#b9c6bd] bg-[#f4f8f6] px-5 py-8 text-center">
            <strong className="block text-lg font-black text-[#18221d]">
              추천 코스 정보 준비 중
            </strong>
            <p className="m-0 mt-2 text-base font-semibold leading-6 text-[#627168]">
              숲나들e 코스 표를 확인한 뒤 표시합니다.
            </p>
          </div>
        )}
      </article>
    </section>
  );
}

function formatForestTripCourseTime(estimatedTime: string) {
  const hourMatch = estimatedTime.match(/(\d+(?:\.\d+)?)\s*시간/);
  const minuteMatch = estimatedTime.match(/(\d+)\s*분/);

  if (!hourMatch && !minuteMatch) {
    return estimatedTime.replace(/^약\s*/, "").split(",")[0].trim();
  }

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;
  const wholeHours = Math.floor(hours);
  const decimalMinutes = Math.round((hours - wholeHours) * 60);
  const totalMinutes = minutes + decimalMinutes;

  return `${wholeHours}:${String(totalMinutes).padStart(2, "0")}`;
}

function getForestTripDifficultyLabel(difficulty: MountainGuideDifficulty) {
  if (difficulty === "easy") {
    return "쉬움";
  }
  if (difficulty === "hard") {
    return "어려움";
  }
  if (difficulty === "extreme") {
    return "매우 어려움";
  }
  if (difficulty === "unknown") {
    return "확인 필요";
  }
  return "보통";
}

function DifficultyBarsIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid h-5 w-5 grid-cols-3 items-end gap-[3px]",
        className,
      )}
      aria-hidden="true"
    >
      <i className="block h-[7px] rounded-[1px] bg-current" />
      <i className="block h-[13px] rounded-[1px] bg-current" />
      <i className="block h-[18px] rounded-[1px] bg-current" />
    </span>
  );
}

function ForestTripCourseInfoCard({
  route,
  index,
}: {
  route: MountainGuideRoute;
  index: number;
}) {
  const kind = getForestTripCourseKind(route);
  const theme = forestTripCourseTheme[kind];
  const style = {
    "--foresttrip-course-color": theme.color,
    "--foresttrip-course-soft": theme.soft,
  } as CSSProperties;
  const courseNumber = String(index + 1).padStart(2, "0");
  const displayName = getRouteDisplayName(route);
  const displayTime = formatForestTripCourseTime(route.estimatedTime);
  const difficultyLabel = getForestTripDifficultyLabel(route.difficulty);

  return (
    <li
      className="grid min-h-[120px] grid-cols-[14px_116px_minmax(0,1fr)_280px] overflow-hidden rounded-[7px] border border-[#d8e0da] bg-white shadow-[0_1px_5px_rgba(24,34,29,0.04)] max-[720px]:min-h-[100px] max-[720px]:grid-cols-[6px_66px_minmax(0,1fr)_16px] max-[720px]:rounded-[5px]"
      style={style}
    >
      <span className="bg-[var(--foresttrip-course-color)]" aria-hidden="true" />

      <div className="grid content-center justify-items-center gap-2.5 px-3 py-4 max-[720px]:gap-2 max-[720px]:px-2 max-[720px]:py-3">
        <span className="inline-flex min-h-7 items-center rounded-[5px] bg-[var(--foresttrip-course-color)] px-2.5 text-[13px] font-black leading-none text-white max-[720px]:min-h-[24px] max-[720px]:px-2 max-[720px]:text-[11px]">
          {theme.label}
        </span>
        <strong className="font-numeric text-[40px] font-black leading-none text-[var(--foresttrip-course-color)] max-[720px]:text-[30px]">
          {courseNumber}
        </strong>
      </div>

      <div className="grid min-w-0 content-center gap-2.5 px-5 py-4 max-[720px]:gap-2 max-[720px]:px-2 max-[720px]:py-3">
        <div className="flex min-w-0 items-center gap-2">
          <strong className="min-w-0 break-keep text-[20px] font-black leading-7 text-[#111] max-[720px]:truncate max-[720px]:text-[15px] max-[720px]:leading-5">
            {displayName}
          </strong>
          <ArrowLeft
            className="hidden rotate-180 text-[#111] max-[720px]:block"
            size={16}
            aria-hidden="true"
          />
        </div>
        <p className="m-0 break-keep text-[15px] font-bold leading-6 text-[#35413a] max-[720px]:hidden">
          {route.path}
        </p>
        <dl className="hidden grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 text-[13px] font-bold max-[720px]:grid">
          <dt className="flex items-center gap-1.5 text-[#111]">
            <Clock size={15} strokeWidth={2.4} />
            소요 시간
          </dt>
          <dd className="col-start-3 m-0 justify-self-end font-numeric text-[14px] font-black text-[#111]">
            {displayTime}
          </dd>
          <dt className="flex items-center gap-1.5 text-[#111]">
            <DifficultyBarsIcon className="text-[#111]" />
            난이도
          </dt>
          <dd className="col-start-3 m-0 justify-self-end text-[14px] font-black text-[#ff1717]">
            {difficultyLabel}
          </dd>
        </dl>
      </div>

      <dl className="grid content-center gap-0 border-l border-[#e1e5e8] px-6 py-4 max-[720px]:hidden">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-[#e5e8ea] pb-2.5">
          <dt className="flex items-center gap-2.5 text-[15px] font-bold text-[#59636c]">
            <Clock className="text-[#111]" size={20} strokeWidth={2.4} />
            소요 시간
          </dt>
          <dd className="col-start-3 m-0 justify-self-end font-numeric text-[20px] font-black leading-6 text-[#111]">
            {displayTime}
          </dd>
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 pt-2.5">
          <dt className="flex items-center gap-2.5 text-[15px] font-bold text-[#59636c]">
            <DifficultyBarsIcon className="h-[18px] w-[18px] text-[#111]" />
            난이도
          </dt>
          <dd className="col-start-3 m-0 justify-self-end text-[18px] font-black leading-6 text-[#ff1717]">
            {difficultyLabel}
          </dd>
        </div>
      </dl>
    </li>
  );
}

function RouteSummaryCard({
  route,
  imageUrl,
  onOpen,
}: {
  route: MountainGuideRoute;
  imageUrl?: string;
  onOpen: () => void;
}) {
  const stops = buildRouteStops(route);
  const routeDisplayName = getRouteDisplayName(route);
  const routePanelStyle = {
    backgroundImage:
      "linear-gradient(135deg, var(--route-panel) 0%, var(--route-panel-dark) 100%)",
  } as CSSProperties;

  return (
    <li
      className={cn(
        "grid grid-cols-[282px_minmax(0,1fr)_316px] items-stretch overflow-hidden rounded-[5px] border border-[#d6d6d6] bg-white shadow-route max-[900px]:grid-cols-1",
        routeThemeClass[getRouteTheme(route)],
      )}
    >
      <div
        className="flex min-w-0 flex-col justify-center gap-2.5 px-5 py-[18px] text-white"
        style={routePanelStyle}
      >
        <span className="self-start rounded-[5px] bg-white px-2.5 py-1.5 text-[13px] font-black leading-[18px] text-[var(--route-color)]">
          {getRouteLabel(route)}
        </span>
        <div className="flex min-w-0 items-center gap-2.5">
          <strong className="min-w-0 break-keep text-[27px] font-black leading-[33px] [letter-spacing:0]">
            {routeDisplayName}
          </strong>
          <DifficultyBadge difficulty={route.difficulty} />
        </div>
        <p className="m-0 break-keep text-[15px] font-bold leading-[22px]">
          {getRouteSummary(route)}
        </p>
        <button
          className="mt-0.5 inline-flex min-h-[38px] items-center gap-2 self-start rounded-md border border-white/40 bg-white/10 px-3.5 text-sm font-black text-white [&_svg]:rotate-180"
          type="button"
          onClick={onOpen}
        >
          코스 상세보기
          <ArrowLeft size={16} />
        </button>
      </div>
      <div className="grid min-w-0 content-center gap-[22px] overflow-hidden bg-[linear-gradient(90deg,var(--route-soft),rgba(255,255,255,0.78))] px-[54px] py-[18px] max-[900px]:p-5">
        <div className="grid grid-cols-3 items-center gap-5 max-[900px]:grid-cols-1">
          <Metric
            icon={<Route size={17} />}
            label="거리"
            value={getSummaryMetricValue(route.distance)}
          />
          <Metric
            icon={<Clock size={17} />}
            label="소요시간"
            value={getSummaryMetricValue(route.estimatedTime)}
          />
          <DifficultyMetric difficulty={route.difficulty} />
        </div>
        <RouteTimeline stops={stops} rawPath={route.path} />
      </div>
      <figure className="relative m-0 min-w-0 bg-[linear-gradient(90deg,var(--route-soft),rgba(255,255,255,0.78))] p-2.5 max-[900px]:min-h-[170px]">
        {imageUrl ? (
          <img
            className="absolute inset-2.5 block h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[5px] object-cover max-[900px]:static max-[900px]:h-full max-[900px]:w-full"
            src={imageUrl}
            alt={`${route.name} 참고 사진`}
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-2.5 grid place-items-center rounded-[5px] bg-white/30 text-center max-[900px]:static max-[900px]:h-full"
            aria-hidden="true"
          >
            <span />
            <strong>{routeDisplayName}</strong>
          </div>
        )}
      </figure>
    </li>
  );
}

function CourseMapImagePanel({ route }: { route: MountainGuideRoute }) {
  const image = route.courseMapImage;

  if (!image) {
    return (
      <div className="grid min-h-[430px] place-items-center content-center gap-2.5 rounded-[5px] bg-[linear-gradient(rgba(47,107,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,107,79,0.08)_1px,transparent_1px),#edf3e8] bg-[length:42px_42px] p-6 text-center text-[#18221d] [&_p]:m-0 [&_p]:max-w-[420px] [&_p]:text-[#627168] [&_p]:leading-7 [&_strong]:text-xl [&_svg]:text-[#e10f07]">
        <Route size={24} />
        <strong>코스 이미지 준비 중</strong>
        <p>검증된 로컬 코스 지도 이미지를 추가하면 이 영역에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <figure className="m-0 overflow-hidden rounded-[5px] border border-[#d8e0da] bg-[#f4f8f6]">
      <img
        className="block min-h-[430px] w-full object-contain"
        src={image.src}
        alt={image.alt}
        loading="lazy"
      />
      {image.sourceLabel || image.sourceUrl ? (
        <figcaption className="flex flex-wrap items-center gap-2 border-t border-[#d8e0da] bg-white px-3 py-2 text-xs font-bold text-[#627168]">
          <span>출처</span>
          {image.sourceUrl ? (
            <a
              className="inline-flex items-center gap-1 text-[#276c8f]"
              href={image.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              {image.sourceLabel ?? image.sourceUrl}
              <ExternalLink size={13} />
            </a>
          ) : (
            <span>{image.sourceLabel}</span>
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}

function RouteTimeline({
  stops,
  rawPath,
}: {
  stops: MountainGuideRouteStop[];
  rawPath: string;
}) {
  const displayStops = stops.slice(0, 5);
  const hasSegmentDistances = displayStops.some(
    (stop) => stop.distanceFromPrevious,
  );

  return (
    <div className="m-0 border-0 bg-transparent p-0">
      <strong className="sr-only">코스</strong>
      {stops.length > 1 ? (
        <>
          <ol
            className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(84px,1fr))] p-0"
            aria-label="코스 경유지"
          >
            {displayStops.map((stop, index) => (
              <li
                className={cn(
                  "relative min-w-0 px-1.5 text-center after:absolute after:left-1/2 after:right-[-50%] after:top-[7px] after:z-0 after:h-0.5 after:bg-[var(--route-color)] after:content-['']",
                  index === displayStops.length - 1 && "after:hidden",
                )}
                key={`${stop.name}-${index}`}
              >
                <span className="relative z-[1] mx-auto mb-3 flex h-4 w-4 items-center justify-center">
                  <span
                    className={cn(
                      "block h-3 w-3 rounded-full border-2 border-[var(--route-color)] bg-white",
                      (stop.label === "summit" || stop.name.includes("정상")) &&
                        "h-4 w-4 border-[4px]",
                    )}
                  />
                </span>
                <p className="m-0 break-keep text-[13px] font-black leading-[18px] text-[#18221d]">
                  {stop.name}
                </p>
                {stop.elevation ? (
                  <em className="mt-0.5 block font-numeric text-[12px] font-bold not-italic leading-[16px] text-[#627168]">
                    {stop.elevation}
                  </em>
                ) : null}
              </li>
            ))}
          </ol>
          {hasSegmentDistances ? (
            <ol
              className="mx-0 mb-0 mt-2 grid list-none grid-cols-[repeat(auto-fit,minmax(84px,1fr))] p-0"
              aria-label="구간 거리"
            >
              {displayStops.slice(1).map((stop, index) => (
                <li
                  className="relative min-w-0 border-t border-[#c5c9cc] pt-1 text-center font-numeric text-xs font-bold leading-4 text-[#627168] before:absolute before:left-0 before:top-[-5px] before:h-2.5 before:border-l before:border-[#c5c9cc] before:content-[''] after:absolute after:right-0 after:top-[-5px] after:h-2.5 after:border-l after:border-[#c5c9cc] after:content-['']"
                  key={`${stop.name}-${index}-distance`}
                >
                  {stop.distanceFromPrevious}
                </li>
              ))}
              <li className="hidden" aria-hidden="true" />
            </ol>
          ) : null}
          <p className="hidden">{rawPath}</p>
        </>
      ) : (
        <p>{rawPath}</p>
      )}
    </div>
  );
}

function CourseTimelinePanel({
  stops,
  route,
}: {
  stops: MountainGuideRouteStop[];
  route: MountainGuideRoute;
}) {
  const displayStops = stops.length ? stops : buildRouteStops(route);

  return (
    <aside
      className="rounded-md border border-[#dedede] bg-white px-6 py-[26px]"
      aria-label="코스 한눈에 보기"
    >
      <h3>코스 한눈에 보기</h3>
      <ol className="relative m-0 grid list-none gap-0 pl-[22px] before:absolute before:bottom-2.5 before:left-[7px] before:top-2.5 before:w-[3px] before:bg-[#a9adb0] before:content-['']">
        {displayStops.map((stop, index) => (
          <li
            className={cn(
              "relative grid min-h-[70px] grid-cols-[minmax(0,1fr)_auto] gap-x-2.5 gap-y-1 pb-3 before:absolute before:-left-[22px] before:top-[3px] before:h-3.5 before:w-3.5 before:rounded-full before:border-[3px] before:border-white before:bg-[#90979b] before:shadow-[0_0_0_2px_#90979b] before:content-[''] [&.is-start]:before:bg-[#e10f07] [&.is-start]:before:shadow-[0_0_0_2px_#e10f07] [&.is-finish]:before:bg-[#e10f07] [&.is-finish]:before:shadow-[0_0_0_2px_#e10f07]",
              `is-${stop.label ?? "waypoint"}`,
            )}
            key={`${stop.name}-${index}`}
          >
            {stop.label === "start" || stop.label === "finish" ? (
              <span className="justify-self-start rounded-[5px] bg-[#e10f07] px-2 py-1 text-[13px] font-black text-white">
                {stop.label === "start" ? "출발" : "도착"}
              </span>
            ) : null}
            <strong className="col-start-1 text-base leading-6 text-[#18221d]">
              {stop.name}
            </strong>
            {stop.elevation ? (
              <em className="col-start-1 text-sm not-italic text-[#627168]">
                {stop.elevation}
              </em>
            ) : null}
            {stop.distanceFromPrevious ? (
              <small className="col-start-1 text-sm text-[#627168]">
                {stop.distanceFromPrevious}
              </small>
            ) : null}
            {stop.estimatedArrival ? (
              <time className="col-start-2 row-span-2 row-start-1 font-numeric font-extrabold text-[#18221d]">
                {stop.estimatedArrival}
              </time>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-1.5 text-sm leading-[22px] text-[#627168]">
        소요시간은 개인 체력과 휴식 시간에 따라 달라질 수 있습니다.
      </p>
    </aside>
  );
}

function DurationStepper({
  ariaLabel,
  value,
  unit,
  onDecrease,
  onIncrease,
}: {
  ariaLabel: string;
  value: number;
  unit: string;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="grid grid-cols-[44px_minmax(46px,1fr)_44px_auto] items-center overflow-hidden rounded-md border border-[#d8e0da] bg-white">
      <button
        className="grid h-11 place-items-center border-0 border-r border-[#d8e0da] bg-white text-[#18221d] transition hover:bg-[#f7faf8] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#245c46]/25"
        type="button"
        aria-label={ariaLabel}
        onClick={onDecrease}
      >
        <Minus size={16} />
      </button>
      <span className="grid h-11 place-items-center font-numeric text-xl font-extrabold text-[#18221d]">
        {value}
      </span>
      <button
        className="grid h-11 place-items-center border-0 border-l border-[#d8e0da] bg-white text-[#18221d] transition hover:bg-[#f7faf8] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#245c46]/25"
        type="button"
        aria-label={`${unit} 늘리기`}
        onClick={onIncrease}
      >
        <Plus size={16} />
      </button>
      <span className="px-2.5 text-xs font-bold text-[#18221d]">{unit}</span>
    </div>
  );
}

function EvaluationPicker({
  title,
  options,
  activeIndex,
  onChange,
}: {
  title: string;
  options: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="min-w-0 rounded-md border border-[#d8e0da] bg-white p-4 shadow-[0_6px_18px_rgba(24,34,29,0.035)] [&>strong]:mb-5 [&>strong]:block [&>strong]:text-center [&>strong]:text-lg [&>strong]:font-extrabold [&>strong]:leading-7">
      <strong>{title}</strong>
      <div className="grid grid-cols-5 gap-2 max-[560px]:gap-1.5">
        {options.map((option, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={option}
              className={cn(
                "grid min-w-0 cursor-pointer justify-items-center gap-2 rounded-md border-0 bg-transparent px-1 py-1 text-[#627168] transition hover:bg-[#f7f8f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e10f07]/40",
                isActive && "text-[#e10f07]",
              )}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(index)}
            >
              <FeedbackEvaluationIcon index={index} isActive={isActive} />
              <span className="break-keep text-center text-[13px] font-semibold leading-[18px] max-[560px]:text-xs">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeedbackEvaluationIcon({
  index,
  isActive,
}: {
  index: number;
  isActive: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const iconSrc = difficultyEvaluationIconSrcs[index];

  return (
    <span
      className={cn(
        "grid h-11 w-11 place-items-center overflow-hidden rounded-full border bg-[#f7f8f7] p-[7px] max-[560px]:h-[42px] max-[560px]:w-[42px]",
        isActive
          ? "border-[#e10f07] bg-[#fff1f1] text-[#e10f07]"
          : "border-[#d8e0da]",
      )}
      aria-hidden="true"
    >
      {!imageFailed && iconSrc ? (
        <img
          className="h-[120%] w-[120%] max-w-none object-contain -mt-[3px]"
          src={iconSrc}
          alt=""
          onError={() => setImageFailed(true)}
        />
      ) : (
        <DifficultyEvaluationIcon level={index} />
      )}
    </span>
  );
}

function DifficultyEvaluationIcon({
  className,
  level,
}: {
  className?: string;
  level: number;
}) {
  const peakCount = Math.min(Math.max(level, 0), 3);
  const showFlag = level >= 4;

  if (level === 0) {
    return (
      <svg
        className={className}
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M9 43c6.5-8.5 13-12.5 19.5-12.5S41 34.5 55 43"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 45h40"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      {peakCount >= 1 ? (
        <path
          d="M8 45 20 23l12 22Z"
          fill="currentColor"
          opacity={peakCount === 1 ? "0.92" : "0.72"}
        />
      ) : null}
      {peakCount >= 2 ? (
        <path
          d="M22 45 34 18l13 27Z"
          fill="currentColor"
          opacity={peakCount === 2 ? "0.92" : "0.82"}
        />
      ) : null}
      {peakCount >= 3 ? (
        <path d="M36 45 47 24l11 21Z" fill="currentColor" opacity="0.92" />
      ) : null}
      <path
        d="M11 45h43"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {showFlag ? (
        <>
          <path
            d="M47 13v25"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M48 14h10l-3.2 4.8L58 24H48Z" fill="currentColor" />
        </>
      ) : null}
    </svg>
  );
}

function HeroFact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 text-white [&_svg]:row-span-2 [&_svg]:mt-1 [&_span]:text-[13px] [&_span]:font-black [&_span]:text-white/80 [&_strong]:text-base [&_strong]:font-extrabold [&_strong]:leading-6">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function HeroInfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid min-h-[34px] grid-cols-[76px_minmax(0,1fr)] border-b border-white/10 py-1.5">
      <dt className="flex items-center gap-1.5 text-[13px] leading-[22px] text-white/80 [&_svg]:text-[#ffde1a]">
        {icon}
        {label}
      </dt>
      <dd className="m-0 text-[13px] leading-[22px] text-white/90">{value}</dd>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-nowrap items-center gap-2 text-[#18221d] max-[900px]:min-h-11 max-[900px]:rounded-lg max-[900px]:border max-[900px]:border-[#276c8f]/15 max-[900px]:bg-[#f4f8f6] max-[900px]:px-3 max-[900px]:py-2 [&_svg]:flex-none [&_span]:whitespace-nowrap [&_span]:text-[15px] [&_span]:font-black [&_strong]:truncate [&_strong]:font-numeric [&_strong]:text-[15px] [&_strong]:font-black [&_strong]:leading-5">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty: MountainGuideDifficulty;
}) {
  return (
    <b className="inline-flex min-h-7 min-w-8 flex-none items-center justify-center rounded-[5px] border border-white/25 bg-white/20 px-2.5 text-sm font-black leading-none text-white">
      {difficultyShortLabels[difficulty]}
    </b>
  );
}

function DifficultyMetric({
  difficulty,
}: {
  difficulty: MountainGuideDifficulty;
}) {
  return (
    <div className="flex min-w-0 flex-nowrap items-center gap-2 text-[#18221d] max-[900px]:min-h-11 max-[900px]:rounded-lg max-[900px]:border max-[900px]:border-[#276c8f]/15 max-[900px]:bg-[#f4f8f6] max-[900px]:px-3 max-[900px]:py-2 [&_svg]:flex-none [&_span]:whitespace-nowrap [&_span]:text-base [&_span]:font-black">
      <ShieldAlert size={17} />
      <span>난이도</span>
      <strong
        className={cn(
          "inline-flex min-h-7 items-center rounded-[5px] border px-2.5 text-sm font-black leading-none",
          difficultyThemeClass[difficulty],
        )}
      >
        {difficultyShortLabels[difficulty]}
      </strong>
    </div>
  );
}

function DifficultyGuide() {
  return (
    <section
      className="min-h-[216px] rounded-none border border-[#d9dee2] bg-white px-6 pb-5 pt-0 [&_h3]:mx-[-24px] [&_h3]:mb-[18px] [&_h3]:mt-0 [&_h3]:bg-[#f1f5f7] [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px] [&_dd]:m-0 [&_dd]:text-sm [&_dd]:leading-6 [&_dt]:font-black"
      aria-label="코스 난이도 안내"
    >
      <h3>코스 난이도 안내</h3>
      <dl className="grid gap-3 [&>div]:grid [&>div]:grid-cols-[44px_minmax(0,1fr)] [&>div]:items-center [&>div]:gap-3">
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#bfdab4] bg-[#e7f3e4] px-3 text-sm font-black text-[#4d8b37]">
            하
          </dt>
          <dd>초보자도 비교적 쉽게 오를 수 있는 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#d7e4ba] bg-[#f0f7e4] px-3 text-sm font-black text-[#6f9134]">
            중
          </dt>
          <dd>기본 체력이 필요한 일반적인 산행 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#f3c79e] bg-[#fff0de] px-3 text-sm font-black text-[#c46422]">
            상
          </dt>
          <dd>경사, 거리, 암릉 등으로 경험이 필요한 코스</dd>
        </div>
        <div>
          <dt className="inline-flex min-h-7 items-center justify-center rounded-full border border-[#efb9b4] bg-[#fde7e3] px-3 text-sm font-black text-[#a83a34]">
            최상
          </dt>
          <dd>숙련자에게 적합한 고난도 코스</dd>
        </div>
      </dl>
    </section>
  );
}

function VisitWarnings({
  routes,
  notes,
}: {
  routes: MountainGuideRoute[];
  notes?: string;
}) {
  const warnings = routes.flatMap((route) => route.warnings ?? []).slice(0, 5);

  return (
    <section
      className="min-h-[216px] rounded-none border border-[#d9dee2] bg-white px-6 pb-5 pt-0 [&_h3]:mx-[-24px] [&_h3]:mb-[18px] [&_h3]:mt-0 [&_h3]:bg-[#f1f5f7] [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px] [&_li]:flex [&_li]:gap-2 [&_li]:text-sm [&_li]:leading-6 [&_p]:text-sm [&_p]:leading-6 [&_ul]:m-0 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:p-0"
      aria-label="등산 시 유의사항"
    >
      <h3>등산 시 유의사항</h3>
      <ul>
        {(warnings.length > 0
          ? warnings
          : ["방문 전 탐방로 통제, 주차, 대중교통 운행 여부를 확인하세요."]
        ).map((warning) => (
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
  const stationId = getMountainWeatherStationForName(mountain.name);
  const [weather, setWeather] = useState<MountainWeather | null>(null);
  const [weatherState, setWeatherState] = useState<
    "idle" | "loading" | "ready" | "unavailable" | "error"
  >("idle");

  useEffect(() => {
    const controller = new AbortController();
    setWeather(null);

    if (!stationId) {
      setWeatherState("unavailable");
      return () => controller.abort();
    }

    setWeatherState("loading");
    fetchMountainWeather(mountain.name, controller.signal)
      .then((nextWeather) => {
        if (controller.signal.aborted) {
          return;
        }

        if (!nextWeather) {
          setWeatherState("unavailable");
          return;
        }

        setWeather(nextWeather);
        setWeatherState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setWeatherState("error");
        }
      });

    return () => controller.abort();
  }, [mountain.name, stationId]);

  const sourceUrl = stationId
    ? getMountainWeatherPageUrl(stationId)
    : undefined;
  const statusText =
    weatherState === "ready" && weather?.observedAt
      ? `${weather.observedAt.slice(5, 16)} 기준`
      : weatherState === "loading"
        ? "산악기상 조회 중"
        : weatherState === "error"
          ? "연결 실패"
          : "관측지점 없음";
  const description =
    weatherState === "ready"
      ? `${weather?.stationName ?? mountain.name} 산악기상`
      : weatherState === "error"
        ? "브라우저 직접 호출이 차단되면 프록시 설정이 필요합니다."
        : weatherState === "unavailable"
          ? "산악기상정보시스템의 100대 명산 지점에 없습니다."
          : `${mountain.name} 산악기상 정보를 불러오는 중`;

  return (
    <section
      className="min-h-[216px] rounded-none border border-[#00385d] bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.22),transparent_30%),linear-gradient(135deg,#00385d,#075073)] px-6 pb-5 pt-0 text-white [&_h3]:mx-[-24px] [&_h3]:mb-[14px] [&_h3]:mt-0 [&_h3]:bg-transparent [&_h3]:px-6 [&_h3]:py-3.5 [&_h3]:text-lg [&_h3]:font-black [&_h3]:leading-[26px]"
      aria-label={`${mountain.name} 날씨`}
    >
      <div className="mx-[-24px] mb-3 flex flex-col items-center justify-center gap-1 px-6 py-3.5 text-center">
        <h3 className="!m-0 !p-0">오늘의 {mountain.name} 날씨</h3>
        <span className="text-xs font-bold text-white/80">{statusText}</span>
      </div>
      <div className="mb-4 flex flex-col items-center justify-center gap-3 text-center">
        {weatherState === "ready" && weather?.iconUrl ? (
          <img
            className="h-16 w-16 object-contain"
            src={weather.iconUrl}
            alt={`${mountain.name} 날씨 아이콘`}
            loading="lazy"
          />
        ) : (
          <CloudSun className="h-16 w-16 text-white/90" strokeWidth={1.6} />
        )}
        <div>
          <strong className="block text-[42px] font-black leading-none">
            {weather?.temperature ?? "--"}
          </strong>
          <p className="m-0 mt-1 text-sm font-bold text-white/85">
            {description}
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-center">
        <div className="grid place-items-center">
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <CloudSun size={14} />
            체감
          </dt>
          <dd className="m-0 text-sm font-black text-white">
            {weather?.feelsLike ?? "--"}
          </dd>
        </div>
        <div className="grid place-items-center">
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <Droplets size={14} />
            강수량
          </dt>
          <dd className="m-0 text-sm font-black text-white">
            {weather?.precipitation ?? "--"}
          </dd>
        </div>
        <div className="grid place-items-center">
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <Droplets size={14} />
            습도
          </dt>
          <dd className="m-0 text-sm font-black text-white">
            {weather?.humidity ?? "--"}
          </dd>
        </div>
        <div className="grid place-items-center">
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <Wind size={14} />
            풍속
          </dt>
          <dd className="m-0 text-sm font-black text-white">
            {weather?.windSpeed ?? "--"}
          </dd>
        </div>
        <div className="col-span-2 grid place-items-center">
          <dt className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-white/75">
            <MountainIcon size={14} />
            등산쾌적지수
          </dt>
          <dd className="m-0 text-sm font-black text-white">
            {weather?.climbIndex ?? "--"}
          </dd>
        </div>
      </dl>
      {sourceUrl ? (
        <a
          className="mt-4 inline-flex min-h-9 w-full items-center justify-center rounded-md border border-white/30 bg-white/5 px-3 text-sm font-black text-white"
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          산악기상정보시스템에서 보기
        </a>
      ) : null}
    </section>
  );
}

function PhotoGallery({
  mountainName,
  links,
}: {
  mountainName: string;
  links: MountainGuideLink[];
}) {
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
          <a
            className="block h-[116px] overflow-hidden rounded"
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="h-full w-full object-cover"
              src={link.url}
              alt={`${mountainName} 사진 ${index + 1}`}
              loading="lazy"
            />
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
      <a
        className="inline-flex items-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-3 py-2 font-extrabold text-[#276c8f]"
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        <span>{link.label}</span>
        <ExternalLink size={15} />
      </a>
    </li>
  );
}
