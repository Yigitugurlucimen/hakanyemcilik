import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products as staticProducts, whatsappNumber } from "../data/products";
import { productImageBySlug } from "../data/productImages.js";
import { enrichProduct } from "../lib/productTransforms";
import { isSupabaseConfigured } from "../lib/supabase";
import { fetchActiveProducts } from "../services/productService";

const ProductsContext = createContext(null);

const buildStaticCatalog = () =>
  staticProducts
    .map((product) =>
      enrichProduct({
        ...product,
        usagePlan: product.usagePlan,
        imageUrl: productImageBySlug[product.slug] || "",
        isActive: true,
        sortOrder: 0,
        price: product.price ?? null
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => buildStaticCatalog());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(isSupabaseConfigured ? "supabase" : "static");

  const loadProducts = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setProducts(buildStaticCatalog());
      setSource("static");
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const remoteProducts = await fetchActiveProducts();

      if (remoteProducts?.length) {
        const staticBySlug = Object.fromEntries(
          staticProducts.map((product) => [product.slug, product])
        );
        setProducts(
          remoteProducts.map((product) => {
            const local = staticBySlug[product.slug];
            return enrichProduct({
              ...product,
              price: product.price ?? local?.price ?? null,
              imageUrl: product.imageUrl || productImageBySlug[product.slug] || ""
            });
          })
        );
        setSource("supabase");
      } else {
        setProducts(buildStaticCatalog());
        setSource("static-fallback");
      }
    } catch (loadError) {
      console.error(loadError);
      setProducts(buildStaticCatalog());
      setSource("static-fallback");
      setError("Urunler yuklenemedi. Gecici olarak yerel liste kullaniliyor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productBrands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.brand))).sort((a, b) =>
        a.localeCompare(b, "tr")
      ),
    [products]
  );

  const productCategories = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category))).sort((a, b) =>
        a.localeCompare(b, "tr")
      ),
    [products]
  );

  const value = useMemo(
    () => ({
      products,
      productBrands,
      productCategories,
      loading,
      error,
      source,
      whatsappNumber,
      refreshProducts: loadProducts,
      getProductBySlug: (slug) => products.find((product) => product.slug === slug)
    }),
    [products, productBrands, productCategories, loading, error, source, loadProducts]
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }

  return context;
};
