import {
  catalogActionType as ActionType,
  catalogStateType as StateType,
  catalogActions as Actions,
} from "../types/catalogReducer";

function sortByPrice(a: any, b: any) {
  let pricetoCompareA = a.fields.price;
  let pricetoCompareB = b.fields.price;

  if (a.fields.isDiscounted) {
    pricetoCompareA = a.fields.discountedPrice;
  }
  if (b.fields.isDiscounted) {
    pricetoCompareB = b.fields.discountedPrice;
  }
  return pricetoCompareA - pricetoCompareB;
}

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === Actions.SET_PRODUCTS) {
    const newProducts = action.payload!.appProducts;
    const productsToShow = newProducts.slice(0, state.productsPerPage);
    const pagesAmount = Math.ceil(newProducts.length / state.productsPerPage);
    return {
      ...state,
      products: newProducts,
      productsToShow,
      pagesAmount,
      chosenFiltersObj: {},
    };
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
      newProducts = newProducts.sort((a, b) => sortByPrice(a, b));
      newProductsToShow = newProductsToShow.sort((a, b) => sortByPrice(a, b));
    }
    if (sortOption === "price-high-low") {
      newProducts = newProducts.sort((a, b) => sortByPrice(b, a));
      newProductsToShow = newProductsToShow.sort((a, b) => sortByPrice(b, a));
    }
    if (sortOption === "name-a-z") {
      newProducts = newProducts.sort((a, b) => {
        return a.fields.name.localeCompare(b.fields.name);
      });
      newProductsToShow = newProductsToShow.sort((a, b) => {
        return a.fields.name.localeCompare(b.fields.name);
      });
    }
    if (sortOption === "name-z-a") {
      newProducts = newProducts.sort((a, b) => {
        return b.fields.name.localeCompare(a.fields.name);
      });
      newProductsToShow = newProductsToShow.sort((a, b) => {
        return b.fields.name.localeCompare(a.fields.name);
      });
    }
    return {
      ...state,
      products: newProducts,
      productsToShow: newProductsToShow,
      sortBy: sortOption,
    };
  }
  if (action.type === Actions.OPEN_FILTER_SIDEBAR) {
    return { ...state, isFilterSidebarOpen: true };
  }
  if (action.type === Actions.CLOSE_FILTER_SIDEBAR) {
    return { ...state, isFilterSidebarOpen: false };
  }
  if (action.type === Actions.SET_FILTERS_OBJ) {
    const filterName = action.payload!.name as string;
    const filterArr = action.payload!.filtersArrItem;

    const newFiltersObj = { ...state.filtersObj, [filterName]: filterArr };
    return { ...state, filtersObj: newFiltersObj };
  }
  if (action.type === Actions.FILTER_PRODUCTS_TO_SHOW) {
    const name = action.payload!.name;
    let newProducts = [...state.products];
    let newProductsToShow = [...state.productsToShow];
    let newChosenFiltersObj = { ...state.chosenFiltersObj };

    if (name === "category") {
      newProducts = action.payload!.allProducts;
      const newCategory = action.payload!.category;
      newChosenFiltersObj.category = [newCategory];

      console.log("new category has been chosen", newCategory);
      newProducts = newProducts.filter((item) => {
        const product = item.fields;
        return product.category === newCategory;
      });
      newProductsToShow = newProducts.slice(0, state.productsPerPage);
    }

    if (name === "color") {
      const newColor = action.payload!.color;
      if (action.payload!.setColor) {
        console.log("new color has been chosen", newColor);
        newProducts = newProducts.filter((item) => {
          const product = item.fields;
          return product.colors.includes(newColor);
        });
        if (!newChosenFiltersObj.colors) {
          newChosenFiltersObj.colors = [];
        }
        newChosenFiltersObj.colors.push(newColor);
      } else {
        console.log("new color should be removed from filters", newColor);
      }

      newProductsToShow = newProducts.slice(0, state.productsPerPage);
    }

    const pagesAmount = Math.ceil(newProducts.length / state.productsPerPage);

    return {
      ...state,
      products: newProducts,
      productsToShow: newProductsToShow,
      pagesAmount,
      chosenFiltersObj: newChosenFiltersObj,
    };
  }
  return { ...state };
};

export default reducer;
