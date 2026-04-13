/**
 * Sentry error tracking — initialised lazily on first error.
 *
 * Set NEXT_PUBLIC_SENTRY_DSN in environment to enable.
 * Until the DSN is configured, errors are logged to console only.
 */

let sentryInitialised = false;

export async function captureException(error: unknown) {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    console.error("[Sentry disabled]", error);
    return;
  }

  if (!sentryInitialised) {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
    sentryInitialised = true;
  }

  const Sentry = await import("@sentry/nextjs");
  Sentry.captureException(error);
}
