import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CompaniesSlider from "../components/CompaniesSlider";
import PageHero from "../components/PageHero";
import {
  CatalogProducts,
  FilterSidebar,
  Pagination,
} from "../components/pages/catalog";
import CatalogControl from "../components/pages/catalog/CatalogControl";
import { useCatalogContext } from "../context/CatalogContext";

const ProductsPage: FC = () => {
  const { state } = useCatalogContext();

  // scroll to top of the page when page has been changed
  // do not scroll to top of the page when loadMore button clicked
  useEffect(() => {
    if (
      state.productsToShow.length <= state.productsPerPage &&
      state.productsToShow.length > 0
    ) {
      window.scrollTo(0, 0);
    }
  }, [state.curPage, state.productsToShow, state.productsPerPage]);

  return (
    <div className="products-page">
      <FilterSidebar />
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
