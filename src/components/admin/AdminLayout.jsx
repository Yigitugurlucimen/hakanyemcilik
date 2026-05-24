import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold ${
    isActive ? "bg-emeraldDark text-white" : "text-emeraldDark hover:bg-emeraldDark/10"
  }`;

const AdminLayout = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-emeraldDark/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldDark/70">
              Hakan Yemcilik
            </p>
            <h1 className="text-xl font-black text-emeraldDark">Urun Yonetim Paneli</h1>
            {user?.email ? (
              <p className="mt-1 text-xs text-gray-500">{user.email}</p>
            ) : null}
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/panel" end className={navClass}>
              Urunler
            </NavLink>
            <NavLink to="/panel/urun/yeni" className={navClass}>
              Yeni Urun
            </NavLink>
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-emeraldDark hover:bg-emeraldDark/10"
            >
              Siteye Git
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-lg bg-emeraldDark px-3 py-2 text-sm font-semibold text-white"
            >
              Cikis
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
