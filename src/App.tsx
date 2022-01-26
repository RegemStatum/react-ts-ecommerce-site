import React from "react";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import {
  HomePage,
  ErrorPage,
  ContactPage,
  ProductsPage,
  ProductPage,
} from "./pages";
// context
import { AppProvider } from "./context/AppContext";
// scss
import "./assets/scss/index.scss";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
