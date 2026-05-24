import { Link } from "react-router-dom";
import { blogPosts } from "../data/campaigns";
import { useCampaigns } from "../hooks/useCampaigns";

const BlogShowcase = () => {
  const campaigns = useCampaigns();
  const campaignNameBySlug = Object.fromEntries(
    campaigns.map((campaign) => [campaign.slug, campaign.name])
  );

  return (
    <section className="bg-emeraldDark/5 py-14">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
              SEO Blog Merkezi
            </p>
            <h2 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
              Kampanyaya Ozel Rehber Icerikler
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex rounded-full border border-emeraldDark/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
          >
            Tum Bloglar
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-emeraldDark/10 bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emeraldDark/70">
                {campaignNameBySlug[post.campaignSlug]} · {post.readTime}
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-emeraldDark">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex rounded-full bg-emeraldDark px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
              >
                Blogu Oku
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogShowcase;
