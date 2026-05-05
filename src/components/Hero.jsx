import { whatsappNumber } from "../data/products";

const Hero = () => {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, ürün önerisi ve fiyat bilgisi almak istiyorum."
  )}`;

  return (
    <section className="bg-gradient-to-br from-emeraldDark to-emeraldDark/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-4 py-16 md:px-6 md:py-20">
        <p className="rounded-full bg-white/15 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-white/90">
          Hakan Yemcilik Bilgi Bankası
        </p>
        <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight text-white md:text-5xl">
          Adana&apos;nın Güvenilir Takviye Uzmanı
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#bilgi-bankasi"
            className="rounded-full bg-pistachio px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-95"
          >
            Bilgi Bankasına Git
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/20"
          >
            Hemen Sipariş Ver
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
