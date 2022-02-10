import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CompaniesSlider from "../components/CompaniesSlider";
import PageHero from "../components/PageHero";
import { CatalogProducts, Pagination } from "../components/pages/catalog";
import CatalogControl from "../components/pages/catalog/CatalogControl";

const ProductsPage: FC = () => {
  return (
    <div className="products-page">
      <PageHero path={useLocation().pathname} />
      <div className="container-2">
        <CatalogControl />
        <CatalogProducts />
        <Pagination />
      </div>
      <CompaniesSlider />
    </div>
  );
};

export default ProductsPage;
