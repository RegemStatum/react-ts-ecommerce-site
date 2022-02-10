export enum catalogActions {
  OPEN_FILTER_MODAL = "OPEN_FILTER_MODAL",
  CLOSE_FILTER_MODAL = "CLOSE_FILTER_MODAL",
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_PRODUCTS_TO_SHOW = "SET_PRODUCTS_TO_SHOW",
  SET_PAGES_AMOUNT = "SET_PAGES_AMOUNT",
  SET_PRODUCTS_PER_PAGE = "SET_PRODUCTS_PER_PAGE",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_IS_GRID_VIEW = "SET_IS_GRID_VIEW",
  LOAD_MORE_PRODUCTS = "LOAD_MORE_PRODUCTS",
}

export interface catalogActionType {
  type: catalogActions;
  payload?: { [key: string]: any };
}

export interface catalogStateType {
  products: Array<{ [key: string]: any }>;
  productsToShow: Array<{ [key: string]: any }>;
  productsPerPage: number;
  curPage: number;
  pagesAmount: number;
}
