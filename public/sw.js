// Serves the static export under Capacitor, where only files exist (no Next server):
// 1. Dynamic routes (/movie/<id>, /tv/<id>, ...) are rewritten onto the prerendered id=1
//    shells — the export has no files for arbitrary ids.
// 2. Nested segment payloads requested dot-joined (__next.auth.__PAGE__.txt) exist on disk
//    as directories (__next.auth/__PAGE__.txt) — retried in slash form.
const mapPath = (p) => {
  let m = p.match(/^\/movie\/([^/]+)(\/.*)?$/);
  if (m && m[1] !== "1") return "/movie/1" + (m[2] || "");
  m = p.match(/^\/tv\/([^/]+)\/([^/]+)\/([^/]+)(\/player.*)$/);
  if (m) return "/tv/1/1/1" + m[4];
  m = p.match(/^\/tv\/([^/]+)(\/.*)?$/);
  if (m && m[1] !== "1") return "/tv/1" + (m[2] || "");
  return null;
};

const slashForm = (path) => {
  const m = path.match(/^(.*\/)(__next\.[^.]+)\.(.+)\.txt$/);
  if (!m) return null;
  return `${m[1]}${m[2]}/${m[3].split(".").join("/")}.txt`;
};

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const mapped = mapPath(url.pathname);
  const isTxt = url.pathname.endsWith(".txt");
  if (!mapped && !isTxt) return;
  // Extensionless paths are directory requests → serve the index file.
  const path = mapped || url.pathname;
  const isFile = path.split("/").pop().includes(".");
  const primary = isFile ? path : path.replace(/\/*$/, "/index.html");
  const candidates = [primary, isFile ? slashForm(primary) : null];
  event.respondWith(
    (async () => {
      for (const candidate of candidates) {
        if (!candidate) continue;
        try {
          const res = await fetch(candidate + url.search, {
            method: req.method,
            headers: req.headers,
          });
          if (res.ok) return res;
        } catch (_) {}
      }
      return fetch(req); // nothing resolved → original request (server fallback)
    })(),
  );
});
