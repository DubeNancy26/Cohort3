import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
  ArrowRight
} from "lucide-react";

import { useCart } from "../context/CartContext";

function CartDrawer({ isOpen, onClose }) {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  } = useCart();


  if (!isOpen) {
    return null;
  }


  return (
    <>

      {/* Background overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />


      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[480px] flex-col border-l border-zinc-700 bg-[#101010]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 px-6 py-5">

          <div className="flex items-center gap-3">

            <ShoppingCart
              size={22}
              className="text-[#c8ff00]"
            />

            <h2 className="text-xl font-semibold">
              Cart
            </h2>

            <span className="rounded-full bg-[#c8ff00]/20 px-2.5 py-1 text-xs font-bold text-[#c8ff00]">
              {totalItems} items
            </span>

          </div>


          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>


        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">

          {cartItems.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center text-center">

              <ShoppingCart
                size={50}
                className="text-zinc-700"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-zinc-600">
                Add some products to get started.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-600 p-3"
                >

                  <div className="flex gap-4">

                    {/* Product image */}
                    <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />

                    </div>


                    {/* Product details */}
                    <div className="min-w-0 flex-1">

                      <h3 className="truncate font-medium">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-lg font-bold text-[#c8ff00]">
                        ${item.price.toFixed(2)}
                      </p>

                      <p className="text-xs text-zinc-600">
                        ${item.price.toFixed(2)} each
                      </p>


                      {/* Quantity */}
                      <div className="mt-3 flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 hover:border-[#c8ff00]"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-5 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 hover:border-[#c8ff00]"
                        >
                          <Plus size={14} />
                        </button>

                      </div>

                    </div>


                    {/* Delete */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="self-center text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* Bottom */}
        {cartItems.length > 0 && (

          <div className="border-t border-zinc-700 p-6">

            <div className="mb-5 flex items-center justify-between">

              <span className="text-zinc-400">
                Total
              </span>

              <span className="text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>

            </div>


            <button
              onClick={() => {
                alert("Order placed! 🎉");
                clearCart();
                onClose();
              }}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#c8ff00] font-bold text-black hover:bg-[#b8ef00]"
            >
              Checkout
              <ArrowRight size={20} />
            </button>


            <button
              onClick={clearCart}
              className="mt-4 w-full text-sm text-zinc-600 hover:text-zinc-400"
            >
              Clear cart
            </button>

          </div>

        )}

      </aside>

    </>
  );
}

export default CartDrawer;