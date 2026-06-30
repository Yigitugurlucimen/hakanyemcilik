import PageShell from "../components/ui/PageShell.jsx";
import Seo from "../components/Seo";
import {
  addressLine,
  contactEmail,
  siteName,
  whatsappDisplay
} from "../lib/siteConfig.js";

const PreInformationPage = () => {
  return (
    <>
      <Seo
        title="Ön Bilgilendirme Formu"
        description="Sipariş öncesi satıcı bilgileri, ürün özellikleri, teslimat ve cayma hakkına ilişkin ön bilgilendirme."
      />
      <PageShell
        eyebrow="Yasal"
        title="Ön Bilgilendirme Formu"
        description="Mesafeli sözleşme kurulmadan önce tüketicinin bilgilendirilmesi amacıyla hazırlanmıştır."
        breadcrumbs={[
          { label: "Ana Sayfa", to: "/" },
          { label: "Ön Bilgilendirme Formu" }
        ]}
      >
        <div className="space-y-6 text-sm leading-7 text-gray-700 md:text-base">
          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Satıcı Bilgileri</h2>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Unvan: {siteName}</li>
              <li>Adres: {addressLine}</li>
              <li>Telefon / WhatsApp: {whatsappDisplay}</li>
              <li>E-posta: {contactEmail}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Ürün Bilgisi</h2>
            <p className="mt-2">
              Siparişe konu ürünlerin adı, kullanım amacı, dozaj bilgisi ve varsa fiyatı
              sepet ve ürün detay sayfalarında gösterilir. Görseller temsilidir; ambalaj
              güncellemelerinde küçük farklılıklar olabilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Toplam Bedel</h2>
            <p className="mt-2">
              Ürün bedeline kargo ücreti dahil değildir. Kargo ücreti ve varsa vergi /
              masraflar sipariş onayı sırasında ayrıca bildirilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Teslimat Süresi</h2>
            <p className="mt-2">
              Siparişler stok durumuna göre hazırlanır. Tahmini teslimat süresi sipariş
              onayında paylaşılır; mücbir sebeplerde süre uzayabilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Ödeme Şekli</h2>
            <p className="mt-2">
              Havale/EFT, kapıda ödeme veya ileride sunulacak online ödeme yöntemleri
              kullanılabilir. Kesin ödeme yöntemi sipariş onayında belirlenir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Cayma Hakkı</h2>
            <p className="mt-2">
              Tüketici, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir
              gerekçe göstermeksizin cayma hakkına sahiptir. İstisnalar ve iade süreci
              için Teslimat ve İade sayfamıza bakınız.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">Şikayet ve Başvuru</h2>
            <p className="mt-2">
              Şikayet ve taleplerinizi WhatsApp sipariş hattımız veya {contactEmail}{" "}
              adresi üzerinden iletebilirsiniz.
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
};

export default PreInformationPage;
