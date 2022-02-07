import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";

const CartPage: FC = () => {
  const path = useLocation().pathname;

  return (
    <section className="section-page page-min-height">
      <PageHero path={path} />
    </section>
  );
};

export default CartPage;
