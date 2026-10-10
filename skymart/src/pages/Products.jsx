import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { useCart } from "../context/CartContext";


function Products({ type }) {

  const { addToCart } = useCart();

  const [search, setSearch] = useState("");

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();


  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All Categories",
    "Electronics",
    "Clothing",
    "Furniture",
    "Home",
    "Sports",
    "Accessories",
  ];


  // =====================================================
  // CATEGORY FROM URL
  // =====================================================

  const categoryFromUrl =
    searchParams.get("category");


  const getInitialCategory = () => {

    if (!categoryFromUrl) {
      return "All Categories";
    }


    const foundCategory =
      categories.find(
        (item) =>
          item.toLowerCase() ===
          categoryFromUrl.toLowerCase()
      );


    return (
      foundCategory ||
      "All Categories"
    );
  };


  const [category, setCategory] =
    useState(
      getInitialCategory()
    );


  // =====================================================
  // UPDATE CATEGORY IF URL CHANGES
  // =====================================================

  useEffect(() => {

    setCategory(
      getInitialCategory()
    );

  }, [categoryFromUrl]);


  // =====================================================
  // PRODUCTS BASED ON PAGE TYPE
  // =====================================================

  const displayedProducts = useMemo(() => {

    let result = [...products];


    // -------------------------------
    // TOP RATED
    // -------------------------------

    if (type === "top-rated") {

      result.sort(
        (a, b) =>
          b.rating - a.rating
      );

    }


    // -------------------------------
    // NEW ARRIVALS
    // -------------------------------

    if (type === "new-arrivals") {

      result.sort(
        (a, b) =>
          Number(b.id) - Number(a.id)
      );

    }


    return result;

  }, [type]);


  // =====================================================
  // SEARCH + CATEGORY FILTER
  // =====================================================

  const filteredProducts =
    useMemo(() => {

      return displayedProducts.filter(
        (product) => {

          const matchesSearch =
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );


          const matchesCategory =
            category === "All Categories" ||
            product.category === category;


          return (
            matchesSearch &&
            matchesCategory
          );

        }
      );

    }, [
      displayedProducts,
      search,
      category,
    ]);


  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (e) => {

    const value =
      e.target.value;


    setCategory(value);


    if (
      value ===
      "All Categories"
    ) {

      setSearchParams({});

    } else {

      setSearchParams({
        category:
          value.toLowerCase(),
      });

    }

  };


  // =====================================================
  // PAGE TITLE
  // =====================================================

  const getPageTitle = () => {

    if (type === "top-rated") {
      return "Top Rated Products";
    }

    if (type === "new-arrivals") {
      return "New Arrivals";
    }

    return "All Products";

  };


  return (

    <div className="min-h-screen bg-[#0d0d0d] text-white">

      <Navbar />


      <main className="mx-auto max-w-[1180px] px-5 py-8">


        {/* =================================================
            HEADING
        ================================================= */}

        <div>

          <h1 className="text-3xl font-bold">

            {getPageTitle()}

          </h1>


          <p className="mt-1 text-sm text-zinc-600">

            {filteredProducts.length} products found


            {category !==
              "All Categories" && (

              <>
                {" "}
                in{" "}

                <span className="text-[#c8ff00]">

                  {category}

                </span>
              </>

            )}

          </p>

        </div>


        {/* =================================================
            FILTER BOX
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-zinc-700 p-3">


          <div className="flex flex-col gap-3 md:flex-row">


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="relative flex-1">

              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />


              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search products..."
                className="h-11 w-full rounded-xl bg-[#1b1b1b] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:ring-1 focus:ring-[#c8ff00]"
              />

            </div>


            {/* =================================================
                CATEGORY
            ================================================= */}

            <select
              value={category}
              onChange={
                handleCategoryChange
              }
              className="h-11 rounded-xl bg-[#1b1b1b] px-4 text-sm text-zinc-300 outline-none focus:ring-1 focus:ring-[#c8ff00]"
            >

              {categories.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                )
              )}

            </select>


            {/* =================================================
                SORT DISPLAY
            ================================================= */}

            <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1b1b1b] px-5 text-sm text-zinc-300">

              <SlidersHorizontal
                size={15}
              />

              {type === "top-rated"
                ? "Top Rated"
                : type === "new-arrivals"
                ? "Newest"
                : "Featured"}

            </div>

          </div>


          {/* =================================================
              SELECTED CATEGORY
          ================================================= */}

          {category !==
            "All Categories" && (

            <div className="mt-3 border-t border-zinc-700 pt-3">

              <span className="inline-flex items-center gap-2 rounded-full border border-[#c8ff00]/30 bg-[#c8ff00]/10 px-3 py-1 text-xs text-[#c8ff00]">

                {category}


                <button
                  type="button"
                  onClick={() => {

                    setCategory(
                      "All Categories"
                    );

                    setSearchParams({});

                  }}
                  className="hover:text-white"
                >
                  ×
                </button>

              </span>

            </div>

          )}

        </div>


        {/* =================================================
            PRODUCTS
        ================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />

            )
          )}

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {filteredProducts.length ===
          0 && (

          <div className="py-20 text-center">

            <p className="text-lg text-zinc-500">

              No products found.

            </p>


            <button
              type="button"
              onClick={() => {

                setSearch("");

                setCategory(
                  "All Categories"
                );

                setSearchParams({});

              }}
              className="mt-4 text-sm text-[#c8ff00]"
            >

              Clear filters

            </button>

          </div>

        )}

      </main>

    </div>

  );
}


export default Products;