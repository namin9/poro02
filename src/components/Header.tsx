import { useNavigate, useLocation, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const nav = useNavigate()
  const loc = useLocation()
  const title = routeTitle(loc.pathname)

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-screen-sm flex items-center gap-3 px-3 py-3">
        <button onClick={() => nav(-1)} className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          ←
        </button>
        <div className="font-semibold text-lg flex-1 text-center">{title}</div>
        <Link to="/settings" className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">⚙️</Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

function routeTitle(path: string) {
  if (path.startsWith('/express')) return '특송'
  if (path.startsWith('/taxi')) return '예약 택시'
  if (path.startsWith('/quick')) return '퀵서비스'
  if (path.startsWith('/bullet')) return '총알 예매'
  if (path.startsWith('/settings')) return '설정'
  if (path.startsWith('/map-summary')) return '경로 요약'
  if (path.startsWith('/enter')) return '입장'
  return 'NeoQik'
}
