import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Toast from "./utils/toast/toast";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import MyOrders from "./views/myorders"
import Footer from "./components/footer";
import Home from "./views/home";
import SingleProduct from "./views/product-details";
import ProductCategory from "./views/product-category";
import ProductSearch from "./views/product-search";
import Checkout from "./views/checkout";
import Faqs from "./views/faqs";
import Regulations from "./views/regulations";
import AboutUs from "./views/aboutUs";
import ConfirmOrder from "./views/checkout/complete";
import TopBlogs from "./views/topBlogs";
import ResetPassword from "../src/views/auth/resetPassword";

// import {Helmet} from "react-helmet";
import SingleBlog  from "./views/blogdetails";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// Check the auth
function checkAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return true;
  }
  return false;
}
function App() {
  return (
    <>
     {/* <Helmet>
      <meta charSet="utf-8" />
      <title>Nairobi Closet</title>
      <link rel="canonical" href="http://nairobicloset.co.ke"/>
    </Helmet> */}
      <Toast />

      <BrowserRouter>
        <Header />

        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="home page" element={<Home />} />
            <Route exact path="/about-us" name="about page" element={<AboutUs />} />
            <Route exact path="/myorders" name="myorders" element={< MyOrders/>} />
            <Route exact path="/Our-terms" name="terms $ condition page" element={< Regulations/>} />
            <Route exact path="/faqs" name="terms $ condition page" element={< Faqs/>} />
            <Route exact path="/blog" name="terms $ condition page" element={< TopBlogs/>} />
            <Route
              exact
              path="/product/:slug"
              element={<SingleProduct />}
            />  
            <Route
        exact
        path="/reset-password/:userId/:token"
        element={<ResetPassword />}
      />
            <Route
              exact
              path="/category/:slug"
              element={<ProductCategory />}
            />
            <Route
              exact
              path="/checkout"
              name="checkout page"
              element={<Checkout />}
            />
                 <Route
            exact
            path="/blog/:slug"
            element={< SingleBlog />}
          />
            {/* Order success */}
            <Route
              exact
              path="/order/success"
              name="Order success"
              element={<ConfirmOrder />}
            />
             <Route
              exact
              path="/search"
              element={<ProductSearch />}
            />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
