import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { useAppContext } from "../../../context/AppContext";
import { useCatalogContext } from "../../../context/CatalogContext";
import { catalogActions } from "../../../types/catalogReducer";
import Sort from "./Sort";

const CatalogControl: FC = () => {
  const { state, dispatch } = useCatalogContext();
  const {
    state: { products: appProducts },
  } = useAppContext();

  const setListView = () => {
    dispatch({
      type: catalogActions.SET_IS_GRID_VIEW,
      payload: { isGridView: false },
    });
  };

  const setGridView = () => {
    dispatch({
      type: catalogActions.SET_IS_GRID_VIEW,
      payload: { isGridView: true },
    });
  };

  const openFilterSidebar = () => {
    dispatch({ type: catalogActions.OPEN_FILTER_SIDEBAR });
  };

  const refreshProducts = () => {
    dispatch({ type: catalogActions.SET_PRODUCTS, payload: { appProducts } });
  };

  return (
    <div className="catalog-control">
      <div className="catalog-control-sort-filter filter">
        <button onClick={openFilterSidebar}>Filter</button>
        <button
          className="catalog-control-sort-filter filter-refresh"
          onClick={refreshProducts}
        >
          <BiRefresh />
        </button>
      </div>
      <Sort />
      <div className="view-btns">
        <button
          className={`catalog-control-btn ${
            state.isGridView ? "highlighted" : ""
          }`}
          onClick={setGridView}
        >
          <BsGrid3X3GapFill />
        </button>
        <button
          className={`catalog-control-btn ${
            !state.isGridView ? "highlighted" : ""
          }`}
          onClick={setListView}
        >
          <AiOutlineUnorderedList />
        </button>
      </div>
    </div>
  );
};

export default CatalogControl;
