import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";
import {
  blogPosts,
  campaigns,
  getBlogBySlug,
  getCampaignBySlug
} from "../data/campaigns";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <Seo
          title="Blog Bulunamadi"
          description="Aradiginiz blog yazisi bulunamadi. Blog listesine geri donebilirsiniz."
        />
        <h1 className="text-3xl font-black text-emeraldDark">Blog Bulunamadi</h1>
        <p className="mt-3 text-gray-700">Aradiginiz icerik yayindan kalkmis olabilir.</p>
        <Link
          to="/blog"
          className="mt-5 inline-flex rounded-full border border-emeraldDark/20 px-5 py-2 text-sm font-semibold text-emeraldDark"
        >
          Bloglara Don
        </Link>
      </section>
    );
  }

  const campaign = getCampaignBySlug(post.campaignSlug);
  const relatedPosts = blogPosts.filter(
    (item) => item.slug !== post.slug && item.campaignSlug === post.campaignSlug
  );
  const campaignLabel = campaigns.find((item) => item.slug === post.campaignSlug)?.name;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo title={post.title} description={post.excerpt} />

      <Link
        to="/blog"
        className="inline-flex rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
      >
        Tum Bloglar
      </Link>

      <article className="mt-6 rounded-2xl border border-emeraldDark/10 bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emeraldDark/70">
          {campaignLabel} · {post.readTime}
        </p>
        <h1 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-700 md:text-base">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-emeraldDark/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emeraldDark/80"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-8 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-black text-emeraldDark">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-gray-700 md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700 md:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      {campaign ? (
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-emeraldDark">
              Bu Blogda Gecen Set Urunleri
            </h2>
            <Link
              to={`/kampanya/${campaign.slug}`}
              className="inline-flex rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
            >
              Kampanyaya Git
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {campaign.products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      ) : null}

      {relatedPosts.length ? (
        <div className="mt-10">
          <h2 className="text-2xl font-black text-emeraldDark">Ilgili Bloglar</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.slug}
                className="rounded-2xl border border-emeraldDark/10 bg-white p-5"
              >
                <h3 className="text-lg font-bold text-emeraldDark">{relatedPost.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{relatedPost.excerpt}</p>
                <Link
                  to={`/blog/${relatedPost.slug}`}
                  className="mt-4 inline-flex rounded-full bg-emeraldDark px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
                >
                  Oku
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default BlogDetailPage;
