import { ImageResponse } from "next/og";

export const alt = "Haroon Riasat, Full-Stack & AI Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#090B10",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(circle at 70% 85%, rgba(34,211,238,0.25), transparent 40%)",
          color: "#ECEEF4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#9BA2B4" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ECEEF4" }}>
            HR
          </div>
          haroonriasat.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Haroon Riasat</div>
          <div style={{ marginTop: 22, fontSize: 40, color: "#A5B4FC" }}>Full-Stack & AI Software Engineer</div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#9BA2B4" }}>RAG assistants · SaaS platforms · Turku, Finland</div>
        </div>
      </div>
    ),
    size,
  );
}
