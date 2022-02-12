import {
  catalogActionType as ActionType,
  catalogStateType as StateType,
  catalogActions as Actions,
  FiltersObjPropValue,
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

function getProductsByChosenFilters(
  allProducts: Array<{ [key: string]: any }>,
  chosenFiltersObj: {
    [key: string]: FiltersObjPropValue;
  }
) {
  let newProducts = [...allProducts];
  const chosenFiltersKeys = Object.keys(chosenFiltersObj);

  console.log("new products: ", newProducts);
  console.log("chosen filters keys: ", chosenFiltersKeys);

  try {
    chosenFiltersKeys.forEach((filterKey) => {
      console.log("FILTER KEY: ", filterKey);
      newProducts = newProducts.filter((product) => {
        console.log("current product: ", product);
        let ans: boolean;
        if (!product.fields.hasOwnProperty(filterKey)) {
          throw new Error(
            `no such property: "${filterKey}" on product: "${product.id}"`
          );
        }
        const productFieldsProperty = product.fields[filterKey];
        const filtersKeysProperty = chosenFiltersObj[filterKey];
        console.log("new productFieldsProperty: ", productFieldsProperty);
        console.log("chosen filtersKeysProperty: ", filtersKeysProperty);
        if (Array.isArray(filtersKeysProperty)) {
          ans = true;
          for (let item of filtersKeysProperty) {
            if (!productFieldsProperty.includes(item)) {
              ans = false;
              break;
            }
          }
        } else {
          ans = productFieldsProperty.includes(filtersKeysProperty);
        }
        console.log("product has needed values: ", ans);
        return ans;
      });
    });
  } catch (e) {
    console.log(e);
  }
  return newProducts;
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
  if (action.type === Actions.FILTER_PRODUCTS) {
    // action payload new filtersObj property and value
    const property = action.payload!.property;
    const value = action.payload!.value;

    // all products
    let allProducts = action.payload!.allProducts;
    // chosen filters
    let newChosenFiltersObj = JSON.parse(
      JSON.stringify(state.chosenFiltersObj)
    );

    // we seek inside already filtered products if filtersObj already has property with array value and new property value is longer than previous, else we filter all products
    if (
      newChosenFiltersObj.hasOwnProperty(property) &&
      Array.isArray(newChosenFiltersObj[property]) &&
      newChosenFiltersObj[property].length < value.length
    ) {
      allProducts = state.products;
    }
    newChosenFiltersObj[property] = value;

    const newProducts = getProductsByChosenFilters(
      allProducts,
      newChosenFiltersObj
    );

    // set new products to show
    const newProductsToShow = newProducts.slice(0, state.productsPerPage);
    // set new pages amount
    const pagesAmount = Math.ceil(newProducts.length / state.productsPerPage);

    console.log("new products", newProducts);

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
