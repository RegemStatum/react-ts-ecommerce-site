import React, { FC, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/cartReducer";
import CartContextValueType from "../types/cartContextValue";
import {
  cartReducerStateType as StateType,
  cartReducerActionType as ActionType,
  cartReducerActions as Actions,
} from "../types/cartReducer";

// initial reducer state
const initialState = { products: [], totalPrice: 0 };

// set LocalStorage
const setLocalStorage = (state: StateType) => {
  localStorage.setItem("typescript-ecommerce", JSON.stringify(state));
};

// get LocalStorage
const getLocalStorage = () => {
  let localStorageInfo = localStorage.getItem("typescript-ecommerce");
  if (localStorageInfo) {
    localStorageInfo = JSON.parse(localStorageInfo);
  }
  return localStorageInfo;
};

// provider default value
const defaultValue: CartContextValueType = {
  state: initialState,
  dispatch: () => {},
};

// cart context create
const CartContext = React.createContext(defaultValue);

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
    reducer,
    initialState
  );

  // get state from localStorage if localStorage
  useEffect(() => {
    const localStorage = getLocalStorage();
    if (localStorage) {
      dispatch({ type: Actions.SET_CART, payload: { localStorage } });
    }
  }, []);

  // set localStorage
  useEffect(() => {
    if (state.products.length !== 0) {
      setLocalStorage(state);
    }
  }, [state.products, state]);

  // set totalPrice
  useEffect(() => {
    const totalPrice = state.products.reduce((price, item) => {
      if (item.isDiscounted) {
        return (price += item.discountedPrice * item.amount);
      }
      return (price += item.price * item.amount);
    }, 0);
    if (totalPrice !== state.totalPrice) {
      dispatch({ type: Actions.SET_TOTAL_PRICE, payload: { totalPrice } });
    }
  }, [state.products, state.totalPrice]);

  const cartContextValue = { state, dispatch };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// custom useCartContext hook
export const useCartContext = () => {
  return useContext(CartContext);
};
