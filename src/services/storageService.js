import { supabase } from "../lib/supabase";

export const PRODUCT_IMAGES_BUCKET = "product-images";

const MAX_BYTES = 5 * 1024 * 1024;

export const uploadProductImage = async (file, slug) => {
  if (!supabase) {
    throw new Error("Supabase yapılandırılmadı.");
  }

  if (!file?.type?.startsWith("image/")) {
    throw new Error("Yalnızca görsel dosyaları yüklenebilir.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Görsel en fazla 5 MB olabilir.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `uploads/${slug || "urun"}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) throw error;

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
};
