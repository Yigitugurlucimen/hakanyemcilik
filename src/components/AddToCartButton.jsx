import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext.jsx";

const AddToCartButton = ({
  product,
  quantity = 1,
  className = "",
  label = "Sepete Ekle",
  showQuantity = false
}) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(quantity);

  const handleClick = () => {
    addItem(product, showQuantity ? qty : quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showQuantity ? (
        <div className="flex items-center rounded-full border border-emeraldDark/20">
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            className="px-3 py-2 text-sm font-bold text-emeraldDark"
            aria-label="Adet azalt"
          >
            -
          </button>
          <span className="min-w-[2rem] text-center text-sm font-semibold text-emeraldDark">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((value) => value + 1)}
            className="px-3 py-2 text-sm font-bold text-emeraldDark"
            aria-label="Adet artir"
          >
            +
          </button>
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full bg-emeraldDark px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-95"
      >
        <FiShoppingCart size={14} />
        {added ? "Eklendi" : label}
      </button>
    </div>
  );
};

export default AddToCartButton;
