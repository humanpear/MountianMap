# Project Data Notes

- 2026-05-14: The user confirmed by email with 숲나들e that using 숲나들e 100대 명산 data/images in this project has no copyright issue. Project policy now allows 숲나들e course-map images for the mountain detail recommendation map, using direct URLs for the fast implementation.
- 2026-05-28: Mountain/course data policy:
  - `src/data/mountains.ts` is the local source of truth for the 100대 명산 base list generated from the public top-100 mountain API.
  - `src/data/mountainGuides.ts` is the app-visible, manually reviewed guide data.
  - `src/data/draftMountainGuides.ts` is AI/web-search draft output only and must not be imported by app UI code.
  - Runtime APIs are limited to Kakao Maps for the main mountain map, Supabase for completion records, and mtweather.nifos.go.kr for mountain weather.
  - Mountain detail recommendation maps may use 숲나들e direct `foresttrip.go.kr` URLs through `MountainGuide.courseMapImage`; route-specific local WebP caching remains a future optimization.
