import { env } from './env';

let kakaoMapsPromise: Promise<typeof window.kakao.maps> | null = null;

export function loadKakaoMaps(): Promise<typeof window.kakao.maps> {
  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao.maps);
  }

  if (!env.kakaoMapAppKey) {
    return Promise.reject(new Error('Kakao Maps app key is missing.'));
  }

  if (kakaoMapsPromise) {
    return kakaoMapsPromise;
  }

  kakaoMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakaoMapAppKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => resolve(window.kakao.maps));
    };
    script.onerror = () => reject(new Error('Failed to load Kakao Maps SDK.'));
    document.head.appendChild(script);
  });

  return kakaoMapsPromise;
}
