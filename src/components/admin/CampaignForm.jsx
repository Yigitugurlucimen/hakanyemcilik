import { slugify } from "../../lib/slugify";

const inputClass =
  "w-full rounded-xl border border-emeraldDark/20 bg-white px-3 py-2 text-sm text-gray-800 outline-none ring-emeraldDark focus:ring-2";

const labelClass =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/80";

const splitList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const CampaignForm = ({ campaign, onChange, onSubmit, saving, submitLabel }) => {
  const updateField = (field, value) => onChange({ ...campaign, [field]: value });

  const updateName = (name) => {
    const next = { ...campaign, name };
    if (!campaign.id && (!campaign.slug || campaign.slug === slugify(campaign.name))) {
      next.slug = slugify(name);
    }
    onChange(next);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="grid gap-4 rounded-2xl border border-emeraldDark/10 bg-white p-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Kampanya adı
          </label>
          <input
            id="name"
            className={inputClass}
            value={campaign.name}
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
            value={campaign.slug}
            onChange={(event) => updateField("slug", slugify(event.target.value))}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="shortDescription">
            Kısa açıklama
          </label>
          <textarea
            id="shortDescription"
            rows={2}
            className={inputClass}
            value={campaign.shortDescription}
            onChange={(event) => updateField("shortDescription", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="goal">
            Hedef
          </label>
          <textarea
            id="goal"
            rows={2}
            className={inputClass}
            value={campaign.goal}
            onChange={(event) => updateField("goal", event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="usageWindow">
            Kullanım dönemi
          </label>
          <input
            id="usageWindow"
            className={inputClass}
            value={campaign.usageWindow}
            onChange={(event) => updateField("usageWindow", event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="sortOrder">
            Sıra
          </label>
          <input
            id="sortOrder"
            type="number"
            className={inputClass}
            value={campaign.sortOrder}
            onChange={(event) => updateField("sortOrder", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="focusTags">
            Etiketler (virgülle)
          </label>
          <input
            id="focusTags"
            className={inputClass}
            value={(campaign.focusTags || []).join(", ")}
            onChange={(event) => updateField("focusTags", splitList(event.target.value))}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="benefits">
            Faydalar (virgülle)
          </label>
          <input
            id="benefits"
            className={inputClass}
            value={(campaign.benefits || []).join(", ")}
            onChange={(event) => updateField("benefits", splitList(event.target.value))}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="productSlugs">
            Ürün slug listesi (virgülle)
          </label>
          <textarea
            id="productSlugs"
            rows={2}
            className={inputClass}
            value={(campaign.productSlugs || []).join(", ")}
            onChange={(event) => updateField("productSlugs", splitList(event.target.value))}
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-semibold text-emeraldDark">
            <input
              type="checkbox"
              checked={campaign.isActive}
              onChange={(event) => updateField("isActive", event.target.checked)}
            />
            Sitede yayında
          </label>
        </div>
      </section>

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-emeraldDark px-6 py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
      >
        {saving ? "Kaydediliyor…" : submitLabel}
      </button>
    </form>
  );
};

export default CampaignForm;
