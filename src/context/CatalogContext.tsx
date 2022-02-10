import React, { FC, useContext, useReducer } from "react";

// reducer
import {
  catalogActionType as ActionType,
  catalogStateType as StateType,
} from "../types/catalogReducer";
import reducer from "../reducers/catalogReducer";

import CatalogContextValueType from "../types/catalogContextValue";

const initialState = {
  products: [],
  productsToShow: [],
  productsPerPage: 9,
  curPage: 1,
  pagesAmount: 0,
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
