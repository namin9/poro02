import { useEffect, useRef, useState } from 'react'
import { SuggestItem } from '@/lib/types'

type AddressCandidate = {
  title: string
  subtitle: string
  roadAddress: string
  jibunAddress?: string
  zipCode?: string
}

export default function AutoCompleteInput({
  label,
  value,
  onSelect
}: {
  label: string
  value?: SuggestItem | null
  onSelect: (item: SuggestItem | null) => void
}) {
  const [q, setQ] = useState('')
  const [items, setItems] = useState<AddressCandidate[]>([])
  const [pending, setPending] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false

    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = null
    }

    const nextQ = q.trim()
    if (nextQ.length < 2) {
      setItems([])
      setError(null)
      return
    }

    setError(null)

    timer.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(nextQ)}`)
        const data = (await res.json()) as { items?: AddressCandidate[]; error?: string }
        if (!cancelled) {
          const list = data.items ?? []
          setItems(list)
          if (list.length > 0) {
            setError(null)
          } else {
            switch (data.error) {
              case 'not_configured':
                setError('주소 검색 API 키가 설정되지 않았습니다.')
                break
              case 'juso_fail':
                setError('주소 검색 서버 응답이 올바르지 않습니다.')
                break
              case 'short_query':
                setError(null)
                break
              default:
                setError('검색 결과가 없습니다.')
            }
          }
        }
      } catch {
        if (!cancelled) {
          setItems([])
          setError('주소 목록을 불러오지 못했습니다.')
        }
      } finally {
        timer.current = null
      }
    }, 200)

    return () => {
      cancelled = true
      if (timer.current) {
        window.clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [q])

  const selectItem = async (candidate: AddressCandidate) => {
    setPending(candidate.roadAddress)
    setError(null)
    try {
      const res = await fetch(`/api/geocode?roadAddress=${encodeURIComponent(candidate.roadAddress)}`)
      const data = (await res.json()) as {
        x?: number
        y?: number
        error?: string
        roadAddress?: string
        jibunAddress?: string
        zipCode?: string
      }
      if (res.ok && typeof data.x === 'number' && typeof data.y === 'number') {
        onSelect({
          title: data.roadAddress || candidate.title,
          subtitle:
            candidate.subtitle || data.jibunAddress || data.roadAddress || candidate.title,
          roadAddress: data.roadAddress || candidate.roadAddress,
          jibunAddress: data.jibunAddress || candidate.jibunAddress,
          zipCode: data.zipCode || candidate.zipCode,
          x: data.x,
          y: data.y
        })
        setQ('')
        setItems([])
      } else {
        let message = '좌표를 찾을 수 없습니다. 다시 시도하세요.'
        switch (data.error) {
          case 'not_configured':
            message = '좌표 검색 API 키가 설정되지 않았습니다.'
            break
          case 'naver_fail':
            message = '좌표 검색 서버 응답이 올바르지 않습니다.'
            break
          case 'not_found':
            message = '선택한 주소의 좌표를 찾지 못했습니다.'
            break
        }
        setError(message)
      }
    } catch {
      setError('좌표를 불러오지 못했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setPending(null)
    }
  }

  return (
    <div>
      <div className="mb-1 text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
      {value ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded border border-zinc-300 dark:border-zinc-700 px-3 py-2">
            <div className="font-medium">{value.title}</div>
            <div className="text-xs text-zinc-500">
              {[value.subtitle, value.zipCode].filter(Boolean).join(' • ')}
            </div>
          </div>
          <button className="px-2 py-2 rounded border" onClick={() => onSelect(null)}>초기화</button>
        </div>
      ) : (
        <>
          <input
            placeholder="주소 또는 장소명"
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {items.length > 0 && (
            <ul className="mt-2 border rounded-lg overflow-hidden border-zinc-200 dark:border-zinc-700">
              {items.map((it, idx) => {
                const isPending = pending === it.roadAddress
                return (
                  <li
                    key={idx}
                    className={`px-3 py-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer ${
                      isPending ? 'opacity-60 pointer-events-none' : ''
                    }`}
                    onClick={() => selectItem(it)}
                  >
                    <div className="font-medium">{it.title}</div>
                    <div className="text-xs text-zinc-500">
                      {[it.subtitle, it.zipCode].filter(Boolean).join(' • ')}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
          {error && <div className="mt-2 text-xs text-rose-500">{error}</div>}
        </>
      )}
    </div>
  )
}
