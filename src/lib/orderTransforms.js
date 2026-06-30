export const ORDER_STATUSES = [
  { value: "new", label: "Yeni" },
  { value: "confirmed", label: "Onaylandı" },
  { value: "preparing", label: "Hazırlanıyor" },
  { value: "shipped", label: "Kargoda" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal" }
];

export const orderStatusLabel = (status) =>
  ORDER_STATUSES.find((item) => item.value === status)?.label || status;

export const rowToOrderItem = (row) => ({
  id: row.id,
  orderId: row.order_id,
  productSlug: row.product_slug,
  productName: row.product_name,
  quantity: row.quantity,
  unitPrice: row.unit_price != null ? Number(row.unit_price) : null,
  lineTotal: row.line_total != null ? Number(row.line_total) : null
});

export const rowToOrder = (row, items = []) => ({
  id: row.id,
  orderNumber: row.order_number,
  customerName: row.customer_name,
  customerPhone: row.customer_phone,
  customerAddress: row.customer_address,
  customerNote: row.customer_note || "",
  subtotal: row.subtotal != null ? Number(row.subtotal) : null,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  items: items.map(rowToOrderItem)
});
