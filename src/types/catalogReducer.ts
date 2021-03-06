export enum catalogActions {
  OPEN_FILTER_SIDEBAR = "OPEN_FILTER_SIDEBAR",
  CLOSE_FILTER_SIDEBAR = "CLOSE_FILTER_SIDEBAR",
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_PRODUCTS_TO_SHOW = "SET_PRODUCTS_TO_SHOW",
  SET_PRODUCTS_PER_PAGE = "SET_PRODUCTS_PER_PAGE",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_IS_GRID_VIEW = "SET_IS_GRID_VIEW",
  LOAD_MORE_PRODUCTS = "LOAD_MORE_PRODUCTS",
  SET_SORT_OPTION = "SET_SORT_OPTION",
  SET_FILTERS_OBJ = "SET_FILTERS_OBJ",
  SET_CHOSEN_FILTERS_OBJ = "SET_CHOSEN_FILTERS_OBJ",
  FILTER_PRODUCTS = "FILTER_PRODUCTS",
}

export interface catalogActionType {
  type: catalogActions;
  payload?: { [key: string]: any };
}

export type FiltersObjPropValue = Array<
  | {
      [key: string]: any;
    }
  | string
>;

export interface catalogStateType {
  products: Array<{ [key: string]: any }>;
  productsToShow: Array<{ [key: string]: any }>;
  productsPerPage: number;
  curPage: number;
  pagesAmount: number;
  isGridView: boolean;
  isFilterSidebarOpen: boolean;
  sortBy: string;
  filtersObj: {
    [key: string]: FiltersObjPropValue;
  };
  chosenFiltersObj: {
    [key: string]: FiltersObjPropValue;
  };
}
