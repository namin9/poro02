import { loadCandidate, START_KEY, END_KEY } from '@/lib/storage'

export default function MapSummary() {
  const s = loadCandidate<any>(START_KEY)
  const e = loadCandidate<any>(END_KEY)

  if (!s || !e) {
    return <div className="text-sm text-zinc-500">경로 데이터가 없습니다. 특송에서 계산을 먼저 진행하세요.</div>
  }

  const src = `/api/static-map?startX=${s.x}&startY=${s.y}&endX=${e.x}&endY=${e.y}`
  return (
    <div className="space-y-3">
      <div className="text-sm text-zinc-500">요약 경로</div>
      <img src={src} alt="map" className="rounded-lg border" />
    </div>
  )
}
