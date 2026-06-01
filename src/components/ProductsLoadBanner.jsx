import { useProducts } from "../context/ProductsContext.jsx";

const ProductsLoadBanner = () => {
  const { error, loading, refreshProducts } = useProducts();

  if (loading || !error) {
    return null;
  }

  return (
    <div
      role="alert"
      className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 md:px-2">
        <p>{error}</p>
        <button
          type="button"
          onClick={() => refreshProducts()}
          className="shrink-0 rounded-full border border-amber-300 bg-white px-4 py-1.5 text-xs font-semibold text-amber-950 transition hover:bg-amber-100"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
};

export default ProductsLoadBanner;
