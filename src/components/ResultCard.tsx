export default function ResultCard({
  distanceKm,
  fare
}: {
  distanceKm: number
  fare: number
}) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="text-sm text-zinc-500">예상 거리</div>
      <div className="text-2xl font-semibold">{distanceKm.toFixed(2)} km</div>
      <div className="h-3" />
      <div className="text-sm text-zinc-500">예상 요금</div>
      <div className="text-2xl font-semibold">{fare.toLocaleString()} 원</div>
    </div>
  )
}
