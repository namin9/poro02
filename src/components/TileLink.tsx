import { Link } from 'react-router-dom'
export default function TileLink({ to, emoji, label }: { to: string; emoji: string; label: string }) {
  return (
    <Link
      to={to}
      className="aspect-[5/3] rounded-xl border border-zinc-200 dark:border-zinc-800 grid place-content-center text-center text-xl hover:shadow-sm active:scale-[0.99] transition"
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="font-medium">{label}</div>
    </Link>
  )
}
