import { slugify } from "../../lib/slugify";

const inputClass =
  "w-full rounded-xl border border-emeraldDark/20 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-emeraldDark focus:ring-2";

const labelClass =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/80";

const ProductForm = ({ product, onChange, onSubmit, saving, submitLabel }) => {
  const updateField = (field, value) => {
    onChange({ ...product, [field]: value });
  };

  const updateName = (name) => {
    const next = { ...product, name };
    if (!product.id && (!product.slug || product.slug === slugify(product.name))) {
      next.slug = slugify(name);
    }
    onChange(next);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="grid gap-4 rounded-2xl border border-emeraldDark/10 bg-white p-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Urun adi
          </label>
          <input
            id="name"
            className={inputClass}
            value={product.name}
            onChange={(event) => updateName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="slug">
            URL slug
          </label>
          <input
            id="slug"
            className={inputClass}
            value={product.slug}
            onChange={(event) => updateField("slug", slugify(event.target.value))}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="category">
            Kategori
          </label>
          <input
            id="category"
            className={inputClass}
            value={product.category}
            onChange={(event) => updateField("category", event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="stock">
            Stok durumu
          </label>
          <select
            id="stock"
            className={inputClass}
            value={product.stock}
            onChange={(event) => updateField("stock", event.target.value)}
          >
            <option value="Stokta">Stokta</option>
            <option value="Az Stok">Az Stok</option>
            <option value="Stok Yok">Stok Yok</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="price">
            Fiyat (TL)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={product.price}
            onChange={(event) => updateField("price", event.target.value)}
            placeholder="Orn. 450"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="campaign">
            Kampanya etiketi
          </label>
          <input
            id="campaign"
            className={inputClass}
            value={product.campaign}
            onChange={(event) => updateField("campaign", event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="sortOrder">
            Sira
          </label>
          <input
            id="sortOrder"
            type="number"
            className={inputClass}
            value={product.sortOrder}
            onChange={(event) => updateField("sortOrder", event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="imageUrl">
            Gorsel URL
          </label>
          <input
            id="imageUrl"
            className={inputClass}
            value={product.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
            placeholder="/product-images/ornek.png"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-semibold text-emeraldDark">
            <input
              type="checkbox"
              checked={product.isActive}
              onChange={(event) => updateField("isActive", event.target.checked)}
            />
            Sitede yayinda
          </label>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="tags">
            Etiketler (virgulle)
          </label>
          <input
            id="tags"
            className={inputClass}
            value={Array.isArray(product.tags) ? product.tags.join(", ") : product.tags}
            onChange={(event) =>
              updateField(
                "tags",
                event.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-emeraldDark/10 bg-white p-5">
        {[
          ["purpose", "Kullanim amaci"],
          ["dosage", "Dozaj"],
          ["period", "Kullanim donemi"],
          ["details", "Detay"],
          ["content", "Icerik"],
          ["usagePlan", "Uygulama plani"],
          ["caution", "Uyari"]
        ].map(([field, label]) => (
          <div key={field}>
            <label className={labelClass} htmlFor={field}>
              {label}
            </label>
            <textarea
              id={field}
              rows={3}
              className={inputClass}
              value={product[field]}
              onChange={(event) => updateField(field, event.target.value)}
            />
          </div>
        ))}
      </section>

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-emeraldDark px-6 py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
      >
        {saving ? "Kaydediliyor..." : submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
