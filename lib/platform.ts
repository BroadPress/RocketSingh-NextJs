export type ClientPlatform = "android" | "ios" | "desktop";

/** Detects the visitor's client platform from the user agent. */
export function detectClientPlatform(
  userAgent = typeof navigator !== "undefined" ? navigator.userAgent : ""
): ClientPlatform {
  const ua = userAgent;

  if (/android/i.test(ua)) return "android";

  // iPhone / iPod / iPad (including iPadOS desktop UA with touch)
  if (/iPhone|iPod|iPad/i.test(ua)) return "ios";
  if (
    typeof navigator !== "undefined" &&
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1
  ) {
    return "ios";
  }

  return "desktop";
}
