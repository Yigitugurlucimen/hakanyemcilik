import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "hakan-yemcilik-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-emeraldDark/10 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-2xl md:border"
    >
      <p className="text-sm leading-relaxed text-slate-600">
        Deneyiminizi iyileştirmek için çerezler kullanıyoruz. Siteyi kullanmaya devam ederek{" "}
        <Link to="/gizlilik" className="font-semibold text-emeraldDark underline-offset-2 hover:underline">
          gizlilik politikamızı
        </Link>{" "}
        kabul etmiş olursunuz.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={accept} className="btn-primary text-xs">
          Kabul Et
        </button>
        <Link to="/gizlilik" className="btn-ghost text-xs">
          Detaylar
        </Link>
      </div>
    </div>
  );
};

export default CookieConsent;
