# NeoQik Proto (Cloudflare Pages + Functions)

모바일 웹에서 앱처럼 동작하는 **라스트마일/특송 실험용 프로토타입**입니다.  
프런트: **Vite + React + TS + Tailwind**, BFF: **Cloudflare Pages Functions**.

## 주요 기능
- 입장코드(/enter) 경량 보호
- 특송(/express): Kakao 자동완성 → 거리(Haversine) + 요금 계산 → Naver Static Map
- 예약 택시/퀵서비스: 경량 폼(데모 알림)
- 총알 예매: 시나리오 요약
- 설정: 테마, 버전, 진단(/api/_envcheck, /api/_diag)

## 스택
- Front: Vite, React 18, Tailwind
- BFF: Cloudflare Pages Functions
- No DB (LocalStorage만), (옵션) Cloudflare KV hook 가능
- Lint/Format: ESLint + Prettier

## 환경변수
Cloudflare Pages > Settings > Environment Variables 또는 로컬 `.dev.vars` 사용:
