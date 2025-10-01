export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const mask = (v?: string) => (v ? v.slice(0, 3) + '***' : 'missing')

  const payload = {
    ENTRY_CODE: mask(env.ENTRY_CODE || env.VITE_ENTRY_CODE),
    KAKAO_REST_KEY: mask(env.KAKAO_REST_KEY || env.KAKAO_REST_API_KEY),
    JUSO_API_KEY: mask(env.JUSO_API_KEY),
    NAVER_CLIENT_ID: mask(env.NAVER_CLIENT_ID || env.NCP_API_KEY_ID),
    NAVER_CLIENT_SECRET: mask(env.NAVER_CLIENT_SECRET || env.NCP_API_KEY),
    ALLOWED_ORIGINS: env.ALLOWED_ORIGINS || '*'
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  })
}

export interface Env {
  ENTRY_CODE?: string
  VITE_ENTRY_CODE?: string
  KAKAO_REST_KEY?: string
  KAKAO_REST_API_KEY?: string
  JUSO_API_KEY?: string
  NAVER_CLIENT_ID?: string
  NAVER_CLIENT_SECRET?: string
  NCP_API_KEY_ID?: string
  NCP_API_KEY?: string
  ALLOWED_ORIGINS?: string
}
