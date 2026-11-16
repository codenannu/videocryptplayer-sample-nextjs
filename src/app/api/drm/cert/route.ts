import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function GET(request: Request) {
  const siteId = new URL(request.url).searchParams.get("siteId") || "";
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(siteId)) {
    return NextResponse.json({ error: "invalid siteId" }, { status: 400 });
  }
  const upstream = await fetch(
    `https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=${encodeURIComponent(siteId)}`,
  );
  return new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: { "Cache-Control": "no-store", "Content-Type": "text/plain" },
  });
}
