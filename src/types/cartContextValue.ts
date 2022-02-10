import {
  cartReducerStateType as StateType,
  cartReducerActionType as ActionType,
} from "../types/cartReducer";

interface CartContextValueType {
  dispatch: React.Dispatch<ActionType>;
  state: StateType;
}

export default CartContextValueType;
