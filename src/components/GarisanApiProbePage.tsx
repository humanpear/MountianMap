import { ArrowLeft, Database, ExternalLink, RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/classNames';

type ApiItem = Record<string, string>;

type ApiState =
  | { status: 'loading' }
  | { status: 'success'; resultCode: string; resultMessage: string; items: ApiItem[]; rawXml: string }
  | { status: 'error'; message: string; rawXml?: string };

type GarisanApiProbePageProps = {
  onBack: () => void;
};

const FIELD_LABELS: Record<string, string> = {
  mntncd: '산 코드',
  mntnm: '산명',
  subnm: '부제',
  areanm: '소재지',
  mntheight: '높이',
  aeatreason: '100대 명산 선정 이유',
  overview: '개요',
  details: '상세 내용',
  transport: '대중교통 설명',
  tourisminf: '주변 관광 정보',
  etccourse: '기타 코스 설명',
  flashurl: 'Flash 파일 URL',
  videourl: '동영상 URL'
};

const USEFUL_FIELDS = ['aeatreason', 'overview', 'details', 'transport', 'tourisminf', 'etccourse', 'flashurl', 'videourl'];

const apiClass = {
  page: 'min-h-[calc(100vh-60px)] overflow-auto bg-white px-5 py-5 pb-11 text-[#18221d]',
  toolbar: 'mb-4 flex flex-wrap gap-2',
  secondaryAction:
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d8e0da] bg-white px-4 font-extrabold text-[#18221d]',
  heading:
    'flex items-end justify-between gap-5 border-b border-[#d8e0da] pb-5 pt-1 [&_h2]:m-0 [&_h2]:mb-2 [&_h2]:text-[32px] [&_h2]:font-black [&_h2]:leading-tight [&_p]:m-0 [&_p]:text-[#627168] [&_svg]:text-[#2f6b4f]',
  eyebrow: 'm-0 mb-1 text-xs font-bold leading-4 text-[#627168]',
  section: 'mt-5 rounded-lg border border-[#d8e0da] bg-white',
  endpoint:
    'mt-5 rounded-lg border border-[#d8e0da] bg-[#f7faf8] p-4 [&_dl]:m-0 [&_dl]:grid [&_dl]:gap-3 [&_dd]:m-0 [&_dd]:break-words [&_dd]:text-[15px] [&_dd]:leading-6 [&_dt]:mb-1 [&_dt]:text-[13px] [&_dt]:font-black [&_dt]:text-[#627168]',
  state: 'mt-5 flex items-center gap-2.5 rounded-lg border border-[#d8e0da] bg-white p-4 text-[#2f6b4f] [&_p]:m-0',
  errorState: 'block border-[#b84c3d]/30 bg-[#fff6f4] text-[#b84c3d]',
  summary:
    'mt-5 grid grid-cols-3 rounded-lg border border-[#d8e0da] bg-white max-[700px]:grid-cols-1 [&_div]:min-w-0 [&_div]:border-r [&_div]:border-[#d8e0da] [&_div]:p-4 [&_div:last-child]:border-r-0 [&_dd]:m-0 [&_dd]:break-words [&_dt]:mb-1 [&_dt]:text-[13px] [&_dt]:font-black [&_dt]:text-[#627168]',
  cardSection:
    'mt-5 rounded-lg border border-[#d8e0da] bg-white p-5 [&_h3]:m-0 [&_h3]:mb-4 [&_h3]:text-[22px] [&_h3]:font-black [&_h3]:leading-[30px]',
  usefulGrid: 'grid gap-3',
  usefulItem:
    'rounded-lg border border-[#d8e2dc] border-l-[5px] border-l-[#2f6b4f] bg-[#fbfcfb] p-4 [&_p]:m-0 [&_p]:whitespace-pre-wrap [&_p]:break-keep [&_p]:text-base [&_p]:leading-7 [&_strong]:mb-2 [&_strong]:block [&_strong]:text-[17px] [&_strong]:text-[#1f4e39]',
  itemCard:
    'border-t border-[#d8e0da] py-5 first:border-t-0 first:pt-0 [&_h4]:m-0 [&_h4]:mb-4 [&_h4]:text-xl [&_h4]:font-black [&_h4_span]:text-sm [&_h4_span]:text-[#627168]',
  itemList: 'm-0 grid gap-2.5',
  itemRow:
    'grid grid-cols-[210px_minmax(0,1fr)] gap-3.5 rounded-lg border border-[#e1e8e3] bg-[#fcfdfc] p-3 max-[700px]:grid-cols-1 [&_code]:mt-1 [&_code]:block [&_code]:text-xs [&_code]:font-bold [&_code]:text-[#627168] [&_dd]:m-0 [&_dd]:min-w-0 [&_dd]:whitespace-pre-wrap [&_dd]:break-words [&_dd]:text-base [&_dd]:leading-7 [&_dt]:m-0 [&_dt]:min-w-0 [&_dt]:font-black',
  link: 'inline-flex items-center gap-2 font-extrabold text-[#276c8f]',
  pre:
    'max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-[#d8e0da] bg-[#f3f6f4] p-3.5 text-[13px] leading-[21px] text-[#18221d]',
  empty: 'text-[#627168]'
};

function getFieldLabel(key: string) {
  return FIELD_LABELS[key.toLowerCase()] ?? key;
}

function isUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

function parseCultureInfoXml(xmlText: string): Extract<ApiState, { status: 'success' }> {
  const document = new DOMParser().parseFromString(xmlText, 'application/xml');
  const parserError = document.querySelector('parsererror');

  if (parserError) {
    throw new Error(parserError.textContent?.trim() || 'XML 파싱에 실패했습니다.');
  }

  const resultCode = document.querySelector('resultCode')?.textContent?.trim() ?? '';
  const resultMessage = document.querySelector('resultMsg')?.textContent?.trim() ?? '';
  const items = Array.from(document.querySelectorAll('item')).map((item) => {
    const fields: ApiItem = {};

    for (const child of Array.from(item.children)) {
      fields[child.tagName.toLowerCase()] = child.textContent?.trim() ?? '';
    }

    return fields;
  });

  return {
    status: 'success',
    resultCode,
    resultMessage,
    items,
    rawXml: xmlText
  };
}

export function GarisanApiProbePage({ onBack }: GarisanApiProbePageProps) {
  const [state, setState] = useState<ApiState>({ status: 'loading' });
  const apiPath = '/api/forest-culture/gdTrailInfoOpenAPI?searchMtNm=가리산&numOfRows=10&pageNo=1';

  const loadApiData = async () => {
    setState({ status: 'loading' });

    try {
      const response = await fetch(apiPath);
      const rawXml = await response.text();

      if (!response.ok) {
        setState({
          status: 'error',
          message: `API 요청 실패: HTTP ${response.status}`,
          rawXml
        });
        return;
      }

      setState(parseCultureInfoXml(rawXml));
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'API 데이터를 불러오지 못했습니다.'
      });
    }
  };

  useEffect(() => {
    void loadApiData();
  }, []);

  const firstItem = state.status === 'success' ? state.items[0] : undefined;
  const usefulFields = useMemo(() => {
    if (!firstItem) {
      return [];
    }

    return USEFUL_FIELDS.filter((key) => firstItem[key]).map((key) => ({
      key,
      label: getFieldLabel(key),
      value: firstItem[key]
    }));
  }, [firstItem]);

  return (
    <section className={apiClass.page} aria-label="가리산 공공 API 데이터 확인">
      <div className={apiClass.toolbar}>
        <button className={apiClass.secondaryAction} type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          지도
        </button>
        <button className={apiClass.secondaryAction} type="button" onClick={loadApiData}>
          <RefreshCw size={18} />
          다시 불러오기
        </button>
      </div>

      <header className={apiClass.heading}>
        <div>
          <p className={apiClass.eyebrow}>산림청 명산등산로 API 진단</p>
          <h2>가리산 API 원문 데이터</h2>
          <p>공공 API에서 실제로 내려오는 필드를 가공 없이 확인하는 화면입니다.</p>
        </div>
        <Database size={30} />
      </header>

      <section className={apiClass.endpoint} aria-label="API 요청 정보">
        <dl>
          <div>
            <dt>문서에 사용된 제공 End Point</dt>
            <dd>https://apis.data.go.kr/1400000/service/cultureInfoService2</dd>
          </div>
          <div>
            <dt>현재 화면 호출 경로</dt>
            <dd>{apiPath}</dd>
          </div>
          <div>
            <dt>프록시 대상</dt>
            <dd>http://api.forest.go.kr/openapi/service/cultureInfoService/gdTrailInfoOpenAPI</dd>
          </div>
        </dl>
      </section>

      {state.status === 'loading' ? (
        <section className={apiClass.state} role="status">
          <RefreshCw size={20} />
          <p>가리산 데이터를 불러오는 중입니다.</p>
        </section>
      ) : null}

      {state.status === 'error' ? (
        <section className={cn(apiClass.state, apiClass.errorState)} role="alert">
          <strong>불러오기 실패</strong>
          <p>{state.message}</p>
          {state.rawXml ? <pre className={cn(apiClass.pre, 'mt-3')}>{state.rawXml}</pre> : null}
        </section>
      ) : null}

      {state.status === 'success' ? (
        <>
          <dl className={apiClass.summary} aria-label="API 응답 요약">
            <div>
              <dt>결과 코드</dt>
              <dd>{state.resultCode || '없음'}</dd>
            </div>
            <div>
              <dt>결과 메시지</dt>
              <dd>{state.resultMessage || '없음'}</dd>
            </div>
            <div>
              <dt>검색 결과</dt>
              <dd>{state.items.length}건</dd>
            </div>
          </dl>

          {usefulFields.length > 0 ? (
            <section className={apiClass.cardSection} aria-label="사이트 활용 후보 필드">
              <h3>우리 사이트에 바로 쓸 수 있어 보이는 필드</h3>
              <div className={apiClass.usefulGrid}>
                {usefulFields.map((field) => (
                  <article className={apiClass.usefulItem} key={field.key}>
                    <strong>{field.label}</strong>
                    <p>{field.value}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className={apiClass.cardSection} aria-label="API 전체 필드">
            <h3>전체 응답 필드</h3>
            {state.items.length > 0 ? (
              state.items.map((item, index) => (
                <article className={apiClass.itemCard} key={`${item.mntncd ?? 'item'}-${index}`}>
                  <h4>
                    {item.mntnm || '이름 없음'} <span>#{index + 1}</span>
                  </h4>
                  <dl className={apiClass.itemList}>
                    {Object.entries(item).map(([key, value]) => (
                      <div className={apiClass.itemRow} key={key}>
                        <dt>
                          {getFieldLabel(key)}
                          <code>{key}</code>
                        </dt>
                        <dd>
                          {isUrl(value) ? (
                            <a className={apiClass.link} href={value} target="_blank" rel="noreferrer">
                              <span>{value}</span>
                              <ExternalLink size={16} />
                            </a>
                          ) : (
                            value || '값 없음'
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))
            ) : (
              <p className={apiClass.empty}>가리산 검색 결과가 없습니다.</p>
            )}
          </section>

          <section className={apiClass.cardSection} aria-label="API 원본 XML">
            <h3>원본 XML</h3>
            <pre className={apiClass.pre}>{state.rawXml}</pre>
          </section>
        </>
      ) : null}
    </section>
  );
}
