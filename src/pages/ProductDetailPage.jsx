import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";
import { whatsappNumber } from "../data/products";
import { enrichedProducts } from "../data/productUtils";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = enrichedProducts.find((item) => item.slug === slug);

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <Seo
          title="Urun Bulunamadi"
          description="Aradiginiz urun bulunamadi. Bilgi bankasina donerek guncel urunleri inceleyebilirsiniz."
        />
        <h2 className="text-3xl font-black text-emeraldDark">Ürün Bulunamadı</h2>
        <p className="mt-3 text-gray-700">
          Aradığınız ürün kaldırılmış olabilir. Bilgi bankasına geri dönerek
          güncel ürünleri inceleyebilirsiniz.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-emeraldDark/20 px-5 py-2 text-sm font-semibold text-emeraldDark"
        >
          Bilgi Bankasına Dön
        </Link>
      </section>
    );
  }

  const requestUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Merhaba, ${product.name} ürünü için detaylı bilgi almak istiyorum.`
  )}`;
  const relatedProducts = enrichedProducts
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.category === product.category ||
          item.tags.some((tag) => product.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title={product.name}
        description={`${product.name} urununun kullanim amaci, dozaj bilgisi, kullanim donemi ve uygulama plani.`}
        type="product"
      />
      <nav className="mb-4 text-sm text-emeraldDark/70">
        <Link to="/" className="hover:text-emeraldDark">
          Ana Sayfa
        </Link>
        <span className="px-2">/</span>
        <a href="/#bilgi-bankasi" className="hover:text-emeraldDark">
          Urun Vitrini
        </a>
        <span className="px-2">/</span>
        <span className="text-emeraldDark">{product.name}</span>
      </nav>

      <Link
        to="/"
        className="inline-flex rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
      >
        Ana Sayfaya Dön
      </Link>

      <article className="mt-6 rounded-2xl border border-emeraldDark/10 bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldDark/70">
          Ürün Detayı
        </p>
        <h1 className="mt-3 text-3xl font-black text-emeraldDark md:text-4xl">
          {product.name}
        </h1>

        <div className="mt-6 rounded-2xl border border-emeraldDark/10 bg-gradient-to-br from-slate-50 to-emeraldDark/10 p-4">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto max-h-[360px] w-full object-contain"
            />
          ) : (
            <div className="grid h-44 place-content-center text-sm font-semibold text-emeraldDark/70">
              Urun gorseli yakinda eklenecek
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4 text-sm leading-7 text-gray-700 md:text-base">
          <p>
            <span className="font-bold text-emeraldDark">Kullanım Amacı: </span>
            {product.purpose}
          </p>
          <p>
            <span className="font-bold text-emeraldDark">Dozaj: </span>
            {product.dosage}
          </p>
          <p>
            <span className="font-bold text-emeraldDark">Açıklama: </span>
            {product.details}
          </p>
          <p>
            <span className="font-bold text-emeraldDark">Kullanım Dönemi: </span>
            {product.period}
          </p>
          <p>
            <span className="font-bold text-emeraldDark">İçerik Özeti: </span>
            {product.content}
          </p>
          <p>
            <span className="font-bold text-emeraldDark">Uygulama Planı: </span>
            {product.usagePlan}
          </p>
          <p>
            <span className="font-bold text-emeraldDark">Saklama / Uyarı: </span>
            {product.caution}
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={requestUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-pistachio px-5 py-2 text-sm font-semibold text-white"
          >
            WhatsApp&apos;tan Sor
          </a>
          <a
            href="/#bilgi-bankasi"
            className="inline-flex rounded-full border border-emeraldDark/20 px-5 py-2 text-sm font-semibold text-emeraldDark"
          >
            Diger urunleri incele
          </a>
        </div>
      </article>

      {relatedProducts.length > 0 ? (
        <div className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
              Benzer Urunler
            </p>
            <h2 className="mt-2 text-2xl font-black text-emeraldDark">
              Ilgini cekebilecek diger urunler
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductDetailPage;
