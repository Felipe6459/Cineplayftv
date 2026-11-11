/* Cine Player Pro — atribuição de primeira indicação por 30 dias.
   O código fica no navegador do visitante e acompanha os botões do WhatsApp. */
(() => {
  "use strict";
  const STORAGE_KEY = "cineplay_partner_referral_v1";
  const TTL_MS = 30 * 24 * 60 * 60 * 1000;
  const CODE_RE = /^[A-Z0-9_-]{3,32}$/;

  function readAttribution() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!value || !CODE_RE.test(String(value.code || "")) ||
          !Number.isFinite(Number(value.firstSeenAt)) ||
          Date.now() - Number(value.firstSeenAt) > TTL_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return value;
    } catch (_) { return null; }
  }

  function captureFirstReferral() {
    const incoming = String(new URLSearchParams(location.search).get("ref") || "")
      .trim().toUpperCase();
    if (!CODE_RE.test(incoming)) return readAttribution();

    const existing = readAttribution();
    // Primeira indicação válida vence durante os 30 dias; cliques posteriores
    // em links de outros parceiros não sobrescrevem a origem já registrada.
    if (existing) return existing;

    const value = { code: incoming, firstSeenAt: Date.now() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch (_) {}
    return value;
  }

  function isWhatsAppUrl(href) {
    try {
      const host = new URL(href, location.href).hostname.toLowerCase();
      return host === "wa.me" || host.endsWith(".whatsapp.com") || host === "whatsapp.com";
    } catch (_) { return false; }
  }

  function attachCode(anchor) {
    if (!anchor || !anchor.href || !isWhatsAppUrl(anchor.href)) return;
    const attribution = readAttribution();
    if (!attribution) return;
    try {
      const url = new URL(anchor.href, location.href);
      const currentText = url.searchParams.get("text") || "";
      const marker = "Código de indicação:";
      if (currentText.includes(marker)) {
        if (!currentText.includes(attribution.code)) {
          url.searchParams.set("text", currentText + "\n" + marker + " " + attribution.code);
        }
      } else {
        url.searchParams.set("text", (currentText ? currentText + "\n\n" : "") +
          marker + " " + attribution.code);
      }
      anchor.href = url.toString();
    } catch (_) {}
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('a[href*="wa.me"],a[href*="whatsapp.com"]').forEach(attachCode);
  }

  captureFirstReferral();
  scan(document);
  document.addEventListener("click", (event) => {
    const anchor = event.target && event.target.closest ? event.target.closest("a") : null;
    if (anchor) attachCode(anchor);
  }, true);

  if (window.MutationObserver && document.documentElement) {
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('a[href*="wa.me"],a[href*="whatsapp.com"]')) attachCode(node);
            scan(node);
          }
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  window.cineplayReferralAttribution = () => readAttribution();
})();