import React, { FC, useContext, useEffect, useReducer } from "react";

// reducer
import {
  catalogActions,
  catalogActionType as ActionType,
  catalogStateType as StateType,
} from "../types/catalogReducer";
import reducer from "../reducers/catalogReducer";

import CatalogContextValueType from "../types/catalogContextValue";
import { useAppContext } from "./AppContext";

const initialState = {
  products: [],
  productsToShow: [],
  productsPerPage: 9,
  curPage: 1,
  pagesAmount: 0,
  isGridView: true,
  isFilterSidebarOpen: false,
  sortBy: "", //"price-low-high"
  filtersArr: [],
};

// provider default value
const defaultValue: CatalogContextValueType = {
  state: initialState,
  dispatch: () => {},
};

const CatalogContext = React.createContext(defaultValue);

export const CatalogProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
    reducer,
    initialState
  );

  const {
    state: { products: appProducts },
  } = useAppContext();

  // set products
  useEffect(() => {
    if (state.products.length === 0) {
      dispatch({ type: catalogActions.SET_PRODUCTS, payload: { appProducts } });
      console.log(appProducts);
    }
  }, [state.products.length, appProducts]);

  // initial sort
  useEffect(() => {
    if (state.products.length && state.sortBy === "") {
      dispatch({
        type: catalogActions.SET_SORT_OPTION,
        payload: { sortOption: "price-low-high" },
      });
    }
  }, [state.products.length, state.sortBy]);

  // return to the very first page after changing sort method
  useEffect(() => {
    dispatch({
      type: catalogActions.SET_CURRENT_PAGE,
      payload: { pageIndex: 1 },
    });
  }, [state.sortBy]);

  // context value
  const providerValue = { state, dispatch };

  return (
    <CatalogContext.Provider value={providerValue}>
      {children}
    </CatalogContext.Provider>
  );
};

// custom useCatalogContext hook
export const useCatalogContext = () => {
  return useContext(CatalogContext);
};
