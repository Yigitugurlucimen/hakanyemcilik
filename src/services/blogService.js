import { blogPostToRow, rowToBlogPost } from "../lib/contentTransforms";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const sortBlogPosts = (items) =>
  [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.title.localeCompare(b.title, "tr");
  });

export const fetchActiveBlogPosts = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) throw error;
  return sortBlogPosts((data || []).map(rowToBlogPost));
};

export const fetchAllBlogPosts = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) throw error;
  return sortBlogPosts((data || []).map(rowToBlogPost));
};

export const fetchBlogPostBySlug = async (slug) => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return rowToBlogPost(data);
};

export const createBlogPost = async (post) => {
  if (!supabase) throw new Error("Supabase yapılandırılmadı.");

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(blogPostToRow(post))
    .select("*")
    .single();

  if (error) throw error;
  return rowToBlogPost(data);
};

export const updateBlogPost = async (id, post) => {
  if (!supabase) throw new Error("Supabase yapılandırılmadı.");

  const { data, error } = await supabase
    .from("blog_posts")
    .update(blogPostToRow(post))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToBlogPost(data);
};

export const deleteBlogPost = async (id) => {
  if (!supabase) throw new Error("Supabase yapılandırılmadı.");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
};
