export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url)
  const info = {
    now: new Date().toISOString(),
    url: url.toString(),
    ua: request.headers.get('user-agent')
  }
  return new Response(JSON.stringify(info, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  })
}
