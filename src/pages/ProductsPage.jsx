import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../components/Pagination";
import useProducts from "../hooks/useProducts";
import useDebounce from "../hooks/useDebounce";
import { emptyFilters, sortProducts } from "../utils/helpers";

const LIMIT = 12;

export default function ProductsPage() {
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const debounced = useDebounce(filters, 350);

  const { products, loading, error } = useProducts({
    title: debounced.title,
    categoryId: debounced.categoryId,
    minPrice: debounced.minPrice,
    maxPrice: debounced.maxPrice,
    limit: LIMIT,
    offset: (page - 1) * LIMIT, // offset — nechta mahsulotni o'tkazib yuborish
  });

  const list = sortProducts(products, filters.sort);

  const handleChange = (patch) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1); // filtr o'zgarsa 1-sahifadan boshlaymiz
  };
  const handleReset = () => {
    setFilters(emptyFilters);
    setPage(1);
  };
  const handlePage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 font-display text-4xl font-extrabold">Barcha mahsulotlar</h1>
      <ProductFilter filters={filters} onChange={handleChange} onReset={handleReset} />

      <div className="mt-6">
        <ProductGrid
          products={list}
          loading={loading}
          error={error}
          skeletons={LIMIT}
          onReset={handleReset}
        />
      </div>

      {!loading && !error && products.length > 0 && (
        <Pagination page={page} onPage={handlePage} hasNext={products.length === LIMIT} />
      )}
    </div>
  );
}
