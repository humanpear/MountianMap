# gstack Codex 사용법

이 문서는 현재 PC에 설치된 Codex용 gstack 사용 방법을 정리한 문서입니다.

## 설치 상태

현재 gstack은 Claude Code용이 아니라 Codex용으로 설치되어 있습니다.

- gstack 저장소 위치: `C:\Users\pibma\.gstack\repos\gstack`
- Codex 스킬 위치: `C:\Users\pibma\.codex\skills\gstack-*`
- 브라우저 실행 파일: `C:\Users\pibma\.gstack\repos\gstack\browse\dist\browse.exe`

Claude Code용 설치는 제거되어 있습니다.

- 제거됨: `C:\Users\pibma\.claude\skills\gstack`
- 제거됨: `C:\Users\pibma\.claude\CLAUDE.md`

## 사용 전 준비

gstack을 설치한 뒤 이미 열려 있던 Codex 세션에서는 새 스킬이 바로 보이지 않을 수 있습니다.

사용하려면 Codex를 재시작하거나 새 Codex 세션을 여세요.

## 기본 사용 방식

Codex에서는 gstack 스킬이 `gstack-` 접두사가 붙은 이름으로 등록되어 있습니다.

예를 들어 Claude Code의 `/browse`에 해당하는 기능은 Codex에서 `gstack-browse` 스킬입니다.

Codex에게 요청할 때는 다음처럼 말하면 됩니다.

```text
gstack-browse 스킬을 사용해서 https://example.com 페이지를 열고 화면을 확인해줘.
```

```text
gstack-review 스킬을 사용해서 현재 변경사항을 리뷰해줘.
```

```text
gstack-qa 스킬을 사용해서 http://localhost:5173 화면을 테스트해줘.
```

## 자주 쓰는 스킬

| 목적 | 사용할 스킬 |
| --- | --- |
| 웹페이지 열기, 탐색, 스크린샷 | `gstack-browse` |
| 로컬/배포 사이트 QA | `gstack-qa` |
| QA만 집중 실행 | `gstack-qa-only` |
| 코드 리뷰 | `gstack-review` |
| 기능 계획 자동화 | `gstack-autoplan` |
| 아이디어/제품 방향 상담 | `gstack-office-hours` |
| CEO 관점 계획 리뷰 | `gstack-plan-ceo-review` |
| 엔지니어링 관점 계획 리뷰 | `gstack-plan-eng-review` |
| 디자인 관점 계획 리뷰 | `gstack-plan-design-review` |
| 디자인 상담 | `gstack-design-consultation` |
| 디자인 리뷰 | `gstack-design-review` |
| HTML 디자인 작업 | `gstack-design-html` |
| 배포 전 점검 | `gstack-ship` |
| 배포/랜딩 작업 | `gstack-land-and-deploy` |
| 카나리 점검 | `gstack-canary` |
| 성능/벤치마크 | `gstack-benchmark` |
| 문제 원인 조사 | `gstack-investigate` |
| 보안 관점 검토 | `gstack-cso` |
| 회고 | `gstack-retro` |
| 학습 내용 저장/활용 | `gstack-learn` |
| gstack 업데이트 | `gstack-upgrade` |

## 예시 요청

웹 브라우징:

```text
gstack-browse를 사용해서 https://github.com/garrytan/gstack 페이지를 열고 주요 내용을 요약해줘.
```

로컬 앱 QA:

```text
gstack-qa를 사용해서 http://localhost:5173에서 주요 화면이 깨지지 않는지 확인해줘.
```

코드 리뷰:

```text
gstack-review를 사용해서 현재 git 변경사항의 버그 위험과 누락된 테스트를 찾아줘.
```

기능 계획:

```text
gstack-autoplan을 사용해서 이 프로젝트에 검색 기능을 추가하는 계획을 세워줘. 아직 구현하지 말고 계획만 작성해줘.
```

문제 조사:

```text
gstack-investigate를 사용해서 빌드 실패 원인을 조사해줘.
```

## 웹 브라우징 규칙

웹페이지를 직접 열거나 브라우저 기반 검증이 필요할 때는 `gstack-browse` 또는 `gstack-qa`를 사용합니다.

- 단순 웹페이지 확인: `gstack-browse`
- 앱 흐름, 폼, 반응형 화면, QA 검증: `gstack-qa`

## 업데이트

gstack을 최신 상태로 갱신하려면 Codex에서 다음처럼 요청합니다.

```text
gstack-upgrade 스킬을 사용해서 gstack을 업데이트해줘.
```

또는 터미널에서 직접 실행할 수도 있습니다.

```powershell
Set-Location $HOME\.gstack\repos\gstack
& 'C:\Program Files\Git\bin\bash.exe' ./setup --host codex
```

## 문제가 있을 때

스킬이 보이지 않으면 다음 순서로 확인하세요.

1. Codex를 완전히 종료하고 새 세션을 엽니다.
2. `C:\Users\pibma\.codex\skills` 아래에 `gstack-*` 폴더들이 있는지 확인합니다.
3. `C:\Users\pibma\.gstack\repos\gstack\browse\dist\browse.exe` 파일이 있는지 확인합니다.
4. 그래도 안 되면 gstack 저장소에서 setup을 다시 실행합니다.

```powershell
Set-Location $HOME\.gstack\repos\gstack
& 'C:\Program Files\Git\bin\bash.exe' ./setup --host codex
```
