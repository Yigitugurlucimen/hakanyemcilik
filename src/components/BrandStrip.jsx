const brands = [
  "Vitaturka",
  "Meng-Vit",
  "Röhnfried",
  "Versele Laga",
  "Natural"
];

const BrandStrip = () => {
  return (
    <section className="border-y border-emeraldDark/10 bg-white py-6">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
          Markalar
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-emeraldDark/20 bg-emeraldDark/5 px-4 py-2 text-sm font-semibold text-emeraldDark"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
