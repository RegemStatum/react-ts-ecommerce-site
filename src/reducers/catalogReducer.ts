import {
  catalogActionType as ActionType,
  catalogStateType as StateType,
  catalogActions as Actions,
} from "../types/catalogReducer";

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === Actions.SET_PRODUCTS) {
    const newProducts = action.payload!.appProducts;
    const productsToShow = newProducts.slice(0, state.productsPerPage);
    const pagesAmount = Math.ceil(newProducts.length / state.productsPerPage);
    return { ...state, products: newProducts, productsToShow, pagesAmount };
  }
  if (action.type === Actions.LOAD_MORE_PRODUCTS) {
    const lastProductToShow =
      state.productsToShow[state.productsToShow.length - 1];
    const sliceFrom = state.products.indexOf(lastProductToShow) + 1;
    const sliceTo = sliceFrom + state.productsPerPage;

    const moreProducts = state.products.slice(sliceFrom, sliceTo);
    const newProductsToShow = [...state.productsToShow, ...moreProducts];

    const newCurPage = state.curPage + 1;

    return { ...state, productsToShow: newProductsToShow, curPage: newCurPage };
  }
  if (action.type === Actions.SET_CURRENT_PAGE) {
    const newPageIndex = action.payload!.pageIndex;
    const sliceFrom = state.productsPerPage * (newPageIndex - 1);
    const sliceTo = sliceFrom + state.productsPerPage;

    const newProductsToShow = state.products.slice(sliceFrom, sliceTo);

    return {
      ...state,
      productsToShow: newProductsToShow,
      curPage: newPageIndex,
    };
  }
  if (action.type === Actions.SET_IS_GRID_VIEW) {
    const isGridView = action.payload!.isGridView;
    return { ...state, isGridView };
  }
  return { ...state };
};

export default reducer;
