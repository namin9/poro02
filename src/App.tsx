import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import { useEffect } from 'react'
import { getEntryOK } from './lib/storage'

export default function App() {
  const nav = useNavigate()
  const loc = useLocation()
  useEffect(() => {
    // 간단한 경량 보호
    if (!getEntryOK() && loc.pathname !== '/enter') nav('/enter')
  }, [loc.pathname, nav])

  return (
    <div className="mx-auto max-w-screen-sm min-h-dvh">
      <Header />
      <main className="p-4 pb-24">
        <Outlet />
      </main>
    </div>
  )
}
