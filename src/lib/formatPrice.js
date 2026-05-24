export const formatPrice = (price) => {
  if (price == null || Number.isNaN(Number(price))) return null;
  return `${Number(price).toLocaleString("tr-TR")} ₺`;
};

export const hasPrice = (price) =>
  price != null && !Number.isNaN(Number(price)) && Number(price) >= 0;
