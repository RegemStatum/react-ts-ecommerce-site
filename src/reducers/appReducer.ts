//types
import {
  appReducerStateType as StateType,
  appReducerActionType as ActionType,
  appReducerActions as Actions,
} from "../types/appReducer";

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === Actions.SET_DATABASE) {
    const { records } = action.payload!;
    console.log(records);

    const popularProducts = records
      .filter((record: any) => {
        return record.fields.popular === true;
      })
      .splice(0, 3);

    return {
      ...state,
      products: records,
      popularProducts,
    };
  }
  if (action.type === Actions.CLOSE_SIDEBAR) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === Actions.OPEN_SIDEBAR) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === Actions.GET_PRODUCT) {
    const productId = action.payload!.productId;
    const newProductInfo = state.products.find(
      (product) => product.id === productId
    );

    if (newProductInfo) {
      const newProductFields = newProductInfo.fields;

      if (!newProductFields.isDiscounted) {
        newProductFields.isDiscounted = false;
      }

      const newProduct = {
        ...state.curProduct,
        name: newProductFields.name,
        reviewsStars: newProductFields.reviewsStars,
        colors: newProductFields.colors,
        sizes: newProductFields.sizes,
        isDiscounted: newProductFields.isDiscounted,
        price: newProductFields.price,
        discountedPrice: newProductFields.discountedPrice,
        maxAmount: newProductFields.maxAmount,
        images: newProductFields.images,
        specification: newProductFields.specification,
        description: newProductFields.description,
        id: newProductFields.id,
      };
      return { ...state, curProduct: newProduct };
    }
    return { ...state };
  }
  return { ...state };
};

export default reducer;
