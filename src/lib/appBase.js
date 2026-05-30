/** GitHub Pages project URL uses /hakanyemcilik prefix; custom domain uses root. */
export const getRouterBasename = () => {
  if (typeof window === "undefined") return undefined;

  const [firstSegment] = window.location.pathname.split("/").filter(Boolean);
  return firstSegment === "hakanyemcilik" ? "/hakanyemcilik" : undefined;
};

export const assetUrl = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

/** Hash/root links outside React Router (e.g. /#bilgi-bankasi). */
export const pathWithBasename = (path) => {
  const basename = getRouterBasename() || "";
  return `${basename}${path}`;
};
