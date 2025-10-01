export const ENTRY_FLAG = 'ENTRY_OK'
export const ENTRY_CODE_KEY = 'ENTRY_CODE'
export const START_KEY = 'START_CAND'
export const END_KEY = 'END_CAND'

export function setEntryOK(v: boolean) {
  if (v) localStorage.setItem(ENTRY_FLAG, '1')
  else localStorage.removeItem(ENTRY_FLAG)
}
export function getEntryOK() {
  return localStorage.getItem(ENTRY_FLAG) === '1'
}
export function saveCandidate(key: string, cand: any) {
  localStorage.setItem(key, JSON.stringify(cand))
}
export function loadCandidate<T = any>(key: string): T | null {
  const v = localStorage.getItem(key)
  return v ? (JSON.parse(v) as T) : null
}
