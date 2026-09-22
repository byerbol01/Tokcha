export default function Pagination({ page, onPage, hasNext }) {
  const btn =
    "rounded-full border border-line px-5 py-2 text-sm font-semibold enabled:hover:border-cobalt enabled:hover:text-cobalt disabled:opacity-40";

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button className={btn} disabled={page === 1} onClick={() => onPage(page - 1)}>
        Oldingi
      </button>
      <span className="text-sm font-semibold">{page}-sahifa</span>
      <button className={btn} disabled={!hasNext} onClick={() => onPage(page + 1)}>
        Keyingi
      </button>
    </div>
  );
}
