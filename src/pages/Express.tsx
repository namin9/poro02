import { useMemo, useState } from 'react'
import AutoCompleteInput from '@/components/AutoCompleteInput'
import ResultCard from '@/components/ResultCard'
import { SuggestItem } from '@/lib/types'
import { haversineKm } from '@/lib/geo'
import { estimateFareKRW } from '@/lib/fare'
import { saveCandidate, START_KEY, END_KEY } from '@/lib/storage'

export default function Express() {
  const [start, setStart] = useState<SuggestItem | null>(null)
  const [end, setEnd] = useState<SuggestItem | null>(null)

  const distanceKm = useMemo(() => {
    if (!start || !end) return 0
    return haversineKm(start.y, start.x, end.y, end.x)
  }, [start, end])

  const fare = useMemo(() => estimateFareKRW(distanceKm), [distanceKm])

  const canShow = start && end && distanceKm >= 0

  return (
    <div className="space-y-4">
      <AutoCompleteInput label="출발지" value={start} onSelect={(v) => setStart(v)} />
      <AutoCompleteInput label="도착지" value={end} onSelect={(v) => setEnd(v)} />

      <button
        onClick={() => {
          if (start && end) {
            saveCandidate(START_KEY, start)
            saveCandidate(END_KEY, end)
          }
        }}
        disabled={!canShow}
        className="w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 disabled:opacity-40"
      >
        경로 계산
      </button>

      {canShow && <ResultCard distanceKm={distanceKm} fare={fare} />}

      <a
        href={canShow ? `/map-summary` : '#'}
        className={`block text-center underline ${!canShow ? 'pointer-events-none opacity-40' : ''}`}
      >
        🗺️ 상세 경로 보기
      </a>

      {canShow && (
        <img
          className="rounded-lg border mt-2"
          src={`/api/static-map?startX=${start!.x}&startY=${start!.y}&endX=${end!.x}&endY=${end!.y}`}
          alt="static map"
        />
      )}
    </div>
  )
}
