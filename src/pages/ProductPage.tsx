import React, { FC, useEffect } from "react";
import CompaniesSlider from "../components/CompaniesSlider";
import PageHero from "../components/PageHero";
import PopularProducts from "../components/PopularProducts";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { appReducerActions } from "../types/appReducer";
import { AiFillStar } from "react-icons/ai";
import { formatPrice } from "../utils/formatPrice";

const ProductPage: FC = () => {
  const path = useLocation().pathname;
  const productId = path.split("/").splice(-1)[0].split("-")[1];
  const { dispatch, state } = useAppContext();

  useEffect(() => {
    if (state.products.length > 0 && state.curProduct.id !== productId) {
      dispatch({ type: appReducerActions.GET_PRODUCT, payload: { productId } });
    }
  }, [productId, state.curProduct.id, state.products.length]);

  const product = state.curProduct;

  const stars = Array.from({ length: 5 }).map((_, index) => {
    if (index + 1 <= product.reviewsStars) {
      return <AiFillStar className="filled" />;
    }
    return <AiFillStar className="empty" />;
  });

  const price = formatPrice(product.price);
  let discountedPrice: number | string = product.discountedPrice;
  if (product.isDiscounted) {
    discountedPrice = formatPrice(product.discountedPrice);
  }

  return (
    <div className="product-page">
      <PageHero path={path} />
      <div className="product-page-product">
        <div className="info">
          <p>Lifestyle</p>
          <h4 className="name">{product.name}</h4>
          <div className="reviews-stars">{stars.map((star) => star)}</div>
          <div className="color-size">
            <div className="color">
              <p>color:</p>
              <div className="colors">
                {product.colors.map((color, index) => (
                  <div key={index} className={color}></div>
                ))}
              </div>
            </div>
            <div className="size">
              <p>size:</p>
              <div className="colors">
                {product.sizes.map((size, index) => (
                  <p key={index}>{size}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="price-amount">
            <div className="price">
              {product.isDiscounted && (
                <p className="discounted-price">{discountedPrice}</p>
              )}
              <p
                className={`non-discounted-price ${
                  product.isDiscounted && "crossed"
                }`}
              >
                {price}
              </p>
            </div>
            <div className="amount">{product.maxAmount}</div>
            <div className="add-to-cart">add to cart</div>
          </div>
        </div>
        <div className="images">
          {product.images.map((image) => {
            return <img key={image.id} src={image.url} alt="product" />;
          })}
        </div>
      </div>
      {/* <div className="specification-description">
        <p>{product.specification}</p>
        <p>{product.description}</p>
      </div> */}
      <PopularProducts />
      <CompaniesSlider />
    </div>
  );
};

export default ProductPage;
