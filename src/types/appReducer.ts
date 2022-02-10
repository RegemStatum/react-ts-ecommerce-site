import ProductPageFields from "./ProductPageFields";

export enum appReducerActions {
  SET_DATABASE = "SET_DATABASE",
  CLOSE_SIDEBAR = "CLOSE_SIDEBAR",
  OPEN_SIDEBAR = "OPEN_SIDEBAR",
  GET_PRODUCT = "GET_PRODUCT",
  SET_CART_PRODUCT = "SET_CART_PRODUCT",
}

export interface appReducerStateType {
  products: Array<{ [key: string]: any }>;
  popularProducts: Array<{ [key: string]: any }>;
  isSidebarOpen: boolean;
  curProduct: ProductPageFields;
}

export interface appReducerActionType {
  type: appReducerActions;
  payload?: { [key: string]: any };
}
