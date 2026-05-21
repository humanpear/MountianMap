import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, MapPin, Mountain as MountainIcon, Search, Shuffle, X } from 'lucide-react';
import { GarisanApiProbePage } from './components/GarisanApiProbePage';
import { MountainDetailPage } from './components/MountainDetailPage';
import { MountainMap } from './components/MountainMap';
import { MountainNameWithHanja } from './components/MountainNameWithHanja';
import { mountains } from './data/mountains';
import { getMountainGuide } from './data/mountainDetails';
import { getRandomCandidates, pickRandomMountain } from './game/random';
import { cn } from './lib/classNames';
import { getCompletionErrorMessage } from './services/completionErrors';
import { isSupabaseConfigured } from './services/env';
import { playFanfare, playRouletteTick } from './services/randomSounds';
import { supabase } from './services/supabase';
import type { CompletionRecord, Mountain, RandomMode } from './types';

type RandomState =
  | { status: 'idle' }
  | { status: 'running'; highlightedId: string; sequence: Mountain[]; winner: Mountain }
  | { status: 'result'; winner: Mountain };

const confettiPieces = Array.from({ length: 34 }, (_, index) => index);

function getConfettiStyle(index: number) {
  return {
    '--x': `${(index % 11 - 5) * 34}px`,
    '--delay': `${(index % 7) * 34}ms`,
    '--duration': `${760 + (index % 5) * 120}ms`,
    '--hue': `${38 + (index % 5) * 42}`
  } as CSSProperties;
}

const randomModeLabels: Record<RandomMode, string> = {
  all: '전체',
  incomplete: '완료 산 제외',
  selected: '직접 선택'
};

