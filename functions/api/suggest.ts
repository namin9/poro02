export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').trim()
    if (q.length < 2) {
      return jsonOK({ items: [], error: 'short_query' }, env)
    }

    if (!env.JUSO_API_KEY) {
      return jsonOK({ items: [], error: 'not_configured' }, env)
    }

    const jusoUrl = new URL('https://business.juso.go.kr/addrlink/openApi/searchApi.do')
    jusoUrl.searchParams.set('confmKey', env.JUSO_API_KEY)
    jusoUrl.searchParams.set('keyword', q)
    jusoUrl.searchParams.set('currentPage', '1')
    jusoUrl.searchParams.set('countPerPage', '10')
    jusoUrl.searchParams.set('resultType', 'json')

    const res = await fetch(jusoUrl)
    if (!res.ok) {
      return jsonOK({ items: [], error: 'juso_fail' }, env)
    }

    const data = await res.json()
    const list: any[] = data?.results?.juso ?? []
    const items = list
      .map((item) => {
        const road = (item?.roadAddr || item?.roadAddrPart1 || '').trim()
        const jibun = (item?.jibunAddr || '').trim()
        const zip = (item?.zipNo || '').trim()
        const displayTitle = road || jibun
        if (!displayTitle) {
          return null
        }
        return {
          title: displayTitle,
          subtitle: [jibun, zip].filter(Boolean).join(' • '),
          roadAddress: road || displayTitle,
          jibunAddress: jibun || undefined,
          zipCode: zip || undefined
        }
      })
      .filter(Boolean)

    return jsonOK({ items }, env)
  } catch (e) {
    return jsonOK({ items: [], error: 'unexpected' }, env)
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
  JUSO_API_KEY?: string
  ALLOWED_ORIGINS?: string
}
