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

function sortProducts(
  sortOption: string,
  productsPerPage: number,
  newProducts: Array<{ [key: string]: any }>,
  newProductsToShow: Array<{ [key: string]: any }>
) {
  if (sortOption === "price-low-high") {
    newProducts = newProducts.sort((a, b) => sortByPrice(a, b));
  }
  if (sortOption === "price-high-low") {
    newProducts = newProducts.sort((a, b) => sortByPrice(b, a));
  }
  if (sortOption === "name-a-z") {
    newProducts = newProducts.sort((a, b) => {
      return a.fields.name.localeCompare(b.fields.name);
    });
  }
  if (sortOption === "name-z-a") {
    newProducts = newProducts.sort((a, b) => {
      return b.fields.name.localeCompare(a.fields.name);
    });
  }
  newProductsToShow = newProducts.slice(0, productsPerPage);
  return [newProducts, newProductsToShow];
}

function getProductsByChosenFilters(
  allProducts: Array<{ [key: string]: any }>,
  chosenFiltersObj: {
    [key: string]: FiltersObjPropValue;
  }
) {
  let newProducts = [...allProducts];
  const chosenFiltersKeys = Object.keys(chosenFiltersObj);

  try {
    chosenFiltersKeys.forEach((filterKey) => {
      if (filterKey !== "price") {
        newProducts = newProducts.filter((product) => {
          let ans: boolean;
          if (!product.fields.hasOwnProperty(filterKey)) {
            throw new Error(
              `no such property: "${filterKey}" on product: "${product.id}"`
            );
          }
          const productFieldsProperty = product.fields[filterKey];
          const filtersKeysProperty = chosenFiltersObj[filterKey];

          if (Array.isArray(filtersKeysProperty)) {
            ans = true;
            for (let item of filtersKeysProperty) {
              if (!productFieldsProperty.includes(item)) {
                ans = false;
                break;
              }
            }
          } else {
            if (filterKey === "isDiscounted") {
              if (filtersKeysProperty) {
                ans =
                  productFieldsProperty === filtersKeysProperty ? true : false;
              } else {
                ans = true;
              }
            } else {
              ans = productFieldsProperty.includes(filtersKeysProperty);
            }
          }
          return ans;
        });
      }
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
      sortBy: "price-low-high",
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

    [newProducts, newProductsToShow] = sortProducts(
      sortOption,
      state.productsPerPage,
      newProducts,
      newProductsToShow
    );

    return {
      ...state,
      products: newProducts,
      productsToShow: newProductsToShow,
      sortBy: sortOption,
      curPage: 1,
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

    // we seek inside already filtered products if filtersObj already has property with array value and new property array value is longer than previous, else we filter all products
    if (
      newChosenFiltersObj.hasOwnProperty(property) &&
      Array.isArray(newChosenFiltersObj[property]) &&
      newChosenFiltersObj[property].length < value.length
    ) {
      allProducts = state.products;
    }
    newChosenFiltersObj[property] = value;

    let newProducts = getProductsByChosenFilters(
      allProducts,
      newChosenFiltersObj
    );

    // filter by price
    if (newChosenFiltersObj.price) {
      console.log(
        "filtering by price, products coming to filter: ",
        newProducts
      );
      console.log("price filter down to: ", newChosenFiltersObj.price);
      newProducts = newProducts.filter((product) => {
        let price: number;
        if (typeof product.fields.isDiscounted === "undefined") {
          price = product.fields.price;
        } else {
          price = product.fields.discountedPrice;
        }
        let ans = price <= Number(newChosenFiltersObj.price);
        console.log(`item with price ${price}, return: ${ans}`);
        return ans;
      });
      console.log(
        "filtering by price, products outcoming from filter: ",
        newProducts
      );
    }

    // set new products to show
    let newProductsToShow = newProducts.slice(0, state.productsPerPage);
    // set new pages amount
    const pagesAmount = Math.ceil(newProducts.length / state.productsPerPage);

    [newProducts, newProductsToShow] = sortProducts(
      state.sortBy,
      state.productsPerPage,
      newProducts,
      newProductsToShow
    );

    console.log("new products: ", newProducts);

    return {
      ...state,
      products: newProducts,
      productsToShow: newProductsToShow,
      pagesAmount,
      chosenFiltersObj: newChosenFiltersObj,
      curPage: 1,
    };
  }
  return { ...state };
};

export default reducer;
