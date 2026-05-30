import { createClient } from "@supabase/supabase-js";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const sourceRoot = join(rootDir, "public", "product-images");
const outputRoot = join(rootDir, "public", "product-images", "by-slug");

const loadEnvFile = (fileName) => {
  const filePath = join(rootDir, fileName);
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
};

loadEnvFile(".env");
loadEnvFile(".env.local");

const normalizeFolderName = (name) =>
  name
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

const findBrandFolder = (fragment) => {
  const folders = readdirSync(sourceRoot).filter((name) => {
    const full = join(sourceRoot, name);
    return statSync(full).isDirectory() && name !== "by-slug";
  });
  const needle = normalizeFolderName(fragment);
  return folders.find((name) => normalizeFolderName(name).includes(needle));
};

const brandFolders = {
  roehnfried: findBrandFolder("hnfried") || findBrandFolder("rohn"),
  versele: findBrandFolder("versele"),
  mengvit: findBrandFolder("mengvit"),
  vitaturka: findBrandFolder("taturka"),
  brockamp: findBrandFolder("brockamp"),
  natural: findBrandFolder("natural")
};

const src = (brandKey, fileName) => {
  const folder = brandFolders[brandKey];
  if (!folder) throw new Error(`Marka klasoru bulunamadi: ${brandKey}`);
  return join(sourceRoot, folder, fileName);
};

/**
 * Her urun icin tek kaynak: yerel dosya [brandKey, fileName] veya { external: url }
 * Etiket okunarak dogrulandi (Mart 2026).
 */
const productImageSources = {
  // —— Röhnfried (etiket adiyla eslesen dosyalar) ——
  "roehnfried-gervit-w": ["roehnfried", "gervit-w.png"],
  "roehnfried-sedochol": ["roehnfried", "sedochol.png"],
  "roehnfried-carni-speed": ["roehnfried", "carnispeed.PNG"],
  "roehnfried-moorgold": ["roehnfried", "moorgold.jpg"],
  "roehnfried-elektrolyt-3plus": ["roehnfried", "Elektrolyt 3Plus.jpg"],
  "roehnfried-bt-amin-forte": ["roehnfried", "Bt-Amin Forte.png"],
  "roehnfried-entrobac": ["roehnfried", "Entrobac.jpg"],
  "roehnfried-ro-200-ready": ["roehnfried", "RO 200ready.jpg"],
  "roehnfried-immunbooster": ["roehnfried", "Immunbooster.jpg"],
  "roehnfried-jungtierpulver": ["roehnfried", "jungtierpulver.jpeg"],
  "roehnfried-flight-dragees": ["roehnfried", "Flugfit Dragees.png"],
  "roehnfried-pavifac": ["roehnfried", "Pavifac.jpg"],
  "roehnfried-atemfrei": ["roehnfried", "Atemfrei.jpg"],
  "roehnfried-avidress-plus": ["roehnfried", "avidrees.jpg"],
  "roehnfried-rotosal": {
    external:
      "https://jedds.com/cdn/shop/products/11417_Rotosal_250ml_PET-V10-11-20_1024x.jpg"
  },
  "roehnfried-kk-protein-3000": {
    external: "https://jedds.com/cdn/shop/products/11613-k-k-protein-3000_1024x.jpg"
  },

  // —— Versele-Laga ——
  "versele-laga-colombine-vita": ["versele", "vita4kg.png"],
  "versele-laga-pickstone-red": {
    external: "https://jedds.com/cdn/shop/products/VL006.WATERMARK-2_1024x.jpg"
  },

  // —— Natural ——
  "natural-picking-stone": ["natural", "2d969f31e647677ed3a135ddea9ac6fc.jpg"],

  // —— NutriBird (Versele-Laga NutriBird A21 kutusu) ——
  "nutribird-a21": ["versele", "5410340221754pack.png"],
  "nutribird-calci-lux": {
    external:
      "https://jedds.com/cdn/shop/products/OctoberFreeShippingPicture-34_1024x.jpg"
  },

  // —— Dr. Brockamp ——
  "brockamp-probac-1000": ["brockamp", "img-20250405-wa0010.jpg"],
  "brockamp-carbopower": ["brockamp", "img-20250405-wa0012.jpg"],

  // —— Meng-Vit (Mengvit klasoru, etiket adi) ——
  "meng-vit-ferti-plus": ["mengvit", "img-20240302-wa0000.jpg"],
  "meng-vit-avit-c-k-plus": ["mengvit", "img-20240127-wa0304.jpg"],
  "meng-vit-plus-tab-kalsiyum": ["mengvit", "img-20240127-wa0329.jpg"],
  "meng-vit-banyo-tuzu": ["mengvit", "img-20240628-wa0023.jpg"],
  "meng-vit-b12-ultra": ["mengvit", "3b3b68d0-02c9-4252-8125-b9cae79fdb8b.jpg"],
  "meng-vit-plus-black-tab": ["mengvit", "img-20231117-wa0201.jpg"],
  "meng-vit-e-selenyum": ["mengvit", "img-20241022-wa0077.jpg"],
  "meng-vit-orgacid": ["mengvit", "img-20241225-wa0205.jpg"],
  "meng-vit-hepachol": ["mengvit", "dd5277e4-6d02-4ad2-9f09-a99872a48a67.jpg"],
  "meng-vit-protein-plus-tab": ["mengvit", "img-20240628-wa0024.jpg"],
  "meng-vit-kalsiplus": ["mengvit", "img-20240628-wa0022.jpg"],
  "meng-vit-black-pills": ["mengvit", "img-20250124-wa0095.jpg"],
  "meng-vit-kombi-vit-plus": ["mengvit", "img-20240812-wa0336.jpg"],

  // —— VitaTurka (VITATURKA klasoru, etiket adi) ——
  "vitaturka-carnichol": ["vitaturka", "whatsapp-image-2026-03-08-at-21-38-56-4.jpeg"],
  "vitaturka-respiraclean": ["vitaturka", "whatsapp-image-2026-03-08-at-21-38-55.jpeg"],
  "vitaturka-multi-vitamin": ["vitaturka", "whatsapp-image-2026-03-08-at-21-38-56-1.jpeg"],
  "vitaturka-probio-bac": ["vitaturka", "whatsapp-image-2026-03-08-at-21-38-57-6.jpeg"],
  "vitaturka-elektrolit": ["vitaturka", "whatsapp-image-2026-03-08-at-21-38-57-3.jpeg"]
};

