import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { useProducts } from "../../context/ProductsContext";
import { createEmptyProduct } from "../../lib/emptyProduct";
import {
  createProduct,
  deleteProduct,
  fetchProductBySlug,
  updateProduct
} from "../../services/productService";

const AdminProductFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { refreshProducts } = useProducts();
  const isNew = slug === "yeni";

  const [product, setProduct] = useState(createEmptyProduct());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;

    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const existing = await fetchProductBySlug(slug);
        if (!existing) {
          setError("Urun bulunamadi.");
          return;
        }
        setProduct({
          id: existing.id,
          slug: existing.slug,
          name: existing.name,
          category: existing.category,
          stock: existing.stock,
          campaign: existing.campaign || "",
          tags: existing.tags || [],
          purpose: existing.purpose || "",
          dosage: existing.dosage || "",
          details: existing.details || "",
          period: existing.period || "",
          content: existing.content || "",
          usagePlan: existing.usagePlan || "",
          caution: existing.caution || "",
          price: existing.price ?? "",
          imageUrl: existing.imageUrl || existing.image || "",
          isActive: existing.isActive !== false,
          sortOrder: existing.sortOrder ?? 0
        });
      } catch (loadError) {
        setError(loadError.message || "Urun yuklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [isNew, slug]);

  const handleDelete = async () => {
    if (!product.id) return;

    const confirmed = window.confirm(
      `"${product.name}" ürününü kalıcı olarak silmek istediğinize emin misiniz?`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteProduct(product.id);
      await refreshProducts();
      navigate("/panel");
    } catch (deleteError) {
      setError(deleteError.message || "Ürün silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isNew) {
        await createProduct(product);
      } else {
        await updateProduct(product.id, product);
      }

      await refreshProducts();
      navigate("/panel");
    } catch (saveError) {
      setError(saveError.message || "Kayit basarisiz.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-600">Urun yukleniyor...</p>;
  }

  return (
    <section>
      <Link to="/panel" className="text-sm font-semibold text-emeraldDark underline">
        Urun listesine don
      </Link>
      <h2 className="mt-4 text-2xl font-black text-emeraldDark">
        {isNew ? "Yeni Urun" : "Urunu Duzenle"}
      </h2>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-6">
        <ProductForm
          product={product}
          onChange={setProduct}
          onSubmit={handleSubmit}
          saving={saving}
          submitLabel={isNew ? "Ürünü Kaydet" : "Değişiklikleri Kaydet"}
        />
        {!isNew && product.id ? (
          <button
            type="button"
            disabled={deleting || saving}
            onClick={handleDelete}
            className="mt-6 rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Siliniyor…" : "Ürünü Sil"}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default AdminProductFormPage;
