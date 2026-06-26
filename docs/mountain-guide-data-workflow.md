# Mountain Guide Data Workflow

This workflow scales the Gamaksan-style guide work to all 100 mountains.

## Source Policy

- Use `src/data/mountains.ts` as the base 100-mountain list.
- Use 숲나들e for selection reasons, route-table text, official detail links, course-map images, and mountain photos.
- For the current fast implementation, course-map images may use direct `foresttrip.go.kr` URLs in `MountainGuide.courseMapImage`; local WebP caching can be added later.
- Do not use Flash maps, legacy map files, or unverified track images.
- Use internet search only to supplement parking, transit, distance, estimated time, route popularity, and safety notes.
- Keep AI/search output in `src/data/draftMountainGuides.ts` until a human reviews it.
- Promote only reviewed data to `src/data/mountainGuides.ts`.

## Gamaksan Template

For each mountain guide, mirror the Gamaksan shape:

- `selectionReason`: Prefer 숲나들e official text when available.
- `photoLinks`: Mountain photos may point to 숲나들e or another allowed source.
- `routes`: Keep 1-4 routes.
- `verificationLinks`: Include the 숲나들e detail page or another official/search link.
- `notes`: State which official/search sources were used and which fields still need verification.

For each route:

- `rank`: 1 is the most generally useful route.
- `isRecommended`: `true` only for rank 1.
- `name`: Include main landmarks and whether it is round-trip or traverse.
- `path`: Use `A -> B -> C` waypoint order.
- `startPoint`: Use the practical trailhead or parking/transit access point.
- `distance` and `estimatedTime`: Use conservative values and mark uncertain values as `확인 필요`.
- `difficulty`: Use `easy`, `normal`, `hard`, `extreme`, or `unknown`.
- `parking` and `transit`: Include practical access notes and warn when current schedules or fees can change.
- `features`: Explain why this route exists.
- `sourceLinks`: Include at least one source that supports the route.
- `warnings`: Include visit-before-confirm language for closures, reservations, weather, parking, or transit.
- `recommendationReason`: Explain why the route is ranked where it is without overclaiming.
- `courseMapImage`: Use the 숲나들e direct URL for the mountain-level recommendation map when available.

## Mountain Checklist

Before promoting a mountain from draft to active guide data:

- Confirm the mountain id and name match `src/data/mountains.ts`.
- Record the 숲나들e detail page if found.
- Copy or summarize 숲나들e selection reason text.
- Extract recommended/other route-table text and the matching course-map image from 숲나들e.
- Search for parking, transit, distance, estimated time, and route popularity.
- Keep source links for every route.
- Add warnings for uncertain or time-sensitive facts.
- Leave `courseMapImage` empty only when 숲나들e does not provide a usable course-map image.
- Run `npm run lint`, `npm run test`, and `npm run build` before considering the batch done.
