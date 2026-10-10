import {
  LogOut,
  ShoppingCart,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import Logo from "./Logo";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";


function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();


  // CURRENT USER
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );


  // USER NAME
  const userName = currentUser?.name || "User";


  // FIRST LETTER
  const userInitial = userName
    .charAt(0)
    .toUpperCase();


  // SHOP ACTIVE
  const isShopActive =
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/product/");


  // LOGOUT
  const handleLogout = () => {

    // Only logout user
    // DO NOT delete cart
    localStorage.removeItem("currentUser");

    navigate("/login");

  };


  return (
    <>
      <header className="border-b border-zinc-800 bg-[#0d0d0d]">

        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5">

          {/* LOGO */}
          <Logo />


          {/* NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">

            <Link
              to="/home"
              className={
                location.pathname === "/home"
                  ? "font-medium text-[#c8ff00]"
                  : "text-zinc-400 transition hover:text-white"
              }
            >
              Home
            </Link>


            <Link
              to="/products"
              className={
                isShopActive
                  ? "font-medium text-[#c8ff00]"
                  : "text-zinc-400 transition hover:text-white"
              }
            >
              Shop
            </Link>


            <Link
              to="/about"
              className={
                location.pathname === "/about"
                  ? "font-medium text-[#c8ff00]"
                  : "text-zinc-400 transition hover:text-white"
              }
            >
              About
            </Link>

          </nav>


          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* USER */}
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-2">

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c8ff00] text-xs font-bold text-black">
                {userInitial}
              </div>

              <span className="hidden max-w-[120px] truncate text-sm text-zinc-300 sm:block">
                {userName}
              </span>

            </div>


            {/* CART */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative rounded-xl border border-zinc-800 p-2.5 text-zinc-300 transition hover:border-[#c8ff00] hover:text-[#c8ff00]"
            >

              <ShoppingCart size={19} />

              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c8ff00] px-1 text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}

            </button>


            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              className="rounded-xl border border-zinc-800 p-2.5 text-zinc-300 transition hover:border-red-500 hover:text-red-400"
            >
              <LogOut size={19} />
            </button>

          </div>

        </div>

      </header>


      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

    </>
  );
}


export default Navbar;