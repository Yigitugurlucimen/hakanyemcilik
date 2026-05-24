import { Link } from "react-router-dom";
import { useCampaigns } from "../hooks/useCampaigns";

const CampaignShowcase = () => {
  const campaigns = useCampaigns();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
            Set Kampanyalari
          </p>
          <h2 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
            Doneme Gore Hazir Kampanya Setleri
          </h2>
        </div>
        <Link
          to="/kampanyalar"
          className="inline-flex rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
        >
          Tum Kampanyalar
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <article
            key={campaign.slug}
            className="rounded-2xl border border-emeraldDark/10 bg-white p-5"
          >
            <h3 className="text-2xl font-black text-emeraldDark">{campaign.name}</h3>
            <p className="mt-2 text-sm text-gray-700">{campaign.shortDescription}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
              Donem: {campaign.usageWindow}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {campaign.focusTags.map((tag) => (
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
              className="mt-5 inline-flex rounded-full bg-emeraldDark px-5 py-2 text-sm font-semibold text-white"
            >
              Kampanyayi Incele
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CampaignShowcase;
