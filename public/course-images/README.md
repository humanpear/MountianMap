Course map images can live here when we later cache them locally.

The current fast implementation uses 숲나들e course-map image URLs directly in
`MountainGuide.courseMapImage`. This folder is reserved for a later local WebP
cache if we decide to stop hotlinking those approved assets.

Use this path shape for each verified cached course map image:

`public/course-images/{mountainId}/{courseSlug}-map.webp`

Reference it from guide data as:

```ts
courseMapImage: {
  src: '/course-images/{mountainId}/{courseSlug}-map.webp',
  alt: '{산 이름} {코스 이름} 코스 지도',
  sourceLabel: '{source label}',
  sourceUrl: '{source URL}'
}
```

If a course map has not been cached locally, keep using the 숲나들e direct URL.
