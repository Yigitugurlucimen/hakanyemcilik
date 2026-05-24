import { FiMessageCircle, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import PriceTag from "../components/PriceTag.jsx";
import Seo from "../components/Seo.jsx";
import { useCart } from "../context/CartContext.jsx";
import { whatsappNumber } from "../data/products.js";
import { buildCartWhatsAppMessage } from "../lib/cartWhatsApp.js";
import { formatPrice, hasPrice } from "../lib/formatPrice.js";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } =
    useCart();

  const checkoutUrl =
    items.length > 0
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          buildCartWhatsAppMessage(items, subtotal)
        )}`
      : null;

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <Seo
          title="Sepet"
          description="Hakan Yemcilik sepetiniz. Urunlerinizi ekleyip WhatsApp uzerinden siparis verin."
        />
        <h1 className="text-3xl font-black text-emeraldDark">Sepetiniz</h1>
        <p className="mt-3 text-gray-700">Sepetiniz su an bos.</p>
        <Link
          to="/#bilgi-bankasi"
          className="mt-6 inline-flex rounded-full bg-pistachio px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Urunlere Git
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <Seo
        title="Sepet"
        description="Sepetinizdeki urunleri inceleyin ve WhatsApp ile siparis verin."
      />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
            Siparis
          </p>
          <h1 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
            Sepetiniz
          </h1>
          <p className="mt-2 text-sm text-gray-600">{totalItems} urun</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-semibold text-red-600 underline"
        >
          Sepeti Temizle
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.slug}
            className="flex flex-col gap-4 rounded-2xl border border-emeraldDark/10 bg-white p-4 sm:flex-row sm:items-center"
          >
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <div className="grid h-full place-content-center text-[10px] font-semibold text-emeraldDark/60">
                  Gorsel yok
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <Link
                to={`/urun/${item.slug}`}
                className="text-lg font-extrabold text-emeraldDark hover:underline"
              >
                {item.name}
              </Link>
              <div className="mt-1">
                <PriceTag price={item.price} size="sm" />
              </div>
              {hasPrice(item.price) ? (
                <p className="mt-1 text-xs text-gray-500">
                  Satir toplami: {formatPrice(item.price * item.quantity)}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
              <div className="flex items-center rounded-full border border-emeraldDark/20">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  className="px-3 py-2 text-sm font-bold text-emeraldDark"
                  aria-label="Adet azalt"
                >
                  -
                </button>
                <span className="min-w-[2rem] text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-emeraldDark"
                  aria-label="Adet artir"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.slug)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600"
              >
                <FiTrash2 size={14} />
                Kaldir
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-8 rounded-2xl border border-emeraldDark/10 bg-emeraldDark/5 p-6">
        {subtotal != null ? (
          <p className="text-sm text-gray-600">
            Ara toplam (fiyat girilmis urunler)
          </p>
        ) : null}
        <p className="mt-1 text-2xl font-black text-emeraldDark">
          {subtotal != null ? formatPrice(subtotal) : "Fiyatlar panelden girilecek"}
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Odeme ve kargo WhatsApp uzerinden netlestirilir. Kart odeme (Faz C) sonra
          eklenecek.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-pistachio px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            <FiMessageCircle size={16} />
            WhatsApp ile Siparis Ver
          </a>
          <Link
            to="/#bilgi-bankasi"
            className="inline-flex rounded-full border border-emeraldDark/20 px-6 py-3 text-sm font-semibold text-emeraldDark"
          >
            Alisverise Devam
          </Link>
        </div>
      </aside>
    </section>
  );
};

export default CartPage;
