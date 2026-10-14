import { createClient } from 'npm:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ANILIBRIA_API = 'https://anilibria.top/api/v1'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 минут

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    const { alias } = await req.json()

    // Валидация 
    if (!alias || typeof alias !== 'string' || !/^[a-z0-9-]+$/i.test(alias)) {
      return new Response(
        JSON.stringify({ error: 'Invalid alias' }),
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // 1. Проверяем кэш
    const { data: cached } = await supabase
      .from('anilibria_cache')
      .select('data, updated_at')
      .eq('alias', alias)
      .maybeSingle()

    const isFresh =
      cached &&
      Date.now() - new Date(cached.updated_at).getTime() < CACHE_TTL_MS

    if (isFresh) {
      return new Response(
        JSON.stringify({ data: cached.data, cached: true }),
        { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
      )
    }

    // 2. Запрос к AniLibria
    const res = await fetch(`${ANILIBRIA_API}/anime/releases/${alias}`)
    if (!res.ok) {
      // Если AniLibria ответила ошибкой, но у нас есть старый кэш — отдаём его
      if (cached) {
        return new Response(
          JSON.stringify({ data: cached.data, cached: true, stale: true }),
          { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
        )
      }
      return new Response(
        JSON.stringify({ error: `AniLibria: ${res.status}` }),
        { status: res.status, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
      )
    }

    const data = await res.json()

    // 3. Сохраняем в кэш
    await supabase
      .from('anilibria_cache')
      .upsert(
        { alias, data, updated_at: new Date().toISOString() },
        { onConflict: 'alias' },
      )

    return new Response(
      JSON.stringify({ data, cached: false }),
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
    )
  }
})