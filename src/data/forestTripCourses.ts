import type { ForestTripCourseKind, MountainGuideImage } from '../types';

export type ForestTripCourseRoute = {
  label: string;
  kind: ForestTripCourseKind;
  path: string;
  estimatedTime: string;
};

export type ForestTripCourseGuide = {
  courseMapImage?: MountainGuideImage;
  routes: ForestTripCourseRoute[];
};

export const forestTripCourses: Record<string, ForestTripCourseGuide> = {
  "0000000002": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165909&ATTCH_FILE_MSTER_ID=FILEMSTER_00160501",
      "alt": "가리산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71942&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "가리산자연휴양림 관리사무소 ① - 삼거리 ② - 가삽고개·북동능선 ③ - 정상 ④ - 샘터·남릉 등산안내도 ⑤ - 무쇠말재 ⑥ - 삼거리 ② - 휴양림 주차장 ①",
        "estimatedTime": "약 3시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "가리산자연휴양림 ① - 삼거리 ② - 가삽고개 ③ - 소양호 물로리 ⑦",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "가리산자연휴양림 ① - 가삽고개 ③ - 정상 ④ - 가리산교 - 철정리 ⑧",
        "estimatedTime": "약 4시간 30분"
      }
    ]
  },
  "0000000003": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165899&ATTCH_FILE_MSTER_ID=FILEMSTER_00160499",
      "alt": "가리왕산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71944&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "하안미 5리 백일동 ① - 30분 - 상수도 취수원 ② - 1시간 30분 - 안부(1160m) ③ - 30분 - 중왕산 ④ - 50분- 마항치 ⑤ - 1시간 20분 - 1450봉 ⑥ - 50분 - 상봉(정상) ⑧ - 1시간 - 중봉 ⑨ - 2시간 - 회동리 얼음굴 매표소 ⑩",
        "estimatedTime": "약 2시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "가리왕산자연휴양림 ⑫ - 안부 전 갈림길 ⑪ - 안부 ⑦ - 상봉(정상) ⑧",
        "estimatedTime": "약 4시간 30분"
      }
    ]
  },
  "0000000001": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166006&ATTCH_FILE_MSTER_ID=FILEMSTER_00160498",
      "alt": "가야산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=71945&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "백운리 ① - 35분 - 용기골 대피소 ② - 40분 - 서성재 ③ - 1시간 10분 - 상왕봉정상 ④ - 50분 - 토신골 삼거리 ⑤ - 20분 - 마애불 ⑥ - 40분 - 용탑선원 ⑦ - 30분 - 치인리 ⑧",
        "estimatedTime": "약 4시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "치인리 ⑧ - 용탑선원 ⑦ - 마애불 ⑥ - 토신골 삼거리 ⑤ - 상왕봉정상 ④ - 서장대 ⑬ - 심원골 매표소 ⑭",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "청량동 ⑫ - 청량사 ⑪ - 능선삼거리 ⑩ - 남산제일봉 ⑨ - 치인리 ⑧",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000004": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165889&ATTCH_FILE_MSTER_ID=FILEMSTER_00160497",
      "alt": "가지산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71946&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "석남사 주차장 ① - 1시간 35분 - 석남령 ② - 1시간 40분 - 정상 ③ - 30분 - 쌀바위 대피소 ④ - 30분 - 귀바위 ⑤ - 25분 - 능선 삼거리 ⑥ - 1시간 - 석남사 주차장 ⑦",
        "estimatedTime": "약 5시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "석남사 ⑦ - 석남계곡 ⑧ - 쌀바위 ④ - 정상 ③ - ( 서남릉 ) - 1080봉 ⑨ - 능선 삼거리 ⑥ - 812봉 ⑩ - 백연폭포 - 매표소 ⑪",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "운문재 ⑫ - 귀바위 ⑤ - 상운산 - 쌀바위 ④ - 정상 ③ - 밀양고개 - 호박소계곡 ⑬ - 매표소 ⑪",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "불당마을 ⑦ - 동북릉 - 귀바위 ⑤ - 상운산 - 쌀바위 ④ - 정상 ③ - 석남령 ② - ( 쇠점골 ) - ( 호박소 ) - 매표소 ⑪",
        "estimatedTime": "약 6시간 5분"
      }
    ]
  },
  "0000000005": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166007&ATTCH_FILE_MSTER_ID=FILEMSTER_00160495",
      "alt": "감악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71947&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "운계폭포 입구 주차장 ① - 20분 - 범륜사 ② - 20분 - 만남의 숲 ③ - 10분 - 까치봉 능선 삼거리 ④ - 25분 - 까치봉 ⑤ - 15분 - 정상 - 10분 - 임꺽정봉 ⑥ - 35분 - 만남의 숲 ③ - 20분 - 범륜사 ② - 20분 - 운계폭포 입구 주차장①",
        "estimatedTime": "약 2시간 55분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "설마리 ⑦ - 범륜사 ② - ( 정상 ) - 임꺽정봉 ⑥ - 신암리 ⑨",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "신암리 ⑨ - 신암저수지 ⑧ - ( 정상 ) - 범륜사 ② - 운계폭포 ① - 설마리 ⑦",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000006": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165874&ATTCH_FILE_MSTER_ID=FILEMSTER_00160494",
      "alt": "강천산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71948&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 45분 - 강천사 ② - 30분 - 신선봉 ③ - 20분 - 구름다리 ④ - 50분 - 정상(왕자봉) ⑤ - 20분 - 깃대봉 ⑥ - 50분 - 매표소 ①",
        "estimatedTime": "약 3시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "매표소 ① - 강천사 ② - 구름다리 ④ - 왕자봉(정상) ⑤ - ( 도계 종주 ) - ( 연대봉 ) - ( 연대암지 ) - 강천사 ②",
        "estimatedTime": "약 5시간 15분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "매표소 ① - 강천사 ② - 구름다리 ④ - 왕자봉(정상) ⑤ - 530봉 ⑩ - ( 서북릉 ) - 분통마을 ⑪",
        "estimatedTime": "약 2시간 45분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "매표소 ① - 강천사 ② - 구름다리 ④ - 왕자봉(정상) ⑤ - 강천호 ⑫ - 송낙바위 - 연대봉 ⑦ - 산성산 - 연대암지 ⑧ - 구름다리 ④ - 강천사 ② - 매표소 ①",
        "estimatedTime": "약 4시간 30분"
      }
    ]
  },
  "0000000007": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165864&ATTCH_FILE_MSTER_ID=FILEMSTER_00160492",
      "alt": "계룡산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=04&fmmntSeq=71949&nowPage=1&preSrchArea=04&preSrchWrd=&srchArea=04&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "주차장 ① - 40분 - 동학사 ② - 1시간 20분 - 남매탑 ③ - 25분 - ( 금잔디고개 ) - 40분 - 용문폭포 ⑤ - 20분- 갑사 ⑥ - 25분 - 주차장 ①",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "갑사 ⑦ - 연천봉 ⑧ - 관음봉 ⑨ - 삼불봉 ⑩ - 남매탑 ③ - 큰배재 ⑪ - 상신리 ⑫",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "동학사 ⑬ - 은선폭포 ⑭ - 관음봉 ⑨ - 삼불봉 ⑩ - 신선봉 ⑪ - 장군봉 ⑮ - 박정자 삼거리 ⑯",
        "estimatedTime": "약 9시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "신원사 ⑰ - 고왕암 ⑱ - 연천봉 ⑧ - 삼불봉 ⑩ - 남매탑 ③ - 동학사 ⑬",
        "estimatedTime": "약 3시간 10분"
      }
    ]
  },
  "0000000008": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166008&ATTCH_FILE_MSTER_ID=FILEMSTER_00160491",
      "alt": "계방산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71950&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "운두령 ① - 20분 - 1166봉 ② - 45분 - 1492봉 ③ - 40분 - 정상 ④ - 1시간 - 1276봉 ⑤ - 1시간 - 계방산장 삼거리 ⑥",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "운두령 ① - 1166봉 ② - 1492봉(헬기장) ③ - 정상 ④ - 안부 ⑨ - 이승복생가터 ⑦ - 방아다리약수 ⑧",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "아랫삼거리(혹은 방아다리 약수) ⑧ - 이승복생가터 ⑦ - 주목군락지 ⑨ - 안부 - 정상 ④ - 아랫삼거리 ⑥",
        "estimatedTime": "약 4시간 50분"
      }
    ]
  },
  "0000000009": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165849&ATTCH_FILE_MSTER_ID=FILEMSTER_00160489",
      "alt": "공작산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71951&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "수타사 입구 ① - 25분 - 와동고개 ② - 30분 - 514봉 ③ - 30분 - 약수봉 ④ - 45분 - 맛바위골 삼거리 ⑤ - 35분 - 수리봉 ⑥ - 50분 - 안공작재 ⑦ - 50분 - 정상 ⑧ - 15분 - 동릉삼거리 ⑨ - 30분 - 휴양림 삼거리 ⑩ - 30분 - 공작골가든 ⑪",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "공작골가든 ⑪ - 문바위골 ⑫ - 735봉 ⑬ - 정상 ⑧ - 안공작재 ⑦ - 790봉 - ( 신봉리 )- 신봉교 ⑯",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "수타사 ① - 와동고개 ② - 약수봉 ④ - 수리봉 ⑥ - 안공작재 ⑦ - 정상 ⑧ - 공작산자연휴양림 ⑰ - 공작골가든 ⑪",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "신봉교 ⑯ - 동봉사 ⑱ - 수리봉 ⑥ - 790봉 - 안공작재 ⑦ - 정상 ⑧ - 735봉 - 문바위골 ⑫ - 공작골가든 ⑪",
        "estimatedTime": "약 4시간 50분"
      }
    ]
  },
  "0000000010": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166009&ATTCH_FILE_MSTER_ID=FILEMSTER_00160488",
      "alt": "관악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71953&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "서울대입구 방면 매표소 ① - 20분 - 제1광장 ② - 40분 - 제4야영장 ③ - 1시간 - ( 깔딱고개 ) - 10분 - 정상 ④ - 10분 - 연주암 ⑤ - 1시간 10분 - 과천향교 ⑥",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "사당동 대학촌 ⑦ - 333봉 ⑧ - 414봉 ⑨ - 559봉 ⑩ - 연주암 ⑤ - 정상 ④ - 장군바위 ⑪ - 장군바위골 ⑫ - 과천 공업진흥청 ⑬",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "안양유원지 ⑭ - 소공원 ⑮ - 불성사 ⑳ - 정상 ④ - 연주암 - 제4야영장 ③ - 제1광장 ② - 서울대 입구 ①",
        "estimatedTime": "약 4시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "호암사 ⑯ - 장군봉 ⑰ - 삼성산 - 삼막사 ⑱ - 망월암 ⑲ - 소공원 ⑮ - 불성사 ⑳ - 과천 공업진흥청 ⑬",
        "estimatedTime": "약 4시간 30분"
      }
    ]
  },
  "0000000011": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165834&ATTCH_FILE_MSTER_ID=FILEMSTER_00160486",
      "alt": "구병산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=71954&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "적암휴게소, 사기막마을 다리 ① - 25분 - 계곡갈림길 ② - 25분 - 정수암터(옹달샘) ③ - 40분 - 안부삼거리 ④ - 1시간 - 정상 ⑤ - 35분 - 철계단 ⑥ - 1시간 10분 - 적암휴게소 ①",
        "estimatedTime": "약 4시간 15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "삼가리 수성초교삼가분교 ⑦ - 구병리 ⑧ - 853봉 ④ - 정상 ⑤ - 송현리 ⑨",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000012": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165829&ATTCH_FILE_MSTER_ID=FILEMSTER_00160485",
      "alt": "금산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=71955&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "상주리 금산매표소 ① - 20분 - 약수터 ② - 1시간 - 쌍홍문 ③ - 5분 - 보리암 ④ - 10분 - 정상 ⑤ - 1시간 - 상주리 ⑥",
        "estimatedTime": "약 2시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "복곡매표소 ⑦ - 보리암 ④ - 정상 ⑤ - 상주리 ⑥",
        "estimatedTime": "약 2시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "남해편백자연휴양림 ⑧ - 금산제초소 ⑨ - 정상 ⑤ - 쌍홍문 ③ - 금산매표소 ①",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000013": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165819&ATTCH_FILE_MSTER_ID=FILEMSTER_00160483",
      "alt": "금수산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=71956"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "백운동매표소, 보문정사 ① - 20분 - 용담폭포 삼거리 ② - 1시간 30분 - 망덕봉 ③ - 40분 - 살바위고개 ⑤ - 15분 - 정상 ⑥ - 10분 - 상학마을삼거리 ⑥ - 1시간 30분 - 용담폭포삼거리 ② - 20분 - 백운동매표소 ①",
        "estimatedTime": "약 4시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "능강리 ⑦ - 얼음골 ⑧ - 얼음골재 ⑨ - 정상 ⑥ - 백운동매표소 ①",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "상학리 ⑩ - 절골, 살바위고개 ④ - 정상 ⑥ - 용담폭포삼거리 ② - 백운동매표소 ①",
        "estimatedTime": "약 2시간 50분"
      }
    ]
  },
  "0000000014": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166010&ATTCH_FILE_MSTER_ID=FILEMSTER_00160481",
      "alt": "금오산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=71957&fmmntArcd=01&srchWrd=%EA%B8%88%EC%98%A4%EC%82%B0&srchArea=01&preSrchWrd=%EA%B8%88%EC%98%A4%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 20분 - 해운사 ② - 20분 - 할딱고개 ③ - 35분 - 마애불 갈림길 ④ - 25분 - 정상 - 1시간 - 법성사 ⑤",
        "estimatedTime": "약 2시간 40분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "야영장 ⑥ - 등산로 교차점 ⑦ - 칼다봉 ⑧ - 서문 ⑨ - 정상 ⑨ - 할딱고개 ③ - 매표소 ①",
        "estimatedTime": "약 4시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "금오동천 ⑩ - 남문 ⑪ - 성안 사거리 - 정상 ⑨ - 약사암 ④ - ( 계곡길 ) - 법성사 ⑤",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "우장 ⑫ - 서문 ⑨ - 성안 사거리 - 정상 ⑨ - 도수령 ⑬ - ( 능선 사거리 )- 상모동 ⑭",
        "estimatedTime": "약 4시간 10분"
      }
    ]
  },
  "0000000015": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166011&ATTCH_FILE_MSTER_ID=FILEMSTER_00160480",
      "alt": "금정산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=71958&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "금강공원 ① - 1시간 40분 - 이정표 사거리 ② - 1시간 20분 - 동문 ③ - 35분 - 회룡암 사거리 ④ - 35분 - 북문 ⑤ - 25분 - 고당봉 ⑥ - 1시간 - 범어사 ⑦",
        "estimatedTime": "약 5시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "호포 ⑧ - 고당봉 ⑥ - 북문 ⑤ - 정수암 ⑨ - 금성동 ⑩",
        "estimatedTime": "약 3시간 5분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "양산 외송리 ⑪ - ( 장군봉 ) - 고당봉 ⑥ - 북문 ⑤ - 범어사 ⑦",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "두실역 ⑫ - 회룡암 ⑬ - 의상봉 ⑭ - 원효봉 ⑮ - 고당봉 ⑥ - ( 미륵불 표지석 ) - 범어사 ⑦",
        "estimatedTime": "약 3시간 20분"
      }
    ]
  },
  "0000000016": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166013&ATTCH_FILE_MSTER_ID=FILEMSTER_00160478",
      "alt": "깃대봉 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=08&fmmntSeq=71959&nowPage=1&preSrchArea=08&preSrchWrd=&srchArea=08&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "흑산초교 홍도분교 ① - 20분 - 347봉 ② - 30분 - 정상 ③ - 10분 - ( 원추리군락지 ) - 20분 - 진흥초교 ④ - 10분 - 등대 ⑤ - 10분 - 석촌마을 ④",
        "estimatedTime": "약 1시간 40분"
      }
    ]
  },
  "0000000017": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166015&ATTCH_FILE_MSTER_ID=FILEMSTER_00160477",
      "alt": "남산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=71960&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "삼릉주차장 ① - 5분 - ( 삼릉 ) - 10분 - 선각육존불 ② - 10분 - 상선암 ③ - 25분 - 금오산(정상) ④ - 10분 - 삼화령 ⑤ - 10분 - 용장사곡 삼층석탑 ⑥ - 15분 - 설잠교 ⑦ - 20분 - 징검다리 ⑧- 10분 - 용장리 ⑨",
        "estimatedTime": "약 1시간 55분"
      }
    ]
  },
  "0000000018": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165779&ATTCH_FILE_MSTER_ID=FILEMSTER_00160475",
      "alt": "내연산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=71961&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "하옥리 향로교 ① - 1시간 40분 - 향로봉 ② - 40분 - 시명리 ③ - 1시간 40분 - 연산폭포 ④ - 1시간 20분 - 보경사 ⑤",
        "estimatedTime": "약 5시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "보경사 ⑤ - ( 문수산 갈림길 ) - ( 은폭 ) - ( 시명리 ) - ( 향로봉 ) - 삼지봉 ⑥ - 문수산 ⑦ - 보경사 ⑤",
        "estimatedTime": "약 7시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "보경사 ⑤ - ( 문수산 갈림길 ) - ( 은폭 ) - 삼지봉 ⑥ - 문수산 ⑦ - 보경사 ⑤",
        "estimatedTime": "약 5시간 30분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "샘재 ⑧ - 삼거리 ⑨ - 천령산 ⑩ - 연산폭 ④ - 보경사 ⑤",
        "estimatedTime": "약 6시간"
      }
    ]
  },
  "0000000019": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165769&ATTCH_FILE_MSTER_ID=FILEMSTER_00160473",
      "alt": "내장산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71962&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "내장사 ① - 1시간 - 연자봉 ② - 40분 - 신선봉 ③ - 40분 - 까치봉 ④ - 1시간 10분 - 내장사 ①",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "내장사 ① - 벽련암 ⑤ - 서래봉 ⑥ - 불출봉 ⑦ - 원적암 ⑧ - 내장사 ①",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "내장사 ① - 원적암 ⑧ - 망해봉 ⑨ - 연지봉 ⑩ - 까치봉 ④ - 신선봉(정상) ③ - 내장사 ①",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "일주문 ⑪ - 벽련암 ⑤ - 서래봉 ⑥ - 불출봉 ⑦ - 망해봉 ⑨ - 연지봉 ⑩ - 까치봉 ④ - 신선봉(정상) ③ - 연자봉 ② - 장군봉 ⑫ - 유군치 ⑬ - 내장사 진입도로 ⑭",
        "estimatedTime": "약 7시간 30분"
      }
    ]
  },
  "0000000020": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166016&ATTCH_FILE_MSTER_ID=FILEMSTER_00160472",
      "alt": "대둔산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71963&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "수락리 버스종점 ① - 30분 - 제1폭포 ② - 20분 - ( 군지골 초입 ) - 10분 - 화랑폭포 ③ - 1시간 - 장군절터 ④ - 30분 - 마천대 ⑤ - 1시간 - 산북리 관광단지 ⑥",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "산북리 관광단지 ⑥ - 케이블카 ⑦ - 장군바위 ⑧ - 용문굴 ⑨ - 마천대 ⑤ - 금강구름다리 ⑩ - 케이블카 ⑦ - 산북리 관광단지 ⑥",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "산북리 관광단지 ⑥ - 케이블카 ⑦ - 금강구름다리 ⑩ - 마천대 ⑤ - 낙조대 ⑪ - 태고사 ⑫",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000021": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165754&ATTCH_FILE_MSTER_ID=FILEMSTER_00160470",
      "alt": "대암산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71964&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "생태식물원 ① - 1시간 10분 - 1122봉 ② - 1시간 50분 - 후곡약수터 ③",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000022": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165749&ATTCH_FILE_MSTER_ID=FILEMSTER_00160469",
      "alt": "대야산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=71965&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "벌바위마을 ① - 15분 - 용추 ② - 20분 - 월영대 ③ - 1시간 - 밀재 ④ - 1시간 - 정상 ⑤ - 20분 - 건폭 ⑥ - 1시간- 월영대 ③ - 20분 - 용추 ②- 15분 - 벌바위마을 ①",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "벌바위마을 ① - 용추 ② - 월영대 ③ - 밀재 ④ - 정상 ⑤ - 촛대봉 ⑦ - 벌바위마을 ①",
        "estimatedTime": "약 5시간 소요"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "농바위 ⑧ - 밀재 ④ - 정상 ⑤ - 중대봉 ⑨ - 곰바위 ⑩ - 농바위 ⑧",
        "estimatedTime": "약 5시간 소요"
      }
    ]
  },
  "0000000023": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166018&ATTCH_FILE_MSTER_ID=FILEMSTER_00160467",
      "alt": "덕숭산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=04&fmmntSeq=71966&nowPage=1&preSrchArea=04&preSrchWrd=&srchArea=04&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "수덕사 ① - 5분 - 견성암 ② - 10분 - ( 공터 ) - 10분 - ( 계단길 합류점 ) - 25분 - 정상 ⑤ - 55분 - 둔리 ⑥",
        "estimatedTime": "약 1시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "나본들고개 ⑦ - 정상 ⑤ - 육괴정 ⑧",
        "estimatedTime": "약 1시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "노루목 ⑨ - 정상 ⑤ - 계단길 ⑤ - 수덕사 ①",
        "estimatedTime": "약 1시간 20분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "주차장① - 동남릉 - 정상 ⑤ - 150봉 ⑩ - 삼승리 ⑪",
        "estimatedTime": "약 1시간 40분"
      }
    ]
  },
  "0000000024": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166019&ATTCH_FILE_MSTER_ID=FILEMSTER_00160466",
      "alt": "덕유산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71967&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "삼공리 ① - 40분 - 신대휴게소 ② - 30분 - 백련사 ③ - 1시간 30분 - 향적봉 ④ - 40분 - 백암봉 ⑤ - 1시간 10분 - 동엽령 ⑥ - 1시간 - 돌탑 ⑦ - 1시간 15분 - 무룡산 ⑧ - 50분 - 삿갓골재 ⑨ - 1시간 15분 - 월성재 ⑩ - 1시간 10분 - 남덕유산 ⑮ - 1시간 - 영각사 ⑪",
        "estimatedTime": "약 5시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "송계사 ⑫ - 귀봉 ⑬ - 백암봉 ⑤ - 중봉 - 향적봉 ④ - 백련사 ③ - 삼공리 ①",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "명천리 ⑭ - 삿갓골재 ⑨ - 월성재 ⑩ - 남덕유산 ⑮ - 영각사 ⑪",
        "estimatedTime": "약 5시간 45분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "삼공리 ① - 칠봉 ⑯ - 향적봉 ④ - 중봉 ⑰ - 오수자굴 ⑱ - 백련사 ③ - 삼공리 ①",
        "estimatedTime": "약 5시간 20분"
      }
    ]
  },
  "0000000025": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165729&ATTCH_FILE_MSTER_ID=FILEMSTER_00160465",
      "alt": "덕항산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71968&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "골말 ① - 30분 - 전망바위 ② - 1시간 15분 - 사거리 안부 ③ - 10분 - 정상 ⑩ - 10분 - 사거리 안부 ③ - 1시간- 환선봉 ④ - 1시간 - 자암재 ⑤ - 45분 - 환선굴 입구 ⑥ - 10분 - 골말 ①",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "점촌 ⑦ - 외나무골 ⑧ - 구부시령 ⑨ - 정상 ⑩ - 사거리 안부 ③ - 1048봉 - 큰가래골 ⑪ - 무사동 ⑫",
        "estimatedTime": "약 3시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "골말 ① - 자암목이능선 ② - ( 전망바위 ) - 사거리 안부 ③ - 정상 ⑩ - 구부시령 ⑨ - 외나무골 ⑧ - 점촌 ⑦",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000026": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166021&ATTCH_FILE_MSTER_ID=FILEMSTER_00160464",
      "alt": "도락산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=71969&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "상선교 ① - 선바위 ② - 채운봉 ③ - 2시간 - 삼거리 ④ - 40분 - 정상 ⑨ - 30분 - 삼거리 ④ - 30분 - 제봉(상선상봉) ⑤ - 1시간 30분 - 상선교 ①",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "궁텃골 ⑥ - 사모폭포 ⑦ - 내궁기마을 ⑧ - 신선봉 ⑨ - 정상 ⑨ - 상선암 ⑩",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000027": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166022&ATTCH_FILE_MSTER_ID=FILEMSTER_00160462",
      "alt": "도봉산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71970&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 15분 - 도봉서원 ② - 25분 - 용어천계곡 아우라지 ③ - 40분 - 주봉샘터 야영장 ④ - 30분 - 만장 · 신선봉 새목 ⑤ - 40분 - 만월암 동쪽 전망바위 ⑥ - 50분 - 도봉서원 ② - 15분 - 매표소 ①",
        "estimatedTime": "약 3시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "주차장 ① - 도봉서원 ② - 도봉산장 ⑦ - 마당바위 ⑧ - 신선봉 ④ - 칼바위 - 우이암 ⑨ - 우이동 ⑩",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "망월사역 ⑪ - ( 원도봉 매표소 ) - 망월사 ⑬ - 신선봉 - 송추폭포 ⑭ - 송추계곡 ⑭ - 송추역 ⑯",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "회룡골 매표소 ⑰ - 회룡사 ⑱ - 포대능선 ⑲ - 신선봉 ④ - 마당바위 ⑧ - 도봉산장 ⑦ - 주차장 ①",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000028": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166024&ATTCH_FILE_MSTER_ID=FILEMSTER_00160461",
      "alt": "두륜산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=08&fmmntSeq=71971&nowPage=1&preSrchArea=08&preSrchWrd=&srchArea=08&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 차량 이용시 15분 - 주차장 ② - 15분, 도보 - 대흥사 ③ - 20분 - 일지암 ④ - 50분 - 만일암터 ⑤ - 10분- 만일재 ⑥ - 10분 - 구름다리 - 10분 - 만일재 - 20분 - 가련봉 ⑦ - 25분 - 오심재 ⑧ - 20분 - 고계봉 ⑨ - 1시간 - 집단시설지구 ⑩",
        "estimatedTime": "약 4시간 15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "매표소 ① - 유선여관 ⑪ - 고계봉 ⑨ - 오심재 ⑧ - 가련봉 ⑦ - 두륜봉 ⑫ - 진불암 - 대흥사 ③ - 매표소 ①",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "매표소 ① - 향로봉 ⑬ - 오도치 ⑭ - 혈망봉 ⑮ - 연화봉 ⑯ - 남암 ⑰ - 대흥사 ③ - ( 왕벚나무 ) - 매표소 ①",
        "estimatedTime": "약 5시간 50분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "케이블카 승강장 ⑩ - 고계봉 ⑨ - 오심재 ⑧ - 가련봉 ⑦ - 만일재 ⑥ - 일지암 ④ - 대흥사 ③ - 매표소 ①",
        "estimatedTime": "약 4시간 40분"
      }
    ]
  },
  "0000000029": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165699&ATTCH_FILE_MSTER_ID=FILEMSTER_00160459",
      "alt": "두타산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71972&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "삼화사 ① - 40분 - 허공다리 ② - 30분 - 직관암터 ③ - 30분 - 절터 ④ - 1시간 40분 - 연칠성령 ⑤ - 40분 - 청옥산 ⑥ - 40분 - 박달재 ⑦ - 1시간 10분 - 두타산 ⑧ - 1시간 - 북릉 삼거리 ⑨- 1시간 10분 - ( 문지방산성 ) - 15분 - 허공다리 ② - 40분 - 매표소 ①",
        "estimatedTime": "약 8시간 55분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "삼화사 ① - 허공다리 ② - 직관암터 ③ - 절터 ④ - 망군대 ⑤ - 청옥산 ⑥ - 문바위 ⑦ - ( 박달골 ) - 삼화사 ①",
        "estimatedTime": "약 8시간 5분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "천은사 ⑩ - 쉰움산 ⑪ - 두타산 ⑧ - 북릉삼거리 ⑨ - 대궐터 ⑫ - 산성터 - 삼화사 ①",
        "estimatedTime": "약 7시간 50분"
      }
    ]
  },
  "0000000030": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165689&ATTCH_FILE_MSTER_ID=FILEMSTER_00160457",
      "alt": "마니산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71973&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "상방리 마니산 국민관광단지(관리사무소) ① - 5분 - 갈림길 ② - 50분, 단군로 ③ - 주능선 - 50분 - 참성단 ④ - 40분 - 정상 ⑤ - 20분 - 능선갈림길 ⑥ - 30분 - 정수사 ⑦",
        "estimatedTime": "약 3시간 15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "정수사 ⑦ - 정상 ⑤ - 참성단 ④ - ( 계단길 ) - 상방리 마니산 국민관광단지 ①",
        "estimatedTime": "약 2시간 15분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "함허동천 ⑧ - ( 능선갈림길 ) - 정상 ⑤ - 능선갈림길 - 정수사 ⑦",
        "estimatedTime": "약 1시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "진개마을 ⑨ - 314봉 ⑩ - 정상 ⑤ - 참성단 ④ - 315봉 - 작은뫼넘이 ⑪ - ( 상봉 ) - 선수약수 ⑫",
        "estimatedTime": "약 6시간"
      }
    ]
  },
  "0000000031": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166026&ATTCH_FILE_MSTER_ID=FILEMSTER_00160455",
      "alt": "마이산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=13&fmmntSeq=71974&nowPage=1&preSrchArea=13&preSrchWrd=&srchArea=13&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "남부주차장 ① - 30분 - 고금당 ② - 20분 - 비룡대 ③ - 20분 - 물탕골 갈림길 ④ - 20분 - 봉두봉 ⑤ - 20분 - 탑사 주차장 ⑥ - 5분 - 은수사 ⑦ - 25분 - 남부주차장 ①",
        "estimatedTime": "약 2시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "북부주차장 ⑧ - 천황문 ⑨ - 은수사 ⑦ - ( 탑사 ) - ( 탑영제 ) - ( 금당사 ) - 남부주차장 ①",
        "estimatedTime": "약 2시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "북부주차장 ⑧ - 천황문 ⑨ - 은수사 ⑦ - ( 탑사 ) - ( 천황문 ) - 북부주차장 ⑧",
        "estimatedTime": "약 2시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "한미산성 ⑩ - 광대봉 ② - ( 나옹대 ) - 비룡대 ③ - 봉두봉 ⑤ - 천황문 ⑨ - 은수사 ⑦ - ( 탑사 ) - 남부주차장 ①",
        "estimatedTime": "약 7시간"
      }
    ]
  },
  "0000000032": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166027&ATTCH_FILE_MSTER_ID=FILEMSTER_00160453",
      "alt": "명성산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71975&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "산정리 버스정류장 ① - 30분 - 자인사 ② - 50분 - 안부 ③ - 1시간 - 삼각봉 ④ - 30분 - 집터 ⑤ - 30분- 등룡폭포 ⑥ - 30분 - 산정리 버스정류장 ①",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "산정호수 주차장 ⑦ - 비선폭포 ⑧ - ( 억새군락지 ) - 등룡폭포 ⑥ - ( 비선폭포 ) - 산정호수 주차장 ⑦",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "산정호수 주차장 ⑦ - 비선폭포 ⑧ - 등룡폭포 ⑥ - 삼각봉 ④ - 정상 ⑨ - 산안고개 ⑩ - 산정호수 주차장 ⑦",
        "estimatedTime": "약 6시간"
      }
    ]
  },
  "0000000033": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165664&ATTCH_FILE_MSTER_ID=FILEMSTER_00160452",
      "alt": "명지산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71976&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "익근리 ① - 1시간 10분 - 계곡 갈림길 ② - 1시간 - 사향봉 안부 ③ - 50분 - 정상 ④ - 40분 - 남봉 ⑤ - 40분 - 계곡 상부 ⑥ - 1시간 - 명지폭포 ② - 50분 - 익근리 ①",
        "estimatedTime": "약 6시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "익근리 ① - ( 강박봉 ) - ( 사향봉 ) - 정상 ④ - 남봉 ⑤ - 승천봉 안부 ⑦ - 백둔리 ⑧",
        "estimatedTime": "약 6시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "귀목리 ⑨ - 아재비고개 ⑩ - 1199봉 ⑪ - 정상 ④ - ( 사향봉 안부 ) - ( 계곡 삼거리 ) - 익근리 ①",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "익근리 ① - 명지폭포 ② - 계곡 상부 ⑥ - 정상 ④ - 1199봉 ⑪ - ( 귀목고개 ) - 귀목봉 ⑫ - 강씨봉고개 ⑬ - 일동 ⑭",
        "estimatedTime": "약 8시간 40분"
      }
    ]
  },
  "0000000034": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165654&ATTCH_FILE_MSTER_ID=FILEMSTER_00160450",
      "alt": "모악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71977&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 20분 - 금산사 ② - 1시간 5분 - 삼거리 ③ - 30분 - 730봉 ④ - 20분 - 정상 ⑤ - 10분 - ( 무제봉 ) - 1시간 - 중인동 ⑥",
        "estimatedTime": "약 3시간 25분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "매표소 ① - 금산사 ② - 용화사 ⑦ - 344.5봉 ⑧ - ( 주능선 ) - 730봉 ⑧ - 정상 ⑤ - 배재 ⑨ - 금산사 ② - 매표소 ①",
        "estimatedTime": "약 5시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "구이면소 ⑩ - ( 선녀폭포 ) - 대원사 ⑪ - 정상 ⑤ - 금산사 ② - 매표소 ①",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "청도재 ⑫ - 730봉 ⑧ - 정상 ⑤ - 심원암 ⑬ - 금산사 ② - 매표소 ①",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000035": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165644&ATTCH_FILE_MSTER_ID=FILEMSTER_00160448",
      "alt": "무등산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=08&fmmntSeq=71978&nowPage=1&preSrchArea=08&preSrchWrd=&srchArea=08&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "무등산장 ① - 1시간 - 꼬막재 ② - 1시간 - 규봉암 ③ - 1시간 - ( 입석대 ) - 1시간 20분 - 중머리재 ③ - 40분 - 증심사 ⑤",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "원효사 ⑥ - 동화사터 ⑦ - 중봉 ⑧ - 서석대 ⑨ - 입석대 ⑩ - 장불재 ⑯ - 안양산 ⑪ - 둔병재 ⑫",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "영평리 ⑬ - 규봉암 ③ - 장불재 ⑯ - 입석대 ⑩ - 서석대 ⑨ - 중봉 ⑧ - ( 바람재 ) - 증심교 ⑭",
        "estimatedTime": "약 5시간 30분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "화순읍 신정암 ⑮ - 중머리재 ④ - 장불재 ⑯ - ( 꼬막재 ) - 무등산장 ①",
        "estimatedTime": "약 7시간"
      }
    ]
  },
  "0000000036": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166029&ATTCH_FILE_MSTER_ID=FILEMSTER_00160446",
      "alt": "무학산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=71979&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "서원곡 입구 ① - 1시간 20분 - ( 주차장 ) - 20분 - ( 무학폭포 갈림길 ) - 15분 - ( 걱정바위 ) - 20분 서마지기- 5분 - 청상 ② - 15분 - 안개샘 ③ - 45분 - 대곡산 ④ - 30분 - 만날고개 ⑤",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "중리역 ⑥ - 낙남정맥 갈림길 ⑦ - ( 시루봉 갈림길 ) - 정상 ② - 개나리동산 - 학봉 ⑨ - 서원곡 입구 ①",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "만날고개 ⑤ - 대곡산 ④ - 정상 ② - 걱정바위 ⑩ - 봉화산 ⑪ - 봉국사 ⑫",
        "estimatedTime": "약 3시간 50분"
      }
    ]
  },
  "0000000037": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165629&ATTCH_FILE_MSTER_ID=FILEMSTER_00160445",
      "alt": "미륵산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=71980&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "용화사 광장 ① - 10분 - 관음사 ② - 5분 - 도솔암 입구 ③ - 10분 - 능선갈림길 ④ - 35분 - 정상 ⑤ - 30분- 미래사 ⑦ - 20분 - 띠밭등 ⑥ - 20분 - 용화사 광장 ①",
        "estimatedTime": "약 2시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "용화사 광장 ① - 관음사 ② - 도솔암 ③ - 정상 ⑤ - 띠밭등 ⑥ - 용화사 ① - 용화사 광장 ①",
        "estimatedTime": "약 1시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "용화사 광장 ① - 관음사 ② - 도솔암 ③ - 정상 ⑤ - 미래사 ⑦ - 영운리 ⑧",
        "estimatedTime": "약 2시간 20분"
      }
    ]
  },
  "0000000038": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165619&ATTCH_FILE_MSTER_ID=FILEMSTER_00160443",
      "alt": "민주지산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=71981&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "물한리주차장 ① - 55분 - 음주암폭포 ② - 40분 - 삼마골재 ③ - 25분 - 삼도봉 ④ - 40분 - 석기봉 ⑤ - 1시간 10분 - 민주지산 ⑥ - 1시간 30분 - 삼거리 ⑦ - 30분 - 물한리주차장 ①",
        "estimatedTime": "약 5시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "물한리주차장 ① - 무지막골 ⑦ - 석기봉 갈림길 안부 ⑤ - 정상 ⑥ - 물한리주차장 ①",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "대불리 버스종점 ⑧ - 계곡 갈림길 ⑨ - 삼두마애불 ⑤ - 석기봉 - 정상 ⑥ - 대불리 ⑧",
        "estimatedTime": "약 5시간"
      }
    ]
  },
  "0000000039": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165614&ATTCH_FILE_MSTER_ID=FILEMSTER_00160442",
      "alt": "방장산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71982&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "갈재 ① - 25분 - 507봉 ② - 35분 - 734봉 ③ - 1시간 - 봉수대 ④ - 20분 - 정상 ⑤ - 20분 - 고창고개 ⑥ - 20분 - 휴양림 ⑦",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "신평리 ⑧ - 용추폭포 ⑨ - 고창고개 ⑥ - 정상 ⑤ - 봉수대 ④ - 능선 삼거리 - 용추폭포 ⑨ - 신평리 ⑧",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "양고살재 ⑩ - 방장사 ⑪ - 579봉 - 벽오봉 ⑬ - 서릉 - 미륵사 ⑭ - 상월마을 ⑮",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "휴양림 ⑦ - 고창고개 ⑥ - 정상 ⑤ - 봉수대 ④ - 734봉 ③ - 소갈재 ⑯ - 연월리 ⑯",
        "estimatedTime": "약 3시간 20분"
      }
    ]
  },
  "0000000040": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166031&ATTCH_FILE_MSTER_ID=FILEMSTER_00160440",
      "alt": "방태산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71983&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "대개인동 ① - 40분 - 개인약수 ② - 1시간 - ( 능선 삼거리 ) - 1시간 - 정상 ③ - 1시간 10분 - 구룡덕봉 ④ - 1시간 30분 - 모덤 터⑪ - 1시간 - 대개인동 ①",
        "estimatedTime": "약 6시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "살둔 ⑥ - 숫돌봉 ⑦ - 개인산 ⑧ - 구룡덕봉 ④ - 정상 ③ - ( 능선삼거리 ) - 개인약수 ② - 대개인동 ①",
        "estimatedTime": "약 9시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "대개인동 ① - 개인약수 ② - 배달은석 ⑨ - 깃대봉 ⑩ - 매화동계곡 - 모덤터 ⑪ - 송어양식장 ⑫ - 매화동 ⑬",
        "estimatedTime": "약 6시간 20분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "방태산자연휴양림 ⑭ - 마당바위골 ⑮ - 구룡덕봉 ④ - 정상 ③ - 깃대봉 ⑩ - 1073봉 ⑯ - 계곡 아우라지 ⑰",
        "estimatedTime": "약 8시간 20분"
      }
    ]
  },
  "0000000041": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166033&ATTCH_FILE_MSTER_ID=FILEMSTER_00160438",
      "alt": "백덕산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71984&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "문재 ① - 25분 - 923.6봉 ② - 45분 - 사자산 ③ - 40분 - 당재(운교 갈림길) ④ - 35분 - 작은당재 ⑤ - 35분 - 정상 ⑥ - 15분 - 백덕산 갈림길(1280봉) ⑥ - 45분 - 묵골 갈림길 ⑦ - 45분 - 묵골 ⑧",
        "estimatedTime": "약 6시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "관음사 ⑨ - 백련광산터 ⑩ - ( 주계곡길 )- 정상 ⑥ - 묵골 ⑧",
        "estimatedTime": "약 9시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "문재 ① - 사자산 ③ - 당재 ④ - 정상 ⑥ - 당재 ④ - 운교 ⑪",
        "estimatedTime": "약 6시간 20분"
      }
    ]
  },
  "0000000042": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166035&ATTCH_FILE_MSTER_ID=FILEMSTER_00160436",
      "alt": "백암산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71985&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "백양사 ① - 35분 - 약사암 ② - 50분 - 구암사갈림길 ③ - 20분 - 백학봉 ③ - 50분 - 상왕봉 ④ - 10분 - 사자봉 안부 ⑤ - 1시간 - 백양사 ①",
        "estimatedTime": "약 3시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "백양사 ① - 약사암 ② - ( 학바위 ) - 백학봉 ③ - 상왕봉 ④ - 사자봉 ⑥ - 청류암 ⑦ - 가인야영장 ⑧ - 매표소 ⑨",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "운문암 ⑤ - 사자봉 ⑥ - 청류 ⑦ - 가인야영장 ⑧ - 매표소 ⑨",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "백양사 ① - 운문암 ⑤ - 상왕봉 ④ - 백학봉 ③ - 약사암 ② - 백양사 ①",
        "estimatedTime": "약 4시간 10분"
      }
    ]
  },
  "0000000044": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165574&ATTCH_FILE_MSTER_ID=FILEMSTER_00160434",
      "alt": "백운산(광양) 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=08&fmmntSeq=71986&nowPage=1&preSrchArea=08&preSrchWrd=&srchArea=08&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "진틀마을 ① - 1시간 5분 - 병암계곡 삼거리 ② - 40분 - ( 남릉 ) - 10분 - 정상 ③ - 50분 - 상백운암 ④ - 25분 - 백운사 ⑤ - 50분 - 먹방마을 ⑥",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "논실마을 ⑦ - 한재 ⑧ - 신선대 ⑨ - 정상 ③ - ( 남릉 삼거리 ) - 병암계곡 삼거리 ② - 진틀마을 ①",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "내회마을 ⑩ - 매봉 ⑪ - 정상 ③ - ( 남릉 삼거리 ) - 병암계곡 삼거리 ② - 진틀마을 ①",
        "estimatedTime": "약 4시간 50분"
      }
    ]
  },
  "0000000045": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166038&ATTCH_FILE_MSTER_ID=FILEMSTER_00160432",
      "alt": "백운산(정선) 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71987&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "점재마을 ① - 30분 - 용가능선 안부 ② - 1시간 30분 - 정상 ③ - 2시간 - 칠족령 ④ - 1시간 - 제장마을 ⑤",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "문희마을 ⑥ - 칠족령 ④ - 정상 ③ - 955봉 ⑦ - 푯대봉 ⑧ - 955봉 ⑦ - ( 서남릉 ) - 문희마을 ⑥",
        "estimatedTime": "약 6시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "점재마을 ① - 계곡길 - 정상 ③ - ( 구름재골 ) - 문희마을 ⑥",
        "estimatedTime": "약 3시간 20분"
      }
    ]
  },
  "0000000043": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166039&ATTCH_FILE_MSTER_ID=FILEMSTER_00160430",
      "alt": "백운산(포천) 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71988&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "광덕고개 ① - 1시간 - 860봉 ② - 15분 - 정상 ③ - 35분 - 능선삼거리 ④ - 20분 - 441봉 ⑤ - 25분 - 흥룡사, 백운동 ⑥",
        "estimatedTime": "약 2시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "백운동 ⑥ - 계곡사거리 ⑦ - 흥룡봉 ⑧ - 도마치봉 ⑨ - 정상 ③ - 능선삼거리 ④ - 계곡사거리 ⑦ - 흥룡사, 백운동 ⑥",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "백운동 ⑥ - 백운계곡 ⑦ - 백운산 ③ - ( 북릉 ) - 광덕고개 ①",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000046": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165544&ATTCH_FILE_MSTER_ID=FILEMSTER_00160428",
      "alt": "변산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=71989&fmmntArcd=01&srchWrd=%EB%B3%80%EC%82%B0&srchArea=01&preSrchWrd=%EB%B3%80%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "원암마을 매표소 ① - 40분 - 재백이고개 ② - 50분 - 옥녀담 ③ - 15분 - ( 월명암 갈림길 ) - 1시간 - 월명암 ④ - 15분 - 낙조대 ⑤ - 10분 - ( 쌍선봉 ) - 25분 - 남여치매표소 ⑥",
        "estimatedTime": "약 3시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "내소사 매표소 ⑦ - 관음봉 ⑧ - 신선봉 ⑨ - 망포대 ⑩ - 분초대 ⑪ - 낙조대 ⑤ - 남여치매표소 ⑥",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "내소사 매표소 ⑦ - 관음봉 ⑧ - 세봉 ⑫ - 내소사 매표소 ⑦",
        "estimatedTime": "약 1시간 55분"
      }
    ]
  },
  "0000000047": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166041&ATTCH_FILE_MSTER_ID=FILEMSTER_00160426",
      "alt": "북한산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71990&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "우이동 ① - 40분 - 도선사 ② - 30분 - 하루재 ③ - 45분 - 백운산장 ④ - 20분 - 위문 ⑤ - 15분 - ( 백운대 ) - 10분 - 위문 ⑤ - 30분 - 용암문 ⑥ - 20분 - 태고사 ⑦ - 40분 - 대서문 ⑧ - 20분 - 북한산성 매표소 ⑨",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "구기동 ⑩ - 이북5도청 ⑪ - 금선사 ⑫ - 향로봉 ⑬ - 비봉 ⑭ - 승가봉 ⑮ - 문수봉 ⑯ - ( 대남문 ) - 구기동 ⑩",
        "estimatedTime": "약 4시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "북한산성 매표소 ⑰ - 위문 ⑤ - 용암문 ⑥ - 대동문 ⑱ - 대성문 ⑲ - 대남문 ⑯ - 가사당암문 ⑲ - 북한산성 매표소 ⑰",
        "estimatedTime": "약 7시간"
      }
    ]
  },
  "0000000048": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165519&ATTCH_FILE_MSTER_ID=FILEMSTER_00160423",
      "alt": "비슬산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=71991&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "유가사 ① - 40분 - ( 도통바위 ) - 1시간 - 대견봉 ② - 1시간 30분 - 대견사터 ③ - 1시간 40분 - 비슬산자연휴양림 ④",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "비슬산자연휴양림 ④ - 1005봉 ⑤ - 대견봉 ② - ( 북릉 ) - 용연사 ⑥",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "오산리 ⑦ - 대동골 ⑧ - 사거리 안부 - 대견봉 ② - ( 병풍듬 ) - 유가사 ①",
        "estimatedTime": "약 3시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "용천사 ⑨ - 778봉 ⑩ - 대견봉 ② - 도성암 ⑪ - 유가사 ① - 중뫼 ⑫",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000049": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166012&ATTCH_FILE_MSTER_ID=FILEMSTER_00160420",
      "alt": "삼악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71992&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "의암댐 매표소 ① - 15분 - 상원사 ② - 1시간 - 정상 ③ - 1시간 15분 - 등선폭포 매표소 ④",
        "estimatedTime": "약 2시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "강촌 ⑤ - 등선봉 ⑥ - ( 619봉 ) - 정상 ③ - 상원사 ② - 의암댐 매표소 ①",
        "estimatedTime": "약 4시간 10분"
      }
    ]
  },
  "0000000050": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165495&ATTCH_FILE_MSTER_ID=FILEMSTER_00160419",
      "alt": "서대산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=04&fmmntSeq=71993&nowPage=1&preSrchArea=04&preSrchWrd=&srchArea=04&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "개덕사 ① - 45분 - 약수터 ② - 1시간 10분 - 정상 ③ - 50분 - 구름다리 갈림길 ④ - 1시간 15분 - 드림리조트 ⑤",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "드림리조트 ⑤ - ( 계곡길 ) - 첫갈림길 ⑥ - ( 주능선 ) - ( 견우탄금대 ) - 정상 ③ - 옥녀직금대 ⑦ - 원흥사 ⑧",
        "estimatedTime": "약 4시간 15분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "장룡산자연휴양림 ⑨ - 546봉 - ( 도계삼거리 ) - 구름다리갈림길 ④ - ( 견우탄금대 ) - 정상 ③ - 직녀직금대 ⑦ - 서대산 청소년수련원 ⑩",
        "estimatedTime": "약 5시간 45분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "서대산청소년수련원 ⑩ - ( 닭벼슬바위 ) - 옥녀직금대 ⑦ - 정상 ③ - ( 견우탄금대 ) - 첫갈림길 ⑥ - 동남릉 - 안보광리 ⑪",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000051": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166014&ATTCH_FILE_MSTER_ID=FILEMSTER_00160515",
      "alt": "선운산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=71994&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 5분 - 선운사 ② - 40분 - 마이재 ③ - 30분,도솔산 ④ - 참당암 안부 ⑤ - 30분 - 개이빨산 ⑥ - 15분- 소리재 ⑦ - 20분 - 낙조대 ⑧ - 15분 - 도솔암 ⑨ - 35분 - 선운사 ② - 5분 - 매표소 ①",
        "estimatedTime": "약 3시간 15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "매표소 ① - 선운사 ② - 도솔암 ⑨ - 천마봉 ⑧ - 소리재 ⑦ - 참당암 ⑤ - 매표소 ①",
        "estimatedTime": "약 2시간 25분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "삼인초교 ⑩ - 형제봉 ⑪ - 노적봉 ⑫ - 구황봉 ⑬ - ( 안부 ) - ( 희여재골 ) - 선운사 ② - 매표소 ①",
        "estimatedTime": "약 2시간 50분"
      }
    ]
  },
  "0000000052": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165974&ATTCH_FILE_MSTER_ID=FILEMSTER_00160514",
      "alt": "설악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=71995&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "설악동 ① - 50분 - 비선대 ② - 1시간 - 귀면암 ③ - 1시간 30분 - 양폭 ④ - 1시간 30분 - ( 희운각 ) - 1시간 20분 - ( 소청 ) - 20분 - ( 중청 ) - 30분 - 대청 ⑤ - 3시간 30분 - 오색 ⑥",
        "estimatedTime": "약 10시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "용대리 ⑦ - 백담사 ⑧ - 수렴동대피소 ⑨ - 쌍폭 ⑩ - 봉정암 ⑪ - 소청 - 설악대피소 ⑫",
        "estimatedTime": "약 8시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "남교리 ⑬ - 십이선녀탕계곡 ⑭ - 대승령 ⑮ - 귀청 ⑯ - 한계령 갈림길 ⑰ - 설악대피소 ⑫",
        "estimatedTime": "약 13시간 30분"
      }
    ]
  },
  "0000000053": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165969&ATTCH_FILE_MSTER_ID=FILEMSTER_00160513",
      "alt": "성인봉 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71996&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "대원사 ① - 40분 - 사다리골 삼거리 ② - 20분 - 까끼등 삼거리 ③ - 30분 - 팔각정 ④ - 20분 - 바람등대 ⑤ - 20분 - 정상 ⑥ - 1시간 - 말잔등 ⑦ - 40분 - 청석골 샘터 ⑧ - 30분 - 산림욕장 ⑨ - 40분 - 천연에어콘 ⑩ - 2분 - 봉래폭포 버스종점 ⑪",
        "estimatedTime": "약 5시간 2분 소요"
      }
    ]
  },
  "0000000054": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166017&ATTCH_FILE_MSTER_ID=FILEMSTER_00160512",
      "alt": "소백산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71997&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "희방사 입구 ① - 50분 - 희방사 ② - 1시간 30분 - 연화봉 ③ - 2시간 - 비로봉 ④ - 1시간 30분 - 삼가리 ⑤",
        "estimatedTime": "약 5시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "죽령 ⑥ - 제2연화봉 ⑦ - 천체관측소 ③ - 비로봉 ④ → 하산",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "삼가매표소 ⑤ - 비로사 ⑧ - 비로봉 ④ → 하산",
        "estimatedTime": "약 2시간 40분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "천동매표소 ⑨ - 다리안폭포 ⑨ - 대궐터 ⑩ - 민백이재 ⑪ - 비로봉 ④ → 하산",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000055": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165959&ATTCH_FILE_MSTER_ID=FILEMSTER_00160511",
      "alt": "소요산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=71998&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "소요동 주차장 ① - 30분 - 자재암 ② - 40분 - 중백운대 ③ - 40분 - 상백운대 ④ - 1시간 - 정상 ⑤ - 40분 원효폭포 ② - 20분 - 소요동 주차장 ①",
        "estimatedTime": "약 3시간 50분"
      }
    ]
  },
  "0000000056": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165954&ATTCH_FILE_MSTER_ID=FILEMSTER_00160510",
      "alt": "속리산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=71999&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "법주사 ① - 1시간 - 세심정 삼거리 ② - 중사자암 ③ - 2시간 30분 - 문장대 ④ - 30분 - 신선대 ⑤ - 30분- 천황석문 ⑥ - 30분 - ( 천황봉 ) - 1시간 30분 - 세심정삼거리 ② - 1시간 - ( 법주사 ) ①",
        "estimatedTime": "약 7시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "법주사 ① - 삼거리 ② - 신선대 ⑤ - 비로봉 ⑥ - 상환암 ⑦ - 세심정 삼거리 ② - 법주사 ①",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "시어동매표소 ⑧ - 문장대 ④ - 중사자암 ③ - 법주사 ①",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "법주사 ① - 문장대 ④ - 신선대 ⑤ - 세심정 삼거리 ② - 법주사 ①",
        "estimatedTime": "약 5시간"
      }
    ]
  },
  "0000000057": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166020&ATTCH_FILE_MSTER_ID=FILEMSTER_00160509",
      "alt": "신불산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=72000&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "가천리 ① - 2시간 30분 - 신불재 ② - 20분 - 신불평원 ③ - 15분 - 신불재 ② - 25분 - 정상 ④ - 2시간 - 홍류산장 ⑤",
        "estimatedTime": "약 5시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "신불산자연휴양림 ⑥ - 백운암 ⑦ - 신불재 ② - 정상 ④ - 간월재 ⑧ - 왕봉골 ⑨ - 파래소폭포 ⑩ - 신불산휴양림 ⑥",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "홍류산장 ⑤ - 간월재 ⑧ - 정상 ④ - 홍류폭포 ⑪ - 홍류산장 ⑤",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "가천저수지 ⑫ - 동릉 - 정상 ④ - 서릉 ⑬ - 백운암 ⑦ - 신불산자연휴양림 ⑥",
        "estimatedTime": "약 4시간 20분"
      }
    ]
  },
  "0000000058": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165944&ATTCH_FILE_MSTER_ID=FILEMSTER_00160508",
      "alt": "연화산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=72001&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "주차장 ① - 15분 - 옥천사 ③ - 30분 - 연화봉 ③ - 20분 - 황새고개 ④ - 30분 - 정상 ⑤ - 25분 - 남산 ⑥ - 15분 - 옥천사 ③ - 15분 - 주차장 ①",
        "estimatedTime": "약 2시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "옥천사 ③ - 청련암 ② - 남산 ⑥ - 정상 ⑤ - 황새고개 ④ - 옥천사 ②",
        "estimatedTime": "약 2시간 15분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "연화교 ⑦ - 화촌 ⑧ - 정상 ⑤ - 잘루목 - 옥천사 ②",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000059": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166023&ATTCH_FILE_MSTER_ID=FILEMSTER_00160507",
      "alt": "오대산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=72002&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "상원사 ① - 1시간 40분 - 비로봉 ② - 1시간 - 상왕봉 ③ - 1시간 30분 - 상원사 ①",
        "estimatedTime": "약 4시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "상원사 ① - 비로봉 ② - 상왕봉 ③ - 두로봉 ④ - 동대산 ⑤ - 진고개산장 ⑥",
        "estimatedTime": "약 10시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "상원사 ① - 적멸보궁 ⑧ - 비로봉 ② - 적멸보궁 ⑧ - 상원사 ①",
        "estimatedTime": "약 2시간 55분"
      }
    ]
  },
  "0000000060": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166025&ATTCH_FILE_MSTER_ID=FILEMSTER_00160506",
      "alt": "오봉산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=72003&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "배후령 ① - 20분 - 서남릉 삼거리 ② - 1시간 40분 - 정상 ③ - 50분 - 688봉 남쪽 능선삼거리 ④ - 1시간 - 청평 ⑥",
        "estimatedTime": "약 4시간 15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "청평산장 ⑥ - 청평사 ⑤ - ( 쇠줄지역 ) - 688봉 ④ - 정상 ③ - 4·3·2·1봉 ⑦ - 서남릉 삼거리 ② - 배후령 ①",
        "estimatedTime": "약 4시간 35분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "배후령 ① - 서남릉 삼거리 ② - 정상 ③ - 백치고개 ⑧ - 부용산 ⑨ - ( 부용산 남릉 안부 ) - 하늘소민박 ⑩",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "백치고개 ⑧ - 거북바위 - 정상 ③ - 4·3·2·1봉 ⑦ - 선동계곡 ⑪ - 청평사 ⑤ - 청평산장 ⑥",
        "estimatedTime": "약 3시간 20분"
      }
    ]
  },
  "0000000061": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166028&ATTCH_FILE_MSTER_ID=FILEMSTER_00160505",
      "alt": "용문산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=72004&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "상가촌 ① - 30분 - 용문사 ② - 30분 - 갈림길 ③ - 1시간 10분 - 석문 ④ - 40분 - 문례재 ⑤ - 2시간 - 갈현마을 ⑥ - 1시간 15분 - 가일리 ⑦",
        "estimatedTime": "약 6시간 5분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "용문사 ② - 상원사 ⑧ - 1064봉 ⑨ - 구름재 ⑩ - 백운봉 ⑪ - 연안마을 ⑫",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "용문사 ② - ( 중원산 ) - 단월봉 ⑬ - 문례봉 ⑭ - 문례재 ⑤ - 용문사 ②",
        "estimatedTime": "약 7시간 25분"
      }
    ]
  },
  "0000000062": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166030&ATTCH_FILE_MSTER_ID=FILEMSTER_00160504",
      "alt": "용화산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=72005&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "양통마을 ① - 1시간 - 큰고개 ② - 40분 - 정상 ③ - 30분 - 858봉 ④ - 1시간 - 양통마을 ①",
        "estimatedTime": "약 3시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "양통마을 ① - 큰고개 ② - 정상 ③ - 858봉 ④ - 깔딱고개 ⑥ - 양통 ⑤",
        "estimatedTime": "약 4시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "큰고개 ② - 정상 ③ - 성불치 ⑦ - 파로호 ⑧",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000063": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166032&ATTCH_FILE_MSTER_ID=FILEMSTER_00160503",
      "alt": "운문산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=72006&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "원서리 ① - 30분 - 석골사 ② - 2시간 10분 - 상운암 ③ - 1시간 - 정상 ④ - 40분 - 아랫재 ⑤ - 1시간 10분 - ( 남명리 )",
        "estimatedTime": "약 5시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "원서리 ① - 석골사 ② - 서릉 - 정상 ④ - 딱밭재 ⑦ - 범봉 ⑧ - 팔풍재 ⑨ - 억산 ⑩ - 석골사 ② - 원서리 ①",
        "estimatedTime": "약 6시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "원서리 - 석골사 ② - 대비골 ⑪ - 팔풍재 ⑨ - 범봉 ⑧ - 딱밭재 ⑦ - 정상 ④ - 아랫재 ⑤ - ( 남명리 )",
        "estimatedTime": "약 6시간10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "호박소 ⑫ - 구룡소폭포 ⑬ - 가지산 서남릉 ⑭ - 아랫재 ⑤ - 정상 ④ - 상운암 ③ - 석골사 ② - 원서리 ①",
        "estimatedTime": "약 6시간"
      }
    ]
  },
  "0000000064": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165914&ATTCH_FILE_MSTER_ID=FILEMSTER_00160502",
      "alt": "운악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=72007&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "운악교 ① - 15분 - 무우폭포 ② - 25분 - 눈썹바위 ③ - 30분 - 728봉 ④ - 30분 - 정상 ⑤ - 50분 - 궁예성터 ⑥ - 20분 - 청학사 ⑦ - 40분 - 운주사 ⑧",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "운주사 ⑧ - 신선대 ⑨ - 애기바위 ⑩ - 정상 ⑤ - 절고개 ⑪ - 현등사 ⑫ - 석거리 ⑬",
        "estimatedTime": "약 4시간 20분"
      }
    ]
  },
  "0000000065": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165904&ATTCH_FILE_MSTER_ID=FILEMSTER_00160500",
      "alt": "운장산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=72008&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "운장산휴게소 ① - 55분 - 활목재 ② - 25분 - 운장산 서봉 ③ - 25분 - 정상 ④ - 30분 - 동봉 ⑤ - 50분 - 각우목재 ⑥ - 40분 - 1084봉 ⑦ - 2시간 - 복두봉 ⑧ - 50분 - ( 헬기장 ) - 1시간 35분 - 865봉 ⑨ - 1시간 10분 - 학선동 마을 ⑩",
        "estimatedTime": "약 9시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "운장산휴게소 ① - 활목재 ② - 정상 ④ - 동봉 ⑤ - ( 동봉 북릉 ) - 외처사동 ⑪",
        "estimatedTime": "약 3시간 5분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "정수암 ⑫ - 서봉 ③ - 정상 ④ - 동봉 ⑤ - 각우목재 ⑥ - 내처사동 ⑬ - 외처사동 ⑪",
        "estimatedTime": "약 4시간 20분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "연석사 ⑭ - 연석산 ⑮ - 정상 ④ - 동봉 ⑤ - 내처사동 ⑬ - 외처사동 ⑪",
        "estimatedTime": "약 5시간"
      }
    ]
  },
  "0000000066": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166034&ATTCH_FILE_MSTER_ID=FILEMSTER_00160496",
      "alt": "월악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72009&fmmntArcd=01&srchWrd=%EC%9B%94%EC%95%85%EC%82%B0&srchArea=01&preSrchWrd=%EC%9B%94%EC%95%85%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "덕주골 입구 ① - 1시간 - 마애불 ② - 1시간 - 960봉 ③ - 40분 - 송계삼거리 ④ - 40분 - 영봉 ⑤ - 40분 - 송계삼거리 ④ - 동창교매표소 ⑥",
        "estimatedTime": "약 5시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "덕주골휴게소 ① - 마애불 ② - 송계삼거리 ④ - 영봉 ⑤ - 중봉 하봉 거쳐 보덕암 ⑧",
        "estimatedTime": "약 5시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "월악리 덕산매표소 ⑨ - 신륵사 ⑩ - 절골 영봉 ⑤ - 송계리 동천교매표소 ⑥",
        "estimatedTime": "약 4시간 20분"
      }
    ]
  },
  "0000000067": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165869&ATTCH_FILE_MSTER_ID=FILEMSTER_00160493",
      "alt": "월출산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72010&fmmntArcd=01&srchWrd=%EC%9B%94%EC%B6%9C%EC%82%B0&srchArea=01&preSrchWrd=%EC%9B%94%EC%B6%9C%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "천황사 ① - 20분 - 바람폭포 갈림길 - 1시간 - 천황봉 ③ - 40분 - 바람재 ④ - 10분 - 구정봉 ⑤ - 40분 - ( 미왕재 ) - 1시간 - 도갑사 ⑦",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "도갑사 ⑦ - 미왕재 ⑥ - 구정봉 ⑤ - ( 정상 ) - 금룡경포대 ⑧ - 경포대 매표소 ⑨",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "천황사 ① - 구름다리 - ( 정상 ) - ( 바람폭포 ) - 천황사 ①",
        "estimatedTime": "약 2시간 20분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "불티재 ⑩ - 누릿재 ⑪ - 달구봉 ⑫ - ( 정상 ) - 구정봉 ⑤ - 마애여래좌상 ⑬ - 구정봉 ⑤ - 미왕재 ⑥ - 도갑사 ⑦",
        "estimatedTime": "약 10시간 30분"
      }
    ]
  },
  "0000000068": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166036&ATTCH_FILE_MSTER_ID=FILEMSTER_00160490",
      "alt": "유명산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=72011&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "유명산자연휴양림 입구 주차장 ① - 40분 - 용소 ② - 30분 - 마당소 ③ - 20분 - ( 아우라지 삼거리 ) - 45분 - ( 정상 ) - 50분 - 선어치 ⑥",
        "estimatedTime": "약 3시간 5분"
      }
    ]
  },
  "0000000069": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165839&ATTCH_FILE_MSTER_ID=FILEMSTER_00160487",
      "alt": "응봉산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=02&fmmntSeq=72012&nowPage=1&preSrchArea=02&preSrchWrd=&srchArea=02&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "덕구온천 ① - 1시간 - 원탕 ② - 2시간 - 정상 ③ - 2시간 - 덕구온천 ①",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "덕풍마을 ④ - 용소골 ⑤ - 작은당귀골 ⑥ - 정상 ③ - 덕구온천 ①",
        "estimatedTime": "약 9시간 30분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "사곡분교(폐교) ⑦ - 재량박골 ⑧ - ( 응봉지 남릉 ) - ( 응봉산 서북릉 ) - 정상 ③ - 덕구온천 ①",
        "estimatedTime": "약 6시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "( 보리교 ) - 보리골 ⑨ - 862봉 ⑩ - ( 응봉산 서북릉 ) - 정상 ③ - 덕구온천 ①",
        "estimatedTime": "약 6시간"
      }
    ]
  },
  "0000000070": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165824&ATTCH_FILE_MSTER_ID=FILEMSTER_00160484",
      "alt": "장안산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=72013&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "법년동 ① - 2시간 50분 - 장안산 정상 ② - 1시간 10분 - 샘터 ③ - 35분 - 무령고개 ④",
        "estimatedTime": "약 4시간 35분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "무령고개 ④ - 정상 ② - 중봉 ⑤ - 하봉 ⑥ - 어치재 ⑦ - 법년동 ①",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "무령고개 ④ - 정상 ② - 중봉 ⑤ - 덕천 ⑧ - 합수지점 ⑨ - 연주 ⑩",
        "estimatedTime": "약 4시간 55분"
      }
    ]
  },
  "0000000071": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166037&ATTCH_FILE_MSTER_ID=FILEMSTER_00160482",
      "alt": "재약산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=06&fmmntSeq=72014&nowPage=1&preSrchArea=06&preSrchWrd=&srchArea=06&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "표충사 ① - 1시간 30분 - 고사리분교 터 ② - 50분 - 수미봉 ③ - 1시간 - 사자봉 ④ - 1시간 - 한계암 ⑤ - 30분 - 표충사 ①",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "매표소, 매바위마을 ⑥ - 필봉 ⑦ - 상투봉 ⑧ - 사자봉 ④ - 수미봉 ③ - 층층폭포 ⑨ - 홍룡폭포 ⑩ - 표충사 ①",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "얼음골 ⑪ - 사자봉 ④ - 수미봉 ③ - 층층폭포 ⑨ - 홍룡폭포 ⑩ - 표충사 ①",
        "estimatedTime": "약 4시간 45분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "( 배내골 ) - ( 사자평고원 ) - 사자봉 ④ - 수미봉 ③ - 층층폭포 ⑨ - 홍룡폭포 ⑩ - 표충사 ①",
        "estimatedTime": "약 4시간 10분"
      }
    ]
  },
  "0000000072": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166040&ATTCH_FILE_MSTER_ID=FILEMSTER_00160479",
      "alt": "적상산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=72015&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "사천리 서창마을 ① - 1시간 10분 - 장도바위 ② - 20분 - 향로봉 ③ - 40분 - 정상 ④ - 10분 - 안국사, 안렴대 ⑤ - 1시간 40분 - 괴목리 ⑥",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000073": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166895&ATTCH_FILE_MSTER_ID=FILEMSTER_00160476",
      "alt": "점봉산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72016&fmmntArcd=01&srchWrd=%EC%A0%90%EB%B4%89%EC%82%B0&srchArea=01&preSrchWrd=%EC%A0%90%EB%B4%89%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "코스1",
        "kind": "recommended",
        "path": "점봉산 산림생태관리센터 ① - 중간 초소 ② - 나무다리 ③ - 곰배령 ④",
        "estimatedTime": "(편도)약 1시간 50분"
      },
      {
        "label": "코스2(하산전용)",
        "kind": "other1",
        "path": "곰배령 ④ - 전망대 ⑤ - 주목 군락지 ⑥ - 철쭉 군락지 ⑦ - 점봉산 산림생태관리센터 ①",
        "estimatedTime": "약 2시간"
      }
    ]
  },
  "0000000074": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165774&ATTCH_FILE_MSTER_ID=FILEMSTER_00160474",
      "alt": "조계산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=72017&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "송광사 ① - 1시간 - 송광굴목이재 ② - 30분 - 연산사거리 ③ - 40분 - 787봉 - 1시간 - 정상 ⑤ - 40분- 선암굴목이재 ⑥ - 30분 - 송광굴목이재 ② - 30분 - 천자암 ⑦ - 50분 - 운구재 ⑧ - 30분 - 송광사 ①",
        "estimatedTime": "약 6시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "송광사 ① - 송광굴목이재 ② - 선암굴목이재 ⑥ - 정상 ⑤ - 선암사 ⑨",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "선암사 ⑨ - 정상 ⑤ - 선암굴목이재 ⑥ - 선암사집단시설지구 ⑩",
        "estimatedTime": "약 2시간 40분"
      }
    ]
  },
  "0000000075": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165759&ATTCH_FILE_MSTER_ID=FILEMSTER_00160471",
      "alt": "주왕산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=04&fmmntSeq=72018&nowPage=1&preSrchArea=04&preSrchWrd=&srchArea=04&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "대전사 ① - 25분 - 팔각정 매점 ② - 40분 - ( 제1폭포 ) - 30분 - 후리메기 ④ - 45분 - 칼등고개 ⑤ - 35분 - 정상 ⑥ - 50분 - 대전사 ①",
        "estimatedTime": "약 3시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "대전사 ① - ( 제1폭포 ) - 제3폭포 ⑦ - ( 금은광이교 ) - 금은광이 삼거리 ⑧ - 월미기 ⑨ - 장군봉 ⑩ - 대전사 ①",
        "estimatedTime": "약 3시간 45분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "대전사 ① - ( 제1폭포 ) - 제3폭포 ⑦ - 내원동 ⑪ - 가메봉 ⑫ - ( 철골 갈림길 ) - ( 사창골 ) - 제2폭포 ③ - 대전사 ①",
        "estimatedTime": "약 5시간"
      }
    ]
  },
  "0000000076": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166042&ATTCH_FILE_MSTER_ID=FILEMSTER_00160468",
      "alt": "주흘산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=04&fmmntSeq=72019&nowPage=1&preSrchArea=04&preSrchWrd=&srchArea=04&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소, 제1관문 ① - 50분 - 혜국사 ② - 35분 - 대궐터 ③ - 45분 - 1075봉 ④ - 40분 - 주흘영봉 ⑤ - 45분 - 꽃밭서덜 ⑥ - 40분 - 제2관문 ⑦",
        "estimatedTime": "약 4시간 15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "잣밭재 ⑧ - 남봉 ⑨ - 1075봉 ④ - 대궐터 ③ - 혜국사 ② - 제1관문 ①",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "월복사 ⑩ - 1075봉 ④ - 주흘영봉 ⑤ - 부봉 ⑪ - 동화원 ⑫",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "개그늘 ⑬ - 1075봉 ④ - 주흘영봉 ⑤ - 꽃밭서덜 ⑥ - 제2관문 ⑦",
        "estimatedTime": "약 4시간 45분"
      }
    ]
  },
  "0000000077": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165719&ATTCH_FILE_MSTER_ID=FILEMSTER_00160463",
      "alt": "지리산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=72020&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "성삼재 ① - 40분 - 노고단 ② - 1시간 20분 - 임걸령 ③ - 30분 - 노루목 ④ - 30분 - 삼도봉 ⑤ - 30분 - 화개재 ⑥ - 30분 - 토끼봉 ⑦ - 1시간 - 명선봉 ⑧ - 30분 - 삼각고지 ⑨ - 1시간 - 벽소령 ⑩ - 1시간- ( 선비샘 ) - 2시간 - ( 세석평전 ) - 1시간 - 연하봉 ⑫ - 30분 - 장터목 - 1시간 - 천왕봉 ⑭ - 3시간 - 중산리",
        "estimatedTime": "약 15시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "( 중산리 ) - 칼바위 ⑯ - 망바위 ⑰ - 법계사(로터리대피소) ⑱ - 천왕샘 ⑲ - 천왕봉 ⑭ - ( 중산리 )",
        "estimatedTime": "약 8시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "성삼재 ① - 노고단 ② - 임걸령 ③ - 노루목 ④ - 반야봉 ⑳ - 화개재 ⑥ - 뱀사골 &#12881; - 반선 &#12882;",
        "estimatedTime": "약 7시간 30분"
      }
    ]
  },
  "0000000078": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165704&ATTCH_FILE_MSTER_ID=FILEMSTER_00160460",
      "alt": "지리산(통영) 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=72021&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "돈지마을 ① - 1시간 - 이정표 ② - 40분 - 정상 ③ - 1시간 - 달바위 ④ - 1시간 - 가마봉 ⑤ - 50분 - 옥녀봉 ⑥ - 30분 - 진촌마을 ⑦",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "금북개 ⑧ - 지리산 ③ - 달바위 ④ - 가마봉 ⑤ - 옥녀봉 ⑥ - 진촌 ⑦",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "대항 ⑨ - 달바위 ④ - 가마봉 ⑤ - 옥녀봉 ⑥ - 진촌 ⑦",
        "estimatedTime": "약 2시간 50분"
      }
    ]
  },
  "0000000079": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166043&ATTCH_FILE_MSTER_ID=FILEMSTER_00160458",
      "alt": "천관산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=08&fmmntSeq=72022&nowPage=1&preSrchArea=08&srchArea=08"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "장천재 ① - 50분 - 종봉 ② - 25분 - 환희대 ③ - 15분 - 연대봉 ④ - 1시간 - 장천재 ①",
        "estimatedTime": "약 2시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "장천재 ① - 양근암 ⑤ - 정원암 ⑥ - 연대봉 ④ - 환희대 ③ - 구정봉 ⑦ - 천관사 ⑧",
        "estimatedTime": "약 2시간 35분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "천관산자연휴양림 ⑨ - 지장봉 ⑩ - 환희대 ③ - 연대봉 ④ - 우두봉 ⑪ - 상촌 ⑫",
        "estimatedTime": "약 2시간 55분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "장천재 ① - 금수굴 ⑬ - 헬기장 ⑭ - 연대봉 ④ - 헬기장 ⑭ - 환희대 ③ - 탑산사 ⑮",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000080": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165684&ATTCH_FILE_MSTER_ID=FILEMSTER_00160456",
      "alt": "천마산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=72023&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "천마산심신수련장 ① - 1시간 - 동릉 ② - 1시간 10분 - 정상 ③ - 40분 - 천마의 집 ④ - 30분 - 도원사 ⑤",
        "estimatedTime": "약 3시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "가곡초교 ⑥ - 동릉 ② - 정상 ③ - 괘라리고개 ⑦ - 보광사 가곡초교 ⑧",
        "estimatedTime": "약 4시간 10분"
      }
    ]
  },
  "0000000081": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165674&ATTCH_FILE_MSTER_ID=FILEMSTER_00160454",
      "alt": "천성산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=72024&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 40분 - 내원사 ② - 1시간 30분 - 북봉 ③ - 30분 - 은수고개 ④ - 1시간 - 화엄늪 ⑤ - 1시간 30분 - 홍룡사 주차장 ⑥",
        "estimatedTime": "약 5시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "매표소 ① - 성불암계곡 입구 ⑦ - 공룡능선 ⑧ - 집북재 ⑨ - 북봉 ③ - 은수고개 ④ - 원효암 주차장 ⑩ - 무지개폭포 ⑪ - ( 장흥 )",
        "estimatedTime": "약 6시간 20분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "( 백동 ) - ( 법수원 ) - ( 북봉 ) - 은수고개 ④ - 원효암 ⑭ - 홍룡사 주차장 ⑥",
        "estimatedTime": "약 4시간 20분"
      }
    ]
  },
  "0000000082": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166044&ATTCH_FILE_MSTER_ID=FILEMSTER_00160451",
      "alt": "천태산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72025&fmmntArcd=01&srchWrd=%EC%B2%9C%ED%83%9C%EC%82%B0&srchArea=01&preSrchWrd=%EC%B2%9C%ED%83%9C%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "주차장, 삼단폭포 ②, 망탑삼거리 - 25분 - ( 영국사 ) - 1시간 30분 - A코스, 정상 ④ - 15분 - 헬기장, B코스갈림길 ⑤, C코스갈림길 - 20분 - 잠시쉼터 ⑥, 남고개 ⑦ - 25분 - 영국사 - 15분 - 망탑봉 - 20분 - 주차장",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "( 누교리 주차장 ) - ( 영국사 ) - A코스 - 정상 ④ - 확골 ⑧ - 신안사",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000083": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165649&ATTCH_FILE_MSTER_ID=FILEMSTER_00160449",
      "alt": "청량산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=72026&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "청량마을 ① - 20분 - ( 두번째 안내판 ) - 25분 - 외청량사 ③ - 10분 - 김생굴 ④ - 50분 - 보살봉 ⑤ - 1시간 - 정상 ⑥ - 20분 - 795봉 ⑦ - 20분 - 내청량사 - 10분 - ( 첫번째 안내판 ) - 10분 - 청량마을 ①",
        "estimatedTime": "약 3시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "윗뒷실 ⑩ - 795봉 ⑦ - 정상 ⑥ - 795봉 ⑦ - 청량사 ⑧ - 청량마을 ①",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "이름실 ⑪ - 물티재 ⑫ - 청량산휴게소 ⑬ - 축융봉 ⑭ - 청량산휴게소 ⑬ - 청량마을 ①",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000084": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166045&ATTCH_FILE_MSTER_ID=FILEMSTER_00160447",
      "alt": "추월산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=07&fmmntSeq=72027&nowPage=1&preSrchArea=07&preSrchWrd=&srchArea=07&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "월계리 매표소 ① - 30분 - 보리암 ② - 30분 - 보리암 정상 ③ - 20분 - 정상 ④ - 1시간 30분 - 월계리 매표소 ①",
        "estimatedTime": "약 2시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "월계리 태웅산장 ⑤ - 북릉 안부 - 정상 - 697봉(보리암 정상) - 보리암 ② - 관리사무소 주차장 ⑦",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "( 밀재 ) - 정상 ④ - 보리암 ② - 굴암바위 ⑨ - 관리사무소 주차장 ⑦",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "( 쌍태리 ) - 697봉(보리암 정상) ③ - 정상 ④ - ( 북릉 안부 ) - 월계리 혹은 697봉(보리암 정상) ③ - 보리암 ② - 관리사무소 주차장 ⑦",
        "estimatedTime": "약 3시간"
      }
    ]
  },
  "0000000085": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166046&ATTCH_FILE_MSTER_ID=FILEMSTER_00160444",
      "alt": "축령산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72028&fmmntArcd=01&srchWrd=%EC%B6%95%EB%A0%B9%EC%82%B0&srchArea=01&preSrchWrd=%EC%B6%95%EB%A0%B9%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "축령산자연휴양림 매표소 ① - 30분 - 서릉 쉼터 ② - 40분 - 수리바위 ③ - 30분 - 남이바위 ④ - 30분 - ( 정상 ) - 15분 - 절고개 ⑥ - 1시간 - 매표소 ①",
        "estimatedTime": "약 3시간 25분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "당재마을 ⑦ - 잣창고 ⑧ - ( 정상 ) - 절고개 ⑥ - 남이바위 ④ - 수리바위 ③ - 매표소 ①",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "수레넘이고개 ⑨ - 남이바위 ④ - ( 정상 ) - 절고개 ⑥ - 서리산 ⑩ - 질마재 ⑪ - 매표소 ①",
        "estimatedTime": "약 3시간 5분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "매표소 ① - 질마재 ⑪ - 서리산 ⑩ - 절고개 ⑥ - ( 정상 ) - ( 동북릉 ) - 287봉릉 ⑬ - 비령이 ⑭",
        "estimatedTime": "약 3시간 10분"
      }
    ]
  },
  "0000000086": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166047&ATTCH_FILE_MSTER_ID=FILEMSTER_00160441",
      "alt": "치악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72029&fmmntArcd=01&srchWrd=%EC%B9%98%EC%95%85%EC%82%B0&srchArea=01&preSrchWrd=%EC%B9%98%EC%95%85%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "구룡사 입구 ① - 1시간 - 세렴폭포 ② - 2시간 - 비로봉 ③ - 25분 - 입석사 삼거리 ④ - 1시간 45분 - 고둔치 ⑤ - 45분 - 향로봉 ⑥ - 1시간 40분 - 남대봉 ⑦ - 15분 - 상원사 ⑧ - 2시간 - 성남매표소 ⑨",
        "estimatedTime": "약 9시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "구룡사 ① - ( 계곡길 ) - 비로봉 ③ - 쥐너미고개 ⑩ - 범골 ⑪ - 법문사 ⑫",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "황골매표소 ⑬ - 입석대 ⑭ - 입석사 삼거리 ④ - 비로봉 ③ - 1003봉 ⑮ - 부곡매표소 ⑯",
        "estimatedTime": "약 4시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "부곡리 - 고둔치 ⑤ - 향로봉 ⑥ - 남대봉 ⑦ - 쌍룡수 - 영원사 ⑰ - 금대분소 ⑱",
        "estimatedTime": "약 6시간 40분"
      }
    ]
  },
  "0000000087": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165599&ATTCH_FILE_MSTER_ID=FILEMSTER_00160439",
      "alt": "칠갑산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72030&fmmntArcd=01&srchWrd=%EC%B9%A0%EA%B0%91%EC%82%B0&srchArea=01&preSrchWrd=%EC%B9%A0%EA%B0%91%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "장곡리 주차장 ① - 20분 - 장곡사 ② - 15분 - 서릉 삼거리 ③ - 50분 - 남릉 삼거리 ④ - 5분 - 정상 ⑤ - 30분 - 삼형제봉 ⑥ - 1시간 10분 - 장곡리 주차장 ①",
        "estimatedTime": "약 3시간 10분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "가리점 ⑦ - 마재고개 ⑧ - 삼형제봉 ⑥ - 정상 ⑤ - 냉천계곡 ⑨ - 칠갑산자연휴양림 ⑪",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "칠갑산자연휴양림 ⑪ - 395봉 ⑫ - 서릉 삼거리 ③ - 정상 ⑤ - 점심교 ⑬",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "한치고개 ⑭ - 정상 ⑤ - 465봉 ⑮ - 장곡사 ② - 장곡리 주차장 ①",
        "estimatedTime": "약 2시간 10분"
      }
    ]
  },
  "0000000088": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165589&ATTCH_FILE_MSTER_ID=FILEMSTER_00160437",
      "alt": "태백산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72031&fmmntArcd=01&srchWrd=%ED%83%9C%EB%B0%B1%EC%82%B0&srchArea=01&preSrchWrd=%ED%83%9C%EB%B0%B1%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "당골 ① - 50분 - 반재 ② - 40분 - 망경사 ③ - 5분 - 정상 ④ - 25분 - 부쇠봉 삼거리 ⑤ - 30분 - 문수봉 안부 ⑥ - 40분 - 정가바우골 아우라지 ⑦ - 40분 - 당골 ①",
        "estimatedTime": "약 3시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "당골 ① - 산제당골 ⑧ - 문수봉 ⑨ - 문수봉 안부 ⑥ - 부쇠봉 삼거리 ⑤ - 정상 ④ - 유일사 ⑩ - 유일사 매표소 ⑪",
        "estimatedTime": "약 4시간 5분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "백단사 매표소 ⑫ - 백단사 ⑬ - 정상 ④ - 부쇠봉 삼거리 ⑤ - 문수봉 ⑨ - 두리봉 ⑭ - 지지리골 ⑮ - 잣밭 ⑯",
        "estimatedTime": "약 4시간 35분"
      }
    ]
  },
  "0000000089": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166048&ATTCH_FILE_MSTER_ID=FILEMSTER_00160435",
      "alt": "태화산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=72032&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "영춘 ① - 55분 - 화장암 ② - 10분 - ( 주릉 ) - 30분 - 897봉 ③ - 10분 - 억새밭 ④ - 30분 - 정상 ⑤ - 1시간 30분 - 삼거리 ⑥ - 1시간 - 고씨동굴 ⑦",
        "estimatedTime": "약 4시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "팔괴리 ⑧ - 삼거리 안부 ⑥ - 정상 ⑤ - 영춘 ①",
        "estimatedTime": "약 3시간 40분"
      }
    ]
  },
  "0000000090": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165569&ATTCH_FILE_MSTER_ID=FILEMSTER_00160433",
      "alt": "팔공산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=72033&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "파계사 매표소 ① - 35분 - 파계사 ② - 45분 - 파계재 ③ - 1시간 10분 - 부인사 갈림길 ④ - 1시간 35분 - 서봉 ⑤ - 40분 - 염불암 ⑥ - 1시간 - 동화사 ⑦",
        "estimatedTime": "약 5시간 45분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "남산리 ⑧ - 파계재 ③ - 파계봉 - 서봉 ⑤ - 수태골 ⑨ - 동화사지구 ⑩",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "( 갓바위주차장 ) - 갓바위 ⑪ - 능성재 ⑫ - 신령재 ⑬ - 동봉 ⑭ - 염불암 ⑥ - 동화사 ⑦",
        "estimatedTime": "약 6시간 10분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "동화사 ⑦ - 염불암 ⑥ - 동봉 ⑭ - 수도사 ⑮ - 신시암 ⑯",
        "estimatedTime": "약 4시간 30분"
      }
    ]
  },
  "0000000091": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165559&ATTCH_FILE_MSTER_ID=FILEMSTER_00160431",
      "alt": "팔봉산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72034&fmmntArcd=01&srchWrd=%ED%8C%94%EB%B4%89%EC%82%B0&srchArea=01&preSrchWrd=%ED%8C%94%EB%B4%89%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "매표소 ① - 40분 - 1봉과 2봉 사이의 새목 ② - 10분 - 3봉 ③ - 30분 - 4봉 ④ - 15분 - 7봉과 8봉 사이의 새목 ⑤ - 1시간 - 8봉 너머 강변 ⑥ - 25분 - 매표소 ①",
        "estimatedTime": "약 3시간 - 8봉을 생략할 경우 2시간"
      }
    ]
  },
  "0000000092": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165549&ATTCH_FILE_MSTER_ID=FILEMSTER_00160429",
      "alt": "팔영산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=08&fmmntSeq=72035&nowPage=1&preSrchArea=08&preSrchWrd=&srchArea=08&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "능가사 입구 ① - 10분 - 팔영산장 ② - 20분 - 흔들바위 ③ - 40분 - 1봉 ④ - 1시간 20분 - 8봉 ⑤ - 40분- 탑재 ⑥ - 40분 - 팔영산장 ② - 10분 - 능가사 입구 ①",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "능가사 입구 ① - 팔영산장 ② - 흔들바위 ③ - ( 1~8봉 ) - 깃대봉 ⑦ - 동남릉 ⑧ - 영남면소 ⑨",
        "estimatedTime": "약 3시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "우천리 매표소 ⑩ - 자연휴양림 ⑪ - 2봉 동릉 ⑫ - ( 2~8봉 ) - 팔영산자연휴양림 ⑪ - 우천리 매표소 ⑩",
        "estimatedTime": "약 3시간 20분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "강산리 ⑬ - 신선대 ⑭ - 2봉 동릉 ⑫ - ( 2~8봉 ) - 탑재 ⑥ - 팔영산장 ② - 능가사 입구 ①",
        "estimatedTime": "약 3시간 30분"
      }
    ]
  },
  "0000000093": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165539&ATTCH_FILE_MSTER_ID=FILEMSTER_00160427",
      "alt": "한라산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=09&fmmntSeq=72036&nowPage=1&preSrchArea=09&preSrchWrd=&srchArea=09&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "성판악 입구 ① - 1시간 20분 - 솥밭 ② - 40분 - 사라악 ③ - 1시간 - 진달래밭 ④ - 1시간 30분 - 정상 ⑤ - 1시간 - 용진각 ⑥ - 45분 - 개미목 ⑦ - 1시간 10분 - 탐라계곡 ⑧ - 1시간 - 관음사 안내소 ⑨",
        "estimatedTime": "약 8시간 25분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "어리목광장 ⑩ - 사제비동산 ⑪ - 만세동산 ⑫ - 윗세오름 ⑬",
        "estimatedTime": "약 2시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "1100도로 ⑭ - 영실매표소 ⑮ - 영실휴게소 ⑯ - 병풍바위 ⑰ - 윗세오름 ⑬",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "어리목광장 ⑩ - 어승생악 ⑱",
        "estimatedTime": "약 1시간"
      }
    ]
  },
  "0000000094": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165529&ATTCH_FILE_MSTER_ID=FILEMSTER_00160425",
      "alt": "화악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=01&fmmntSeq=72037&nowPage=1&preSrchArea=01&preSrchWrd=&srchArea=01&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "관청리 ① - 45분 - 가마소 아우라지 ② - 50분 - 샘터 아우라지 ③ - 50분 - 중봉 서릉 ④ - 50분 - 서릉 삼거리 ⑤ - 20분 - 중봉 ⑥ - 40분 - 1142봉 ⑦ - 25분 - 남릉 사거리 ⑧ - 40분 - 가마소 ② - 30분 - 관청리 ①",
        "estimatedTime": "약 5시간 50분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "천도교 화악산수도원 ⑨ - 오림계곡 ⑩ - 중봉 ⑥ - 1142 ⑦ - 애기봉 전 능선 ⑪ - 오동골 ⑫",
        "estimatedTime": "약 5시간 40분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "오동골 ⑫ - 주능선 - 중봉 ⑥ - 중봉 서릉 ④ - ( 갈림길 ) - ( 큰골 ) - 관청리 ①",
        "estimatedTime": "약 5시간 20분"
      }
    ]
  },
  "0000000095": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165524&ATTCH_FILE_MSTER_ID=FILEMSTER_00160424",
      "alt": "화왕산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72038&fmmntArcd=01&srchWrd=%ED%99%94%EC%99%95%EC%82%B0&srchArea=01&preSrchWrd=%ED%99%94%EC%99%95%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "관룡사 ① - 25분 - 청룡암 ② - 30분 - 관룡산 정상 ③ - 30분 - 허준세트장 ④ - 10분 - 화왕산성 동문 ⑤ - 20분 - 화왕산 정상 ⑥ - 10분 - 서문 ⑦ - 15분 - 배바위 ⑧ - 5분 - 산불감시초소 ⑨ - 10분 - 755.8봉 ⑩ - 30분- 정자 ⑪ - 20분 - 매표소 ⑫",
        "estimatedTime": "약 3시간 25분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "( 창녕읍 ) - 도성암 ⑬ - 환장고개 ⑭ - 정상 ⑥ - 목마산성 ⑮ - 창녕여고 ⑯",
        "estimatedTime": "약 3시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "( 창녕읍 ) - 도성암 ⑬ - 정상 ⑥ - 환장고개 ⑭ - 755.8봉 ⑩ - 정자 ⑪ - 매표소 ⑫",
        "estimatedTime": "약 2시간 50분"
      }
    ]
  },
  "0000000096": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166049&ATTCH_FILE_MSTER_ID=FILEMSTER_00160422",
      "alt": "황매산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72039&fmmntArcd=01&srchWrd=%ED%99%A9%EB%A7%A4%EC%82%B0&srchArea=01&preSrchWrd=%ED%99%A9%EB%A7%A4%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "염암사지 ① - 30분 - 국사당 ② - 40분 - 모산재 ③ - 40분 - 철쭉제단 ④ - 20분 - 베틀봉 ⑤ - 15분 - 황매산제단 ⑥ - 1시간 - 정상 ⑦ - 25분 - 너백이 ⑧ - 20분 - 장구메기 ⑨ - 30분 - 영화주제공원 ⑩",
        "estimatedTime": "약 4시간 40분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "장박리 ⑪ - 떡갈재능선 삼거리 ⑫ - 너백이 ⑧ - 정상 ⑦ - 황매산제단 ⑥ - 베틀봉 ⑤ - 철쭉제단 ④ - ( 목장 ) - ( 덕만리 )",
        "estimatedTime": "약 4시간 25분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "하금야영장 ⑬ - 떡갈재 ⑫ - 너백이 ⑧ - 정상 ⑦ - 황매산제단 ⑥ - 베틀봉 ⑤ - 천황재 ⑭ - 감암산 ⑮ - 성지동천 ⑯ - ( 신촌리 )",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "덕만리 ⑰ - 삼봉 ⑱ - 하봉 ⑲ - 중봉 ⑳ - 황매봉 &#12881; - ( 서북릉 삼거리 ) - 영화주제공원 ⑩",
        "estimatedTime": "약 4시간"
      }
    ]
  },
  "0000000097": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166050&ATTCH_FILE_MSTER_ID=FILEMSTER_00160421",
      "alt": "황석산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72040&fmmntArcd=01&srchWrd=%ED%99%A9%EC%84%9D%EC%82%B0&srchArea=01&preSrchWrd=%ED%99%A9%EC%84%9D%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "유동마을 ① - 35분 - 쉼터 ② - 1시간 - 전망대 ③ - 35분 - 정상 ④ - 35분 - 뫼재 ⑤ - 1시간 15분 - 거망산 정상 ⑥ - 5분 - 사평하산분기점 ⑦ - 50분 - 사평마을 ⑧ - 20분 - 용추사 주차장 ⑨",
        "estimatedTime": "약 5시간15분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "우전마을 ⑩ - 시구목길 ⑪ - 황석산 ④ - 망월대 ⑫ - 유동마을 ①",
        "estimatedTime": "약 4시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "삼거리 ⑬ - 탁고개 ⑭ - 산내골 ⑮ - 황석산 ④ - 서하교 ⑯",
        "estimatedTime": "약 4시간 30분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "용추사 ⑨ - 지장골 ⑰ - 주능선 ⑱ - 거망산 정상 ⑥ - 1205 ⑲ - 황석산 정상 ④ - 우전 ⑩ - 봉전 거연정 ⑳",
        "estimatedTime": "약 6시간 40분"
      }
    ]
  },
  "0000000098": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165493&ATTCH_FILE_MSTER_ID=FILEMSTER_00160418",
      "alt": "황악산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=05&fmmntSeq=72041&nowPage=1&preSrchArea=05&preSrchWrd=&srchArea=05&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "직지사 ① - 40분 - 내원계곡갈림길 ② - 30분 - 운수암 ③ - 20분 - 능선안부 ④ - 20분 - 백운봉 ⑤ - 50분 - 비로봉(정상) ⑥ - 1시간 40분 - 직지사 ①",
        "estimatedTime": "약 4시간 20분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "직지사 ① - 운수암 ③ - 백운봉 ⑤ - 비로봉 ⑥ - 형제봉 ⑦ - 신선봉 ⑧ - 망봉 직전 안부 ⑨ - 능여계곡 ⑩ - 직지사 ①",
        "estimatedTime": "약 4시간 25분"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "묘내 ⑪ - ( 운수봉 ) - 백운봉 ⑤ - 비로봉 ⑥ - 형제봉 ⑦ - 신선봉 ⑧ - 망봉 직전 안부 ⑨ - 능여계곡 ⑩ - 직지사 ①",
        "estimatedTime": "약 4시간 30분"
      }
    ]
  },
  "0000000099": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=165489&ATTCH_FILE_MSTER_ID=FILEMSTER_00160417",
      "alt": "황장산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntSeq=72042&fmmntArcd=01&srchWrd=%ED%99%A9%EC%9E%A5%EC%82%B0&srchArea=01&preSrchWrd=%ED%99%A9%EC%9E%A5%EC%82%B0&preSrchArea=01&nowPage=1"
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "안산다리 ① - 1시간 - 작은 차갓재 ② - 1시간 10분 - 정상 ③ - 1시간 20분 - 안산다리 ①",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "안산다리 ① - 작은차갓재 ② - 멧등바위 ④ - 정상 ③ - 감투봉 ⑫ - 치마바위 ⑥ - 폐맥이재 ⑦ - 929봉 ⑧ - 벌재 ⑨",
        "estimatedTime": "약 5시간"
      },
      {
        "label": "기타코스2",
        "kind": "other2",
        "path": "안산다리 ① - 지은광산 ⑩ - 베바위 ⑪ - 정상 ③ - 감투봉 ⑫ - 황장재 ⑬ - 문안골 반석 ⑭ - 작성 ⑮ - 방곡리 ⑯",
        "estimatedTime": "약 4시간 50분"
      },
      {
        "label": "기타코스3",
        "kind": "other3",
        "path": "생달분교 ⑰ - 토시골 ⑱ - 황장재 ⑬ - 감투봉 ⑫ - 정상 ③ - 작은차갓재 ② - 베창골 ⑲ - 안산다리 ①",
        "estimatedTime": "약 4시간 10분"
      }
    ]
  },
  "0000000100": {
    "courseMapImage": {
      "src": "https://www.foresttrip.go.kr/com/cm/fileDownload.do?ATTCH_FILE_ID=166051&ATTCH_FILE_MSTER_ID=FILEMSTER_00160416",
      "alt": "희양산 추천 코스 지도",
      "sourceLabel": "숲나들e 산행코스 지도",
      "sourceUrl": "https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=03&fmmntSeq=72043&nowPage=1&preSrchArea=03&preSrchWrd=&srchArea=03&srchWrd="
    },
    "routes": [
      {
        "label": "추천코스",
        "kind": "recommended",
        "path": "은티마을 ① - 1시간 - 지름티재 ② - 20분 - 미로바위 ③ - 40분 - 정상 ④ - 20분 - 성터 ⑤ - 30분 - 폭포 ⑥ - 40분 - 은티마을 ①",
        "estimatedTime": "약 3시간 30분"
      },
      {
        "label": "기타코스1",
        "kind": "other1",
        "path": "은티마을 ① - 시루봉 안부 ⑦ - 성터 ⑤ - 정상 ④",
        "estimatedTime": "약 3시간"
      }
    ]
  }
};
