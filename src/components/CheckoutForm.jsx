import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { whatsappNumber } from "../data/products.js";
import { buildCartWhatsAppMessage } from "../lib/cartWhatsApp.js";
import { formatPrice } from "../lib/formatPrice.js";
import { createStoreOrder } from "../services/orderService.js";

const emptyCustomer = {
  name: "",
  phone: "",
  address: "",
  note: ""
};

const CheckoutForm = ({ items, subtotal }) => {
  const { clearCart } = useCart();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const updateField = (field) => (event) => {
    setCustomer((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!customer.name.trim()) nextErrors.name = "Ad soyad gerekli";
    if (!customer.phone.trim()) nextErrors.phone = "Telefon gerekli";
    if (!customer.address.trim()) nextErrors.address = "Teslimat adresi gerekli";
    if (!acceptedTerms) nextErrors.terms = "Devam etmek için sözleşmeleri onaylayın";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const customerPayload = {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      note: customer.note.trim()
    };

    let savedOrderNumber = null;

    try {
      const result = await createStoreOrder({
        customer: customerPayload,
        items,
        subtotal
      });
      savedOrderNumber = result.orderNumber;
      setOrderNumber(savedOrderNumber);
    } catch (saveError) {
      console.error(saveError);
      setErrors({
        submit:
          "Sipariş kaydı oluşturulamadı; yine de WhatsApp ile devam edebilirsiniz. Sorun devam ederse bizi arayın."
      });
    }

    const message = buildCartWhatsAppMessage(
      items,
      subtotal,
      customerPayload,
      savedOrderNumber
    );
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (savedOrderNumber) {
      clearCart();
    }

    setSubmitting(false);
  };

  if (orderNumber) {
    return (
      <aside className="mt-8 rounded-2xl border border-emeraldDark/10 bg-emeraldDark/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
          Sipariş alındı
        </p>
        <h2 className="mt-2 text-2xl font-black text-emeraldDark">
          Sipariş No: {orderNumber}
        </h2>
        <p className="mt-3 text-sm text-gray-700">
          Siparişiniz kaydedildi ve WhatsApp mesajı açıldı. Onay için ekibimiz sizinle
          iletişime geçecektir.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/#bilgi-bankasi"
            className="inline-flex rounded-full bg-pistachio px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            Alışverişe Devam
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-2xl border border-emeraldDark/10 bg-white p-6">
        <h2 className="text-lg font-bold text-emeraldDark">Teslimat Bilgileri</h2>
        <p className="mt-1 text-sm text-gray-600">
          Bilgileriniz sisteme kaydedilir ve WhatsApp sipariş mesajına eklenir.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
              Ad Soyad *
            </span>
            <input
              type="text"
              value={customer.name}
              onChange={updateField("name")}
              autoComplete="name"
              className="w-full rounded-xl border border-emeraldDark/20 px-4 py-3 text-sm outline-none ring-emeraldDark focus:ring-2"
              placeholder="Adınız ve soyadınız"
            />
            {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
              Telefon *
            </span>
            <input
              type="tel"
              value={customer.phone}
              onChange={updateField("phone")}
              autoComplete="tel"
              className="w-full rounded-xl border border-emeraldDark/20 px-4 py-3 text-sm outline-none ring-emeraldDark focus:ring-2"
              placeholder="05XX XXX XX XX"
            />
            {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
              Teslimat Adresi *
            </span>
            <textarea
              value={customer.address}
              onChange={updateField("address")}
              autoComplete="street-address"
              rows={3}
              className="w-full rounded-xl border border-emeraldDark/20 px-4 py-3 text-sm outline-none ring-emeraldDark focus:ring-2"
              placeholder="İl, ilçe, mahalle ve açık adres"
            />
            {errors.address ? (
              <p className="mt-1 text-xs text-red-600">{errors.address}</p>
            ) : null}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
              Sipariş Notu
            </span>
            <textarea
              value={customer.note}
              onChange={updateField("note")}
              rows={2}
              className="w-full rounded-xl border border-emeraldDark/20 px-4 py-3 text-sm outline-none ring-emeraldDark focus:ring-2"
              placeholder="Opsiyonel: teslimat saati, kargo tercihi vb."
            />
          </label>
        </div>
      </div>

      <aside className="rounded-2xl border border-emeraldDark/10 bg-emeraldDark/5 p-6">
        {subtotal != null ? (
          <p className="text-sm text-gray-600">Ara toplam (fiyat girilmiş ürünler)</p>
        ) : null}
        <p className="mt-1 text-2xl font-black text-emeraldDark">
          {subtotal != null ? formatPrice(subtotal) : "Fiyatlar panelden girilecek"}
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Ödeme ve kargo detayları WhatsApp üzerinden netleştirilir.
        </p>

        <label className="mt-5 flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => {
              setAcceptedTerms(event.target.checked);
              if (event.target.checked && errors.terms) {
                setErrors((current) => {
                  const next = { ...current };
                  delete next.terms;
                  return next;
                });
              }
            }}
            className="mt-1 h-4 w-4 rounded border-emeraldDark/30 text-emeraldDark focus:ring-emeraldDark"
          />
          <span>
            <Link to="/on-bilgilendirme" className="font-semibold text-emeraldDark underline-offset-2 hover:underline">
              Ön bilgilendirme formunu
            </Link>
            {" "}ve{" "}
            <Link to="/mesafeli-satis" className="font-semibold text-emeraldDark underline-offset-2 hover:underline">
              mesafeli satış sözleşmesini
            </Link>
            {" "}okudum, kabul ediyorum.
          </span>
        </label>
        {errors.terms ? <p className="mt-2 text-xs text-red-600">{errors.terms}</p> : null}
        {errors.submit ? <p className="mt-2 text-sm text-amber-700">{errors.submit}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-pistachio px-6 py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
          >
            <FiMessageCircle size={16} />
            {submitting ? "Kaydediliyor…" : "WhatsApp ile Sipariş Ver"}
          </button>
          <Link
            to="/#bilgi-bankasi"
            className="inline-flex rounded-full border border-emeraldDark/20 px-6 py-3 text-sm font-semibold text-emeraldDark"
          >
            Alışverişe Devam
          </Link>
        </div>
      </aside>
    </form>
  );
};

export default CheckoutForm;
