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
