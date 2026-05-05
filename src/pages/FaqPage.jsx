import Seo from "../components/Seo";

const faqs = [
  {
    q: "Hangi ürünü hangi dönemde kullanmalıyım?",
    a: "Yarış, tüy, üretim ve toparlanma dönemlerine göre ürün seçimi değişir. Ürün detay sayfalarındaki dönem başlıklarını takip edebilir veya WhatsApp üzerinden destek alabilirsiniz."
  },
  {
    q: "Birden fazla ürünü aynı anda kullanabilir miyim?",
    a: "Evet, ancak içerik çakışmalarını önlemek için programlı kullanım gerekir. Özellikle vitamin ve mineral kombinasyonlarında doz dengesi önemlidir."
  },
  {
    q: "Sipariş sonrası ne kadar sürede dönüş alırım?",
    a: "Sipariş hattı üzerinden gelen mesajlar mümkün olan en kısa sürede yanıtlanır. Stok, kullanım ve kargo bilgileri aynı hat üzerinden paylaşılır."
  },
  {
    q: "Dozaj bilgisi nerede yazıyor?",
    a: "Her ürünün detay sayfasında özet dozaj bilgisi bulunur. Nihai kullanım için ürün etiketindeki üretici talimatı esas alınmalıdır."
  }
];

const FaqPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Sik Sorulan Sorular"
        description="Urun kullanimi, dozaj, siparis sureci ve donemsel destek planlariyla ilgili sik sorulan sorular."
      />
      <h1 className="text-3xl font-black text-emeraldDark md:text-4xl">
        Sık Sorulan Sorular
      </h1>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <article
            key={faq.q}
            className="rounded-2xl border border-emeraldDark/10 bg-white p-5"
          >
            <h2 className="text-lg font-bold text-emeraldDark">{faq.q}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-700 md:text-base">{faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FaqPage;
