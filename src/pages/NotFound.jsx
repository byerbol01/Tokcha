import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-cobalt">404</p>
      <p className="mt-2 text-lg text-muted">Bunday sahifa topilmadi.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-cobalt px-6 py-2.5 font-semibold text-white hover:bg-cobalt-deep"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
