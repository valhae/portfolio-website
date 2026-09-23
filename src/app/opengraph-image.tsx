import { ImageResponse } from "next/og"
import { profile } from "@/lib/content/profile"

export const alt = `${profile.shortName} — Creative Developer & Full-Stack Developer`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Generated at build time — one less binary asset to keep in the repository. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          <span>Portfolio</span>
          <span>Philippines</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 132, lineHeight: 1, letterSpacing: -4 }}>
            MAR VALLADA
          </div>
          <div style={{ fontSize: 28, letterSpacing: 10, opacity: 0.75 }}>
            CREATIVE DEVELOPER · FULL-STACK DEVELOPER
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, opacity: 0.6 }}>
          {profile.statement}
        </div>
      </div>
    ),
    size,
  )
}
