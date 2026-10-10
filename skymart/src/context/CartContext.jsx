import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

// Get the currently logged-in user safely
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

// Load a specific user's cart
function loadUserCart(userId) {
  if (userId == null) return [];

  try {
    const savedCart = JSON.parse(
      localStorage.getItem(`cart_${userId}`)
    );

    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartState, setCartState] = useState(() => {
    const user = getCurrentUser();

    return {
      userId: user?.id ?? null,
      items: loadUserCart(user?.id),
    };
  });

  // Reload the cart whenever login/logout changes
  useEffect(() => {
    const handleAuthChange = () => {
      const user = getCurrentUser();

      setCartState({
        userId: user?.id ?? null,
        items: loadUserCart(user?.id),
      });
    };

    window.addEventListener("auth-changed", handleAuthChange);

    // Also handle browser tabs where storage changes
    const handleStorageChange = (event) => {
      if (event.key === "currentUser") {
        handleAuthChange();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save cart only to the matching user's storage key
  useEffect(() => {
    const user = getCurrentUser();

    if (
      !user ||
      user.id == null ||
      String(user.id) !== String(cartState.userId)
    ) {
      return;
    }

    localStorage.setItem(
      `cart_${user.id}`,
      JSON.stringify(cartState.items)
    );
  }, [cartState]);

  const cartItems = cartState.items;

  // Update the cart only if the same user is still logged in
  const updateCart = (updater) => {
    setCartState((current) => {
      const user = getCurrentUser();

      if (
        !user ||
        user.id == null ||
        String(user.id) !== String(current.userId)
      ) {
        return current;
      }

      const updatedItems =
        typeof updater === "function"
          ? updater(current.items)
          : updater;

      return {
        ...current,
        items: updatedItems,
      };
    });
  };

  // Add product
  const addToCart = (product) => {
    updateCart((items) => {
      const existingItem = items.find(
        (item) => Number(item.id) === Number(product.id)
      );

      if (existingItem) {
        return items.map((item) =>
          Number(item.id) === Number(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    updateCart((items) =>
      items.map((item) =>
        Number(item.id) === Number(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity; remove when quantity reaches zero
  const decreaseQuantity = (id) => {
    updateCart((items) =>
      items
        .map((item) =>
          Number(item.id) === Number(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove one product
  const removeFromCart = (id) => {
    updateCart((items) =>
      items.filter((item) => Number(item.id) !== Number(id))
    );
  };

  // Clear only the current user's cart
  const clearCart = () => {
    updateCart([]);
  };

  // Total quantity
  const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  );

  // Total price
  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}