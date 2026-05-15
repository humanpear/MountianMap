export type Mountain = {
  id: string;
  name: string;
  province: string;
  city: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  address: string;
  shortDescription: string;
  selectionReason: string;
  detailStatus: 'basic' | 'enhanced';
};

export type CompletionRecord = {
  mountainId: string;
  completedAt: string;
};

export type MountainGuideStatus = 'draft' | 'verified';

export type MountainGuideSource = 'ai-draft' | 'curated';

export type MountainGuideConfidence = 'low' | 'medium' | 'high';

export type MountainGuideDifficulty = 'easy' | 'normal' | 'hard' | 'unknown';

export type MountainGuideCoordinate = {
  latitude: number;
  longitude: number;
};

export type MountainGuideRouteStop = {
  name: string;
  label?: 'start' | 'waypoint' | 'summit' | 'finish';
  elevation?: string;
  distanceFromPrevious?: string;
  estimatedArrival?: string;
  latitude?: number;
  longitude?: number;
};

export type MountainGuideRoute = {
  rank: number;
  isRecommended: boolean;
  name: string;
  path: string;
  startPoint: string;
  distance: string;
  estimatedTime: string;
  difficulty: MountainGuideDifficulty;
  parking: string;
  transit: string;
  features: string[];
  sourceLinks: MountainGuideLink[];
  warnings: string[];
  recommendationReason?: string;
  heroImageUrl?: string;
  summary?: string;
  routeStops?: MountainGuideRouteStop[];
  mapPathCoordinates?: MountainGuideCoordinate[];
  elevationGain?: string;
  coursePhotos?: MountainGuideLink[];
  reviewSummary?: string;
};

export type MountainGuideLink = {
  label: string;
  url: string;
  type: 'official' | 'blog' | 'search';
};

export type MountainGuide = {
  mountainId: string;
  status: MountainGuideStatus;
  source: MountainGuideSource;
  generatedAt?: string;
  confidence?: MountainGuideConfidence;
  selectionReason?: string;
  routes: MountainGuideRoute[];
  courseImageLinks?: MountainGuideLink[];
  photoLinks?: MountainGuideLink[];
  verificationLinks?: MountainGuideLink[];
  notes?: string;
};

export type RandomMode = 'all' | 'incomplete' | 'selected';

export type RandomResult = {
  winner: Mountain;
  sequence: Mountain[];
};
