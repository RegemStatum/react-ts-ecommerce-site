import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import appContextValueType from "../types/appContextValue";
import { Blog, Hero, Products, Pros } from "../components/pages/home";
import PopularProducts from "../components/PopularProducts";
import SpecialOffers from "../components/pages/home/SpecialOffers";

const HomePage: FC = () => {
  return (
    <main>
      <Hero />
      <Pros />
      <PopularProducts />
      <Products />
      <SpecialOffers />
      <Blog />
    </main>
  );
};

export default HomePage;
