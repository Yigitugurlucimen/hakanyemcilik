import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";
import { getBlogsByCampaign } from "../data/campaigns";
import { useCampaign } from "../hooks/useCampaigns";

const CampaignDetailPage = () => {
  const { slug } = useParams();
  const campaign = useCampaign(slug);

  if (!campaign) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <Seo
          title="Kampanya Bulunamadi"
          description="Aradiginiz kampanya bulunamadi. Kampanya listesine geri donebilirsiniz."
        />
        <h1 className="text-3xl font-black text-emeraldDark">Kampanya Bulunamadi</h1>
        <p className="mt-3 text-gray-700">
          Aradiginiz kampanya yayindan kalkmis olabilir.
        </p>
        <Link
          to="/kampanyalar"
          className="mt-5 inline-flex rounded-full border border-emeraldDark/20 px-5 py-2 text-sm font-semibold text-emeraldDark"
        >
          Kampanyalara Don
        </Link>
      </section>
    );
  }

  const relatedBlogs = getBlogsByCampaign(campaign.slug);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title={`${campaign.name} Kampanyasi`}
        description={`${campaign.name} kampanyasi ile donemsel urun seti, kullanim hedefleri ve ilgili blog rehberleri.`}
      />

      <Link
        to="/kampanyalar"
        className="inline-flex rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
      >
        Tum Kampanyalar
      </Link>

      <div className="mt-6 rounded-2xl border border-emeraldDark/10 bg-emeraldDark/5 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
          Set Kampanyasi
        </p>
        <h1 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
          {campaign.name}
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-700 md:text-base">
          {campaign.shortDescription}
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
          Donem: {campaign.usageWindow}
        </p>
        <p className="mt-3 text-sm leading-7 text-gray-700 md:text-base">
          <span className="font-bold text-emeraldDark">Hedef: </span>
          {campaign.goal}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {campaign.focusTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emeraldDark/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-black text-emeraldDark">Kampanya Avantajlari</h2>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {campaign.benefits.map((benefit) => (
            <li
              key={benefit}
              className="rounded-xl border border-emeraldDark/10 bg-white p-4 text-sm text-gray-700"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-black text-emeraldDark">Setteki Urunler</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {campaign.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-black text-emeraldDark">
          Kampanyaya Ozel Blog Rehberleri
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {relatedBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="rounded-2xl border border-emeraldDark/10 bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emeraldDark/70">
                {blog.readTime}
              </p>
              <h3 className="mt-2 text-xl font-bold text-emeraldDark">{blog.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{blog.excerpt}</p>
              <Link
                to={`/blog/${blog.slug}`}
                className="mt-4 inline-flex rounded-full bg-emeraldDark px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
              >
                Rehberi Oku
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignDetailPage;
