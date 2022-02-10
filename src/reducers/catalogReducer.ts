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
    const newPageIndex: number = action.payload!.pageIndex;
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
    const isGridView: boolean = action.payload!.isGridView;
    return { ...state, isGridView };
  }
  if (action.type === Actions.SET_SORT_OPTION) {
    const sortOption: string = action.payload!.sortOption;
    let newProducts = [...state.products];
    let newProductsToShow = [...state.productsToShow];

    if (sortOption === "price-low-high") {
      console.log("price low high");
      newProducts = newProducts.sort((a, b) => {
        return a.fields.price - b.fields.price;
      });
      newProductsToShow = newProductsToShow.sort((a, b) => {
        return a.fields.price - b.fields.price;
      });
    }
    if (sortOption === "price-high-low") {
      console.log("price high low");

      newProducts = newProducts.sort((a, b) => {
        return b.fields.price - a.fields.price;
      });
      newProductsToShow = newProductsToShow.sort((a, b) => {
        return b.fields.price - a.fields.price;
      });
    }
    if (sortOption === "name-a-z") {
      console.log("price name a z");

      newProducts = newProducts.sort((a, b) => {
        return a.fields.name.localeCompare(b.fields.name);
      });
      newProductsToShow = newProductsToShow.sort((a, b) => {
        return a.fields.name.localeCompare(b.fields.name);
      });
    }
    if (sortOption === "name-z-a") {
      console.log("price name z a");

      newProducts = newProducts.sort((a, b) => {
        return b.fields.name.localeCompare(a.fields.name);
      });
      newProductsToShow = newProductsToShow.sort((a, b) => {
        return b.fields.name.localeCompare(a.fields.name);
      });
    }

    console.log("newProducts: ", newProducts);
    console.log("new products to show", newProductsToShow);
    return {
      ...state,
      products: newProducts,
      productsToShow: newProductsToShow,
      sortBy: sortOption,
    };
  }
  return { ...state };
};

export default reducer;
