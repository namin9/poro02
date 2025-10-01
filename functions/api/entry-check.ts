export const onRequestPost: PagesFunction<EntryEnv> = async ({ request, env }) => {
  let code: string | undefined

  try {
    const body = await request.json<Record<string, unknown>>()
    if (typeof body.code === 'string') {
      code = body.code.trim()
    }
  } catch (error) {
    // ignore JSON parse errors and treat as invalid payload
  }

  if (!code) {
    return new Response(JSON.stringify({ success: false, error: 'invalid_request' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    })
  }

  const expected = (env.VITE_ENTRY_CODE || env.ENTRY_CODE || '').trim()
  if (!expected) {
    return new Response(JSON.stringify({ success: false, error: 'not_configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    })
  }

  if (code === expected) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'content-type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ success: false, error: 'unauthorized' }), {
    status: 401,
    headers: { 'content-type': 'application/json' }
  })
}

interface EntryEnv {
  VITE_ENTRY_CODE?: string
  ENTRY_CODE?: string
}
