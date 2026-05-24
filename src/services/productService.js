import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { productToRow, rowToProduct } from "../lib/productTransforms";

const sortProducts = (items) =>
  [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.name.localeCompare(b.name, "tr");
  });

export const fetchActiveProducts = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return sortProducts((data || []).map(rowToProduct));
};

export const fetchAllProducts = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return sortProducts((data || []).map(rowToProduct));
};

export const fetchProductBySlug = async (slug) => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return rowToProduct(data);
};

export const createProduct = async (product) => {
  if (!supabase) throw new Error("Supabase yapilandirilmadi.");

  const { data, error } = await supabase
    .from("products")
    .insert(productToRow(product))
    .select("*")
    .single();

  if (error) throw error;
  return rowToProduct(data);
};

export const updateProduct = async (id, product) => {
  if (!supabase) throw new Error("Supabase yapilandirilmadi.");

  const { data, error } = await supabase
    .from("products")
    .update(productToRow(product))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToProduct(data);
};

export const deleteProduct = async (id) => {
  if (!supabase) throw new Error("Supabase yapilandirilmadi.");

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
};
