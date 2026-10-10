import { ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product, onAdd }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const cartItem = cartItems.find(
    (item) => String(item.id) === String(product.id)
  );

  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    onAdd(product);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#111111] transition hover:border-[#c8ff00]/50">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-[190px] overflow-hidden bg-white">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-zinc-600 px-2.5 py-1 text-[10px] font-medium text-white">
            {product.category}
          </span>

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3">
        <p className="text-[9px] uppercase tracking-wide text-zinc-600">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 min-h-[38px] text-sm font-semibold text-zinc-200 transition hover:text-[#c8ff00]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={11}
                className={
                  index < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-700"
                }
              />
            ))}
          </div>

          <span className="text-[10px] text-zinc-600">
            ({product.reviews || 0})
          </span>
        </div>

        <div className="my-3 border-t border-zinc-700" />

        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-[#c8ff00]">
            ${Number(product.price).toFixed(2)}
          </span>

          {quantity > 0 ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#c8ff00] px-2 py-2 text-black">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => decreaseQuantity(product.id)}
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-black/10 active:scale-90"
              >
                <Minus size={15} />
              </button>

              <span className="min-w-4 text-center text-sm font-bold">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => increaseQuantity(product.id)}
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-black/10 active:scale-90"
              >
                <Plus size={15} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1.5 rounded-xl bg-[#c8ff00] px-3 py-2 text-xs font-semibold text-black transition hover:bg-[#b8ef00] active:scale-95"
            >
              <ShoppingCart size={13} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
