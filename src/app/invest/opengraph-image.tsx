import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const alt = "Invest in Nairobi Short-Term Rentals | Elite Stays Africa"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(34, 197, 94, 0.15)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "24px",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          <span style={{ color: "#4ade80", fontSize: 16, fontWeight: 600 }}>Elite Stays Africa · Nairobi</span>
        </div>

        {/* Title */}
        <div style={{ color: "#ffffff", fontSize: 52, fontWeight: 800, lineHeight: 1.15, marginBottom: "16px", display: "flex" }}>
          Invest in Nairobi
        </div>
        <div style={{ color: "#ffffff", fontSize: 52, fontWeight: 800, lineHeight: 1.15, marginBottom: "32px", display: "flex" }}>
          Short-Term Rentals
        </div>

        {/* Subtitle */}
        <div style={{ color: "#9ca3af", fontSize: 24, lineHeight: 1.5, marginBottom: "48px", maxWidth: "800px", display: "flex" }}>
          Fully managed Airbnb investment. We furnish, list, and optimize — you collect monthly payouts.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#4ade80", fontSize: 48, fontWeight: 800 }}>85%+</span>
            <span style={{ color: "#6b7280", fontSize: 16 }}>Occupancy</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fbbf24", fontSize: 48, fontWeight: 800 }}>4.92★</span>
            <span style={{ color: "#6b7280", fontSize: 16 }}>Guest Rating</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 48, fontWeight: 800 }}>12–17%</span>
            <span style={{ color: "#6b7280", fontSize: 16 }}>Annual Yields</span>
          </div>
        </div>

        {/* Brand */}
        <div style={{ position: "absolute", bottom: 40, right: 80, color: "#4b5563", fontSize: 18, fontWeight: 600, display: "flex" }}>
          elitestaysafrica.com
        </div>
      </div>
    ),
    { ...size }
  )
}
