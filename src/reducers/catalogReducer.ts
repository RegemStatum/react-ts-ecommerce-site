import {
  catalogActionType as ActionType,
  catalogStateType as StateType,
  catalogActions as Actions,
} from "../types/catalogReducer";

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === Actions.SET_PRODUCTS) {
    const newProducts = action.payload!.appProducts;
    const productsToShow = newProducts.slice(0, state.productsPerPage);
    return { ...state, products: newProducts, productsToShow };
  }
  if (action.type === Actions.LOAD_MORE_PRODUCTS) {
    const lastProductToShow =
      state.productsToShow[state.productsToShow.length - 1];
    const sliceFrom = state.products.indexOf(lastProductToShow) + 1;
    const sliceTo = sliceFrom + state.productsPerPage;

    const moreProducts = state.products.slice(sliceFrom, sliceTo);
    const newProductsToShow = [...state.productsToShow, ...moreProducts];

    return { ...state, productsToShow: newProductsToShow };
  }
  return { ...state };
};

export default reducer;
