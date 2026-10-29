"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  onOpenCookieSettings,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import "./cookie-banner.css";

/**
 * The cookie choice. Shown until the visitor accepts or rejects, and again
 * whenever they use "Cookie settings" in the footer. Reject sits beside
 * Accept with the same size and weight. Not rendered on the server, so it
 * never appears in the HTML of a visitor who has already chosen.
 */
export function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => onOpenCookieSettings(() => setSettingsOpen(true)), []);

  useEffect(() => {
    if (settingsOpen) headingRef.current?.focus();
  }, [settingsOpen]);

  if (consent === "unknown" || (consent !== "unset" && !settingsOpen)) return null;

  const choose = (choice: ConsentChoice) => {
    setSettingsOpen(false);
    writeConsent(choice);
  };

  return (
    <section aria-labelledby="cookie-banner-title" className="cookie-banner">
      <div className="cookie-banner__card">
        <h2 id="cookie-banner-title" ref={headingRef} tabIndex={-1} className="cookie-banner__title">
          Can we use analytics cookies?
        </h2>
        <p className="cookie-banner__text">
          With your permission, PostHog sets cookies to count visits and show us which pages are
          useful. Nothing is set unless you choose Accept, and you can change your mind at any
          time with Cookie settings at the foot of every page.{" "}
          {/* A full page load, not next/link: from the homepage a client-side hop would
              carry its unlayered CSS reset onto the notice page. */}
          <a href="/cookies" className="cookie-banner__link">
            Cookie notice
          </a>
        </p>
        {consent !== "unset" && (
          <p className="cookie-banner__text">
            Your current choice: <strong>{consent === "accepted" ? "accepted" : "rejected"}</strong>.
          </p>
        )}
        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__btn" onClick={() => choose("rejected")}>
            Reject
          </button>
          <button type="button" className="cookie-banner__btn" onClick={() => choose("accepted")}>
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
