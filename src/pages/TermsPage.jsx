import Seo from "../components/Seo";

const TermsPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Kullanim Kosullari"
        description="Bilgi bankasi iceriklerinin kullanimi ve web sitesi kullanim kosullari."
      />
      <h1 className="text-3xl font-black text-emeraldDark md:text-4xl">
        Kullanım Koşulları
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-7 text-gray-700 md:text-base">
        <p>
          Bilgi bankasında yer alan içerikler genel bilgilendirme amaçlıdır. Nihai
          kullanımda ürün etiketindeki üretici talimatları esas alınmalıdır.
        </p>
        <p>
          Sitede yer alan metin, görsel ve marka öğeleri izinsiz çoğaltılamaz.
          İçeriklerin güncellenmesi ve düzenlenmesi Hakan Yemcilik tarafından
          yapılır.
        </p>
        <p>
          Kullanıcı, web sitesini hukuka uygun şekilde kullanmayı kabul eder. Hatalı
          bilgi girişinden doğabilecek sonuçlardan kullanıcı sorumludur.
        </p>
      </div>
    </section>
  );
};

export default TermsPage;
