export const env = {
  kakaoMapAppKey: import.meta.env.VITE_KAKAO_MAP_APP_KEY as string | undefined,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
};

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey);
export const isKakaoMapConfigured = Boolean(env.kakaoMapAppKey);
