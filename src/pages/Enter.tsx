import { useState } from 'react'
import { setEntryOK } from '@/lib/storage'
import { useNavigate } from 'react-router-dom'

export default function Enter() {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = async () => {
    if (loading) return
    const typed = code.trim()
    if (!typed) {
      setErr('코드를 입력하세요.')
      return
    }
    setErr('')
    setLoading(true)

    const markEntryAndGoHome = () => {
      setEntryOK(true)
      nav('/')
    }

    const fallbackToBuildTimeCode = () => {
      const entry = (import.meta.env.VITE_ENTRY_CODE || '').trim()
      if (entry && typed === entry) {
        markEntryAndGoHome()
        return true
      }
      return false
    }

    try {
      const res = await fetch('/api/entry-check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: typed })
      })

      if (res.ok) {
        markEntryAndGoHome()
        return
      }

      if (res.status === 401) {
        setErr('코드가 올바르지 않습니다.')
        return
      }

      if (res.status === 404 && fallbackToBuildTimeCode()) return

      setErr('코드를 확인하는 중 오류가 발생했습니다.')
    } catch (error) {
      if (fallbackToBuildTimeCode()) return
      setErr('코드를 확인하는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 space-y-4">
      <div className="text-2xl font-semibold">입장 코드</div>
      <input
        type="password"
        className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="코드를 입력하세요"
      />
      {err && <div className="text-red-500 text-sm">{err}</div>}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-lg bg-brand text-white py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? '확인 중...' : '확인'}
      </button>
    </div>
  )
}
