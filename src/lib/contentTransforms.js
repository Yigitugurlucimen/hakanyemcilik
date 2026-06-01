export const rowToCampaignDefinition = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description || "",
    goal: row.goal || "",
    usageWindow: row.usage_window || "",
    focusTags: row.focus_tags || [],
    benefits: row.benefits || [],
    productSlugs: row.product_slugs || [],
    isActive: row.is_active !== false,
    sortOrder: row.sort_order ?? 0
  };
};

export const campaignDefinitionToRow = (campaign) => ({
  slug: campaign.slug,
  name: campaign.name,
  short_description: campaign.shortDescription || "",
  goal: campaign.goal || "",
  usage_window: campaign.usageWindow || "",
  focus_tags: campaign.focusTags || [],
  benefits: campaign.benefits || [],
  product_slugs: campaign.productSlugs || [],
  is_active: campaign.isActive !== false,
  sort_order: Number(campaign.sortOrder) || 0
});

export const rowToBlogPost = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    campaignSlug: row.campaign_slug || "",
    title: row.title,
    excerpt: row.excerpt || "",
    readTime: row.read_time || "5 dk",
    keywords: row.keywords || [],
    sections: Array.isArray(row.sections) ? row.sections : [],
    isActive: row.is_active !== false,
    sortOrder: row.sort_order ?? 0
  };
};

export const blogPostToRow = (post) => ({
  slug: post.slug,
  campaign_slug: post.campaignSlug || null,
  title: post.title,
  excerpt: post.excerpt || "",
  read_time: post.readTime || "5 dk",
  keywords: post.keywords || [],
  sections: post.sections || [],
  is_active: post.isActive !== false,
  sort_order: Number(post.sortOrder) || 0
});
