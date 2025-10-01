import { useEffect, useRef, useState } from 'react'
import { SuggestItem } from '@/lib/types'

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
  const [items, setItems] = useState<SuggestItem[]>([])
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (q.trim().length < 2) {
      setItems([])
      return
    }
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`)
        const data = (await res.json()) as { items: SuggestItem[] }
        setItems(data.items ?? [])
      } catch {
        setItems([])
      }
    }, 200)
  }, [q])

  return (
    <div>
      <div className="mb-1 text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
      {value ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded border border-zinc-300 dark:border-zinc-700 px-3 py-2">
            <div className="font-medium">{value.title}</div>
            <div className="text-xs text-zinc-500">{value.subtitle}</div>
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
              {items.map((it, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                  onClick={() => {
                    onSelect(it)
                    setQ('')
                    setItems([])
                  }}
                >
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-zinc-500">{it.subtitle}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
