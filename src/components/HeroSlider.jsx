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
        ? "rounded-full bg-pistachio px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-pistachio/25 transition hover:brightness-105 sm:px-6 sm:py-3 sm:text-sm"
        : "rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm";

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
      className="relative w-full overflow-hidden bg-emeraldDark"
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
      <div className="relative mx-auto w-full min-h-[640px] md:min-h-[520px]">
        {heroSlides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <article
              key={slide.id}
              className={`absolute inset-0 w-full transition-opacity duration-700 ease-out ${
                active
                  ? "pointer-events-auto z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0"
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

              <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col gap-5 px-4 pb-28 pt-8 md:flex-row md:items-center md:gap-12 md:px-6 md:pb-24 md:pt-16">
                <div
                  className={`order-2 flex w-full flex-1 flex-col items-start gap-4 md:order-1 md:max-w-xl md:gap-5 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.2em]">
                    {slide.eyebrow}
                  </span>
                  <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-5xl lg:text-[3.25rem]">
                    {slide.title}
                  </h1>
                  <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                    {slide.description}
                  </p>
                  <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                    {renderCta(slide.primary, "primary")}
                    {renderCta(slide.secondary, "secondary")}
                  </div>
                </div>

                <div
                  className={`order-1 flex w-full shrink-0 items-center justify-center md:order-2 md:flex-1 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className="absolute h-40 w-40 rounded-full bg-pistachio/20 blur-3xl md:h-72 md:w-72"
                    aria-hidden
                  />
                  <div className="relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/25 bg-white/5 shadow-2xl shadow-black/25 ring-1 ring-white/10 sm:max-w-xs md:max-w-lg md:rounded-3xl">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className={`aspect-[4/3] h-auto w-full object-cover ${
                        active ? "animate-hero-float" : ""
                      }`}
                      loading={slideIndex === 0 ? "eager" : "lazy"}
                      fetchPriority={slideIndex === 0 ? "high" : "auto"}
                      decoding="async"
                      sizes="(max-width: 768px) 280px, 480px"
                      width={1024}
                      height={768}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/30 to-transparent pb-4 pt-12 md:pb-6 md:pt-16">
        <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between md:px-6">
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
