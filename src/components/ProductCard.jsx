import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineQrCode } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { whatsappNumber } from "../data/products";

const ProductCard = ({ product }) => {
  const requestUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`
  )}`;

  return (
    <article className="group flex flex-col rounded-2xl border border-emeraldDark/15 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative mb-4 h-44 rounded-xl bg-gradient-to-br from-slate-50 to-emeraldDark/10">
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.campaign ? (
            <span className="rounded-full bg-pistachio px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {product.campaign}
            </span>
          ) : null}
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emeraldDark">
            {product.stock}
          </span>
        </div>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded-xl object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full place-content-center text-sm font-semibold text-emeraldDark/70">
            Urun gorseli yakinda eklenecek
          </div>
        )}
        <span className="absolute bottom-3 right-3 rounded-lg bg-white/90 p-2 text-emeraldDark shadow">
          <HiOutlineQrCode size={20} />
        </span>
      </div>

      <h3 className="mb-3 text-xl font-extrabold text-emeraldDark">{product.name}</h3>
      <div className="mb-3 flex flex-wrap gap-2">
        <p className="rounded-full bg-emeraldDark/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emeraldDark/80">
          Marka: {product.brand || "Belirtilmedi"}
        </p>
        <p className="rounded-full bg-emeraldDark/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emeraldDark/80">
          Kategori: {product.category}
        </p>
      </div>
      <p className="mb-1 text-sm text-gray-700">
        <span className="font-bold text-emeraldDark">Kullanım Amacı: </span>
        {product.purpose}
      </p>
      <p className="mb-5 text-sm text-gray-700">
        <span className="font-bold text-emeraldDark">Dozaj: </span>
        {product.dosage}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3">
        <Link
          to={`/urun/${product.slug}`}
          className="inline-flex w-fit items-center rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
        >
          Detaya Git
        </Link>
        <a
          href={requestUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-pistachio px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
        >
          <FiMessageCircle size={14} />
          Hemen Sipariş
        </a>
      </div>
    </article>
  );
};

export default ProductCard;
