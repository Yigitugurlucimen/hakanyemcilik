import { Link } from "react-router-dom";
import { useCampaigns } from "../hooks/useCampaigns";
import { productImageBySlug } from "../data/productImages.js";

const CampaignShowcase = () => {
  const campaigns = useCampaigns();

  return (
    <section className="section-shell py-16 md:py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="section-eyebrow">Set Kampanyaları</p>
          <h2 className="section-title">Döneme Göre Hazır Kampanya Setleri</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Performans, tüy dönemi ve toparlanma için uzman önerili ürün kombinasyonları.
          </p>
        </div>
        <Link
          to="/kampanyalar"
          className="inline-flex shrink-0 rounded-full border border-emeraldDark/20 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-emeraldDark shadow-sm transition hover:border-emeraldDark/40 hover:shadow-md"
        >
          Tüm Kampanyalar
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {campaigns.map((campaign) => {
          const coverSlug = campaign.productSlugs?.[0];
          const coverImage = coverSlug ? productImageBySlug[coverSlug] : null;

          return (
            <article
              key={campaign.slug}
              className="group overflow-hidden rounded-3xl border border-emeraldDark/10 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emeraldDark/10">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt=""
                    className="absolute -right-4 bottom-0 h-40 w-40 object-contain opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emeraldDark/60">
                    {campaign.usageWindow}
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-emeraldDark">{campaign.name}</h3>
                </div>
              </div>

              <div className="p-6 pt-4">
                <p className="text-sm leading-relaxed text-slate-600">{campaign.shortDescription}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {campaign.focusTags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emeraldDark/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emeraldDark/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/kampanya/${campaign.slug}`}
                  className="mt-6 inline-flex rounded-full bg-emeraldDark px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emeraldDark/90"
                >
                  Kampanyayı İncele
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CampaignShowcase;
