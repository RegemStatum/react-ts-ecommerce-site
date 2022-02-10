import React from "react";
import {
  appReducerActionType as ActionType,
  appReducerStateType as StateType,
} from "./appReducer";

export default interface appContextValueType {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}
