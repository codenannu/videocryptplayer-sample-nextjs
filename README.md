# videocryptplayer-nextjs

Thin BFF + playground on port **3001** (CORS for :5173 / :4200).

## Routes

- `POST /api/playback` — credentials (mock when Videocrypt keys absent)
- `POST /api/drm/license` — license proxy (`Cache-Control: no-store`)
- `GET /api/drm/cert` — FairPlay cert proxy

## Playground

- DRM via this BFF
- Clear progressive MP4 (`drmMode="none"`)
- `onWatchTime` + UI CSS + Video.js CSS

```bash
cd ../videocrypt-player && npm run build:packages
cd ../videocryptplayer-nextjs
npm install
npm run dev
```
