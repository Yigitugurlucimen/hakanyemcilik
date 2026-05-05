import Seo from "../components/Seo";

const PrivacyPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Gizlilik Politikasi"
        description="Web sitesi gizlilik ilkeleri, veri guvenligi ve saklama sureclerine dair genel bilgilendirme."
      />
      <h1 className="text-3xl font-black text-emeraldDark md:text-4xl">
        Gizlilik Politikası
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-7 text-gray-700 md:text-base">
        <p>
          Bu web sitesi üzerinden paylaşılan bilgiler yalnızca iletişim, sipariş ve
          müşteri destek süreçlerinin yürütülmesi amacıyla kullanılır.
        </p>
        <p>
          Kullanıcı verileri, yetkisiz erişime karşı teknik ve idari önlemlerle
          korunur. Veriler, yasal saklama süresi sonunda silinir veya anonim hale
          getirilir.
        </p>
        <p>
          Web sitemizi kullanarak bu gizlilik politikasında belirtilen esasları
          kabul etmiş olursunuz.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPage;
