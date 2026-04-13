"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let posthogLoaded = false;

function loadPostHog() {
  if (posthogLoaded) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return;

  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
    });
    posthogLoaded = true;
  });
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    import("posthog-js").then(({ default: posthog }) => {
      if (posthog.__loaded) {
        posthog.capture("$pageview", {
          $current_url: `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
        });
      }
    });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadPostHog();
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
