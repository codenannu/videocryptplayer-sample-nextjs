const CORS_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4200",
  "http://127.0.0.1:4200",
]);

export function isMockMode() {
  const forced = process.env.MOCK_VIDEOCRYPT;
  if (forced === "0") return false;
  if (forced === "1") return true;
  return !(
    process.env.VIDEOCRYPT_ACCESS_KEY &&
    process.env.VIDEOCRYPT_SECRET_KEY &&
    process.env.VIDEOCRYPT_ACCOUNT_ID
  );
}

export function mockPlayback(videoId: string) {
  return {
    fileUrl: `https://example.com/mock/${encodeURIComponent(videoId)}.mpd`,
    token: `mock-${videoId}`,
    siteId: "MOCKSITE",
    mock: true,
  };
}

/** Reflect allowlisted Origin for React (:5173) and Angular (:4200) samples. */
export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin")?.trim() || "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, pallycon-customdata-v2",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin && CORS_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

export function jsonWithCors(
  request: Request,
  body: unknown,
  init?: { status?: number },
) {
  return Response.json(body, {
    status: init?.status ?? 200,
    headers: corsHeaders(request),
  });
}

export function emptyCors(request: Request, status = 204) {
  return new Response(null, { status, headers: corsHeaders(request) });
}
