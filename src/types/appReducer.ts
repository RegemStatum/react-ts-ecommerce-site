export enum appReducerActions {
  SET_DATABASE = "SET_DATABASE",
}

export interface appReducerStateType {
  products: Array<{ [key: string]: any }>;
}

export interface appReducerActionType {
  type: appReducerActions;
  payload: { [key: string]: any };
}
