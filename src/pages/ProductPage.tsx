import React, { FC, useEffect, useState } from "react";
import CompaniesSlider from "../components/CompaniesSlider";
import PageHero from "../components/PageHero";
import PopularProducts from "../components/PopularProducts";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { appReducerActions } from "../types/appReducer";
import ProductInfo from "../components/pages/product/ProductInfo";
import ProductDescription from "../components/pages/product/ProductDescription";

const ProductPage: FC = () => {
  const { dispatch, state } = useAppContext();

  const path = useLocation().pathname;
  const productId = path.split("/").splice(-1)[0].split("-")[1];

  // scroll to top of the page after render
  // set changeAmountButtons default values after render
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsDecBtnDisabled(true);
    setIsIncBtnDisabled(false);
  }, [path]);

  // isChangeAmountButtons disabled
  const [isDecBtnDisabled, setIsDecBtnDisabled] = useState(true);
  const [isIncBtnDisabled, setIsIncBtnDisabled] = useState(false);

  // get product info
  const product = state.curProduct;
  useEffect(() => {
    if (state.products.length > 0 && state.curProduct.id !== productId) {
      dispatch({ type: appReducerActions.GET_PRODUCT, payload: { productId } });
    }
  }, [productId, state.curProduct.id, state.products.length, dispatch]);

  return (
    <div className="product-page">
      <PageHero path={path} />
      <ProductInfo
        product={product}
        productId={productId}
        isDecBtnDisabled={isDecBtnDisabled}
        isIncBtnDisabled={isIncBtnDisabled}
        setIsDecBtnDisabled={setIsDecBtnDisabled}
        setIsIncBtnDisabled={setIsIncBtnDisabled}
      />
      <ProductDescription product={product} />
      <PopularProducts />
      <CompaniesSlider />
    </div>
  );
};

export default ProductPage;
