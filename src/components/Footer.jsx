import { Link } from "react-router-dom";
import {
  addressLine,
  contactEmail,
  phoneTel,
  whatsappDisplay,
  whatsappUrl
} from "../lib/siteConfig.js";

const Footer = () => {
  return (
    <footer className="border-t border-emeraldDark/10 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 text-sm text-gray-600 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <p className="font-semibold text-emeraldDark">Hakan Yemcilik</p>
          <p className="mt-1">Adana | Petshop ve Güvercin Takviyeleri Bilgi Bankası</p>
          <p className="mt-2">© {new Date().getFullYear()} Tüm hakları saklıdır.</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-emeraldDark">İletişim</p>
          <p>{addressLine}</p>
          <a href={`tel:${phoneTel}`} className="hover:text-emeraldDark">
            {whatsappDisplay}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emeraldDark"
          >
            WhatsApp sipariş hattı
          </a>
          <a href={`mailto:${contactEmail}`} className="hover:text-emeraldDark">
            {contactEmail}
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold text-emeraldDark">Kurumsal</p>
          <Link to="/kampanyalar" className="hover:text-emeraldDark">
            Kampanyalar
          </Link>
          <Link to="/blog" className="hover:text-emeraldDark">
            Blog
          </Link>
          <Link to="/hakkimizda" className="hover:text-emeraldDark">
            Hakkımızda
          </Link>
          <Link to="/sss" className="hover:text-emeraldDark">
            Sık Sorulan Sorular
          </Link>
          <Link to="/teslimat-iade" className="hover:text-emeraldDark">
            Teslimat ve İade
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold text-emeraldDark">Yasal</p>
          <Link to="/kvkk" className="hover:text-emeraldDark">
            KVKK Aydınlatma Metni
          </Link>
          <Link to="/gizlilik" className="hover:text-emeraldDark">
            Gizlilik Politikası
          </Link>
          <Link to="/kullanim-kosullari" className="hover:text-emeraldDark">
            Kullanım Koşulları
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
