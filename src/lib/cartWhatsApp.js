import { formatPrice, hasPrice } from "./formatPrice.js";

export const buildCartWhatsAppMessage = (items, subtotal, customer = {}, orderNumber = null) => {
  const lines = ["Merhaba, Hakan Yemcilik üzerinden sipariş vermek istiyorum.", ""];

  if (orderNumber) {
    lines.push(`Sipariş No: ${orderNumber}`, "");
  }

  if (customer.name || customer.phone || customer.address) {
    lines.push("--- Müşteri Bilgileri ---");
    if (customer.name) lines.push(`Ad Soyad: ${customer.name}`);
    if (customer.phone) lines.push(`Telefon: ${customer.phone}`);
    if (customer.address) lines.push(`Adres: ${customer.address}`);
    if (customer.note) lines.push(`Sipariş Notu: ${customer.note}`);
    lines.push("");
  }

  lines.push("--- Ürünler ---");

  items.forEach((item, index) => {
    const linePrice = hasPrice(item.price)
      ? formatPrice(item.price * item.quantity)
      : "Fiyat sorulacak";
    lines.push(
      `${index + 1}. ${item.name}`,
      `   Adet: ${item.quantity}`,
      `   ${hasPrice(item.price) ? `Birim: ${formatPrice(item.price)}` : "Birim fiyat: belirtilmedi"}`,
      `   Satır: ${linePrice}`,
      ""
    );
  });

  if (subtotal != null) {
    lines.push(`Ara toplam (fiyatlı ürünler): ${formatPrice(subtotal)}`);
  } else {
    lines.push("Not: Bazı ürünlerde fiyat panelde henüz girilmemiş olabilir.");
  }

  lines.push("", "Teslimat ve ödeme için bilgi rica ederim. Teşekkürler.");
  return lines.join("\n");
};
