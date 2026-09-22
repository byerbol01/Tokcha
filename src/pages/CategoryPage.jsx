import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../components/Pagination";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useDebounce from "../hooks/useDebounce";
import { emptyFilters, sortProducts } from "../utils/helpers";

const LIMIT = 12;

export default function CategoryPage() {
  const { id } = useParams();
  const { categories } = useCategories();
  const category = categories.find((c) => String(c.id) === id);

  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const debounced = useDebounce(filters, 350);

  const { products, loading, error } = useProducts({
    title: debounced.title,
    categoryId: id,
    minPrice: debounced.minPrice,
    maxPrice: debounced.maxPrice,
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });

  const list = sortProducts(products, filters.sort);

  const handleChange = (patch) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };
  const handleReset = () => {
    setFilters(emptyFilters);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/products" className="text-sm font-semibold text-cobalt hover:underline">
        Barcha mahsulotlar
      </Link>
      <h1 className="mb-6 mt-1 font-display text-4xl font-extrabold">
        {category?.name ?? "Kategoriya"}
      </h1>

      {/* Kategoriya allaqachon tanlangan, shuning uchun chip'lar kerak emas */}
      <ProductFilter
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
        showCategories={false}
      />

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
        <Pagination
          page={page}
          onPage={(p) => {
            setPage(p);
            window.scrollTo({ top: 0 });
          }}
          hasNext={products.length === LIMIT}
        />
      )}
    </div>
  );
}
