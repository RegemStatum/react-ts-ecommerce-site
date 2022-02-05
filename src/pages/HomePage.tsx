import React, { FC, useEffect } from "react";
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
  useEffect(() => {
    document.body.classList.add("home-page");

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

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
