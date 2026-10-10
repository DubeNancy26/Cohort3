import {
  ArrowLeft,
  ArrowRight,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import products from "../data/products";
import { useCart } from "../context/CartContext";


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();


  // =====================================================
  // CURRENT PRODUCT
  // =====================================================

  const product = products.find(
    (item) =>
      Number(item.id) === Number(id)
  );


  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {

    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white">

        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <h1 className="text-3xl font-bold">
              Product not found
            </h1>

            <p className="mt-2 text-zinc-500">
              The product you are looking for
              does not exist.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-[#c8ff00] px-5 py-3 font-semibold text-black"
            >
              ← Back to Products
            </Link>

          </div>

        </div>

      </div>
    );
  }


  // =====================================================
  // RELATED PRODUCTS
  // =====================================================

  /*
    First priority:
    Same category products

    If there are not enough products,
    other products are added.

    This makes the Related Products
    section always useful.
  */

  const sameCategoryProducts =
    products.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    );


  const otherProducts =
    products.filter(
      (item) =>
        item.id !== product.id &&
        item.category !== product.category
    );


  const relatedProducts = [
    ...sameCategoryProducts,
    ...otherProducts,
  ].slice(0, 4);


  // =====================================================
  // PREVIOUS / NEXT
  // =====================================================

  const currentIndex =
    products.findIndex(
      (item) =>
        Number(item.id) === Number(product.id)
    );


  const previousProduct =
    currentIndex > 0
      ? products[currentIndex - 1]
      : null;


  const nextProduct =
    currentIndex <
    products.length - 1
      ? products[currentIndex + 1]
      : null;


  // =====================================================
  // GO TO PREVIOUS
  // =====================================================

  const goToPrevious = () => {

    if (!previousProduct) return;

    navigate(
      `/product/${previousProduct.id}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =====================================================
  // GO TO NEXT
  // =====================================================

  const goToNext = () => {

    if (!nextProduct) return;

    navigate(
      `/product/${nextProduct.id}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (

    <div className="min-h-screen bg-[#0d0d0d] text-white">

      <Navbar />


      <main className="mx-auto max-w-[1180px] px-5 py-8">


        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">

          <Link
            to="/products"
            className="text-zinc-600 hover:text-white"
          >
            Products
          </Link>

          <span className="text-zinc-700">
            /
          </span>

          <Link
            to={`/products?category=${encodeURIComponent(
              product.category
            )}`}
            className="text-zinc-600 hover:text-white"
          >
            {product.category}
          </Link>

          <span className="text-zinc-700">
            /
          </span>

          <span className="max-w-[250px] truncate text-zinc-500">
            {product.name}
          </span>

        </div>


        {/* =================================================
            PRODUCT SECTION
        ================================================= */}

        <section className="grid gap-8 lg:grid-cols-2">


          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div className="flex min-h-[500px] items-center justify-center rounded-[28px] border border-zinc-800 bg-white p-8">

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[450px] w-full object-contain"
            />

          </div>


          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center">


            {/* Category */}

            <span className="w-fit rounded-full border border-[#c8ff00]/30 bg-[#c8ff00]/10 px-3 py-1 text-xs font-semibold text-[#c8ff00]">
              {product.category}
            </span>


            {/* Product name */}

            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
              {product.name}
            </h1>


            {/* =================================================
                RATING
            ================================================= */}

            <div className="mt-5 flex items-center gap-3">

              <div className="flex">

                {Array.from({
                  length: 5,
                }).map((_, index) => (

                  <Star
                    key={index}
                    size={18}
                    className={
                      index <
                      Math.round(
                        product.rating
                      )
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-700"
                    }
                  />

                ))}

              </div>


              <span className="font-semibold">
                {product.rating}
              </span>


              <span className="text-zinc-600">
                ({product.reviews || 0} reviews)
              </span>

            </div>


            {/* Divider */}

            <div className="my-6 border-t border-zinc-800" />


            {/* Price */}

            <div className="text-4xl font-bold text-[#c8ff00]">

              ${Number(product.price).toFixed(2)}

            </div>


            {/* Description */}

            <p className="mt-6 leading-7 text-zinc-500">

              {product.description ||
                `${product.name} is designed with quality,
                performance and everyday usability in mind.
                Enjoy premium quality at an affordable price.`}

            </p>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-7 flex gap-3">


              {/* Add to cart */}

              <button
                type="button"
                onClick={() =>
                  addToCart(product)
                }
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#c8ff00] font-semibold text-black transition hover:bg-[#b8ef00] active:scale-[0.98]"
              >

                <ShoppingCart
                  size={20}
                />

                Add to Cart

              </button>


              {/* Wishlist */}

              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 transition hover:border-[#c8ff00] hover:text-[#c8ff00]"
              >

                <Heart size={21} />

              </button>

            </div>


            {/* =================================================
                BENEFITS
            ================================================= */}

            <div className="mt-6 grid grid-cols-3 gap-3">

              <Benefit
                icon={
                  <Truck size={18} />
                }
                title="Free Delivery"
                subtitle="On orders $50+"
              />


              <Benefit
                icon={
                  <ShieldCheck size={18} />
                }
                title="Secure Pay"
                subtitle="256-bit SSL"
              />


              <Benefit
                icon={
                  <RotateCcw size={18} />
                }
                title="Easy Returns"
                subtitle="30-day policy"
              />

            </div>


            {/* =================================================
                PREVIOUS / NEXT
            ================================================= */}

            <div className="mt-6 grid grid-cols-2 gap-3">


              {/* Previous */}

              <button
                type="button"
                disabled={!previousProduct}
                onClick={goToPrevious}
                className={`flex h-14 items-center justify-center gap-2 rounded-2xl border ${
                  previousProduct
                    ? "border-zinc-700 hover:border-zinc-500"
                    : "cursor-not-allowed border-zinc-800 text-zinc-700"
                }`}
              >

                <ArrowLeft size={17} />

                Previous

              </button>


              {/* Next */}

              <button
                type="button"
                disabled={!nextProduct}
                onClick={goToNext}
                className={`flex h-14 items-center justify-center gap-2 rounded-2xl ${
                  nextProduct
                    ? "bg-[#c8ff00] font-semibold text-black hover:bg-[#b8ef00]"
                    : "cursor-not-allowed bg-zinc-800 text-zinc-600"
                }`}
              >

                Next

                <ArrowRight size={17} />

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            RELATED PRODUCTS
        ================================================= */}

        {relatedProducts.length > 0 && (

          <section className="mt-16">


            {/* Header */}

            <div className="mb-6 flex items-end justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Related Products
                </h2>

                <p className="mt-1 text-sm text-zinc-600">
                  More products you might like
                </p>

              </div>


              <Link
                to="/products"
                className="text-sm text-[#c8ff00] hover:underline"
              >
                View all →
              </Link>

            </div>


            {/* Products */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">

              {relatedProducts.map(
                (item) => (

                  /*
                    IMPORTANT:
                    ProductCard already contains
                    its own Link.

                    So DON'T wrap ProductCard
                    inside another Link.
                  */

                  <ProductCard
                    key={item.id}
                    product={item}
                    onAdd={addToCart}
                  />

                )
              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}


/* =========================================================
   BENEFIT COMPONENT
========================================================= */

function Benefit({
  icon,
  title,
  subtitle,
}) {

  return (

    <div className="rounded-2xl border border-zinc-700 p-4 text-center">

      <div className="flex justify-center text-[#c8ff00]">
        {icon}
      </div>


      <div className="mt-3 text-xs font-semibold">
        {title}
      </div>


      <div className="mt-1 text-[10px] text-zinc-600">
        {subtitle}
      </div>

    </div>

  );
}


export default ProductDetails;