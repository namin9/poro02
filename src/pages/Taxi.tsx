import AutoCompleteInput from '@/components/AutoCompleteInput'
import { useState } from 'react'
import { SuggestItem } from '@/lib/types'
import { haversineKm } from '@/lib/geo'
import { estimateFareKRW } from '@/lib/fare'

export default function Taxi() {
  const [s, setS] = useState<SuggestItem | null>(null)
  const [e, setE] = useState<SuggestItem | null>(null)
  const [dt, setDt] = useState('')
  const [n, setN] = useState(1)
  const [memo, setMemo] = useState('')

  const dist = s && e ? haversineKm(s.y, s.x, e.y, e.x) : 0
  const fare = estimateFareKRW(dist)

  const submit = () => {
    alert(`(데모) 예약요청\n시간:${dt}\n인원:${n}\n메모:${memo}\n거리:${dist.toFixed(2)}km\n예상요금:${fare.toLocaleString()}원`)
    console.log({ s, e, dt, n, memo, dist, fare })
  }

  return (
    <div className="space-y-3">
      <AutoCompleteInput label="픽업" value={s} onSelect={setS} />
      <AutoCompleteInput label="도착" value={e} onSelect={setE} />
      <input className="w-full rounded border px-3 py-2" placeholder="예약 일시(예: 2025-10-01 18:00)" value={dt} onChange={(e) => setDt(e.target.value)} />
      <input className="w-full rounded border px-3 py-2" type="number" min={1} value={n} onChange={(e) => setN(parseInt(e.target.value || '1'))} />
      <textarea className="w-full rounded border px-3 py-2" placeholder="메모" value={memo} onChange={(e) => setMemo(e.target.value)} />
      <div className="text-sm text-zinc-500">예상 요금: {fare.toLocaleString()} 원</div>
      <button onClick={submit} className="w-full rounded-lg bg-brand text-white py-3">예약 요청(데모)</button>
    </div>
  )
}
