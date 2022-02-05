import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import CompaniesSlider from "../components/CompaniesSlider";
import PageHero from "../components/PageHero";

const ProductsPage: FC = () => {
  return (
    <div className="products-page">
      <PageHero path={useLocation().pathname} />
      <CompaniesSlider />
    </div>
  );
};

export default ProductsPage;
