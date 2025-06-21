// src/utils/color.ts
function getColorEnabled() {
  const { process, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process !== void 0 ? "NO_COLOR" in process?.env : false;
  return !isNoColor;
}
async function getColorEnabledAsync() {
  const { navigator } = globalThis;
  const isNoColor = navigator !== void 0 && navigator.userAgent === "Cloudflare-Workers" ? "NO_COLOR" in ((await import("cloudflare:workers")).env ?? {}) : !getColorEnabled();
  return !isNoColor;
}
export {
  getColorEnabled,
  getColorEnabledAsync
};
