import { catalogStateType, catalogActionType } from "./catalogReducer";

export default interface CatalogContextValueType {
  dispatch: React.Dispatch<catalogActionType>;
  state: catalogStateType;
}
