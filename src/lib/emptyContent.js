export const createEmptyCampaign = () => ({
  slug: "",
  name: "",
  shortDescription: "",
  goal: "",
  usageWindow: "",
  focusTags: [],
  benefits: [],
  productSlugs: [],
  isActive: true,
  sortOrder: 0
});

export const createEmptyBlogPost = () => ({
  slug: "",
  campaignSlug: "",
  title: "",
  excerpt: "",
  readTime: "5 dk",
  keywords: [],
  sections: [
    {
      heading: "",
      paragraphs: [""],
      bullets: []
    }
  ],
  isActive: true,
  sortOrder: 0
});
