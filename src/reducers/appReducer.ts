//types
import {
  appReducerStateType as StateType,
  appReducerActionType as ActionType,
  appReducerActions as Actions,
} from "../types/appReducer";
import CartProductFields from "../types/CartProductFields";

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === Actions.SET_DATABASE) {
    const { records } = action.payload!;
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
        ...newProductFields,
      };
      return { ...state, curProduct: newProduct };
    }
    return { ...state };
  }
  if (action.type === Actions.SET_CART_PRODUCT) {
    const newProduct = action.payload as CartProductFields;
    const productsWithSameId = state.cartProducts.filter(
      (item) => item.id === newProduct.id
    );
    const sameProduct = productsWithSameId.find(
      (item) => item.color === newProduct.color && item.size === newProduct.size
    );

    if (sameProduct) {
      if (sameProduct.amount === newProduct.amount) {
        return { ...state };
      } else {
        const sameProductIndex = state.cartProducts.indexOf(sameProduct);
        let newCartProducts = [...state.cartProducts];
        newCartProducts[sameProductIndex] = newProduct;
        return { ...state, cartProducts: newCartProducts };
      }
    }
    return { ...state, cartProducts: [...state.cartProducts, newProduct] };
  }
  return { ...state };
};

export default reducer;
