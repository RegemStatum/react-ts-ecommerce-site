import React, { FC, useState, useEffect } from "react";
import { BsCheck2 } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { formatPrice } from "../../../utils/formatPrice";
import ProductPageFields from "../../../types/ProductPageFields";
import { useCartContext } from "../../../context/CartContext";
import { cartReducerActions } from "../../../types/cartReducer";

interface ProductInfoProps {
  product: ProductPageFields;
  productId: string;
  isDecBtnDisabled: boolean;
  isIncBtnDisabled: boolean;
  setIsDecBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIncBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductInfo: FC<ProductInfoProps> = ({
  product,
  productId,
  isDecBtnDisabled,
  isIncBtnDisabled,
  setIsDecBtnDisabled,
  setIsIncBtnDisabled,
}) => {
  // product info modify
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
    maxAmount: product.maxAmount,
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
      maxAmount: product.maxAmount,
      id: productId,
    });
  }, [product, productId]);

  // change image
  const [curImage, setCurImage] = useState(0);

  // change amount buttons
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
  const cartContextValue = useCartContext();
  const cartDispatch = cartContextValue.dispatch;

  const dispatchProduct = () => {
    setIsProductAddedToCart(true);
    if (dispatchProductInfo.color === "") {
      dispatchProductInfo.color = product.colors[0];
    }
    if (dispatchProductInfo.size === "") {
      dispatchProductInfo.size = product.sizes[0];
    }
    cartDispatch({
      type: cartReducerActions.SET_CART_PRODUCT,
      payload: dispatchProductInfo,
    });
  };

  // show user message when product is added to cart
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
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
  );
};

export default ProductInfo;
