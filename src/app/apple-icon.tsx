import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Apple touch icon — the gold-block "v" mark rendered to PNG from icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const svg = readFileSync(join(process.cwd(), "src/app/icon.svg"), "utf-8");
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#07090C" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUri} alt="" width={180} height={180} />
      </div>
    ),
    { ...size }
  );
}
