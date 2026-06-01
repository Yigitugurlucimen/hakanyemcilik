import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  buildCampaigns,
  staticBlogPosts,
  staticCampaignDefinitions
} from "../data/campaigns";
import { isSupabaseConfigured } from "../lib/supabase";
import { fetchActiveBlogPosts } from "../services/blogService";
import { fetchActiveCampaignDefinitions } from "../services/campaignService";
import { useProducts } from "./ProductsContext";

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const { products } = useProducts();
  const [campaignDefinitions, setCampaignDefinitions] = useState(staticCampaignDefinitions);
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(isSupabaseConfigured ? "supabase" : "static");

  const loadContent = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setCampaignDefinitions(staticCampaignDefinitions);
      setBlogPosts(staticBlogPosts);
      setSource("static");
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [remoteCampaigns, remoteBlogs] = await Promise.all([
        fetchActiveCampaignDefinitions(),
        fetchActiveBlogPosts()
      ]);

      let usedCampaigns = staticCampaignDefinitions;
      let usedBlogs = staticBlogPosts;
      let contentSource = "static-fallback";

      if (remoteCampaigns?.length) {
        usedCampaigns = remoteCampaigns;
        contentSource = "supabase";
      }

      if (remoteBlogs?.length) {
        usedBlogs = remoteBlogs;
        contentSource = "supabase";
      }

      setCampaignDefinitions(usedCampaigns);
      setBlogPosts(usedBlogs);
      setSource(contentSource);
    } catch (loadError) {
      console.error(loadError);
      setCampaignDefinitions(staticCampaignDefinitions);
      setBlogPosts(staticBlogPosts);
      setSource("static-fallback");
      setError("Kampanya ve blog içerikleri yüklenemedi. Yerel liste kullanılıyor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const campaigns = useMemo(
    () => buildCampaigns(campaignDefinitions, products),
    [campaignDefinitions, products]
  );

  const value = useMemo(
    () => ({
      campaigns,
      campaignDefinitions,
      blogPosts,
      loading,
      error,
      source,
      refreshContent: loadContent,
      getCampaignBySlug: (slug) => campaigns.find((campaign) => campaign.slug === slug),
      getBlogBySlug: (slug) => blogPosts.find((post) => post.slug === slug),
      getBlogsByCampaign: (campaignSlug) =>
        blogPosts.filter((post) => post.campaignSlug === campaignSlug)
    }),
    [campaigns, campaignDefinitions, blogPosts, loading, error, source, loadContent]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }

  return context;
};
