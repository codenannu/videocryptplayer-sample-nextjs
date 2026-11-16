import { emptyCors, isMockMode, jsonWithCors, mockPlayback } from "@/lib/bff";

export async function OPTIONS(request: Request) {
  return emptyCors(request);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const videoId = String(body?.videoId || "").trim();
  if (!videoId) {
    return jsonWithCors(request, { error: "videoId required" }, { status: 400 });
  }
  if (isMockMode()) {
    return jsonWithCors(request, mockPlayback(videoId));
  }
  return jsonWithCors(
    request,
    {
      error:
        "Live Videocrypt keys not configured in this sample. Set MOCK_VIDEOCRYPT=1 or provide keys.",
    },
    { status: 501 },
  );
}
