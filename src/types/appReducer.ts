export enum appReducerActions {
  SET_DATABASE = "SET_DATABASE",
  CLOSE_SIDEBAR = "CLOSE_SIDEBAR",
  OPEN_SIDEBAR = "OPEN_SIDEBAR",
}

export interface appReducerStateType {
  products: Array<{ [key: string]: any }>;
  popularProducts: Array<{ [key: string]: any }>;
  isSidebarOpen: boolean;
}

export interface appReducerActionType {
  type: appReducerActions;
  payload?: { [key: string]: any };
}
