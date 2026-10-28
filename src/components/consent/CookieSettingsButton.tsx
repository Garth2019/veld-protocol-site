"use client";

import { openCookieSettings } from "@/lib/consent";

/** Footer control that reopens the cookie banner so a visitor can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}
