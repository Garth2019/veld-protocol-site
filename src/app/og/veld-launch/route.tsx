import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

const markSvg = readFileSync(
  join(process.cwd(), "public/Brand/veld-mark-mono-white.svg"),
  "utf-8"
);
const markDataUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;

export async function GET() {
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0F1A12",
          padding: "80px",
          gap: "60px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markDataUri} alt="" width={220} height={180} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              fontFamily: "Inter",
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            The settlement layer for AI agent commerce
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              fontFamily: "Inter",
              color: "#52B788",
              marginTop: 24,
            }}
          >
            veldprotocol.io
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontData, weight: 700, style: "normal" as const },
      ],
    }
  );
}
