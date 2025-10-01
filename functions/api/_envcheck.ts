export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const mask = (v?: string) => (v ? v.slice(0, 3) + '***' : 'missing')
  const payload = {
    ENTRY_CODE: mask(env.ENTRY_CODE || env.VITE_ENTRY_CODE),
    KAKAO_REST_API_KEY: mask(env.KAKAO_REST_API_KEY),
    NCP_API_KEY_ID: mask(env.NCP_API_KEY_ID),
    NCP_API_KEY: mask(env.NCP_API_KEY),
    ALLOWED_ORIGINS: env.ALLOWED_ORIGINS || '*'
  }
  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  })
}

export interface Env {
  ENTRY_CODE?: string
  VITE_ENTRY_CODE?: string
  KAKAO_REST_API_KEY?: string
  NCP_API_KEY_ID?: string
  NCP_API_KEY?: string
  ALLOWED_ORIGINS?: string
}
