import { assetUrl } from "../lib/appBase.js";
import { whatsappNumber } from "./products.js";

const whatsappOrderUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Merhaba, ürün önerisi ve fiyat bilgisi almak istiyorum."
)}`;

const slideImage = (name, alt) => ({
  image: assetUrl(`slider/${name}`),
  imageAlt: alt
});

export const heroSlides = [
  {
    id: "brand",
    eyebrow: "Petshop & Güvercin Takviyeleri",
    title: "Adana'nın Güvenilir Takviye Uzmanı",
    description:
      "Performans, tüy dönemi ve toparlanma için uzman önerili ürün rehberi. Doğru ürünü, doğru dönemde kullanın.",
    ...slideImage("slide-brand.png", "Güvercin takviye uzmanı — marka görseli"),
    gradient: "from-[#0d3d2f] via-emeraldDark to-[#1a8f6a]",
    primary: { label: "Bilgi Bankasına Git", href: "#bilgi-bankasi" },
    secondary: { label: "WhatsApp Sipariş", href: whatsappOrderUrl, external: true }
  },
  {
    id: "performans",
    eyebrow: "Set Kampanyası",
    title: "Performans Seti ile Yarışa Hazır Olun",
    description:
      "Kondisyon, enerji ve kas desteğini tek planda yönetin. Yarış sezonu için hazır paket.",
    ...slideImage("slide-performans.png", "Performans seti — yarışa hazırlık görseli"),
    gradient: "from-[#1a3d5c] via-emeraldDark to-[#1A7458]",
    primary: { label: "Kampanyayı İncele", to: "/kampanya/performans-seti" },
    secondary: { label: "Tüm Kampanyalar", to: "/kampanyalar" }
  },
  {
    id: "yaris",
    eyebrow: "Yarış Haftası",
    title: "Yarış Öncesi ve Sonrası Tam Destek",
    description:
      "Elektrolit, aminoasit ve vitamin desteğiyle yarış haftanızı güvenle planlayın.",
    ...slideImage("slide-yaris.png", "Yarış seti — elektrolit ve toparlanma görseli"),
    gradient: "from-[#2d1f4e] via-emeraldDark to-[#1A7458]",
    primary: { label: "Yarış Seti", to: "/kampanya/yaris-seti" },
    secondary: { label: "Ürünleri Gör", href: "#bilgi-bankasi" }
  },
  {
    id: "tuy",
    eyebrow: "Tüy Dönemi",
    title: "Tüy Döneminde Kondisyonu Koruyun",
    description:
      "Vitamin-mineral dengesi ve metabolik destekle tüy yenileme sürecini rahatlatın.",
    ...slideImage("slide-tuy.png", "Tüy seti — tüy dönemi bakım görseli"),
    gradient: "from-[#3d2a14] via-emeraldDark to-[#7AB839]",
    primary: { label: "Tüy Seti", to: "/kampanya/tuy-seti" },
    secondary: { label: "WhatsApp Danış", href: whatsappOrderUrl, external: true }
  },
  {
    id: "karaciger",
    eyebrow: "Toparlanma",
    title: "Karaciğer & Sindirim Desteği",
    description:
      "Yoğun dönemler ve tedavi sonrası toparlanma için karaciğer odaklı bakım seti.",
    ...slideImage("slide-karaciger.png", "Karaciğer seti — toparlanma ve sindirim görseli"),
    gradient: "from-[#1a2e24] via-emeraldDark to-[#145a46]",
    primary: { label: "Karaciğer Seti", to: "/kampanya/karaciger-seti" },
    secondary: { label: "Bilgi Bankası", href: "#bilgi-bankasi" }
  }
];

export const HERO_AUTOPLAY_MS = 6500;
