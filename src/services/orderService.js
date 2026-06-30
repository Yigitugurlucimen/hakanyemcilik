import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { rowToOrder, rowToOrderItem } from "../lib/orderTransforms";

export const createStoreOrder = async ({ customer, items, subtotal }) => {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase yapilandirilmadi.");
  }

  const payload = {
    p_customer_name: customer.name,
    p_customer_phone: customer.phone,
    p_customer_address: customer.address,
    p_customer_note: customer.note || "",
    p_subtotal: subtotal,
    p_items: items.map((item) => ({
      slug: item.slug,
      name: item.name,
      quantity: item.quantity,
      unit_price: item.price
    }))
  };

  const { data, error } = await supabase.rpc("create_store_order", payload);
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.order_id) {
    throw new Error("Siparis olusturulamadi.");
  }

  return {
    orderId: row.order_id,
    orderNumber: row.order_number
  };
};

export const fetchAllOrders = async () => {
  if (!isSupabaseConfigured) return null;

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!orders?.length) return [];

  const orderIds = orders.map((order) => order.id);
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (itemsError) throw itemsError;

  const itemsByOrder = (items || []).reduce((acc, item) => {
    const list = acc[item.order_id] || [];
    list.push(rowToOrderItem(item));
    acc[item.order_id] = list;
    return acc;
  }, {});

  return orders.map((order) => rowToOrder(order, itemsByOrder[order.id] || []));
};

export const fetchOrderById = async (orderId) => {
  if (!isSupabaseConfigured) return null;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();

  if (error) throw error;
  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (itemsError) throw itemsError;

  return rowToOrder(order, items || []);
};

export const updateOrderStatus = async (orderId, status) => {
  if (!supabase) throw new Error("Supabase yapilandirilmadi.");

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
};
