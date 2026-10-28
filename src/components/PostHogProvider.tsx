"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { PostHogInterface } from "posthog-js";
import {
  clearAnalyticsStorage,
  readConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * PostHog analytics, gated on cookie consent (PECR reg 6).
 *
 * posthog-js is not downloaded, initialised or allowed to touch cookies or
 * storage until the visitor chooses "Accept" in the cookie banner. A visitor
 * who rejects — or later withdraws via "Cookie settings" — has every PostHog
 * cookie and storage key removed.
 */

let client: PostHogInterface | null = null;
let loading = false;

function capturePageview(posthog: PostHogInterface) {
  posthog.capture("$pageview", { $current_url: window.location.href });
}

function loadPostHog() {
  if (client || loading) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return;

  loading = true;
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        capture_pageleave: true,
        loaded: (instance) => {
          client = instance;
          // The page the visitor accepted on (or landed on, if they accepted before).
          capturePageview(instance);
        },
      });
    })
    .catch((error: unknown) => {
      loading = false;
      console.error("[analytics] PostHog failed to load", error);
    });
}

function applyConsent() {
  const choice = readConsent();
  if (choice === "accepted") {
    whenIdleAfterLoad(loadPostHog);
    return;
  }
  // No choice yet, rejected, or withdrawn: nothing from PostHog may stay behind.
  clearAnalyticsStorage();
  if (client || loading) {
    // PostHog is live in this page — a reload is the only way to be sure it stops writing.
    window.location.reload();
  }
}

/** Analytics never competes with the first paint: load once the page has loaded and the main thread is idle. */
function whenIdleAfterLoad(task: () => void) {
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(task, { timeout: 3000 });
    else window.setTimeout(task, 300);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // The first pageview is sent from `loaded`; this covers client-side navigation.
    if (client) capturePageview(client);
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyConsent();
    return subscribeConsent(applyConsent);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </>
  );
}
