import CartProductFields from "./CartProductFields";

export enum cartReducerActions {
  SET_CART = "SET_CART",
  SET_CART_PRODUCT = "SET_CART_PRODUCT",
  SET_TOTAL_PRICE = "SET_TOTAL_PRICE",
  INCREASE_PRODUCT_AMOUNT = "INCREASE_PRODUCT_AMOUNT",
  DECREASE_PRODUCT_AMOUNT = "DECREASE_PRODUCT_AMOUNT",
  CLEAR_CART_PRODUCTS = "CLEAR_CART_PRODUCTS",
}

export interface cartReducerStateType {
  products: Array<CartProductFields>;
  totalPrice: number;
}

export interface cartReducerActionType {
  type: cartReducerActions;
  payload?: { [key: string]: any };
}
