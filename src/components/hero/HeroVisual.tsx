"use client";

import dynamic from "next/dynamic";
import { NodeGraphDiagram } from "./NodeGraphDiagram";

/**
 * Hero visual — Unicorn Studio WebGL scene with SVG fallback.
 *
 * Loads the Unicorn Studio runtime only on the client (never SSR) so
 * WebGL/canvas initialisation can't break hydration or server rendering.
 * While the scene is loading — or if WebGL is unavailable, the user
 * prefers reduced motion, or the CDN is blocked — the lightweight
 * `NodeGraphDiagram` SVG is shown as a placeholder instead.
 *
 * ── Brand blending ─────────────────────────────────────────────
 * The upstream Unicorn scene renders on a dark canvas in a blue /
 * cyan palette, which reads as a visible "black box" on Veld's
 * forest-green background. Two CSS-only tricks stitch it into the
 * site without re-authoring the scene:
 *
 *   1. `filter: hue-rotate(...) saturate(...) brightness(...)`
 *      Shifts the blue hues ~100° around the wheel toward Veld
 *      forest-green (#2D6A4F) and gold (#B69121). Saturation is
 *      pulled back a touch so the colours don't feel synthetic.
 *
 *   2. `mask-image: radial-gradient(...)`
 *      Fades the canvas edges to transparent so there's no hard
 *      rectangular border against the page background — the scene
 *      appears to float inside the hero instead of sitting in a box.
 *
 * Long-term, the cleaner fix is to edit the scene directly in the
 * Unicorn Studio editor and re-export with the Veld palette baked
 * in. The filter approach here is a shippable quick-fix.
 *
 * Provider: Unicorn Studio (project ID below).
 * Docs: https://www.npmjs.com/package/unicornstudio-react
 *
 * To swap in a new scene, edit `UNICORN_PROJECT_ID` below with your new
 * project's ID from the Unicorn Studio dashboard.
 */

const UNICORN_PROJECT_ID = "GHP77NxCXCsFz0gimkup";

// Dynamic import — `ssr: false` so the WebGL runtime only runs in the browser.
const UnicornScene = dynamic(
  () => import("unicornstudio-react").then((mod) => mod.UnicornScene),
  {
    ssr: false,
    loading: () => <NodeGraphDiagram />,
  }
);

export function HeroVisual() {
  return (
    <div
      className="relative w-full aspect-[16/10]"
      style={{
        // (1) Colour shift — blue palette → Veld forest-green + gold.
        //     ~100° negative rotation moves blue (~220°) onto green (~120°).
        filter:
          "hue-rotate(-100deg) saturate(0.85) brightness(0.95) contrast(1.05)",
        // (2) Screen blend — dark canvas pixels (≈ 0,0,0) merge into the
        //     veld-dark page background, killing the visible rectangle.
        //     Bright green / gold values lighten slightly, which reads as
        //     a soft glow instead of a boxed-in image.
        mixBlendMode: "screen",
        // (3) Edge fade — softens the canvas rim so any bright pixels at
        //     the extreme edges don't bleed into the page as hard corners.
        WebkitMaskImage:
          "radial-gradient(ellipse 100% 95% at center, black 55%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 100% 95% at center, black 55%, transparent 100%)",
      }}
    >
      <UnicornScene
        projectId={UNICORN_PROJECT_ID}
        width="100%"
        height="100%"
        scale={1}
        dpi={1.5}
        lazyLoad={false}
        production
        ariaLabel="Veld Protocol — animated settlement network"
        placeholder={
          <div className="absolute inset-0 flex items-center justify-center">
            <NodeGraphDiagram />
          </div>
        }
        onError={(err) => {
          // eslint-disable-next-line no-console
          console.warn("[HeroVisual] Unicorn scene failed to load:", err);
        }}
      />
    </div>
  );
}
