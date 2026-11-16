import { isMockMode, mockPlayback } from "@/lib/bff";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const videoId = String(body?.videoId || "").trim();
  if (!videoId) return NextResponse.json({ error: "videoId required" }, { status: 400 });
  if (isMockMode()) {
    return NextResponse.json(mockPlayback(videoId), { headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(
    { error: "Live Videocrypt keys not configured in this sample. Set MOCK_VIDEOCRYPT=1 or provide keys." },
    { status: 501 },
  );
}
