import { useState } from "react";
import { uploadProductImage } from "../../services/storageService";

const inputClass =
  "w-full rounded-xl border border-emeraldDark/20 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-emeraldDark focus:ring-2";

const labelClass =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/80";

const ImageUploadField = ({ imageUrl, slug, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const publicUrl = await uploadProductImage(file, slug || "urun");
      onChange(publicUrl);
    } catch (error) {
      setUploadError(error.message || "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="md:col-span-2">
      <label className={labelClass} htmlFor="imageUrl">
        Ürün görseli
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Ürün önizleme"
            className="h-24 w-24 rounded-xl border border-emeraldDark/10 object-cover"
          />
        ) : (
          <div className="grid h-24 w-24 place-content-center rounded-xl border border-dashed border-emeraldDark/20 text-xs text-gray-500">
            Önizleme
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            id="imageUrl"
            className={inputClass}
            value={imageUrl}
            onChange={(event) => onChange(event.target.value)}
            placeholder="URL veya yükleme sonrası otomatik dolar"
          />
          <label className="inline-flex cursor-pointer rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase text-emeraldDark hover:bg-emeraldDark/5">
            {uploading ? "Yükleniyor…" : "Dosyadan yükle"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              disabled={uploading}
              onChange={handleFile}
            />
          </label>
          {uploadError ? <p className="text-xs text-red-600">{uploadError}</p> : null}
          <p className="text-xs text-gray-500">
            Supabase Storage (product-images). phase-b.sql çalıştırılmalı ve admin yetkisi
            gerekir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadField;
