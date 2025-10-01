import AutoCompleteInput from '@/components/AutoCompleteInput'
import { useState, useMemo } from 'react'
import { SuggestItem } from '@/lib/types'
import { haversineKm } from '@/lib/geo'
import { estimateFareKRW } from '@/lib/fare'

export default function Quick() {
  const [s, setS] = useState<SuggestItem | null>(null)
  const [e, setE] = useState<SuggestItem | null>(null)
  const [size, setSize] = useState<'S'|'M'|'L'>('S')
  const [weight, setWeight] = useState<number>(1)
  const [urgency, setUrgency] = useState<'N'|'H'>('N')

  const dist = useMemo(() => (s && e ? haversineKm(s.y, s.x, e.y, e.x) : 0), [s, e])
  let fare = estimateFareKRW(dist)
  fare = Math.round(fare * (size === 'M' ? 1.15 : size === 'L' ? 1.3 : 1))
  fare = Math.round(fare * (weight > 10 ? 1.2 : 1))
  fare = Math.round(fare * (urgency === 'H' ? 1.25 : 1))

  const submit = () => {
    alert(`(데모) 접수\n사이즈:${size}, 무게:${weight}kg, 긴급:${urgency}\n거리:${dist.toFixed(2)}km\n요금:${fare.toLocaleString()}원`)
  }

  return (
    <div className="space-y-3">
      <AutoCompleteInput label="출발" value={s} onSelect={setS} />
      <AutoCompleteInput label="도착" value={e} onSelect={setE} />

      <div className="grid grid-cols-3 gap-2">
        <select className="rounded border px-3 py-2" value={size} onChange={(e) => setSize(e.target.value as any)}>
          <option value="S">소(S)</option>
          <option value="M">중(M)</option>
          <option value="L">대(L)</option>
        </select>
        <input className="rounded border px-3 py-2" type="number" min={0.1} step={0.1} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value || '1'))} placeholder="무게(kg)" />
        <select className="rounded border px-3 py-2" value={urgency} onChange={(e) => setUrgency(e.target.value as any)}>
          <option value="N">일반</option>
          <option value="H">긴급</option>
        </select>
      </div>

      <div className="text-sm text-zinc-500">추정 요금: {fare.toLocaleString()} 원</div>
      <button onClick={submit} className="w-full rounded-lg bg-brand text-white py-3">접수(데모)</button>
    </div>
  )
}
