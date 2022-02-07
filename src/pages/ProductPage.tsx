import React, { FC, useEffect, useState } from "react";
import CompaniesSlider from "../components/CompaniesSlider";
import PageHero from "../components/PageHero";
import PopularProducts from "../components/PopularProducts";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { appReducerActions } from "../types/appReducer";
import { AiFillStar } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { formatPrice } from "../utils/formatPrice";

const ProductPage: FC = () => {
  const { dispatch, state } = useAppContext();
  // uri
  const path = useLocation().pathname;
  const productId = path.split("/").splice(-1)[0].split("-")[1];

  const [curImage, setCurImage] = useState(0);
  const [curTitle, setCurTitle] = useState("specification");
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);

  // get product info
  useEffect(() => {
    if (state.products.length > 0 && state.curProduct.id !== productId) {
      dispatch({ type: appReducerActions.GET_PRODUCT, payload: { productId } });
    }
  }, [productId, state.curProduct.id, state.products.length]);

  // product info modify
  const product = state.curProduct;
  const stars = Array.from({ length: 5 }).map((_, index) => {
    if (index + 1 <= product.reviewsStars) {
      return <AiFillStar className="filled" key={index} />;
    }
    return <AiFillStar className="empty" key={index} />;
  });
  const price = formatPrice(product.price);
  let discountedPrice: number | string = product.discountedPrice;
  if (product.isDiscounted) {
    discountedPrice = formatPrice(product.discountedPrice);
  }
  const specificationArr = product.specification.trim().split("- ").splice(1);

  // product dispatched to cart info
  const [dispatchProductInfo, setDispatchProductInfo] = useState({
    name: product.name,
    image: product.images[0],
    isDiscounted: product.isDiscounted,
    price: product.price,
    discountedPrice: product.discountedPrice,
    color: "",
    size: "",
    amount: 1,
    id: productId,
  });

  useEffect(() => {
    setDispatchProductInfo({
      name: product.name,
      image: product.images[0],
      isDiscounted: product.isDiscounted,
      price: product.price,
      discountedPrice: product.discountedPrice,
      color: "",
      size: "",
      amount: 1,
      id: productId,
    });
  }, [product, productId]);

  // change amount buttons
  const [isDecBtnDisabled, setIsDecBtnDisabled] = useState(true);
  const [isIncBtnDisabled, setIsIncBtnDisabled] = useState(false);

  const incAmount = () => {
    let amount = dispatchProductInfo.amount + 1;
    setIsDecBtnDisabled(false);
    if (amount === product.maxAmount) {
      setIsIncBtnDisabled(true);
    }
    setDispatchProductInfo({ ...dispatchProductInfo, amount });
  };

  const decAmount = () => {
    let amount = dispatchProductInfo.amount - 1;
    setIsIncBtnDisabled(false);
    if (amount === 1) {
      setIsDecBtnDisabled(true);
    }
    setDispatchProductInfo({ ...dispatchProductInfo, amount });
  };

  // dispatch product to cart
  const dispatchProduct = () => {
    setIsProductAddedToCart(true);
    if (dispatchProductInfo.color === "") {
      dispatchProductInfo.color = product.colors[0];
    }
    if (dispatchProductInfo.size === "") {
      dispatchProductInfo.size = product.sizes[0];
    }
    dispatch({
      type: appReducerActions.SET_CART_PRODUCT,
      payload: dispatchProductInfo,
    });
  };

  useEffect(() => {
    if (isProductAddedToCart) {
      const timeout = setTimeout(() => {
        setIsProductAddedToCart(false);
      }, 2500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isProductAddedToCart]);

  return (
    <div className="product-page">
      <PageHero path={path} />
      <div className="product-page-product container-2">
        <div className="info">
          <p>Lifestyle</p>
          <h3 className="name">{product.name}</h3>
          <div className="reviews-stars">{stars.map((star) => star)}</div>
          <div className="color-size">
            <div className="color">
              <p>color:</p>
              <div className="colors">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`${color} ${
                      color === dispatchProductInfo.color ? "chosen-clr" : ""
                    } ${
                      dispatchProductInfo.color === "" && index === 0
                        ? "chosen-clr"
                        : ""
                    }`}
                    onClick={() => {
                      setDispatchProductInfo({ ...dispatchProductInfo, color });
                    }}
                  >
                    {(color === dispatchProductInfo.color ||
                      (dispatchProductInfo.color === "" && index === 0)) && (
                      <BsCheck2 className="chosen" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="size">
              <p>size:</p>
              <div className="sizes">
                {product.sizes.map((size, index) => (
                  <p
                    key={index}
                    className={`${
                      size === dispatchProductInfo.size ? "chosen" : ""
                    } ${
                      dispatchProductInfo.size === "" && index === 0
                        ? "chosen"
                        : ""
                    }`}
                    onClick={() => {
                      setDispatchProductInfo({ ...dispatchProductInfo, size });
                    }}
                  >
                    {size}
                  </p>
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
                  product.isDiscounted ? "crossed" : ""
                }`}
              >
                {price}
              </p>
            </div>
            <div className="amount-add-to-cart">
              <div className="amount">
                <button
                  type="button"
                  onClick={decAmount}
                  disabled={isDecBtnDisabled}
                >
                  -
                </button>
                {dispatchProductInfo.amount}
                <button
                  type="button"
                  onClick={incAmount}
                  disabled={isIncBtnDisabled}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-to-cart"
                onClick={dispatchProduct}
              >
                + add to cart
              </button>
              {isProductAddedToCart && (
                <p className="added-product">product was added!</p>
              )}
            </div>
          </div>
        </div>
        <div className="images">
          {product.images.map((image, index) => {
            return (
              <img
                key={image.id}
                src={image.url}
                alt="product"
                className={`${index === curImage ? "big-img" : "small-img"}`}
                onClick={() => setCurImage(index)}
              />
            );
          })}
        </div>
      </div>
      <div className="specification-description container-2">
        <div className="titles">
          <p
            className={`${curTitle === "specification" ? "highlight" : ""}`}
            onClick={() => setCurTitle("specification")}
          >
            Specification
          </p>
          <p
            className={`${curTitle === "description" ? "highlight" : ""}`}
            onClick={() => setCurTitle("description")}
          >
            Description
          </p>
        </div>
        <div className="info">
          <div
            className={`specification ${
              curTitle === "specification" ? "show" : "hide"
            }`}
          >
            {specificationArr.map((item, index) => (
              <p key={index}>- {item}</p>
            ))}
          </div>
          <div
            className={`description ${
              curTitle === "description" ? "show" : "hide"
            }`}
          >
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <PopularProducts />
      <CompaniesSlider />
    </div>
  );
};

export default ProductPage;
