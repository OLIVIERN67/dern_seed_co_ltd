/**
 * Google Analytics 4 integration.
 *
 * Enabled only when VITE_GA_MEASUREMENT_ID is set (e.g. "G-XXXXXXXXXX").
 * When the ID is absent (development or not configured), every function is a
 * safe no-op, so the app never breaks because of analytics.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID: string = import.meta.env.VITE_GA_MEASUREMENT_ID ?? "";

let initialized = false;

export function initAnalytics(): void {
  if (initialized || !GA_MEASUREMENT_ID) return;
  initialized = true;

  // Inject the gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });
}

/** Track a client-side route change (SPA navigation). */
export function trackPageView(path: string): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Track a custom event (e.g. CTA clicks, form submissions). */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", name, params ?? {});
}
