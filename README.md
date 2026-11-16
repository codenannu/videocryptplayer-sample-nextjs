# Videocrypt Player — Next.js BFF sample

Public playground with a **thin App Router BFF** + full React control chrome for Videocrypt DRM playback.

| | |
|--|--|
| Port | **3001** |
| Sample version | **1.2.0** |
| Repo | [videocryptplayer-sample-nextjs](https://github.com/codenannu/videocryptplayer-sample-nextjs) |
| SDK | `@codenkay/video-videocrypt-ui` · `react` · `core` (**^1.2.0**) |
| Modes | **DRM via BFF** (mock when keys absent) · **clear MP4** |

## Runtime stack

| Layer | Version |
|-------|---------|
| Node.js | **>=20.9.0** |
| Next.js | **16.4.6** (Active LTS) |
| React / react-dom | **19.3.1** |
| Zod | ^4.6.7 |
| Video.js | ^7.21.5 |
| SDK | `@codenkay/video-videocrypt-*@^1.2.0` |

> This sample is **standalone**. It does **not** require cloning a private SDK monorepo. Prefer **npm** packages (`^1.2.0`). The product demo lives in the private monorepo `apps/demo` — this sample is the customer-facing BFF lab.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## SDK packages

| Package | Role | Used here |
|---------|------|-----------|
| [`@codenkay/video-videocrypt-core`](https://www.npmjs.com/package/@codenkay/video-videocrypt-core) | DRM / clear engine | Yes |
| [`@codenkay/video-videocrypt-react`](https://www.npmjs.com/package/@codenkay/video-videocrypt-react) | Headless React player | Yes |
| [`@codenkay/video-videocrypt-ui`](https://www.npmjs.com/package/@codenkay/video-videocrypt-ui) | Control chrome | **Primary UI** |
| [`@codenkay/video-videocrypt-angular`](https://www.npmjs.com/package/@codenkay/video-videocrypt-angular) | Angular headless | No — see [Angular sample](https://github.com/codenannu/videocryptplayer-sample-angular) |

## Related samples

| Sample | Repository | Port | Purpose |
|--------|------------|------|---------|
| React | [videocryptplayer-sample-react](https://github.com/codenannu/videocryptplayer-sample-react) | **5173** | UI client against this BFF |
| **This repo** | [videocryptplayer-sample-nextjs](https://github.com/codenannu/videocryptplayer-sample-nextjs) | **3001** | Thin BFF + UI playground |
| Angular | [videocryptplayer-sample-angular](https://github.com/codenannu/videocryptplayer-sample-angular) | **4200** | Headless; BFF mode targets this origin |

CORS allowlist (route handlers): `http://localhost:5173` and `http://localhost:4200`.

## Quick start (mock — no secrets)

```bash
git clone https://github.com/codenannu/videocryptplayer-sample-nextjs.git
cd videocryptplayer-sample-nextjs
npm install
npm run dev
```

Requires Node.js **>=20.9.0**. Open http://localhost:3001 — enter a video ID → **Play** (mock credentials when Videocrypt keys are absent).

## Real Videocrypt keys

```bash
cp .env.example .env.local
# set VIDEOCRYPT_ACCESS_KEY / SECRET_KEY / ACCOUNT_ID — never NEXT_PUBLIC_*
npm run dev
```

## BFF routes

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/playback` | Credentials (`fileUrl`, `token`, `siteId?`) |
| `POST` | `/api/drm/license` | License proxy (`Cache-Control: no-store`) |
| `GET` | `/api/drm/cert?siteId=` | FairPlay cert proxy (`no-store`) |

## Install peers (into your own app)

```bash
npm install @codenkay/video-videocrypt-ui@^1.2.0 @codenkay/video-videocrypt-react@^1.2.0 @codenkay/video-videocrypt-core@^1.2.0 video.js@^7.21.5 videojs-contrib-eme@^3.11.1 react@19.3.1 react-dom@19.3.1 next@16.4.6
```

Wire `playback.getSource`, `licenseUrl`, and `certUrlBuilder` to **your** BFF (copy patterns from `src/app/api/**`).
