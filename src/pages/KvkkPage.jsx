import Seo from "../components/Seo";

const KvkkPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="KVKK Aydinlatma Metni"
        description="Kisisel verilerin islenmesi, saklanmasi ve KVKK kapsamindaki bilgilendirme metni."
      />
      <h1 className="text-3xl font-black text-emeraldDark md:text-4xl">
        KVKK Aydınlatma Metni
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-7 text-gray-700 md:text-base">
        <p>
          Hakan Yemcilik olarak kişisel verilerinizin güvenliğine önem veriyoruz.
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
          bilgilendirme amacıyla hazırlanmıştır.
        </p>
        <p>
          Sipariş, iletişim ve destek süreçlerinde paylaştığınız ad, telefon, adres
          ve talep içerikleri yalnızca hizmet sunumu, sipariş takibi ve müşteri
          iletişimi amacıyla işlenir.
        </p>
        <p>
          Kanunen zorunlu haller dışında kişisel verileriniz üçüncü kişilerle
          paylaşılmaz. KVKK kapsamındaki başvuru ve taleplerinizi sipariş hattımız
          üzerinden iletebilirsiniz.
        </p>
      </div>
    </section>
  );
};

export default KvkkPage;
