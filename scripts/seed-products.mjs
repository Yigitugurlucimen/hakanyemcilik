import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const loadEnvFile = (fileName) => {
  const filePath = join(rootDir, fileName);
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
};

loadEnvFile(".env");
loadEnvFile(".env.local");

const { products } = await import(
  new URL("../src/data/products.js", import.meta.url).href
);

const { productImageBySlug } = await import(
  new URL("../src/data/productImages.js", import.meta.url).href
);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Eksik degisken: VITE_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY (.env dosyasinda) gerekli."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const rows = products.map((product) => ({
  slug: product.slug,
  name: product.name,
  category: product.category || "",
  stock: product.stock || "Stokta",
  campaign: product.campaign || null,
  tags: product.tags || [],
  purpose: product.purpose || "",
  dosage: product.dosage || "",
  details: product.details || "",
  period: product.period || "",
  content: product.content || "",
  usage_plan: product.usagePlan || "",
  caution: product.caution || "",
  price: null,
  image_url: productImageBySlug[product.slug] || null,
  is_active: true,
  sort_order: 0
}));

const { error } = await supabase.from("products").upsert(rows, { onConflict: "slug" });

if (error) {
  console.error("Seed hatasi:", error.message);
  process.exit(1);
}

console.log(`${rows.length} urun Supabase'e aktarildi.`);
