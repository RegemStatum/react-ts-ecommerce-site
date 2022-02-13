import React, { FC, useContext, useEffect, useReducer } from "react";
// types
import ValueType from "../types/appContextValue";
import {
  appReducerStateType as StateType,
  appReducerActionType as ActionType,
  appReducerActions as Actions,
} from "../types/appReducer";

// airtable
import Airtable from "airtable";

// reducer
import reducer from "../reducers/appReducer";
const initialState: StateType = {
  products: [],
  popularProducts: [],
  isSidebarOpen: false,
  curProduct: {
    name: "",
    reviewsStars: -1,
    colors: [],
    sizes: [],
    isDiscounted: false,
    price: -1,
    discountedPrice: -1,
    maxAmount: -1,
    images: [],
    specification: "",
    description: "",
    category: "",
    id: "",
  },
};

// context
const intitialValue: ValueType = {
  state: initialState,
  dispatch: () => {},
};
const AppContext = React.createContext(intitialValue);

//airtable api key and base id
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID!);

export const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
    reducer,
    initialState
  );

  const value: ValueType = {
    state,
    dispatch,
  };

  useEffect(() => {
    if (!state.products.length) {
      base("product")
        .select({ view: "Grid view" })
        .eachPage((records, fetchNextPage) => {
          dispatch({ type: Actions.SET_DATABASE, payload: { records } });
          fetchNextPage();
        });
    }
  }, [state.products.length]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

//custom useAppContext hook
export const useAppContext = () => {
  return useContext(AppContext);
};
