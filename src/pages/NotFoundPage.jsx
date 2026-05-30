import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { pathWithBasename } from "../lib/appBase.js";

const NotFoundPage = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <Seo
        title="Sayfa Bulunamadi"
        description="Aradiginiz sayfa bulunamadi. Ana sayfaya donerek urun vitrinine ulasabilirsiniz."
      />

      <div className="rounded-3xl border border-emeraldDark/10 bg-emeraldDark/5 p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
          404
        </p>
        <h1 className="mt-3 text-3xl font-black text-emeraldDark md:text-4xl">
          Aradiginiz sayfa bulunamadi
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-700 md:text-base">
          Link eski olabilir veya adres hatali yazilmis olabilir. Ana sayfaya
          donerek bilgi bankasindaki guncel urunleri inceleyebilirsiniz.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex rounded-full bg-emeraldDark px-5 py-2.5 text-sm font-semibold text-white"
          >
            Ana sayfaya don
          </Link>
          <a
            href={pathWithBasename("/#bilgi-bankasi")}
            className="inline-flex rounded-full border border-emeraldDark/20 px-5 py-2.5 text-sm font-semibold text-emeraldDark"
          >
            Urun vitrini
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
