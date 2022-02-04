import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import appContextValueType from "../types/appContextValue";
import {
  Blog,
  Hero,
  Products,
  Pros,
  SpecialOffers,
  EventsSlider,
} from "../components/pages/home";
import PopularProducts from "../components/PopularProducts";
import CompaniesSlider from "../components/CompaniesSlider";

const HomePage: FC = () => {
  return (
    <main>
      <Hero />
      <Pros />
      <PopularProducts />
      <Products />
      <EventsSlider />
      <SpecialOffers />
      <Blog />
      <CompaniesSlider />
    </main>
  );
};

export default HomePage;
