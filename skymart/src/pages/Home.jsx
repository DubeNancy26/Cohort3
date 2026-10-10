import {
  ArrowRight,
  Box,
  CircleDollarSign,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import products from "../data/products";
import { useCart } from "../context/CartContext";


function Home() {

  const { cartItems, addToCart } = useCart();

  const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);

const userName = currentUser?.name || "User";

  // =====================================================
  // TOP RATED PRODUCTS
  // =====================================================

  const topRatedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);


  // =====================================================
  // NEW ARRIVALS
  // =====================================================

  const newArrivalProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);


  // =====================================================
  // CART DATA
  // =====================================================

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const cartValue = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />


      <main className="mx-auto max-w-[1180px] px-5 py-6">


        {/* =================================================
            HERO SECTION
        ================================================= */}

        <section className="relative overflow-hidden rounded-[22px] border border-zinc-700 bg-[#101010]">

          {/* Grid background */}

          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#242424 1px, transparent 1px), linear-gradient(90deg, #242424 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />


          {/* Hero content */}

          <div className="relative flex min-h-[285px] flex-col justify-between p-7 md:p-8 lg:flex-row">

            {/* Left */}

            <div className="max-w-[650px]">

              <p className="text-[11px] font-bold tracking-[1.5px] text-[#c8ff00]">
                GOOD AFTERNOON 👋
              </p>


              <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl">

                Welcome back,

                <br />

                <span className="text-[#c8ff00]">
                   {userName}
                </span>

              </h1>


              <p className="mt-5 max-w-[560px] text-sm leading-6 text-zinc-500 md:text-base">

                Discover today's picks — hand-curated products
                across electronics, fashion, and more.

              </p>


              {/* Buttons */}

              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  to="/products"
                  className="flex h-11 items-center gap-2 rounded-xl bg-[#c8ff00] px-5 text-sm font-semibold text-black transition hover:bg-[#b8ef00]"
                >
                  Shop Now
                  <ArrowRight size={17} />
                </Link>


                <Link
                  to="/products"
                  className="flex h-11 items-center rounded-xl border border-zinc-700 px-5 text-sm text-white transition hover:border-zinc-500"
                >
                  View All Products
                </Link>

              </div>

            </div>


            {/* Right stats */}

            <div className="mt-7 flex flex-row gap-3 lg:mt-0 lg:flex-col">

              <div className="flex min-w-[105px] flex-col items-center justify-center rounded-xl border border-[#c8ff00]/30 bg-[#c8ff00]/10 px-4 py-3 text-center">

                <span className="text-xl font-bold text-[#c8ff00]">
                  20+
                </span>

                <span className="mt-1 text-[10px] text-zinc-500">
                  Products Available
                </span>

              </div>


              <div className="flex min-w-[105px] flex-col items-center justify-center rounded-xl border border-zinc-600 px-4 py-3 text-center">

                <span className="text-lg font-bold">
                  Free
                </span>

                <span className="mt-1 text-[10px] text-zinc-500">
                  Delivery on ₹999+
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            QUICK STATS
        ================================================= */}

        <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">


          {/* Cart items */}

          <Link
            to="/products"
            className="rounded-2xl border border-zinc-700 p-4 transition hover:border-[#c8ff00]"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c8ff00]/10 text-[#c8ff00]">
                <Box size={17} />
              </div>

              <div>

                <div className="text-lg font-bold">
                  {cartCount}
                </div>

                <div className="text-xs text-white">
                  Cart Items
                </div>

                <div className="mt-1 text-[10px] text-zinc-600">
                  In your bag
                </div>

              </div>

            </div>

          </Link>


          {/* Cart value */}

          <Link
            to="/products"
            className="rounded-2xl border border-zinc-700 p-4 transition hover:border-[#c8ff00]"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <CircleDollarSign size={17} />
              </div>

              <div>

                <div className="text-lg font-bold">
                  ${cartValue.toFixed(2)}
                </div>

                <div className="text-xs text-white">
                  Cart Value
                </div>

                <div className="mt-1 text-[10px] text-zinc-600">
                  Ready to checkout
                </div>

              </div>

            </div>

          </Link>


          {/* Top products */}

          <Link
            to="/products/top-rated"
            className="rounded-2xl border border-zinc-700 p-4 transition hover:border-[#c8ff00]"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                <Star size={17} />
              </div>

              <div>

                <div className="text-lg font-bold">
                  5
                </div>

                <div className="text-xs text-white">
                  Top Products
                </div>

                <div className="mt-1 text-[10px] text-zinc-600">
                  Highly rated
                </div>

              </div>

            </div>

          </Link>


          {/* Categories */}

          <Link
            to="/products"
            className="rounded-2xl border border-zinc-700 p-4 transition hover:border-[#c8ff00]"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Tag size={17} />
              </div>

              <div>

                <div className="text-lg font-bold">
                  6
                </div>

                <div className="text-xs text-white">
                  Categories
                </div>

                <div className="mt-1 text-[10px] text-zinc-600">
                  To explore
                </div>

              </div>

            </div>

          </Link>

        </section>


        {/* =================================================
            SHOP BY CATEGORY
        ================================================= */}

        <section className="mt-7">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-base font-semibold">
              Shop by Category
            </h2>


            <Link
              to="/products"
              className="text-xs font-medium text-[#c8ff00]"
            >
              View All →
            </Link>

          </div>


          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">


            <Category
              emoji="💻"
              name="Electronics"
              items="17 items"
            />


            <Category
              emoji="📦"
              name="Clothing"
              items="2 items"
            />


            <Category
              emoji="📦"
              name="Furniture"
              items="3 items"
            />


            <Category
              emoji="📦"
              name="Home"
              items="14 items"
            />


            <Category
              emoji="📦"
              name="Sports"
              items="8 items"
            />


            <Category
              emoji="📦"
              name="Accessories"
              items="6 items"
            />

          </div>

        </section>


        {/* =================================================
            TOP RATED + NEW ARRIVALS
        ================================================= */}

        <section className="mt-7 grid gap-4 lg:grid-cols-2">


          {/* =================================================
              TOP RATED
          ================================================= */}

          <ProductListSection
            icon={
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            }
            title="Top Rated"
            link="/products/top-rated"
            products={topRatedProducts}
            addToCart={addToCart}
          />


          {/* =================================================
              NEW ARRIVALS
          ================================================= */}

          <ProductListSection
            icon={
              <Zap
                size={16}
                className="text-[#c8ff00]"
              />
            }
            title="New Arrivals"
            link="/products/new-arrivals"
            products={newArrivalProducts}
            addToCart={addToCart}
          />

        </section>


        {/* =================================================
            BENEFITS
        ================================================= */}

        <section className="mt-5 grid gap-3 md:grid-cols-3">


          <Benefit
            icon={<Zap size={17} />}
            title="Fast Delivery"
            description="Same-day on select items"
          />


          <Benefit
            icon={<ShieldCheck size={17} />}
            title="Secure Payments"
            description="100% encrypted checkout"
          />


          <Benefit
            icon={<Tag size={17} />}
            title="Best Prices"
            description="Price-match guarantee"
          />

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="mt-16 border-t border-zinc-800 py-7 text-center">

        <div className="font-semibold text-[#c8ff00]">
          SkyMart
        </div>

        <p className="mt-2 text-[10px] text-zinc-600">
          © 2025 SkyMart · Built with React + Redux + TanStack Query
        </p>

      </footer>

    </div>
  );
}


