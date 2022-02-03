//types
import {
  appReducerStateType as StateType,
  appReducerActionType as ActionType,
  appReducerActions as Actions,
} from "../types/appReducer";

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
  return { ...state };
};

export default reducer;
