import Seo from "../components/Seo";

const AboutPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Hakkimizda"
        description="Hakan Yemcilik'in hizmet yaklasimi, urun danismanligi ve bilgi bankasi odakli calisma modeli."
      />
      <h1 className="text-3xl font-black text-emeraldDark md:text-4xl">Hakkımızda</h1>
      <div className="mt-6 space-y-4 text-sm leading-7 text-gray-700 md:text-base">
        <p>
          Hakan Yemcilik olarak Adana&apos;da petshop ve güvercin takviyeleri alanında
          bilgiye dayalı, güvenilir bir hizmet sunuyoruz. Amacımız yalnızca ürün
          satışı değil, doğru ürünü doğru dönemde kullandırarak sürdürülebilir
          performans ve sağlık desteği vermektir.
        </p>
        <p>
          Bilgi bankamızdaki içerikler; ürün kullanım amacı, dönemsel ihtiyaç ve
          pratik uygulama kolaylığı odaklı hazırlanır. Müşterilerimize hızlı ve net
          danışmanlık vererek karar süresini kısaltıyoruz.
        </p>
        <p>
          Sipariş hattımız üzerinden stok, kullanım planı ve ürün eşleştirmesi
          konularında birebir destek alabilirsiniz.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