/* =========================================================
   CATEGORY COMPONENT
========================================================= */

function Category({
  emoji,
  name,
  items,
}) {

  return (
    <Link
      to={`/products?category=${name.toLowerCase()}`}
      className="flex min-h-[95px] flex-col items-center justify-center rounded-2xl bg-white text-center text-black transition hover:scale-[1.02] hover:bg-zinc-100"
    >

      <div className="text-2xl">
        {emoji}
      </div>

      <div className="mt-2 text-sm font-semibold">
        {name}
      </div>

      <div className="mt-1 text-xs text-zinc-400">
        {items}
      </div>

    </Link>
  );
}


/* =========================================================
   PRODUCT LIST SECTION
========================================================= */

function ProductListSection({
  icon,
  title,
  link,
  products,
  addToCart,
}) {

  return (
    <div className="rounded-[22px] bg-white p-4 text-black">


      {/* Header */}

      <div className="mb-3 flex items-center justify-between">

        <h2 className="flex items-center gap-2 text-sm font-semibold">

          {icon}

          {title}

        </h2>


        <Link
          to={link}
          className="text-[10px] font-medium text-[#9bc500]"
        >
          See all →
        </Link>

      </div>


      {/* Products */}

      <div className="space-y-2">

        {products.map((product) => (

          <HomeProductItem
            key={product.id}
            product={product}
            onAdd={addToCart}
          />

        ))}

      </div>

    </div>
  );
}


/* =========================================================
   HOME PRODUCT ITEM
========================================================= */

function HomeProductItem({
  product,
  onAdd,
}) {

  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-2.5 transition hover:border-[#c8ff00]">


      {/* Product clickable area */}

      <Link
        to={`/product/${product.id}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >


        {/* Image */}

        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-50">

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />

        </div>


        {/* Product name */}

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-xs font-semibold text-zinc-800">
            {product.name}
          </h3>


          <div className="mt-1 flex items-center gap-1">

            <div className="flex text-yellow-400">

              {Array.from({
                length: 5,
              }).map((_, index) => (

                <Star
                  key={index}
                  size={9}
                  className={
                    index <
                    Math.round(product.rating)
                      ? "fill-yellow-400"
                      : ""
                  }
                />

              ))}

            </div>


            <span className="text-[9px] text-zinc-400">
              {product.rating}
            </span>

          </div>

        </div>

      </Link>


      {/* Price */}

      <div className="shrink-0 text-xs font-bold text-[#a8d900]">

        ${product.price.toFixed(2)}

      </div>


      {/* Add to cart */}

      <button
        type="button"
        onClick={() => onAdd(product)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c8ff00]/20 text-[#8bad00] transition hover:bg-[#c8ff00]"
      >

        <ShoppingBag size={14} />

      </button>

    </div>
  );
}


/* =========================================================
   BENEFIT COMPONENT
========================================================= */

function Benefit({
  icon,
  title,
  description,
}) {

  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c8ff00]/10 text-[#c8ff00]">
        {icon}
      </div>


      <div>

        <h3 className="text-xs font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-[10px] text-zinc-600">
          {description}
        </p>

      </div>

    </div>
  );
}


export default Home;