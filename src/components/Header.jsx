import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Categories from "./Categories";
import { getImage, onImgError } from "../utils/helpers";

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive ? "bg-cobalt/10 text-cobalt" : "text-ink hover:bg-cobalt/5"
  }`;

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4">
        <Link to="/" className="font-display text-2xl font-extrabold text-cobalt">
          Tokcha
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={(state) => `${linkClass(state)} hidden sm:block`}>
            Bosh sahifa
          </NavLink>
          <Categories />
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <img
                src={getImage(user.avatar)}
                onError={onImgError}
                alt=""
                className="h-8 w-8 rounded-full border border-line bg-white object-cover"
              />
              <span className="hidden text-sm font-semibold sm:block">{user.name}</span>
              <button
                onClick={logout}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-anor hover:text-anor"
              >
                Chiqish
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-cobalt px-5 py-2 text-sm font-semibold text-white hover:bg-cobalt-deep"
            >
              Kirish
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
