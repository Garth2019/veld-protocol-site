import { ImageResponse } from "next/og";

export async function GET() {
  const interData = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf"
  ).then((res) => res.arrayBuffer());

  const GOLD = "#E8C766";
  const INK = "#F4F6FA";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#07090C",
          padding: "76px 84px",
          backgroundImage:
            "radial-gradient(60% 65% at 72% -10%, rgba(232,199,102,0.18), transparent 62%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 21,
            letterSpacing: 7,
            fontFamily: "Inter",
            color: "rgba(244,246,250,0.5)",
            marginBottom: 30,
          }}
        >
          AN OPEN PROTOCOL FOR AUTONOMOUS AGENTS
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, fontFamily: "Inter", color: INK, lineHeight: 1.02 }}>
          <span>Agents that</span>
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, fontFamily: "Inter", color: INK, lineHeight: 1.02 }}>
          <span>transact for&nbsp;</span>
          <span style={{ color: GOLD }}>real.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontFamily: "Inter", marginTop: 46 }}>
          <span style={{ color: GOLD }}>veldprotocol.io</span>
          <span style={{ color: "rgba(244,246,250,0.4)" }}>&nbsp;&nbsp;·&nbsp;&nbsp;Base + Celo · USDC · ERC-8004</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interData, weight: 400, style: "normal" as const },
        { name: "Inter", data: interData, weight: 700, style: "normal" as const },
      ],
    }
  );
}
