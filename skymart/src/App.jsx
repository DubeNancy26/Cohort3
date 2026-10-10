import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";

import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
  path="/products/top-rated"
  element={<Products type="top-rated" />}
/>

<Route
  path="/products/new-arrivals"
  element={<Products type="new-arrivals" />}
/>

<Route
  path="/product/:id"
  element={<ProductDetails />}
/>

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
};

export default App;