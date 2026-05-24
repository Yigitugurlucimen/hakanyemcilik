import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { useProducts } from "../../context/ProductsContext";
import { createEmptyProduct } from "../../lib/emptyProduct";
import {
  createProduct,
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
          submitLabel={isNew ? "Urunu Kaydet" : "Degisiklikleri Kaydet"}
        />
      </div>
    </section>
  );
};

export default AdminProductFormPage;
