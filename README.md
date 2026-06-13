# 単語帳 · Tango

일본어 단어장 PWA. Google Sheets를 백엔드로 쓰는 정적 웹앱.

- **읽기**: Google Sheets API (읽기 전용 API Key)
- **쓰기**: Apps Script 웹앱 — ⭐ 마킹 / 단어 추가
- **단어 추가**: [hbst-agent](https://github.com/shchun/hbst-agent)의 Hermes `vocab` MCP 도구가 자연어로 시트에 기록
- 배포: GitHub Pages → https://tango.precipi.com

## 설정

정적 페이지라 설정은 두 가지 방법으로 넣는다 (우선순위: ⚙️ 모달 > config.js):

1. **앱 ⚙️ 버튼** — Spreadsheet ID / API Key / 시트 이름 / Apps Script URL 입력 (브라우저 localStorage 저장)
2. **config.js** — 로컬 개발용 파일 기반 설정
   ```sh
   cp config.js.example config.js   # 값 채우기 (config.js는 .gitignore 처리됨)
   ```

## 로컬 실행

```sh
python -m http.server 8000
# http://localhost:8000/
```

## 구조

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 전체 (UI + 로직) |
| `sw.js` | 서비스 워커 (오프라인 캐시) |
| `manifest.json` | PWA 매니페스트 |
| `icon.svg` / `icon-512.svg` | 앱 아이콘 |
| `config.js.example` | 설정 템플릿 |
| `CNAME` | GitHub Pages 커스텀 도메인 |
