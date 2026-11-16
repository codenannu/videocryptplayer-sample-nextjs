import { corsHeaders, emptyCors, jsonWithCors } from "@/lib/bff";

export async function OPTIONS(request: Request) {
  return emptyCors(request);
}

export async function POST(request: Request) {
  const customData = request.headers.get("pallycon-customdata-v2");
  if (!customData) {
    return jsonWithCors(request, { error: "missing customdata" }, { status: 400 });
  }
  const upstream = await fetch("https://license.videocrypt.com/validateLicense", {
    method: "POST",
    headers: {
      "Content-Type":
        request.headers.get("content-type") || "application/octet-stream",
      "pallycon-customdata-v2": customData,
    },
    body: await request.arrayBuffer(),
  });
  return new Response(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: corsHeaders(request),
  });
}
