"use client";

import { useMemo, useState } from "react";
import { VideocryptPlayerWithControls } from "@codenkay/video-videocrypt-ui";
import "@codenkay/video-videocrypt-ui/styles.css";
import "video.js/dist/video-js.css";

type Mode = "drm" | "clear";

export function Playground() {
  const [videoId, setVideoId] = useState("demo-video");
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("drm");
  const [error, setError] = useState("");
  const [watchTime, setWatchTime] = useState(0);

  const playback = useMemo(
    () => ({
      getSource: async (ctx: {
        videoId: string;
        dType: 0 | 1 | 2 | 3;
        deviceId: string;
        deviceName: string;
        version: string;
      }) => {
        if (mode === "clear") {
          return {
            fileUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            protection: "none" as const,
          };
        }
        const res = await fetch("/api/playback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            videoId: ctx.videoId,
            deviceType: ctx.dType,
            deviceId: ctx.deviceId,
            deviceName: ctx.deviceName,
            version: ctx.version,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "failed");
        return {
          fileUrl: json.fileUrl as string,
          token: json.token as string,
          siteId: json.siteId as string | undefined,
          protection: "drm" as const,
        };
      },
    }),
    [mode],
  );

  return (
    <main style={{ maxWidth: 960, margin: "2rem auto", fontFamily: "system-ui", padding: 16 }}>
      <h1>Videocrypt Next.js sample BFF</h1>
      <p style={{ color: "#64748b" }}>
        Port 3001. DRM uses this app&apos;s <code>/api/playback</code> +{" "}
        <code>/api/drm/*</code>. Clear mode skips EME.
      </p>

      <label>
        Mode{" "}
        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="drm">DRM via BFF</option>
          <option value="clear">Clear MP4</option>
        </select>
      </label>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          disabled={mode === "clear"}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={() => {
            setError("");
            setActive(mode === "clear" ? "clear-demo" : videoId.trim());
          }}
        >
          Play
        </button>
      </div>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      {watchTime > 0 ? (
        <p style={{ color: "#64748b", fontSize: 13 }}>watchTime: {watchTime.toFixed(1)}s</p>
      ) : null}

      {active ? (
        <div style={{ marginTop: 16 }}>
          <VideocryptPlayerWithControls
            key={`${active}:${mode}`}
            videoId={active}
            playback={playback}
            audioAvailable={false}
            drmMode={mode === "clear" ? "none" : "auto"}
            licenseUrl="/api/drm/license"
            certUrlBuilder={(siteId) =>
              `/api/drm/cert?siteId=${encodeURIComponent(siteId)}`
            }
            onWatchTime={setWatchTime}
            onError={(err) => setError(err.message)}
          />
        </div>
      ) : null}
    </main>
  );
}
