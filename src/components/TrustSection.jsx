const trustItems = [
  {
    title: "Orijinal Ürün Garantisi",
    text: "Bilgi bankasında yer alan ürünler raf envanterimizde bulunan, güvenilir markaların ürünleridir."
  },
  {
    title: "Uzman Ürün Danışmanlığı",
    text: "Döneme göre doğru ürün eşleştirmesi için WhatsApp hattımızdan birebir destek sağlanır."
  },
  {
    title: "Hızlı ve Şeffaf İletişim",
    text: "Sipariş, stok ve kullanım bilgileri net şekilde paylaşılır; karar süreciniz hızlanır."
  }
];

const TrustSection = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
          Güven ve Kurumsallık
        </p>
        <h2 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
          Güvenle Alışveriş Yapın
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {trustItems.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-emeraldDark/10 bg-white p-6"
          >
            <h3 className="text-lg font-bold text-emeraldDark">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
