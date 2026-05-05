import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

const Seo = ({ title, description, type = "website" }) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | Hakan Yemcilik` : "Hakan Yemcilik";
    const pageDescription =
      description ||
      "Hakan Yemcilik petshop ve guvercin takviyeleri bilgi bankasi.";
    const canonicalUrl = `${window.location.origin}${location.pathname}${location.hash}`;

    document.title = pageTitle;

    ensureMetaTag("description").setAttribute("content", pageDescription);
    ensureMetaTag("robots").setAttribute(
      "content",
      "index, follow, max-image-preview:large"
    );

    ensureMetaTag("og:title", "property").setAttribute("content", pageTitle);
    ensureMetaTag("og:description", "property").setAttribute(
      "content",
      pageDescription
    );
    ensureMetaTag("og:type", "property").setAttribute("content", type);
    ensureMetaTag("og:url", "property").setAttribute("content", canonicalUrl);

    ensureMetaTag("twitter:card").setAttribute("content", "summary_large_image");
    ensureMetaTag("twitter:title").setAttribute("content", pageTitle);
    ensureMetaTag("twitter:description").setAttribute("content", pageDescription);

    ensureCanonicalTag().setAttribute("href", canonicalUrl);
  }, [description, location.hash, location.pathname, title, type]);

  return null;
};

export default Seo;
