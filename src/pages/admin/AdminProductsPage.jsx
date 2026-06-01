import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { deleteProduct, fetchAllProducts } from "../../services/productService";

const AdminProductsPage = () => {
  const { refreshProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const items = await fetchAllProducts();
      setProducts(items || []);
    } catch (loadError) {
      setError(loadError.message || "Ürünler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `"${product.name}" ürününü kalıcı olarak silmek istediğinize emin misiniz?`
    );
    if (!confirmed) return;

    setDeletingId(product.id);
    setError("");

    try {
      await deleteProduct(product.id);
      await load();
      await refreshProducts();
    } catch (deleteError) {
      setError(deleteError.message || "Ürün silinemedi.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price) =>
    price == null ? "—" : `${Number(price).toLocaleString("tr-TR")} TL`;

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-emeraldDark">Ürünler</h2>
          <p className="mt-1 text-sm text-gray-600">
            Toplam {products.length} ürün. Değişiklikler kaydedildikten sonra site güncellenir.
          </p>
        </div>
        <Link
          to="/panel/urun/yeni"
          className="rounded-full bg-pistachio px-5 py-2 text-sm font-bold uppercase text-white"
        >
          Yeni Ürün Ekle
        </Link>
      </header>

      {loading ? <p className="text-sm text-gray-600">Yükleniyor…</p> : null}
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-emeraldDark/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-emeraldDark/10 bg-emeraldDark/5 text-xs uppercase text-emeraldDark/80">
            <tr>
              <th className="px-4 py-3">Ürün</th>
              <th className="px-4 py-3">Fiyat</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id || product.slug} className="border-b border-gray-100">
                <td className="px-4 py-3 font-semibold text-emeraldDark">{product.name}</td>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  {product.isActive ? (
                    <span className="rounded-full bg-pistachio/20 px-2 py-1 text-xs font-semibold text-emeraldDark">
                      Yayında
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                      Pasif
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to={`/panel/urun/${product.slug}`}
                      className="font-semibold text-emeraldDark underline"
                    >
                      Düzenle
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === product.id}
                      onClick={() => handleDelete(product)}
                      className="text-xs font-semibold text-red-600 underline disabled:opacity-50"
                    >
                      {deletingId === product.id ? "Siliniyor…" : "Sil"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={async () => {
          await load();
          await refreshProducts();
        }}
        className="mt-4 rounded-full border border-emeraldDark/20 px-4 py-2 text-xs font-semibold uppercase text-emeraldDark"
      >
        Listeyi Yenile
      </button>
    </section>
  );
};

export default AdminProductsPage;
