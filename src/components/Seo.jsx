import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { assetUrl } from "../lib/appBase.js";
import { defaultSeoDescription } from "../lib/siteConfig.js";

const ensureMetaTag = (name, attribute = "name") => {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  return element;
};

const ensureCanonicalTag = () => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  return element;
};

const resolveOgImageUrl = () => {
  if (typeof window === "undefined") {
    return "https://hakanyemcilik.com/logo.png";
  }

  return new URL(assetUrl("logo.png"), window.location.href).href;
};

const Seo = ({
  title,
  description,
  type = "website",
  imageUrl,
  noindex = false
}) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | Hakan Yemcilik` : "Hakan Yemcilik";
    const pageDescription = description || defaultSeoDescription;
    const canonicalUrl = `${window.location.origin}${location.pathname}${location.hash}`;
    const shareImage = imageUrl || resolveOgImageUrl();
    const robotsContent = noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large";

    document.title = pageTitle;

    ensureMetaTag("description").setAttribute("content", pageDescription);
    ensureMetaTag("robots").setAttribute("content", robotsContent);

    ensureMetaTag("og:title", "property").setAttribute("content", pageTitle);
    ensureMetaTag("og:description", "property").setAttribute(
      "content",
      pageDescription
    );
    ensureMetaTag("og:type", "property").setAttribute("content", type);
    ensureMetaTag("og:url", "property").setAttribute("content", canonicalUrl);
    ensureMetaTag("og:image", "property").setAttribute("content", shareImage);
    ensureMetaTag("og:locale", "property").setAttribute("content", "tr_TR");

    ensureMetaTag("twitter:card").setAttribute("content", "summary_large_image");
    ensureMetaTag("twitter:title").setAttribute("content", pageTitle);
    ensureMetaTag("twitter:description").setAttribute("content", pageDescription);
    ensureMetaTag("twitter:image").setAttribute("content", shareImage);

    ensureCanonicalTag().setAttribute("href", canonicalUrl);
  }, [description, imageUrl, location.hash, location.pathname, noindex, title, type]);

  return null;
};

export default Seo;
