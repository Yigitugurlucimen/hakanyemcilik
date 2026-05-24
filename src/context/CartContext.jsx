import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { hasPrice } from "../lib/formatPrice.js";

const CART_STORAGE_KEY = "hakan-yemcilik-cart";

const CartContext = createContext(null);

const readStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const toCartItem = (product, quantity = 1) => ({
  slug: product.slug,
  name: product.name,
  price: product.price ?? null,
  image: product.image || product.imageUrl || "",
  quantity: Math.max(1, quantity)
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => readStoredCart());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product?.slug) return;

    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, toCartItem(product, quantity)];
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug, quantity) => {
    const nextQty = Number(quantity);
    if (!nextQty || nextQty < 1) {
      setItems((current) => current.filter((item) => item.slug !== slug));
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, quantity: nextQty } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (!hasPrice(item.price)) return sum;
        return sum + Number(item.price) * item.quantity;
      }, 0),
    [items]
  );

  const pricedItemCount = useMemo(
    () => items.filter((item) => hasPrice(item.price)).length,
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal: pricedItemCount > 0 ? subtotal : null
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      pricedItemCount
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
