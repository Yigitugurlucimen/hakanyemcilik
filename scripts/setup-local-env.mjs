/**
 * Yeni bilgisayarda .env olusturur: canli GitHub Pages build'inden public ayarlari okur.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const envPath = join(rootDir, ".env");

const SITE_CANDIDATES = [
  "https://yigitugurlucimen.github.io/hakanyemcilik",
  "https://hakanyemcilik.com",
];

const fetchText = async (url) => {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
};

const decodeJwtRole = (token) => {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8")
    );
    return payload.role || null;
  } catch {
    return null;
  }
};

const extractFromBundle = (js) => {
  const projectUrls = [
    ...new Set(
      [...js.matchAll(/https:\/\/[a-z0-9-]+\.supabase\.co/gi)].map((m) =>
        m[0].toLowerCase()
      )
    ),
  ].filter((u) => !u.includes("storage.supabase"));

  const url = projectUrls[0];

  const tokens = [...js.matchAll(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g)].map(
    (m) => m[0]
  );
  const publishable = [...js.matchAll(/sb_publishable_[A-Za-z0-9_-]+/g)].map((m) => m[0]);
  const anonKey =
    publishable[0] ||
    tokens.find((t) => decodeJwtRole(t) === "anon") ||
    tokens.find((t) => decodeJwtRole(t) === "service_role") ||
    tokens[0];

  return { url, anonKey, projectUrls, tokenCount: tokens.length };
};

const resolveBundleUrl = (siteBase, html) => {
  const rel = html.match(/src="\.\/assets\/(index-[^"]+\.js)"/);
  if (rel) return `${siteBase}/assets/${rel[1]}`;
  return null;
};

const main = async () => {
  let lastError = null;

  for (const siteBase of SITE_CANDIDATES) {
    try {
      console.log(`Deneniyor: ${siteBase}`);
      const html = await fetchText(`${siteBase}/`);
      const bundleUrl = resolveBundleUrl(siteBase, html);
      if (!bundleUrl) throw new Error("JS bundle yolu bulunamadi.");
      const bundle = await fetchText(bundleUrl);
      const { url, anonKey } = extractFromBundle(bundle);

      if (!url && !anonKey) {
        throw new Error("Ne URL ne anahtar bulunamadi.");
      }

      let adminEmails = "info@hakanyemcilik.com";
      if (existsSync(envPath)) {
        const existing = readFileSync(envPath, "utf8");
        const adminMatch = existing.match(/^VITE_ADMIN_EMAILS=(.+)$/m);
        if (adminMatch && !adminMatch[1].includes("your_") && adminMatch[1].trim()) {
          adminEmails = adminMatch[1].trim();
        }
      }

      const lines = [
        `# Otomatik olusturuldu: npm run setup:local (${new Date().toISOString().slice(0, 10)})`,
        `# Kaynak: ${siteBase}`,
        url ? `VITE_SUPABASE_URL=${url}` : "# VITE_SUPABASE_URL= (bulunamadi)",
        anonKey
          ? `VITE_SUPABASE_ANON_KEY=${anonKey}`
          : "# VITE_SUPABASE_ANON_KEY= (bulunamadi — Supabase Dashboard > API)",
        "",
        `VITE_ADMIN_EMAILS=${adminEmails}`,
        "",
        "# SUPABASE_SERVICE_ROLE_KEY= (seed icin; Dashboard > API > service_role)",
      ];

      writeFileSync(envPath, `${lines.join("\n")}\n`, "utf8");
      console.log(`Tamam: ${envPath}`);
      if (url) console.log(`  URL: ${url}`);
      if (anonKey) console.log("  ANON_KEY: yazildi");
      if (!anonKey) console.log("  ANON_KEY: bulunamadi — Supabase panelinden gerekli");
      if (!url || !anonKey) process.exit(2);
      return;
    } catch (err) {
      lastError = err;
      console.warn(`  Atlandi: ${err.message}`);
    }
  }

  throw lastError || new Error("Hicbir kaynaktan ayar alinamadi.");
};

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
