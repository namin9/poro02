export async function getJSON<T>(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('network')
  return (await res.json()) as T
}
