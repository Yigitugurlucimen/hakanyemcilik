import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ORDER_STATUSES, orderStatusLabel } from "../../lib/orderTransforms";
import { formatPrice, hasPrice } from "../../lib/formatPrice";
import { fetchOrderById, updateOrderStatus } from "../../services/orderService";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const item = await fetchOrderById(id);
      if (!item) {
        setError("Sipariş bulunamadı.");
        setOrder(null);
      } else {
        setOrder(item);
      }
    } catch (loadError) {
      setError(loadError.message || "Sipariş yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (event) => {
    const nextStatus = event.target.value;
    setSaving(true);
    setError("");

    try {
      await updateOrderStatus(id, nextStatus);
      await load();
    } catch (saveError) {
      setError(saveError.message || "Durum güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-600">Yükleniyor…</p>;
  }

  if (!order) {
    return (
      <section>
        <p className="text-sm text-red-600">{error || "Sipariş bulunamadı."}</p>
        <Link to="/panel/siparisler" className="mt-4 inline-flex text-sm font-semibold text-emeraldDark">
          Sipariş listesine dön
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link
        to="/panel/siparisler"
        className="inline-flex text-sm font-semibold text-emeraldDark hover:underline"
      >
        ← Sipariş listesi
      </Link>

      <header className="mt-4 mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
            Sipariş Detayı
          </p>
          <h2 className="mt-1 text-2xl font-black text-emeraldDark">{order.orderNumber}</h2>
          <p className="mt-1 text-sm text-gray-600">{formatDate(order.createdAt)}</p>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emeraldDark/70">
            Durum
          </span>
          <select
            value={order.status}
            onChange={handleStatusChange}
            disabled={saving}
            className="rounded-xl border border-emeraldDark/20 bg-white px-4 py-2 text-sm font-semibold text-emeraldDark"
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emeraldDark/10 bg-white p-6">
          <h3 className="text-lg font-bold text-emeraldDark">Müşteri</h3>
          <dl className="mt-4 space-y-3 text-sm text-gray-700">
            <div>
              <dt className="font-semibold text-emeraldDark">Ad Soyad</dt>
              <dd>{order.customerName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-emeraldDark">Telefon</dt>
              <dd>
                <a href={`tel:${order.customerPhone}`} className="hover:underline">
                  {order.customerPhone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-emeraldDark">Adres</dt>
              <dd className="whitespace-pre-wrap">{order.customerAddress}</dd>
            </div>
            {order.customerNote ? (
              <div>
                <dt className="font-semibold text-emeraldDark">Not</dt>
                <dd className="whitespace-pre-wrap">{order.customerNote}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="rounded-2xl border border-emeraldDark/10 bg-white p-6">
          <h3 className="text-lg font-bold text-emeraldDark">Özet</h3>
          <p className="mt-2 text-sm text-gray-600">
            Durum: <strong>{orderStatusLabel(order.status)}</strong>
          </p>
          <p className="mt-2 text-2xl font-black text-emeraldDark">
            {order.subtotal != null ? formatPrice(order.subtotal) : "Fiyat belirtilmedi"}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-emeraldDark/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-emeraldDark/10 bg-emeraldDark/5 text-xs uppercase text-emeraldDark/80">
            <tr>
              <th className="px-4 py-3">Ürün</th>
              <th className="px-4 py-3">Adet</th>
              <th className="px-4 py-3">Birim</th>
              <th className="px-4 py-3">Satır</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="px-4 py-3 font-semibold text-emeraldDark">{item.productName}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">
                  {hasPrice(item.unitPrice) ? formatPrice(item.unitPrice) : "—"}
                </td>
                <td className="px-4 py-3">
                  {hasPrice(item.lineTotal) ? formatPrice(item.lineTotal) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrderDetailPage;
