import { corsHeaders, emptyCors, jsonWithCors } from "@/lib/bff";

export async function OPTIONS(request: Request) {
  return emptyCors(request);
}

export async function GET(request: Request) {
  const siteId = new URL(request.url).searchParams.get("siteId") || "";
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(siteId)) {
    return jsonWithCors(request, { error: "invalid siteId" }, { status: 400 });
  }
  const upstream = await fetch(
    `https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=${encodeURIComponent(siteId)}`,
  );
  const headers = new Headers(corsHeaders(request));
  headers.set("Content-Type", "text/plain");
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers,
  });
}
