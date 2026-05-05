import Seo from "../components/Seo";

const ShippingReturnsPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Teslimat ve Iade"
        description="Teslimat sureci, iade kosullari ve hasar bildirimi hakkinda temel bilgilendirme."
      />
      <h1 className="text-3xl font-black text-emeraldDark md:text-4xl">
        Teslimat ve İade
      </h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-gray-700 md:text-base">
        <div>
          <h2 className="text-lg font-bold text-emeraldDark">Teslimat</h2>
          <p className="mt-2">
            Siparişler, stok durumuna göre hazırlık sürecine alınır ve anlaşmalı
            kargo ile gönderilir. Gönderi bilgileri sipariş hattı üzerinden
            paylaşılır.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-emeraldDark">İade Koşulları</h2>
          <p className="mt-2">
            Açılmamış ve tekrar satılabilir durumda olan ürünler için iade süreci
            değerlendirilebilir. Hijyen ve güvenlik gereği açılmış ürünlerde iade
            kabulü ürün bazında incelenir.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-emeraldDark">Hasarlı Ürün Bildirimi</h2>
          <p className="mt-2">
            Kargo tesliminde hasar fark edilmesi durumunda, aynı gün içinde sipariş
            hattımıza fotoğraf ve sipariş bilgisi ile bildirim yapmanız gerekir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShippingReturnsPage;
