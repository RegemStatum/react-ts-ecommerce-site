import React, { FC } from "react";
import { useCartContext } from "../../../context/CartContext";
import CartProductFields from "../../../types/CartProductFields";
import { formatPrice } from "../../../utils/formatPrice";
import { cartReducerActions as Actions } from "../../../types/cartReducer";

interface CartProductsProps {
  products: Array<CartProductFields>;
}

const CartProducts: FC<CartProductsProps> = ({ products }) => {
  const { dispatch } = useCartContext();
  // change product amount
  // increase product amount
  const incAmount = (id: string, color: string, size: string) => {
    const curProductIndex = products.findIndex(
      (product) =>
        product.id === id && product.size === size && product.color === color
    );
    if (
      products[curProductIndex].maxAmount >=
      products[curProductIndex].amount + 1
    ) {
      dispatch({
        type: Actions.INCREASE_PRODUCT_AMOUNT,
        payload: { curProductIndex },
      });
    }
  };

  // decrease product amount
  const decAmount = (id: string, color: string, size: string) => {
    const curProductIndex = products.findIndex(
      (product) =>
        product.id === id && product.size === size && product.color === color
    );
    dispatch({
      type: Actions.DECREASE_PRODUCT_AMOUNT,
      payload: { curProductIndex },
    });
  };

  return (
    <div className="cart-products container-2">
      <div className="titles">
        <p>product</p>
        <p>price</p>
        <p>amount</p>
        <p>subtotal</p>
      </div>
      {products.map((product, index) => {
        const {
          name,
          image,
          isDiscounted,
          price,
          discountedPrice,
          color,
          size,
          amount,
          id,
        } = product;

        // count subtotal
        let subTotal: number;
        if (isDiscounted) {
          subTotal = discountedPrice * amount;
        } else {
          subTotal = price * amount;
        }

        // format prices to show
        const showPrice = formatPrice(price);
        const showDiscountedPrice = formatPrice(discountedPrice);
        const showSubTotal = formatPrice(subTotal);

        return (
          <div className="cart-product" key={index}>
            <div className="info">
              <img src={image.url} alt={name} />
              <p className="name">{name}</p>
              <div className="color-container">
                <p>color: </p>
                <div className={`color ${color}`}></div>
              </div>
              <div className="size-container">
                <p>size: </p>
                <p className="size">"{size}"</p>
              </div>
            </div>
            <div className="price-container">
              <p className={`${isDiscounted ? "crossed" : ""} price`}>
                {showPrice}
              </p>
              {isDiscounted && (
                <p className="discounted-price">{showDiscountedPrice}</p>
              )}
            </div>
            <div className="amount">
              <button type="button" onClick={() => decAmount(id, color, size)}>
                <p>-</p>
              </button>
              <p>{amount}</p>
              <button type="button" onClick={() => incAmount(id, color, size)}>
                <p>+</p>
              </button>
            </div>
            <p className="subtotal">{showSubTotal}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CartProducts;
