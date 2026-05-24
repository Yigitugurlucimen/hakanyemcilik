import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useCampaigns } from "../hooks/useCampaigns";

const CampaignsPage = () => {
  const campaigns = useCampaigns();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Kampanyalar"
        description="Performans, tuy, karaciger ve yaris donemine ozel urun set kampanyalari."
      />

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
        Kampanya Merkezi
      </p>
      <h1 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
        Donemsel Urun Set Kampanyalari
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700 md:text-base">
        Kuslarinizin donemsel ihtiyacina gore olusturulmus set kampanyalari ile
        urun secimini hizlandirin. Her kampanyada odak hedef, onerilen urunler ve
        blog rehber icerikleri birlikte sunulur.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <article
            key={campaign.slug}
            className="rounded-2xl border border-emeraldDark/10 bg-white p-6"
          >
            <h2 className="text-2xl font-black text-emeraldDark">{campaign.name}</h2>
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
              Detaya Git
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CampaignsPage;
