import { siteUrl } from "./siteConfig.js";

/**
 * Urun gorselleri GitHub Pages'te yayinlanir. Custom domain (Cloudflare SPA)
 * /product-images/* isteklerini index.html dondurebilecegi icin bu CDN kullanilir.
 */
export const PRODUCT_IMAGE_PUBLISH_BASE =
  import.meta.env.VITE_PRODUCT_IMAGE_BASE?.replace(/\/$/, "") ||
  "https://yigitugurlucimen.github.io/hakanyemcilik";

const SITE_HOST = (() => {
  try {
    return new URL(siteUrl).host;
  } catch {
    return "hakanyemcilik.com";
  }
})();

/** Cloudflare/custom domain uzerindeki gorsel URL'lerini GitHub Pages CDN'e cevir. */
const rewriteSiteImageUrl = (url) => {
  try {
    const parsed = new URL(url);
    if (
      parsed.host === SITE_HOST &&
      parsed.pathname.startsWith("/product-images/")
    ) {
      return `${PRODUCT_IMAGE_PUBLISH_BASE}${parsed.pathname}`;
    }
  } catch {
    /* ignore */
  }
  return url;
};

export const toPublishedImageUrl = (path) => {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) {
    return rewriteSiteImageUrl(path);
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${PRODUCT_IMAGE_PUBLISH_BASE}${normalized}`;
};