const PUBLISH_BASE = (
  process.env.VITE_PRODUCT_IMAGE_BASE || "https://yigitugurlucimen.github.io/hakanyemcilik"
).replace(/\/$/, "");

const toPublishedUrl = (path) => {
  if (!path || /^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${PUBLISH_BASE}${normalized}`;
};

const { products } = await import(
  new URL("../src/data/products.js", import.meta.url).href
);

mkdirSync(outputRoot, { recursive: true });

const productImageBySlug = {};
const missing = [];
const errors = [];

for (const product of products) {
  const mapping = productImageSources[product.slug];

  if (!mapping) {
    missing.push(product.slug);
    continue;
  }

  if (mapping.external) {
    productImageBySlug[product.slug] = toPublishedUrl(mapping.external);
    continue;
  }

  const [brandKey, fileName] = mapping;
  const sourcePath = src(brandKey, fileName);

  if (!existsSync(sourcePath)) {
    errors.push(`${product.slug}: dosya yok (${sourcePath})`);
    continue;
  }

  const ext = extname(fileName).toLowerCase();
  const destFile = `${product.slug}${ext}`;
  const destPath = join(outputRoot, destFile);
  copyFileSync(sourcePath, destPath);
  productImageBySlug[product.slug] = toPublishedUrl(
    `/product-images/by-slug/${destFile}`
  );
}

writeFileSync(
  join(rootDir, "src", "data", "productImages.js"),
  `export const productImageBySlug = ${JSON.stringify(productImageBySlug, null, 2)};\n`
);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseUrl && serviceRoleKey) {
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  for (const [slug, imageUrl] of Object.entries(productImageBySlug)) {
    const { error } = await supabase
      .from("products")
      .update({ image_url: imageUrl })
      .eq("slug", slug);
    if (error) errors.push(`${slug} DB: ${error.message}`);
  }
}

console.log(`Guncellenen: ${Object.keys(productImageBySlug).length}/${products.length}`);
if (missing.length) console.warn("Tanimlanmamis slug:", missing.join(", "));
if (errors.length) console.warn("Hatalar:\n", errors.join("\n"));
