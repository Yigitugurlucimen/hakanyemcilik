import { useMemo, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";

const quickFilters = [
  { id: "all", label: "Tüm Ürünler" },
  { id: "yarış", label: "Yarış Dönemi" },
  { id: "tüy dönemi", label: "Tüy Dönemi" },
  { id: "karaciğer", label: "Karaciğer" },
  { id: "toparlanma", label: "Toparlanma" }
];

const ProductShowcase = () => {
  const { products, productBrands, productCategories, loading } = useProducts();
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const normalizedSearch = searchText.trim().toLocaleLowerCase("tr-TR");
      const searchMatch =
        normalizedSearch.length === 0 ||
        product.name.toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
        product.purpose.toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
        product.tags.some((tag) =>
          tag.toLocaleLowerCase("tr-TR").includes(normalizedSearch)
        );

      const filterMatch =
        activeFilter === "all" ||
        product.tags.some((tag) => tag === activeFilter) ||
        product.category.toLocaleLowerCase("tr-TR").includes(activeFilter);

      const brandMatch =
        activeBrand === "all" ||
        product.brand.toLocaleLowerCase("tr-TR") === activeBrand;

      const categoryMatch =
        activeCategory === "all" ||
        product.category.toLocaleLowerCase("tr-TR") === activeCategory;

      return searchMatch && filterMatch && brandMatch && categoryMatch;
    });
  }, [activeBrand, activeCategory, activeFilter, products, searchText]);

  if (loading) {
    return (
      <section id="bilgi-bankasi" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <p className="text-sm text-gray-600">Urunler yukleniyor...</p>
      </section>
    );
  }

  return (
    <section id="bilgi-bankasi" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70">
          Bilgi Bankası
        </p>
        <h2 className="mt-2 text-3xl font-black text-emeraldDark md:text-4xl">
          Ürün Vitrini
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Satışa hızlı dönüş için ürünü aratın, döneme göre filtreleyin ve tek
          tıkla WhatsApp siparişe geçin.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-emeraldDark/10 bg-emeraldDark/5 p-4 md:p-5">
        <label
          htmlFor="product-search"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-emeraldDark/70"
        >
          Urun veya ihtiyac ara
        </label>
        <input
          id="product-search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          type="text"
          placeholder="Ürün adı veya ihtiyaç yazın (ör. karaciğer, yarış, tüy dönemi)"
          className="w-full rounded-xl border border-emeraldDark/20 bg-white px-4 py-3 text-sm text-gray-700 outline-none ring-emeraldDark transition focus:ring-2"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              type="button"
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                activeFilter === filter.id
                  ? "bg-emeraldDark text-white"
                  : "border border-emeraldDark/20 bg-white text-emeraldDark"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-emeraldDark/70">
            Marka
            <select
              value={activeBrand}
              onChange={(event) => setActiveBrand(event.target.value)}
              className="mt-1 w-full rounded-xl border border-emeraldDark/20 bg-white px-3 py-2 text-sm font-medium text-gray-700"
            >
              <option value="all">Tum markalar</option>
              {productBrands.map((brand) => (
                <option key={brand} value={brand.toLocaleLowerCase("tr-TR")}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-emeraldDark/70">
            Kategori
            <select
              value={activeCategory}
              onChange={(event) => setActiveCategory(event.target.value)}
              className="mt-1 w-full rounded-xl border border-emeraldDark/20 bg-white px-3 py-2 text-sm font-medium text-gray-700"
            >
              <option value="all">Tum kategoriler</option>
              {productCategories.map((category) => (
                <option
                  key={category}
                  value={category.toLocaleLowerCase("tr-TR")}
                >
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-3 text-xs font-medium text-emeraldDark/80">
          {filteredProducts.length} ürün listeleniyor
        </p>

        {searchText ||
        activeFilter !== "all" ||
        activeBrand !== "all" ||
        activeCategory !== "all" ? (
          <button
            type="button"
            onClick={() => {
              setSearchText("");
              setActiveFilter("all");
              setActiveBrand("all");
              setActiveCategory("all");
            }}
            className="mt-3 inline-flex rounded-full border border-emeraldDark/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark"
          >
            Filtreleri temizle
          </button>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="mt-6 rounded-xl border border-emeraldDark/10 bg-emeraldDark/5 px-4 py-3 text-sm text-emeraldDark">
          Bu aramada ürün bulunamadı. Farklı bir anahtar kelime veya filtre
          deneyin.
        </p>
      ) : null}
    </section>
  );
};

export default ProductShowcase;
