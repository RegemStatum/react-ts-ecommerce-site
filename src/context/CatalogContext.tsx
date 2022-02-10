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
  sortBy: "price-low-high",
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
    if (!state.products.length) {
      dispatch({ type: catalogActions.SET_PRODUCTS, payload: { appProducts } });
    }
  }, [state.products.length, appProducts]);

  // initial sort
  useEffect(() => {
    if (state.products.length) {
      dispatch({
        type: catalogActions.SET_SORT_OPTION,
        payload: { sortOption: state.sortBy },
      });
    }
  }, [state.products.length]);

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
