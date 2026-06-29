const brands = [
  "Vitaturka",
  "Meng-Vit",
  "Röhnfried",
  "Versele Laga",
  "Natural",
  "Brockamp",
  "Nutribird"
];

const BrandStrip = () => {
  const track = [...brands, ...brands];

  return (
    <section className="border-y border-emeraldDark/10 bg-white py-5">
      <div className="section-shell">
        <p className="section-eyebrow mb-4 text-center md:text-left">Güvenilir Markalar</p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-3">
            {track.map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="shrink-0 rounded-full border border-emeraldDark/15 bg-gradient-to-br from-white to-emeraldDark/5 px-5 py-2.5 text-sm font-semibold text-emeraldDark shadow-sm"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
