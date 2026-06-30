import PageShell from "../components/ui/PageShell.jsx";
import Seo from "../components/Seo";
import {
  addressLine,
  contactEmail,
  siteName,
  whatsappDisplay
} from "../lib/siteConfig.js";

const DistanceSalesPage = () => {
  return (
    <>
      <Seo
        title="Mesafeli Satış Sözleşmesi"
        description="Hakan Yemcilik mesafeli satış sözleşmesi ve tüketici haklarına ilişkin bilgilendirme."
      />
      <PageShell
        eyebrow="Yasal"
        title="Mesafeli Satış Sözleşmesi"
        description="6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında bilgilendirme metni."
        breadcrumbs={[
          { label: "Ana Sayfa", to: "/" },
          { label: "Mesafeli Satış Sözleşmesi" }
        ]}
      >
        <div className="space-y-6 text-sm leading-7 text-gray-700 md:text-base">
          <section>
            <h2 className="text-lg font-bold text-emeraldDark">1. Taraflar</h2>
            <p className="mt-2">
              <strong>Satıcı:</strong> {siteName}
              <br />
              Adres: {addressLine}
              <br />
              Telefon / WhatsApp: {whatsappDisplay}
              <br />
              E-posta: {contactEmail}
            </p>
            <p className="mt-2">
              <strong>Alıcı:</strong> Sipariş formunda veya WhatsApp üzerinden paylaştığı
              ad, telefon ve adres bilgileriyle tanımlanan gerçek veya tüzel kişi.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">2. Sözleşmenin Konusu</h2>
            <p className="mt-2">
              İşbu sözleşme, alıcının {siteName} web sitesi veya WhatsApp sipariş hattı
              üzerinden talep ettiği ürünlerin satışına ve teslimine ilişkin tarafların hak
              ve yükümlülüklerini düzenler.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">3. Ürün ve Fiyat Bilgisi</h2>
            <p className="mt-2">
              Ürünlerin temel nitelikleri, kullanım amacı ve güncel fiyat bilgileri sitede
              yayınlanır. Kampanya veya stok durumuna göre fiyat değişikliği yapılabilir;
              kesin tutar sipariş onayı sırasında paylaşılır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">4. Ödeme ve Teslimat</h2>
            <p className="mt-2">
              Ödeme yöntemi (havale/EFT, kapıda ödeme veya ileride eklenecek online ödeme)
              sipariş onayı sırasında belirlenir. Teslimat, stok durumuna göre anlaşmalı
              kargo firması aracılığıyla alıcının bildirdiği adrese yapılır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">5. Cayma Hakkı</h2>
            <p className="mt-2">
              Alıcı, teslimattan itibaren 14 gün içinde cayma hakkını kullanabilir. Hijyen
              ve güvenlik nedeniyle ambalajı açılmış, kullanılmış veya tekrar satılamaz
              hale gelmiş ürünlerde cayma hakkı sınırlı olabilir. Detaylar için{" "}
              <a href="/teslimat-iade" className="font-semibold text-emeraldDark underline-offset-2 hover:underline">
                Teslimat ve İade
              </a>{" "}
              sayfasına bakınız.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emeraldDark">6. Uyuşmazlık</h2>
            <p className="mt-2">
              Uyuşmazlıklarda alıcının yerleşim yerindeki veya işlemin yapıldığı yerdeki
              Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
};

export default DistanceSalesPage;
