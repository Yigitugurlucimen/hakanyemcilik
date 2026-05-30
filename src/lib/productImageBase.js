/**
 * Urun gorselleri GitHub Pages'te yayinlanir. Custom domain (Cloudflare) eski
 * build gosterse bile gorseller bu adresten yuklenir.
 */
export const PRODUCT_IMAGE_PUBLISH_BASE =
  import.meta.env.VITE_PRODUCT_IMAGE_BASE?.replace(/\/$/, "") ||
  "https://yigitugurlucimen.github.io/hakanyemcilik";

export const toPublishedImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${PRODUCT_IMAGE_PUBLISH_BASE}${normalized}`;
};
