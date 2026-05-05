const InfoSection = () => {
  return (
    <section className="bg-emeraldDark/5 py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-6">
        <article className="rounded-2xl border border-emeraldDark/10 bg-white p-6">
          <h3 className="text-lg font-bold text-emeraldDark">Neden Hakan Yemcilik?</h3>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Petshop ve güvercin takviyelerinde saha deneyimi odaklı bir bilgi
            bankası sunuyoruz. Ürünleri sezon, dönem ve ihtiyaç bazlı anlatıyoruz.
          </p>
        </article>
        <article className="rounded-2xl border border-emeraldDark/10 bg-white p-6">
          <h3 className="text-lg font-bold text-emeraldDark">Hızlı Destek</h3>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Sipariş ve teknik kullanım sorularını WhatsApp hattından hızlıca
            yanıtlıyoruz. Ürün eşleştirmelerini kuşunuzun dönemine göre öneriyoruz.
          </p>
        </article>
        <article className="rounded-2xl border border-emeraldDark/10 bg-white p-6">
          <h3 className="text-lg font-bold text-emeraldDark">Bilgi Odaklı Vitrin</h3>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Her üründe kullanım amacı, dozaj ve detay sayfası bulunur. Böylece
            ürün seçiminde daha hızlı ve doğru karar verirsiniz.
          </p>
        </article>
      </div>
    </section>
  );
};

export default InfoSection;
