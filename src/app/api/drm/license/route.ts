import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  const customData = request.headers.get("pallycon-customdata-v2");
  if (!customData) {
    return NextResponse.json({ error: "missing customdata" }, { status: 400 });
  }
  const upstream = await fetch("https://license.videocrypt.com/validateLicense", {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/octet-stream",
      "pallycon-customdata-v2": customData,
    },
    body: await request.arrayBuffer(),
  });
  return new NextResponse(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: { "Cache-Control": "no-store" },
  });
}
