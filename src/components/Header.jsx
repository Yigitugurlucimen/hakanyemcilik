import { useEffect, useId, useState } from "react";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { assetUrl, pathWithBasename } from "../lib/appBase.js";
import { whatsappUrl } from "../lib/siteConfig.js";

const Header = () => {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const navLinks = [
    { label: "Ürünler", href: pathWithBasename("/#bilgi-bankasi") },
    { label: "Sepet", to: "/sepet" },
    { label: "Kampanyalar", to: "/kampanyalar" },
    { label: "Blog", to: "/blog" },
    { label: "İletişim", href: pathWithBasename("/#iletisim") },
    { label: "Kurumsal", to: "/hakkimizda" },
    { label: "SSS", to: "/sss" }
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass =
    "rounded-full border border-emeraldDark/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark transition hover:bg-emeraldDark/5";

  const renderNavLink = (item) =>
    item.to ? (
      <Link key={item.label} to={item.to} className={navLinkClass} onClick={closeMenu}>
        {item.label}
      </Link>
    ) : (
      <a key={item.label} href={item.href} className={navLinkClass} onClick={closeMenu}>
        {item.label}
      </a>
    );

  return (
    <header className="border-b border-emeraldDark/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white p-0.5">
              <img
                src={assetUrl("logo.png")}
                alt="Hakan Yemcilik logosu"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-emeraldDark/70">Petshop ve Takviye</p>
              <p className="text-lg font-extrabold tracking-wide text-emeraldDark">
                HAKAN YEMCİLİK
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emeraldDark/20 text-emeraldDark md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            <Link
              to="/sepet"
              className="relative inline-flex items-center gap-2 rounded-full border border-emeraldDark/20 px-4 py-2 text-sm font-semibold text-emeraldDark transition hover:bg-emeraldDark/5"
              aria-label="Sepet"
            >
              <FiShoppingCart size={18} />
              <span className="hidden sm:inline">Sepet</span>
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-content-center rounded-full bg-pistachio px-1 text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : null}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-pistachio px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 sm:px-5"
            >
              Sipariş Hattı
            </a>
          </div>
        </div>

        <nav className="hidden flex-wrap items-center gap-2 md:flex" aria-label="Ana menü">
          {navLinks.map(renderNavLink)}
        </nav>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Menüyü kapat"
            onClick={closeMenu}
          />
          <nav
            id={menuId}
            className="absolute left-0 right-0 top-0 max-h-[85vh] overflow-y-auto border-b border-emeraldDark/10 bg-white px-4 pb-6 pt-24 shadow-lg"
            aria-label="Mobil menü"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {navLinks.map(renderNavLink)}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
