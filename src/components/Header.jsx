import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const navLinks = [
  { label: "Urunler", href: "/#bilgi-bankasi" },
  { label: "Sepet", to: "/sepet" },
  { label: "Kampanyalar", to: "/kampanyalar" },
  { label: "Blog", to: "/blog" },
  { label: "Iletisim", href: "/#iletisim" },
  { label: "Kurumsal", to: "/hakkimizda" },
  { label: "SSS", to: "/sss" }
];

const Header = () => {
  const { totalItems } = useCart();
  const orderLineUrl = "https://wa.me/905325506871";

  return (
    <header className="border-b border-emeraldDark/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white p-0.5">
              <img
                src="/logo.png"
                alt="Hakan Yemcilik logosu"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-emeraldDark/70">Petshop ve Takviye</p>
              <p className="text-lg font-extrabold tracking-wide text-emeraldDark">
                HAKAN YEMCILIK
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/sepet"
              className="relative inline-flex items-center gap-2 rounded-full border border-emeraldDark/20 px-4 py-2 text-sm font-semibold text-emeraldDark transition hover:bg-emeraldDark/5"
              aria-label="Sepet"
            >
              <FiShoppingCart size={18} />
              Sepet
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-content-center rounded-full bg-pistachio px-1 text-[10px] font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : null}
            </Link>
            <a
              href={orderLineUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-pistachio px-5 py-2 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Siparis Hatti
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navLinks.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full border border-emeraldDark/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark transition hover:bg-emeraldDark/5"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-emeraldDark/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emeraldDark transition hover:bg-emeraldDark/5"
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
