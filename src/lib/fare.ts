// 기본요금 3,800원(1.6km), 이후 100원/132m
export function estimateFareKRW(distanceKm: number) {
  const baseFare = 3800
  const baseKm = 1.6
  if (distanceKm <= baseKm) return baseFare
  const remainM = (distanceKm - baseKm) * 1000
  const step = Math.ceil(remainM / 132)
  return baseFare + step * 100
}
