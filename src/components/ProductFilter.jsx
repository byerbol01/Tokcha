import useCategories from "../hooks/useCategories";
import { emptyFilters } from "../utils/helpers";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm placeholder:text-muted focus:border-cobalt focus:outline-none";

// filters: { title, categoryId, minPrice, maxPrice, sort }
export default function ProductFilter({ filters, onChange, onReset, showCategories = true }) {
  const { categories } = useCategories();
  const isDirty = Object.keys(emptyFilters).some((k) => filters[k] !== emptyFilters[k]);

  return (
    <div className="space-y-4 rounded-2xl border border-line bg-white p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          type="search"
          value={filters.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Mahsulot nomi bo'yicha qidirish"
          aria-label="Qidirish"
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-3 md:w-64">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder="Narx dan"
            aria-label="Minimal narx"
            className={inputClass}
          />
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder="Narx gacha"
            aria-label="Maksimal narx"
            className={inputClass}
          />
        </div>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          aria-label="Saralash"
          className={inputClass}
        >
          <option value="">Saralash</option>
          <option value="price-asc">Avval arzonlari</option>
          <option value="price-desc">Avval qimmatlari</option>
        </select>
        <button
          onClick={onReset}
          disabled={!isDirty}
          className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold enabled:hover:border-anor enabled:hover:text-anor disabled:opacity-40"
        >
          Tozalash
        </button>
      </div>

      {showCategories && (
        <div className="flex flex-wrap gap-2">
          <Chip active={filters.categoryId === ""} onClick={() => onChange({ categoryId: "" })}>
            Hammasi
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={String(filters.categoryId) === String(c.id)}
              onClick={() => onChange({ categoryId: String(c.id) })}
            >
              {c.name}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
        active
          ? "border-cobalt bg-cobalt text-white"
          : "border-line bg-white hover:border-cobalt hover:text-cobalt"
      }`}
    >
      {children}
    </button>
  );
}
