import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HERO_AUTOPLAY_MS, heroSlides } from "../data/heroSlides.js";

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const total = heroSlides.length;

  const goTo = useCallback(
    (next) => {
      setIndex((current) => (next + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused) return undefined;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const renderCta = (cta, variant) => {
    const base =
      variant === "primary"
        ? "rounded-full bg-pistachio px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-pistachio/25 transition hover:brightness-105 hover:shadow-xl"
        : "rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20";

    if (cta.to) {
      return (
        <Link to={cta.to} className={base}>
          {cta.label}
        </Link>
      );
    }

    return (
      <a
        href={cta.href}
        className={base}
        {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {cta.label}
      </a>
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-emeraldDark"
      aria-roledescription="carousel"
      aria-label="Öne çıkan kampanyalar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 48) goTo(index + (delta < 0 ? 1 : -1));
        touchStartX.current = null;
      }}
    >
      <div className="relative mx-auto min-h-[440px] w-full max-w-7xl md:min-h-[520px]">
        {heroSlides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <article
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                active
                  ? "pointer-events-auto z-10 translate-x-0 opacity-100"
                  : "pointer-events-none z-0 translate-x-4 opacity-0"
              }`}
              aria-hidden={!active}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 45%), radial-gradient(circle at 80% 80%, rgba(122,184,57,0.2), transparent 40%)"
                }}
                aria-hidden
              />

              <div className="relative mx-auto flex h-full min-h-[440px] w-full max-w-6xl flex-col items-center gap-8 px-4 py-12 md:min-h-[520px] md:flex-row md:gap-12 md:px-6 md:py-16">
                <div
                  className={`flex flex-1 flex-col items-start gap-5 transition-all duration-700 delay-100 md:max-w-xl ${
                    active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    {slide.eyebrow}
                  </span>
                  <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
                    {slide.title}
                  </h1>
                  <p className="max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {renderCta(slide.primary, "primary")}
                    {renderCta(slide.secondary, "secondary")}
                  </div>
                </div>

                <div
                  className={`relative flex w-full flex-1 items-center justify-center transition-all duration-700 delay-200 ${
                    active ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
                  }`}
                >
                  <div
                    className="absolute h-56 w-56 rounded-full bg-pistachio/20 blur-3xl md:h-72 md:w-72"
                    aria-hidden
                  />
                  <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/25 bg-white/5 shadow-2xl shadow-black/25 ring-1 ring-white/10 md:max-w-lg">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className={`aspect-[4/3] h-auto w-full object-cover ${
                        active ? "animate-hero-float" : ""
                      }`}
                      loading={slideIndex === 0 ? "eager" : "lazy"}
                      fetchPriority={slideIndex === 0 ? "high" : "auto"}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/25 to-transparent pb-6 pt-16">
        <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Önceki slayt"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label={paused ? "Slaytı başlat" : "Slaytı duraklat"}
            >
              {paused ? <FiPlay size={16} /> : <FiPause size={16} />}
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label="Sonraki slayt"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2" role="tablist" aria-label="Slayt seçimi">
            {heroSlides.map((slide, dotIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Slayt ${dotIndex + 1}: ${slide.title}`}
                onClick={() => goTo(dotIndex)}
                className={`h-2 rounded-full transition-all ${
                  dotIndex === index
                    ? "w-8 bg-pistachio"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
