import React, { FC } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { useCatalogContext } from "../../../context/CatalogContext";
import { catalogActions } from "../../../types/catalogReducer";
import Filter from "./Filter";

const FilterSidebar: FC = () => {
  const { state, dispatch } = useCatalogContext();

  const closeSidebar = () => {
    dispatch({ type: catalogActions.CLOSE_FILTER_SIDEBAR });
  };

  return (
    <div
      className={`filter-sidebar ${
        state.isFilterSidebarOpen ? "show" : "hide"
      }`}
    >
      <button type="button" className="btn-close" onClick={closeSidebar}>
        <AiFillCloseSquare />
      </button>
      <Filter />
    </div>
  );
};

export default FilterSidebar;
