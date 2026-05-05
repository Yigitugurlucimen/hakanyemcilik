import { FiMessageCircle } from "react-icons/fi";
import { whatsappNumber } from "../data/products";

const FloatingWhatsAppButton = () => {
  const requestUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, hızlı sipariş için yardımcı olur musunuz?"
  )}`;

  return (
    <a
      href={requestUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-pistachio px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-95"
    >
      <FiMessageCircle size={18} />
      Hızlı Sipariş
    </a>
  );
};

export default FloatingWhatsAppButton;
