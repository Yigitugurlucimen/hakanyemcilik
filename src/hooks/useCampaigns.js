import { useMemo } from "react";
import { buildCampaigns, getCampaignBySlug } from "../data/campaigns";
import { useProducts } from "../context/ProductsContext";

export const useCampaigns = () => {
  const { products } = useProducts();
  return useMemo(() => buildCampaigns(products), [products]);
};

export const useCampaign = (slug) => {
  const { products } = useProducts();
  return useMemo(() => {
    if (!slug) return undefined;
    return getCampaignBySlug(slug, products);
  }, [slug, products]);
};
