import { useMemo } from "react";
import { useContent } from "../context/ContentContext";

export const useCampaigns = () => {
  const { campaigns } = useContent();
  return campaigns;
};

export const useCampaign = (slug) => {
  const { getCampaignBySlug } = useContent();
  return useMemo(() => {
    if (!slug) return undefined;
    return getCampaignBySlug(slug);
  }, [slug, getCampaignBySlug]);
};

export const useBlogPosts = () => {
  const { blogPosts } = useContent();
  return blogPosts;
};

export const useBlogPost = (slug) => {
  const { getBlogBySlug } = useContent();
  return useMemo(() => {
    if (!slug) return undefined;
    return getBlogBySlug(slug);
  }, [slug, getBlogBySlug]);
};
