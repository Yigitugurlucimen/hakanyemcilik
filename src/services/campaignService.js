import {
  campaignDefinitionToRow,
  rowToCampaignDefinition
} from "../lib/contentTransforms";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const sortCampaigns = (items) =>
  [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.name.localeCompare(b.name, "tr");
  });

export const fetchActiveCampaignDefinitions = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return sortCampaigns((data || []).map(rowToCampaignDefinition));
};

export const fetchAllCampaignDefinitions = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return sortCampaigns((data || []).map(rowToCampaignDefinition));
};

export const fetchCampaignDefinitionBySlug = async (slug) => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return rowToCampaignDefinition(data);
};

export const createCampaign = async (campaign) => {
  if (!supabase) throw new Error("Supabase yapılandırılmadı.");

  const { data, error } = await supabase
    .from("campaigns")
    .insert(campaignDefinitionToRow(campaign))
    .select("*")
    .single();

  if (error) throw error;
  return rowToCampaignDefinition(data);
};

export const updateCampaign = async (id, campaign) => {
  if (!supabase) throw new Error("Supabase yapılandırılmadı.");

  const { data, error } = await supabase
    .from("campaigns")
    .update(campaignDefinitionToRow(campaign))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToCampaignDefinition(data);
};

export const deleteCampaign = async (id) => {
  if (!supabase) throw new Error("Supabase yapılandırılmadı.");

  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) throw error;
};
