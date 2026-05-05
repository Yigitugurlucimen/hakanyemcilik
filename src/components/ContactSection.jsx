import { whatsappNumber } from "../data/products";

const ContactSection = () => {
  return (
    <section id="iletisim" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <div className="rounded-2xl bg-emeraldDark p-7 text-white md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          İletişim
        </p>
        <h2 className="mt-3 text-3xl font-black">Sipariş ve Ürün Danışmanlığı</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">
          Takviye planı, dozaj, dönemsel kullanım veya stok soruları için bize
          doğrudan WhatsApp üzerinden ulaşabilirsiniz.
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-pistachio px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
        >
          WhatsApp ile Hemen Ulaş
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
