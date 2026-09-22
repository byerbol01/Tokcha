import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import useDismiss from "../hooks/useDismiss";
import { getImage, onImgError } from "../utils/helpers";


export default function Categories() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { categories, loading, error } = useCategories();

  useDismiss(ref, () => setOpen(false), open);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className="sm:relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          open ? "bg-cobalt text-white" : "text-ink hover:bg-cobalt/5"
        }`}
      >
        Barcha mahsulotlar
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-x-3 top-[68px] rounded-2xl border border-line bg-white p-3 shadow-xl sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-[30rem]">
          <Link
            to="/products"
            onClick={close}
            className="mb-2 block rounded-xl bg-paper px-4 py-3 text-sm font-semibold hover:bg-cobalt/10"
          >
            Hammasini ko'rish
          </Link>

          {loading && <p className="px-4 py-3 text-sm text-muted">Yuklanmoqda...</p>}
          {error && <p className="px-4 py-3 text-sm text-anor">{error}</p>}

          <ul className="grid max-h-[60vh] grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/category/${c.id}`}
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl p-2 hover:bg-cobalt/10"
                >
                  <img
                    src={getImage(c.image)}
                    onError={onImgError}
                    alt=""
                    className="h-11 w-11 rounded-lg bg-paper object-cover"
                  />
                  <span className="text-sm font-semibold">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
