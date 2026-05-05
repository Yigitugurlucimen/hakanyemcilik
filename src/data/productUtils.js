import { products } from "./products";

const productImageBySlug = {
  "roehnfried-atemfrei": "/product-images/roehnfried-atemfrei.png",
  "roehnfried-avidress-plus":
    "https://jedds.com/cdn/shop/products/11145-Avidress-plus-01_1024x.jpg",
  "roehnfried-bt-amin-forte": "/product-images/roehnfried-bt-amin-forte.png",
  "roehnfried-carni-speed": "/product-images/roehnfried-carni-speed.png",
  "roehnfried-elektrolyt-3plus": "/product-images/roehnfried-elektrolyt-3plus.png",
  "roehnfried-entrobac": "/product-images/roehnfried-entrobac.png",
  "roehnfried-flight-dragees": "/product-images/roehnfried-flight-dragees.png",
  "roehnfried-gervit-w": "/product-images/roehnfried-gervit-w.png",
  "roehnfried-immunbooster": "/product-images/roehnfried-immunbooster.png",
  "roehnfried-jungtierpulver": "/product-images/roehnfried-jungtierpulver.png",
  "roehnfried-kk-protein-3000":
    "https://jedds.com/cdn/shop/products/11613-k-k-protein-3000_1024x.jpg",
  "roehnfried-moorgold": "/product-images/roehnfried-moorgold.png",
  "roehnfried-pavifac": "/product-images/roehnfried-pavifac.png",
  "roehnfried-ro-200-ready": "/product-images/roehnfried-ro-200-ready.png",
  "roehnfried-rotosal":
    "https://jedds.com/cdn/shop/products/11417_Rotosal_250ml_PET-V10-11-20_1024x.jpg",
  "versele-laga-colombine-vita":
    "https://jedds.com/cdn/shop/products/5410340123607pack_1024x.png",
  "versele-laga-pickstone-red":
    "https://jedds.com/cdn/shop/products/VL006.WATERMARK-2_1024x.jpg",
  "nutribird-calci-lux":
    "https://jedds.com/cdn/shop/products/OctoberFreeShippingPicture-34_1024x.jpg",
  "roehnfried-sedochol": "/product-images/roehnfried-sedochol.png"
};

const parseBrandFromName = (name) => {
  if (!name) return "Diger";
  const [brandPart] = name.split("-");
  return brandPart ? brandPart.trim() : "Diger";
};

const normalizeStock = (stock) => {
  const value = (stock || "").toLocaleLowerCase("tr-TR");

  if (value.includes("stokta")) return "in_stock";
  if (value.includes("az")) return "low_stock";
  if (value.includes("yok")) return "out_of_stock";
  return "unknown";
};

export const enrichedProducts = products.map((product) => ({
  ...product,
  brand: parseBrandFromName(product.name),
  stockStatus: normalizeStock(product.stock),
  image: productImageBySlug[product.slug] || null
}));

export const productBrands = Array.from(
  new Set(enrichedProducts.map((product) => product.brand))
).sort((a, b) => a.localeCompare(b, "tr"));

export const productCategories = Array.from(
  new Set(enrichedProducts.map((product) => product.category))
).sort((a, b) => a.localeCompare(b, "tr"));
