import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Popup from "./utilities/PopUp";
import React, { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "./utilities/LoadingSpinner";
const Home = React.lazy(() => import("./Pages/Home"));
const ContactUs = React.lazy(() => import("./Pages/ContactUs"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const Checkout = React.lazy(() => import("./Pages/Checkout/Checkout"));
const Payment = React.lazy(() => import("./Pages/Payment/Payment"));
const Wishlist = React.lazy(() => import("./Pages/wishlist/Wishlist"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Category = React.lazy(() => import("./Pages/Cateogries/Category"));

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const RoutesMemoized = React.useMemo(
    () => (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* subcategory route */}
        <Route path="/:categoryName/:subcategoryID?" element={<Category />} />
      </Routes>
    ),
    []
  );

  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Navbar />
        {RoutesMemoized}
        {showPopup && <Popup closePopup={closePopup} />}
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
