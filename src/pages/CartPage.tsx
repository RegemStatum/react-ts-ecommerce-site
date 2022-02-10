import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCartContext } from "../context/CartContext";
import CartProducts from "../components/pages/cart/CartProducts";
import CartControl from "../components/pages/cart/CartControl";

const CartPage: FC = () => {
  const path = useLocation().pathname;

  const { state } = useCartContext();
  const products = state.products;

  if (!products.length) {
    return (
      <section className="cart-page page-min-height">
        <PageHero path={path} />
        {!products.length && (
          <div className="no-products container-2">
            <h4>Add some products to your cart</h4>
            <Link to="/products">Go to catalog</Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="cart-page page-min-height">
      <PageHero path={path} />
      <CartProducts products={products} />
      <CartControl />
    </section>
  );
};

export default CartPage;
