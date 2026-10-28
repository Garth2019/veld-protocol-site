/**
 * Cookie consent for analytics (PECR reg 6).
 *
 * The visitor's choice is the only thing stored before they decide, and it is
 * strictly necessary: one first-party localStorage key holding the choice and
 * the day it was made — no identifier. Nothing in here touches the network.
 */

export type ConsentChoice = "accepted" | "rejected";
/** "unset" = no valid choice on record; "unknown" = server render / not yet read. */
export type ConsentState = ConsentChoice | "unset" | "unknown";

export const CONSENT_STORAGE_KEY = "veld-cookie-consent";
/** A choice older than this is treated as unmade and the banner asks again. */
export const CONSENT_MAX_AGE_DAYS = 365;

const CONSENT_CHANGE_EVENT = "veld:consent-change";
const OPEN_SETTINGS_EVENT = "veld:open-cookie-settings";
const DAY_MS = 24 * 60 * 60 * 1000;

/** Prefixes of every key PostHog writes to cookies, localStorage and sessionStorage. */
const ANALYTICS_KEY_PREFIXES = ["ph_", "__ph"] as const;

type StoredConsent = { choice: ConsentChoice; at: string };

/** In-memory fallback for browsers that block storage (private modes, strict settings). */
let memoryChoice: ConsentChoice | null = null;

function isStoredConsent(value: unknown): value is StoredConsent {
  if (typeof value !== "object" || value === null) return false;
  const { choice, at } = value as Record<string, unknown>;
  return (
    (choice === "accepted" || choice === "rejected") &&
    typeof at === "string" &&
    !Number.isNaN(Date.parse(at))
  );
}

/** The visitor's current choice, or null if they haven't made one (or it has expired). */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return memoryChoice;
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredConsent(parsed)) return memoryChoice;
    const ageMs = Date.now() - Date.parse(parsed.at);
    return ageMs > CONSENT_MAX_AGE_DAYS * DAY_MS ? null : parsed.choice;
  } catch {
    return memoryChoice;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  memoryChoice = choice;
  const record: StoredConsent = { choice, at: new Date().toISOString().slice(0, 10) };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage blocked: the in-memory choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}

/** useSyncExternalStore subscribe: fires on a choice in this tab or another tab. */
export function subscribeConsent(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function getConsentSnapshot(): ConsentState {
  return readConsent() ?? "unset";
}

export function getServerConsentSnapshot(): ConsentState {
  return "unknown";
}

/** Reopen the cookie banner (the footer "Cookie settings" control). */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(handler: () => void): () => void {
  window.addEventListener(OPEN_SETTINGS_EVENT, handler);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
}

function isAnalyticsKey(name: string): boolean {
  return ANALYTICS_KEY_PREFIXES.some((prefix) => name.startsWith(prefix));
}

function removeStorageKeys(storage: Storage): void {
  const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i)).filter(
    (key): key is string => key !== null && isAnalyticsKey(key),
  );
  keys.forEach((key) => storage.removeItem(key));
}

/** Every domain a cookie for this host could have been set on (PostHog uses the parent domain). */
function cookieDomains(hostname: string): string[] {
  const labels = hostname.split(".");
  const parents = labels.slice(1).map((_, i) => labels.slice(i + 1).join("."));
  return ["", hostname, `.${hostname}`, ...parents.filter((d) => d.includes(".")).map((d) => `.${d}`)];
}

/**
 * Delete everything PostHog stores in this browser. Used when a visitor
 * rejects or withdraws consent, and to clear cookies an earlier version of
 * the site set before asking.
 */
export function clearAnalyticsStorage(): void {
  if (typeof window === "undefined") return;
  try {
    removeStorageKeys(window.localStorage);
    removeStorageKeys(window.sessionStorage);
  } catch {
    // Storage blocked: there is nothing stored to clear.
  }
  const names = document.cookie
    .split(";")
    .map((pair) => pair.split("=")[0]?.trim() ?? "")
    .filter(isAnalyticsKey);
  const domains = cookieDomains(window.location.hostname);
  names.forEach((name) => {
    domains.forEach((domain) => {
      const domainAttr = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttr}; SameSite=Lax`;
    });
  });
}
