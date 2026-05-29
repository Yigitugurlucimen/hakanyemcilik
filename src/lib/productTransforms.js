import { productImageBySlug } from "../data/productImages.js";

export const parseBrandFromName = (name) => {
  if (!name) return "Diger";
  const [brandPart] = name.split("-");
  return brandPart ? brandPart.trim() : "Diger";
};

export const normalizeStock = (stock) => {
  const value = (stock || "").toLocaleLowerCase("tr-TR");

  if (value.includes("stokta")) return "in_stock";
  if (value.includes("az")) return "low_stock";
  if (value.includes("yok")) return "out_of_stock";
  return "unknown";
};

export const rowToProduct = (row) => {
  if (!row) return null;

  const product = {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category || "",
    stock: row.stock || "Stokta",
    campaign: row.campaign || "",
    tags: row.tags || [],
    purpose: row.purpose || "",
    dosage: row.dosage || "",
    details: row.details || "",
    period: row.period || "",
    content: row.content || "",
    usagePlan: row.usage_plan || "",
    caution: row.caution || "",
    price: row.price != null ? Number(row.price) : null,
    imageUrl: row.image_url || "",
    isActive: row.is_active !== false,
    sortOrder: row.sort_order ?? 0
  };

  return enrichProduct(product);
};

export const enrichProduct = (product) => ({
  ...product,
  brand: parseBrandFromName(product.name),
  stockStatus: normalizeStock(product.stock),
  image:
    product.imageUrl ||
    productImageBySlug[product.slug] ||
    null
});

export const productToRow = (product) => ({
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
  price: product.price === "" || product.price == null ? null : Number(product.price),
  image_url: product.imageUrl || null,
  is_active: product.isActive !== false,
  sort_order: Number(product.sortOrder) || 0
});

export const staticProductToRow = (product, imageUrl) => ({
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
  price: product.price == null || product.price === "" ? null : Number(product.price),
  image_url: imageUrl || productImageBySlug[product.slug] || null,
  is_active: true,
  sort_order: 0
});
