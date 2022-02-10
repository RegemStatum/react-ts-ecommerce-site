import { useAuth0 } from "@auth0/auth0-react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../context/CartContext";
import { cartReducerActions as Actions } from "../../../types/cartReducer";
import { formatPrice } from "../../../utils/formatPrice";

const CartControl: FC = () => {
  const { state, dispatch } = useCartContext();
  const { user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  // format total price
  const showTotal = formatPrice(state.totalPrice);

  return (
    <div className="control container-2">
      <div className="continue-clear">
        <Link to="/products">Continue shopping</Link>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: Actions.CLEAR_CART_PRODUCTS });
          }}
        >
          Clear Cart
        </button>
      </div>
      <div className="total-container">
        <p>
          Total price: <span>{showTotal}</span>
        </p>
        <button type="button" disabled={!isUser}>
          Order
        </button>
        {!isUser && <p>Please, log in to make an order</p>}
      </div>
    </div>
  );
};

export default CartControl;
