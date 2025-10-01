export default function Bullet() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        장거리(고속) + 라스트마일 연결 아이디어 검증용 시나리오 화면입니다.
        1차 버전은 근접 터미널 자동 제안 없이 요약 카드만 표시합니다.
      </p>
      <div className="rounded-lg border p-4">
        <div className="font-semibold mb-1">요약 경로</div>
        <div className="text-sm text-zinc-600">출발 → (고속 구간: 직선) → 도착</div>
        <div className="mt-2 text-xs text-zinc-500">* v2: 근접 KTX/버스터미널 자동 제안</div>
      </div>
    </div>
  )
}
