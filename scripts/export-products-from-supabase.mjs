import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const loadEnvFile = (fileName) => {
  const filePath = join(rootDir, fileName);
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, "utf8").split("\n")) {
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

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const apiKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !apiKey) {
  console.error(
    "Eksik degisken: VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY (veya SUPABASE_SERVICE_ROLE_KEY) gerekli."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, apiKey);

const { data: rows, error } = await supabase
  .from("products")
  .select("*")
  .eq("is_active", true)
  .order("sort_order", { ascending: true })
  .order("name", { ascending: true });

if (error) {
  console.error("Supabase okuma hatasi:", error.message);
  process.exit(1);
}

if (!rows?.length) {
  console.error("Aktif urun bulunamadi.");
  process.exit(1);
}

const rowToStaticProduct = (row) => {
  const product = {
    slug: row.slug,
    name: row.name,
    category: row.category || "",
    stock: row.stock || "Stokta",
    purpose: row.purpose || "",
    dosage: row.dosage || "",
    details: row.details || "",
    period: row.period || "",
    content: row.content || "",
    usagePlan: row.usage_plan || "",
    caution: row.caution || ""
  };

  if (row.campaign) product.campaign = row.campaign;
  if (row.tags?.length) product.tags = row.tags;
  if (row.price != null && !Number.isNaN(Number(row.price))) {
    product.price = Number(row.price);
  }

  return product;
};

const products = rows.map(rowToStaticProduct);
const productImageBySlug = {};

for (const row of rows) {
  if (row.image_url) {
    productImageBySlug[row.slug] = row.image_url;
  }
}

const productsPath = join(rootDir, "src", "data", "products.js");
const imagesPath = join(rootDir, "src", "data", "productImages.js");

const productsFile = `export const whatsappNumber = "905325506871";\n\nexport const products = ${JSON.stringify(products, null, 2)};\n`;

const imagesFile = `export const productImageBySlug = ${JSON.stringify(productImageBySlug, null, 2)};\n`;

writeFileSync(productsPath, productsFile, "utf8");
writeFileSync(imagesPath, imagesFile, "utf8");

const pricedCount = products.filter((product) => product.price != null).length;

console.log(`${products.length} urun products.js dosyasina yazildi.`);
console.log(`${pricedCount} urunde fiyat var.`);
console.log(`${Object.keys(productImageBySlug).length} urun gorseli productImages.js dosyasina yazildi.`);
