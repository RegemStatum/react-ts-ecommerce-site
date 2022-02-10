import {
  cartReducerStateType as StateType,
  cartReducerActionType as ActionType,
  cartReducerActions as Actions,
} from "../types/cartReducer";

import CartProductFields from "../types/CartProductFields";

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === Actions.SET_CART) {
    const newState = action.payload!.localStorage;
    return newState;
  }
  if (action.type === Actions.SET_CART_PRODUCT) {
    const newProduct = action.payload as CartProductFields;
    const productsWithSameId = state.products.filter(
      (item) => item.id === newProduct.id
    );
    const sameProduct = productsWithSameId.find(
      (item) => item.color === newProduct.color && item.size === newProduct.size
    );

    if (sameProduct) {
      if (sameProduct.amount === newProduct.amount) {
        return { ...state };
      } else {
        const sameProductIndex = state.products.indexOf(sameProduct);
        let newCartProducts = [...state.products];
        newCartProducts[sameProductIndex] = newProduct;
        return { ...state, products: newCartProducts };
      }
    }
    return { ...state, products: [...state.products, newProduct] };
  }
  if (action.type === Actions.INCREASE_PRODUCT_AMOUNT) {
    const curProductIndex: number = action.payload!.curProductIndex;
    const newProducts = JSON.parse(JSON.stringify(state.products));
    newProducts[curProductIndex].amount += 1;
    return { ...state, products: newProducts };
  }
  if (action.type === Actions.DECREASE_PRODUCT_AMOUNT) {
    const curProductIndex: number = action.payload!.curProductIndex;
    const newProducts = JSON.parse(JSON.stringify(state.products));
    newProducts[curProductIndex].amount -= 1;
    if (newProducts[curProductIndex].amount <= 0) {
      newProducts.splice(curProductIndex, 1);
    }
    return { ...state, products: newProducts };
  }
  if (action.type === Actions.CLEAR_CART_PRODUCTS) {
    return { ...state, products: [] };
  }
  if (action.type === Actions.SET_TOTAL_PRICE) {
    const newTotalPrice = action.payload!.totalPrice;
    return { ...state, totalPrice: newTotalPrice };
  }
  return state;
};

export default reducer;
