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

const BlogForm = ({
  post,
  onChange,
  onSubmit,
  saving,
  submitLabel,
  campaignOptions = []
}) => {
  const updateField = (field, value) => onChange({ ...post, [field]: value });

  const updateTitle = (title) => {
    const next = { ...post, title };
    if (!post.id && (!post.slug || post.slug === slugify(post.title))) {
      next.slug = slugify(title);
    }
    onChange(next);
  };

  const sectionsValue =
    post.sectionsJsonInvalid != null
      ? post.sectionsJsonInvalid
      : JSON.stringify(post.sections || [], null, 2);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="grid gap-4 rounded-2xl border border-emeraldDark/10 bg-white p-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="title">
            Başlık
          </label>
          <input
            id="title"
            className={inputClass}
            value={post.title}
            onChange={(event) => updateTitle(event.target.value)}
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
            value={post.slug}
            onChange={(event) => updateField("slug", slugify(event.target.value))}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="campaignSlug">
            Kampanya
          </label>
          <select
            id="campaignSlug"
            className={inputClass}
            value={post.campaignSlug}
            onChange={(event) => updateField("campaignSlug", event.target.value)}
          >
            <option value="">Seçin</option>
            {campaignOptions.map((campaign) => (
              <option key={campaign.slug} value={campaign.slug}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="readTime">
            Okuma süresi
          </label>
          <input
            id="readTime"
            className={inputClass}
            value={post.readTime}
            onChange={(event) => updateField("readTime", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="excerpt">
            Özet
          </label>
          <textarea
            id="excerpt"
            rows={2}
            className={inputClass}
            value={post.excerpt}
            onChange={(event) => updateField("excerpt", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="keywords">
            Anahtar kelimeler (virgülle)
          </label>
          <input
            id="keywords"
            className={inputClass}
            value={(post.keywords || []).join(", ")}
            onChange={(event) => updateField("keywords", splitList(event.target.value))}
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
            value={post.sortOrder}
            onChange={(event) => updateField("sortOrder", event.target.value)}
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-semibold text-emeraldDark">
            <input
              type="checkbox"
              checked={post.isActive}
              onChange={(event) => updateField("isActive", event.target.checked)}
            />
            Sitede yayında
          </label>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="sections">
            Bölümler (JSON)
          </label>
          <textarea
            id="sections"
            rows={12}
            className={`${inputClass} font-mono text-xs`}
            value={sectionsValue}
            onChange={(event) => {
              const { sectionsJsonInvalid, ...rest } = post;
              onChange({ ...rest, sectionsJsonInvalid: event.target.value });
              try {
                const parsed = JSON.parse(event.target.value);
                if (Array.isArray(parsed)) {
                  onChange({ ...rest, sections: parsed });
                }
              } catch {
                /* kullanıcı yazarken */
              }
            }}
          />
          <p className="mt-1 text-xs text-gray-500">
            Her bölüm: heading, paragraphs (dizi), bullets (dizi)
          </p>
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

export default BlogForm;
