export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const roadAddress = (url.searchParams.get('roadAddress') || url.searchParams.get('address') || '').trim()

  if (!roadAddress) {
    return jsonResponse({ error: 'missing_address' }, env, 400)
  }

  const clientId = env.NAVER_CLIENT_ID || env.NCP_API_KEY_ID
  const clientSecret = env.NAVER_CLIENT_SECRET || env.NCP_API_KEY

  if (!clientId || !clientSecret) {
    return jsonResponse({ error: 'not_configured' }, env, 500)
  }

  const geocodeUrl = new URL('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode')
  geocodeUrl.searchParams.set('query', roadAddress)

  const res = await fetch(geocodeUrl, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': clientId,
      'X-NCP-APIGW-API-KEY': clientSecret
    }
  })

  if (!res.ok) {
    return jsonResponse({ error: 'naver_fail' }, env, res.status)
  }

  const data = await res.json()
  const first = data?.addresses?.[0]
  if (!first || !first.x || !first.y) {
    return jsonResponse({ error: 'not_found' }, env, 404)
  }

  const x = parseFloat(first.x)
  const y = parseFloat(first.y)

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return jsonResponse({ error: 'invalid_coordinate' }, env, 502)
  }

  return jsonResponse(
    {
      x,
      y,
      roadAddress: first.roadAddress || roadAddress,
      jibunAddress: first.jibunAddress || undefined,
      zipCode: first.zipcode || first.zipNo || undefined
    },
    env
  )
}

function jsonResponse(body: any, env: Env, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
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
