import { products } from "./products.js";
import { enrichProduct as enrichProductBase } from "../lib/productTransforms.js";
import { productImageBySlug } from "./productImages.js";

export { productImageBySlug };

export const enrichedProducts = products.map((product) =>
  enrichProductBase({
    ...product,
    imageUrl: productImageBySlug[product.slug] || "",
    isActive: true,
    sortOrder: 0,
    price: product.price ?? null
  })
);

export const productBrands = Array.from(
  new Set(enrichedProducts.map((product) => product.brand))
).sort((a, b) => a.localeCompare(b, "tr"));

export const productCategories = Array.from(
  new Set(enrichedProducts.map((product) => product.category))
).sort((a, b) => a.localeCompare(b, "tr"));
