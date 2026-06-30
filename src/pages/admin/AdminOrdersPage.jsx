import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderStatusLabel } from "../../lib/orderTransforms";
import { formatPrice } from "../../lib/formatPrice";
import { fetchAllOrders } from "../../services/orderService";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("tr-TR", {
    dateStyle: "short",
    timeStyle: "short"
  });
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const items = await fetchAllOrders();
      setOrders(items || []);
    } catch (loadError) {
      setError(loadError.message || "Siparişler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-emeraldDark">Siparişler</h2>
          <p className="mt-1 text-sm text-gray-600">
            WhatsApp checkout ile gelen siparişler. Toplam {orders.length} kayıt.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-full border border-emeraldDark/20 px-5 py-2 text-sm font-semibold text-emeraldDark"
        >
          Yenile
        </button>
      </header>

      {loading ? <p className="text-sm text-gray-600">Yükleniyor…</p> : null}
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      {!loading && !orders.length ? (
        <p className="rounded-2xl border border-emeraldDark/10 bg-white p-6 text-sm text-gray-600">
          Henüz sipariş kaydı yok. Müşteri sepetten sipariş verdiğinde burada görünür.
        </p>
      ) : null}

      {orders.length ? (
        <div className="overflow-x-auto rounded-2xl border border-emeraldDark/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-emeraldDark/10 bg-emeraldDark/5 text-xs uppercase text-emeraldDark/80">
              <tr>
                <th className="px-4 py-3">Sipariş No</th>
                <th className="px-4 py-3">Müşteri</th>
                <th className="px-4 py-3">Tutar</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">Tarih</th>
                <th className="px-4 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-emeraldDark">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3">
                    {order.subtotal != null ? formatPrice(order.subtotal) : "—"}
                  </td>
                  <td className="px-4 py-3">{orderStatusLabel(order.status)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/panel/siparis/${order.id}`}
                      className="font-semibold text-emeraldDark hover:underline"
                    >
                      Detay
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default AdminOrdersPage;
