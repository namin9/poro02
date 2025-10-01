import { useEffect, useState } from 'react'

export default function Settings() {
  const [env, setEnv] = useState<any>(null)
  useEffect(() => {
    fetch('/api/_envcheck').then(r => r.json()).then(setEnv).catch(()=>{})
  }, [])
  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">설정</div>
      <div className="rounded-lg border p-4">
        <div className="font-medium mb-2">버전</div>
        <div className="text-sm">NeoQik Proto v0.1</div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="font-medium mb-2">진단</div>
        <a className="underline block" href="/api/_envcheck">/api/_envcheck</a>
        <a className="underline block" href="/api/_diag">/api/_diag</a>
        {env && <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(env, null, 2)}</pre>}
      </div>
      <div className="text-xs text-zinc-500">* 내부 테스트 전용. 키는 서버 환경변수에서 관리하세요.</div>
    </div>
  )
}
