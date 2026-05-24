import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { blogPosts } from "../data/campaigns";
import { useCampaigns } from "../hooks/useCampaigns";

const BlogListPage = () => {
  const campaigns = useCampaigns();
  const campaignNameBySlug = Object.fromEntries(
    campaigns.map((campaign) => [campaign.slug, campaign.name])
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Blog"
        description="Kampanya bazli urun rehberleri, kullanim stratejileri ve SEO odakli blog icerikleri."
      />

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
        Bilgi Merkezi
      </p>
      <h1 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
        Kampanya Bazli Blog Icerikleri
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700 md:text-base">
        Set kampanyalarini destekleyen icerikler sayesinde hangi donemde hangi
        urunlerin onceliklendirilmesi gerektigini tek sayfada gorebilirsiniz.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-emeraldDark/10 bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emeraldDark/70">
              {campaignNameBySlug[post.campaignSlug]} · {post.readTime}
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-emeraldDark">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-emeraldDark/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emeraldDark/80"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="mt-4 inline-flex rounded-full bg-emeraldDark px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
            >
              Blogu Oku
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogListPage;