const appClass = {
  shell: 'grid min-h-screen grid-rows-[auto_1fr] bg-[#f4f7f5] text-[#18221d]',
  topbar:
    'z-[4] flex h-[60px] items-center justify-between gap-4 bg-mountain-navy px-5 py-3 text-white max-[900px]:h-auto max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:px-4',
  brand:
    'inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent text-xl font-black text-white max-[900px]:justify-start [&_svg]:text-white',
  search:
    'grid min-h-9 w-[252px] grid-cols-[minmax(0,1fr)_40px] overflow-hidden rounded-[9px] bg-white max-[900px]:w-full',
  searchInput: 'min-w-0 border-0 px-3 text-[13px] text-[#18221d] outline-none placeholder:text-[#627168]',
  searchButton: 'inline-flex cursor-pointer items-center justify-center border-0 bg-white text-[#00172b]',
  workspace: 'relative grid min-h-[calc(100vh-60px)] grid-cols-[minmax(0,1fr)_360px] max-[900px]:grid-cols-1',
  mapStage: 'relative min-h-[calc(100vh-60px)] overflow-visible',
  filterBar:
    'absolute left-5 top-5 z-[2] flex gap-1.5 rounded-[10px] border border-[#d8e0da] bg-white/95 p-1.5 shadow-[0_16px_50px_rgba(24,34,29,0.14)]',
  filterButton:
    'inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-transparent px-3 text-[#627168]',
  filterButtonActive: 'border-[#2f6b4f] bg-[#2f6b4f] text-white',
  randomControl:
    'absolute bottom-[22px] left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-[#d8e0da] bg-white/95 p-2 shadow-[0_16px_50px_rgba(24,34,29,0.14)]',
  candidateCount:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-[#eef2ef] px-3 font-numeric font-bold',
  randomButton:
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#2f6b4f] bg-[#2f6b4f] px-[18px] font-extrabold text-white disabled:cursor-progress disabled:bg-[#1f4e39]',
  detailPanel: 'z-[3] overflow-auto border-l border-[#d8e0da] bg-white p-5 max-[900px]:border-l-0 max-[900px]:border-t',
  detailHeader: 'flex items-start justify-between gap-4',
  eyebrow: 'm-0 mb-[3px] text-xs font-bold leading-4 text-[#627168]',
  completeButton:
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-3 font-extrabold text-[#18221d]',
  completeButtonActive: 'border-[#1f8a5b] bg-[#1f8a5b] text-white',
  meta:
    'my-5 grid gap-3 rounded-lg border border-[#d8e0da] bg-[#f7faf8] p-4 [&_dd]:m-0 [&_dd]:font-bold [&_dt]:text-xs [&_dt]:font-black [&_dt]:text-[#627168]',
  primaryAction:
    'mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#2f6b4f] bg-[#2f6b4f] px-4 font-extrabold text-white',
  secondaryAction:
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-4 font-extrabold text-[#18221d]',
  sidebarPhotos: 'mt-5',
  sidebarPhotoGrid:
    'mt-2 grid grid-cols-3 gap-2 [&_a]:block [&_img]:aspect-square [&_img]:w-full [&_img]:rounded-md [&_img]:object-cover',
  randomPending: 'grid min-h-60 place-items-center content-center gap-3 text-center text-[#2f6b4f] [&_h2]:text-2xl',
  loadingDots:
    'inline-flex gap-1.5 [&_span]:h-[7px] [&_span]:w-[7px] [&_span]:rounded-full [&_span]:bg-[#d7922b] [&_span]:animate-[loading-dot_900ms_ease-in-out_infinite] [&_span:nth-child(2)]:[animation-delay:120ms] [&_span:nth-child(3)]:[animation-delay:240ms]',
  toast:
    'fixed bottom-5 left-5 z-[5] flex max-w-[min(420px,calc(100vw-40px))] items-center gap-2.5 rounded-lg border border-[#d8e0da] bg-white py-2.5 pl-3.5 pr-2.5 shadow-[0_16px_50px_rgba(24,34,29,0.14)]',
  toastButton:
    'inline-flex h-8 min-h-8 w-8 items-center justify-center rounded-lg border border-[#d8e0da] bg-[#eef2ef]',
  setupNote:
    'fixed bottom-5 right-5 z-[5] max-w-[360px] rounded-lg border border-[#d8e0da] bg-white px-3.5 py-3 text-[13px] text-[#627168] shadow-[0_16px_50px_rgba(24,34,29,0.14)]',
  modalBackdrop: 'fixed inset-0 z-10 grid place-items-center bg-black/45 p-5',
  resultModal:
    'relative w-[min(520px,100%)] overflow-hidden rounded-xl border border-[#d8e0da] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] animate-[modal-pop_180ms_ease-out] [&>p]:text-[#627168]',
  resultClose:
    'absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#d8e0da] bg-[#eef2ef]',
  resultMeta:
    'my-4 grid grid-cols-2 gap-3 rounded-lg bg-[#f7faf8] p-3 [&_dd]:m-0 [&_dd]:font-bold [&_dt]:text-xs [&_dt]:font-black [&_dt]:text-[#627168]',
  resultActions: 'mt-5 flex gap-2.5 max-[560px]:grid',
  confetti:
    'pointer-events-none absolute left-1/2 top-[18px] h-px w-px [&_span]:absolute [&_span]:h-3 [&_span]:w-[7px] [&_span]:rounded-sm [&_span]:bg-[hsl(var(--hue),78%,52%)] [&_span]:opacity-0 [&_span]:animate-[confetti-fall_var(--duration)_ease-out_var(--delay)_both]'
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [selectedMountainId, setSelectedMountainId] = useState(mountains[0]?.id ?? '');
  const [detailMountainId, setDetailMountainId] = useState<string | null>(null);
  const [isApiProbeOpen, setIsApiProbeOpen] = useState(false);
  const [focusedMountainId, setFocusedMountainId] = useState<string | undefined>();
  const [completionRecords, setCompletionRecords] = useState<CompletionRecord[]>([]);
  const [randomMode, setRandomMode] = useState<RandomMode>('incomplete');
  const [candidateIds, setCandidateIds] = useState<Set<string>>(new Set());
  const [randomState, setRandomState] = useState<RandomState>({ status: 'idle' });
  const [resultModalMountain, setResultModalMountain] = useState<Mountain | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedMountain = mountains.find((mountain) => mountain.id === selectedMountainId);
  const detailMountain = mountains.find((mountain) => mountain.id === detailMountainId);
  const selectedMountainGuide = selectedMountain ? getMountainGuide(selectedMountain) : undefined;
  const completedIds = useMemo(() => new Set(completionRecords.map((record) => record.mountainId)), [completionRecords]);
  const completionCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const record of completionRecords) {
      counts.set(record.mountainId, (counts.get(record.mountainId) ?? 0) + 1);
    }
    return counts;
  }, [completionRecords]);
  const candidates = useMemo(
    () => getRandomCandidates({ mountains, completedIds, selectedIds: candidateIds, mode: randomMode }),
    [candidateIds, completedIds, randomMode]
  );

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session?.user.id) {
      setCompletionRecords([]);
      return;
    }

    supabase
      .from('completed_mountains')
      .select('mountain_id, completed_at')
      .eq('user_id', session.user.id)
      .then(({ data, error }) => {
        if (error) {
          setMessage(getCompletionErrorMessage(error, 'load'));
          return;
        }

        setCompletionRecords(
          (data ?? []).map((row) => ({
            mountainId: row.mountain_id,
            completedAt: row.completed_at
          }))
        );
      });
  }, [session?.user.id]);

  const toggleCompleted = async (mountain: Mountain) => {
    if (!session?.user.id || !supabase) {
      setMessage('등반 기록을 저장하려면 Google로 로그인하세요.');
      return;
    }

    const previousRecords = completionRecords;
    const isCompleted = completedIds.has(mountain.id);

    if (isCompleted) {
      setCompletionRecords((records) => records.filter((record) => record.mountainId !== mountain.id));
      const { error } = await supabase
        .from('completed_mountains')
        .delete()
        .eq('user_id', session.user.id)
        .eq('mountain_id', mountain.id);

      if (error) {
        setCompletionRecords(previousRecords);
        setMessage(getCompletionErrorMessage(error, 'delete'));
      }
      return;
    }

    const nextRecord = { mountainId: mountain.id, completedAt: new Date().toISOString() };
    setCompletionRecords((records) => [...records, nextRecord]);
    const { error } = await supabase.from('completed_mountains').insert({
      user_id: session.user.id,
      mountain_id: mountain.id,
      completed_at: nextRecord.completedAt
    });

    if (error) {
      setCompletionRecords(previousRecords);
      setMessage(getCompletionErrorMessage(error, 'save'));
    }
  };

  const toggleCandidate = (mountain: Mountain) => {
    setCandidateIds((ids) => {
      const next = new Set(ids);
      if (next.has(mountain.id)) {
        next.delete(mountain.id);
      } else {
        next.add(mountain.id);
      }
      return next;
    });
  };

  const selectMountain = (mountain: Mountain) => {
    setSelectedMountainId(mountain.id);
    setResultModalMountain(null);
    if (randomState.status === 'result') {
      setRandomState({ status: 'idle' });
    }
  };

  const openMountainDetail = (mountain: Mountain) => {
    setIsApiProbeOpen(false);
    setDetailMountainId(mountain.id);
    setResultModalMountain(null);
  };

  const submitMountainSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      return;
    }

    const match =
      mountains.find((mountain) => mountain.name === query) ??
      mountains.find((mountain) => mountain.name.includes(query) || query.includes(mountain.name));

    if (!match) {
      setMessage('검색한 산을 찾지 못했습니다.');
      return;
    }

    setIsApiProbeOpen(false);
    setSelectedMountainId(match.id);
    setFocusedMountainId(match.id);
    setDetailMountainId(match.id);
    setResultModalMountain(null);
  };

  const showMountainOnMap = (mountain: Mountain) => {
    setIsApiProbeOpen(false);
    setDetailMountainId(null);
    setSelectedMountainId(mountain.id);
    setFocusedMountainId(mountain.id);
  };

  const runRandomPick = () => {
    const result = pickRandomMountain({ mountains, completedIds, selectedIds: candidateIds, mode: randomMode });

    if (!result) {
      setMessage('현재 조건에 맞는 산이 없습니다. 필터를 바꿔보세요.');
      return;
    }

    setRandomState({
      status: 'running',
      highlightedId: result.sequence[0].id,
      sequence: result.sequence,
      winner: result.winner
    });
    setSelectedMountainId('');
    setResultModalMountain(null);
    playRouletteTick(0);

    let index = 0;
    let delay = 34;

    const tick = () => {
      index += 1;
      const nextMountain = result.sequence[index];

      if (!nextMountain) {
        setSelectedMountainId(result.winner.id);
        setFocusedMountainId(result.winner.id);
        setRandomState({ status: 'result', winner: result.winner });
        setResultModalMountain(result.winner);
        playFanfare();
        return;
      }

      playRouletteTick(index);
      setRandomState({
        status: 'running',
        highlightedId: nextMountain.id,
        sequence: result.sequence,
        winner: result.winner
      });
      delay = Math.min(delay + 10 + Math.floor(index * 0.45), 310);
      window.setTimeout(tick, delay);
    };

    window.setTimeout(tick, delay);
  };

  const highlightedId =
    randomState.status === 'running'
      ? randomState.highlightedId
      : randomState.status === 'result'
        ? randomState.winner.id
        : selectedMountain?.id;

  return (
    <main className={appClass.shell}>
      <header className={appClass.topbar}>
        <button className={appClass.brand} type="button" onClick={() => setDetailMountainId(null)} aria-label="지도로 이동">
          <img className="h-9 w-auto object-contain brightness-0 invert" src="/logo-mountain.png" alt="" aria-hidden="true" />
          <span>대한민국 100대 명산</span>
        </button>
        <form
          className={appClass.search}
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            submitMountainSearch();
          }}
        >
          <label className="sr-only" htmlFor="mountain-search-input">
            산 이름 검색
          </label>
          <input
            className={appClass.searchInput}
            id="mountain-search-input"
            list="mountain-search-options"
            type="search"
            placeholder="산 이름을 검색하세요"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <datalist id="mountain-search-options">
            {mountains.map((mountain) => (
              <option key={mountain.id} value={mountain.name} />
            ))}
          </datalist>
          <button className={appClass.searchButton} type="submit" aria-label="산 검색">
            <Search size={22} />
          </button>
        </form>
      </header>

      {isApiProbeOpen ? (
        <GarisanApiProbePage onBack={() => setIsApiProbeOpen(false)} />
      ) : detailMountain ? (
        <MountainDetailPage
          mountain={detailMountain}
          isCompleted={completedIds.has(detailMountain.id)}
          onBack={() => setDetailMountainId(null)}
          onShowOnMap={showMountainOnMap}
          onToggleCompleted={toggleCompleted}
        />
      ) : (
        <section className={appClass.workspace} aria-label="100대 명산 지도">
          <div className={appClass.mapStage}>
            <MountainMap
              mountains={mountains}
              selectedMountainId={selectedMountain?.id}
              focusedMountainId={focusedMountainId}
              completedIds={completedIds}
              completionCounts={completionCounts}
              candidateIds={candidateIds}
              highlightedId={highlightedId}
              selectionMode={randomMode === 'selected'}
              onMountainSelect={selectMountain}
              onCandidateToggle={toggleCandidate}
            />

            <div className={appClass.filterBar} aria-label="랜덤 후보 필터">
              {(Object.keys(randomModeLabels) as RandomMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={cn(appClass.filterButton, mode === randomMode && appClass.filterButtonActive)}
                  onClick={() => setRandomMode(mode)}
                >
                  {randomModeLabels[mode]}
                </button>
              ))}
            </div>

            <div className={appClass.randomControl}>
              <div className={appClass.candidateCount}>
                <MountainIcon size={16} />
                후보 {candidates.length}개
              </div>
              <button className={appClass.randomButton} type="button" onClick={runRandomPick} disabled={randomState.status === 'running'}>
                <Shuffle size={18} />
                {randomState.status === 'running' ? '고르는 중' : '랜덤 뽑기'}
              </button>
            </div>
          </div>

          <aside className={appClass.detailPanel} aria-label="선택한 산 정보">
            {randomState.status === 'running' ? (
              <div className={appClass.randomPending} role="status" aria-live="polite">
                <Shuffle size={22} />
                <h2>랜덤 뽑기 중</h2>
                <div className={appClass.loadingDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : selectedMountain ? (
              <>
                <div className={appClass.detailHeader}>
                  <div>
                    <p className={appClass.eyebrow}>{selectedMountain.province}</p>
                    <h2 className="m-0 text-2xl font-extrabold leading-tight">
                      <MountainNameWithHanja
                        mountain={selectedMountain}
                        className="flex-wrap"
                        hanjaClassName="text-base text-[#627168]"
                      />
                    </h2>
                  </div>
                  <button
                    className={cn(appClass.completeButton, completedIds.has(selectedMountain.id) && appClass.completeButtonActive)}
                    type="button"
                    onClick={() => toggleCompleted(selectedMountain)}
                    aria-label={`${selectedMountain.name} 등반 완료 표시`}
                  >
                    <Check size={18} />
                    <span>등반완료</span>
                  </button>
                </div>

                <dl className={appClass.meta}>
                  <div>
                    <dt>지역</dt>
                    <dd>{selectedMountain.city}</dd>
                  </div>
                  <div>
                    <dt>고도</dt>
                    <dd>{selectedMountain.elevationMeters.toLocaleString()}m</dd>
                  </div>
                  <div>
                    <dt>주소</dt>
                    <dd>{selectedMountain.address}</dd>
                  </div>
                </dl>
                <p className="mt-4 leading-7 text-[#627168]">{selectedMountain.shortDescription}</p>
                {selectedMountainGuide?.photoLinks?.length ? (
                  <section className={appClass.sidebarPhotos} aria-label="산 사진">
                    <h3 className="text-lg font-extrabold">사진</h3>
                    <div className={appClass.sidebarPhotoGrid}>
                      {selectedMountainGuide.photoLinks.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noreferrer" aria-label={`${link.label} 원본 보기`}>
                          <img src={link.url} alt={link.label} loading="lazy" />
                        </a>
                      ))}
                    </div>
                  </section>
                ) : null}
                <button className={appClass.primaryAction} type="button" onClick={() => openMountainDetail(selectedMountain)}>
                  <MapPin size={18} />
                  정보 상세페이지
                </button>
              </>
            ) : null}
          </aside>
        </section>
      )}

      {message ? (
        <div className={appClass.toast} role="status">
          <span>{message}</span>
          <button className={appClass.toastButton} type="button" onClick={() => setMessage(null)} aria-label="메시지 닫기">
            <X size={16} />
          </button>
        </div>
      ) : null}

      {!isSupabaseConfigured ? (
        <div className={appClass.setupNote}>
          `.env`에 Supabase와 Kakao Maps 키를 넣으면 실제 지도와 Google 로그인이 활성화됩니다.
        </div>
      ) : null}

      {resultModalMountain ? (
        <div className={appClass.modalBackdrop} role="presentation" onClick={() => setResultModalMountain(null)}>
          <section
            className={appClass.resultModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="result-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={appClass.confetti} aria-hidden="true">
              {confettiPieces.map((piece) => (
                <span key={piece} style={getConfettiStyle(piece)} />
              ))}
            </div>
            <button className={appClass.resultClose} type="button" onClick={() => setResultModalMountain(null)} aria-label="결과 창 닫기">
              <X size={18} />
            </button>
            <p className={appClass.eyebrow}>랜덤 당첨</p>
            <h2 id="result-modal-title" className="m-0 text-3xl font-black">
              <MountainNameWithHanja
                mountain={resultModalMountain}
                className="flex-wrap"
                hanjaClassName="text-xl text-[#627168]"
              />
            </h2>
            <dl className={appClass.resultMeta}>
              <div>
                <dt>지역</dt>
                <dd>{resultModalMountain.city}</dd>
              </div>
              <div>
                <dt>고도</dt>
                <dd>{resultModalMountain.elevationMeters.toLocaleString()}m</dd>
              </div>
            </dl>
            <p>{resultModalMountain.shortDescription}</p>
            <div className={appClass.resultActions}>
              <button className={appClass.primaryAction} type="button" onClick={() => openMountainDetail(resultModalMountain)}>
                <MapPin size={18} />
                상세 보기
              </button>
              <button className={appClass.secondaryAction} type="button" onClick={runRandomPick}>
                <Shuffle size={18} />
                다시 뽑기
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
