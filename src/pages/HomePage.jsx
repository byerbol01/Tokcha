import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import useProducts from "../hooks/useProducts";
import useDebounce from "../hooks/useDebounce";
import { emptyFilters, sortProducts } from "../utils/helpers";

export default function HomePage() {
  const [filters, setFilters] = useState(emptyFilters);
  const debounced = useDebounce(filters, 350); // har harfda so'rov yubormaslik uchun

  // 1) Tepada faqat birinchi 4 ta mahsulot
  const featured = useProducts({ limit: 4, offset: 0 });
  const all = useProducts({
    title: debounced.title,
    categoryId: debounced.categoryId,
    minPrice: debounced.minPrice,
    maxPrice: debounced.maxPrice,
    limit: 100,
    offset: 0,
  });

  const list = sortProducts(all.products, filters.sort);

  const handleChange = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const handleReset = () => setFilters(emptyFilters);

  return (
    <>
      <section className="tile-pattern text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Poyabzal, texnika va kundalik kerakli narsalar
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Toifa va narx bo'yicha filtrlang — kerakli mahsulot bir necha soniyada topiladi.
          </p>
          <a
            href="#all"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-semibold text-cobalt hover:bg-paper"
          >
            Mahsulotlarni ko'rish
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="pt-12">
          <h2 className="mb-5 font-display text-3xl font-extrabold">Yangi kelganlar</h2>
          <ProductGrid
            products={featured.products}
            loading={featured.loading}
            error={featured.error}
            skeletons={4}
          />
        </section>

        <section id="all" className="scroll-mt-20 pt-16">
          <h2 className="mb-5 font-display text-3xl font-extrabold">Barcha mahsulotlar</h2>
          <ProductFilter filters={filters} onChange={handleChange} onReset={handleReset} />

          {!all.loading && !all.error && (
            <p className="my-4 text-sm text-muted">{list.length} ta mahsulot topildi</p>
          )}
          <div className={all.loading || all.error ? "mt-4" : ""}>
            <ProductGrid
              products={list}
              loading={all.loading}
              error={all.error}
              onReset={handleReset}
            />
          </div>
        </section>
      </div>
    </>
  );
}
