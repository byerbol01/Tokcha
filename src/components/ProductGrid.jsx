import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading, error, skeletons = 8, onReset }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletons }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-line bg-white">
            <div className="aspect-square bg-line/60" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-1/3 rounded bg-line/60" />
              <div className="h-4 w-full rounded bg-line/60" />
              <div className="h-5 w-1/4 rounded bg-line/60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-anor/30 bg-anor/5 p-6 text-anor">{error}</p>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-10 text-center">
        <p className="font-display text-xl font-bold">Hech narsa topilmadi</p>
        <p className="mt-1 text-muted">Filtrlarni o'zgartiring yoki tozalang.</p>
        {onReset && (
          <button
            onClick={onReset}
            className="mt-4 rounded-full bg-cobalt px-5 py-2 text-sm font-semibold text-white hover:bg-cobalt-deep"
          >
            Filtrlarni tozalash
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
