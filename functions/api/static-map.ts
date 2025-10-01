// Naver Static Map 프록시: ?startX&startY&endX&endY
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const sx = url.searchParams.get('startX')
  const sy = url.searchParams.get('startY')
  const ex = url.searchParams.get('endX')
  const ey = url.searchParams.get('endY')

  if (!sx || !sy || !ex || !ey) {
    return new Response('missing params', { status: 400 })
  }

  // 간단한 라인오버레이를 그리기 위해 Naver Static Map "path" 파라미터 사용
  // 문서: https://api.ncloud-docs.com/docs/ai-naver-maps-staticmap
  const nav = new URL('https://naveropenapi.apigw.ntruss.com/map-static/v2/raster')
  nav.searchParams.set('w', '640')
  nav.searchParams.set('h', '360')
  nav.searchParams.set('scale', '2')
  // 경로 라인
  nav.searchParams.set('path', `color:0x0066FFDD|weight:4|${sy},${sx}|${ey},${ex}`)
  // 마커: 출발(S), 도착(E)
  nav.searchParams.append('markers', `type:t|size:mid|pos:${sy} ${sx}|label:S`)
  nav.searchParams.append('markers', `type:t|size:mid|pos:${ey} ${ex}|label:E`)

  const apiId = env.NAVER_CLIENT_ID || env.NCP_API_KEY_ID
  const apiKey = env.NAVER_CLIENT_SECRET || env.NCP_API_KEY

  if (!apiId || !apiKey) {
    return new Response('naver api key missing', { status: 500 })
  }

  const res = await fetch(nav.toString(), {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': apiId,
      'X-NCP-APIGW-API-KEY': apiKey
    }
  })
  return new Response(res.body, {
    status: res.status,
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=300',
      'access-control-allow-origin': env.ALLOWED_ORIGINS || '*'
    }
  })
}

export interface Env {
  NAVER_CLIENT_ID?: string
  NAVER_CLIENT_SECRET?: string
  NCP_API_KEY_ID?: string
  NCP_API_KEY?: string
  ALLOWED_ORIGINS?: string
}
