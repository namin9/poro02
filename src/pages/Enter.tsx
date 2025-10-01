import { useState } from 'react'
import { setEntryOK } from '@/lib/storage'
import { useNavigate } from 'react-router-dom'

export default function Enter() {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async () => {
    // 서버에 키를 묻지 않고, 실 배포는 CF Pages에서 환경변수로 빌드 혹은 클라이언트에 hardcoding 금지
    // 여기서는 간단히 _envcheck로 키가 있는지만 보고, 실제 코드는 클라에서 비교하지 않음.
    const entry = import.meta.env.VITE_ENTRY_CODE || ''
    if (entry && code === entry) {
      setEntryOK(true)
      nav('/')
    } else {
      setErr('코드가 올바르지 않습니다.')
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
      <button onClick={submit} className="w-full rounded-lg bg-brand text-white py-3 font-semibold">확인</button>
    </div>
  )
}
