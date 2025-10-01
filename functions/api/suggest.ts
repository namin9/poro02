export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').trim()
    if (q.length < 2) {
      return new Response(JSON.stringify({ items: [], message: 'q must be >= 2 chars' }), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      })
    }

    // Kakao Local 키워드 검색
    const kakaoUrl = new URL('https://dapi.kakao.com/v2/local/search/keyword.json')
    kakaoUrl.searchParams.set('query', q)
    kakaoUrl.searchParams.set('size', '10')

    const res = await fetch(kakaoUrl, {
      headers: { Authorization: `KakaoAK ${env.KAKAO_REST_API_KEY}` }
    })
    if (!res.ok) {
      return new Response(JSON.stringify({ items: [], error: 'kakao_fail' }), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      })
    }
    const data = await res.json()
    const items =
      (data?.documents || []).map((d: any) => ({
        title: d.place_name || d.address_name,
        subtitle: [d.road_address_name, d.category_name].filter(Boolean).join(' • '),
        x: parseFloat(d.x),
        y: parseFloat(d.y)
      })) ?? []

    return jsonOK({ items }, env)
  } catch (e) {
    return jsonOK({ items: [], error: 'unexpected' }, undefined)
  }
}

function jsonOK(obj: any, env?: Env) {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: corsHeaders(env)
  })
}

function corsHeaders(env?: Env) {
  const allow = env?.ALLOWED_ORIGINS || '*'
  return {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': allow
  }
}

export interface Env {
  KAKAO_REST_API_KEY: string
  ALLOWED_ORIGINS?: string
}
