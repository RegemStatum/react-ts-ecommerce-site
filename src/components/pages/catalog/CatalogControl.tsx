import React, { FC } from "react";
import { BiListUl, BiRefresh } from "react-icons/bi";
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { useCatalogContext } from "../../../context/CatalogContext";
import { catalogActions } from "../../../types/catalogReducer";
import Sort from "./Sort";

const CatalogControl: FC = () => {
  const { state, dispatch } = useCatalogContext();

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

  return (
    <div className="catalog-control">
      <button className="catalog-control-sort-filter filter">
        Filter
        <BiRefresh />
      </button>
      <Sort />
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
        <BsListUl />
      </button>
    </div>
  );
};

export default CatalogControl;
