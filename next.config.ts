import type { NextConfig } from "next";

/**
 * Sample BFF on Next.js 16. Avoid custom webpack() so Turbopack works for
 * `next dev`. CORS for React (:5173) and Angular (:4200) is applied in
 * `src/lib/bff.ts` / route handlers (Origin allowlist).
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: [
    "@codenkay/video-videocrypt-core",
    "@codenkay/video-videocrypt-react",
    "@codenkay/video-videocrypt-ui",
  ],
};

export default nextConfig;
