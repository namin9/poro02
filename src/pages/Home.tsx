import TileLink from '@/components/TileLink'

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <TileLink to="/express" emoji="🚚" label="특송" />
      <TileLink to="/taxi" emoji="🚖" label="예약 택시" />
      <TileLink to="/quick" emoji="📦" label="퀵서비스" />
      <TileLink to="/bullet" emoji="🎟️" label="총알 예매" />
      <a className="col-span-2 underline text-sm text-center mt-2 opacity-80" href="https://neoqik.com" target="_blank">기존 홈페이지 열기</a>
    </div>
  )
}
