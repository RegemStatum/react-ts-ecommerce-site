import React, { FC } from "react";
import { useCatalogContext } from "../../../context/CatalogContext";
import { catalogActions } from "../../../types/catalogReducer";

const Sort: FC = () => {
  const { state, dispatch } = useCatalogContext();

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;

    dispatch({
      type: catalogActions.SET_SORT_OPTION,
      payload: { sortOption: target.value },
    });
  };

  return (
    <div className="catalog-control-sort-filter sort">
      <form>
        <label htmlFor="sort-select">Sort by: </label>
        <select
          name="sort-select"
          value={state.sortBy}
          onChange={handleChange}
          className="sort-select"
        >
          <option value="price-low-high">price $ - $$</option>
          <option value="price-high-low">price $$ - $</option>
          <option value="name-a-z">name (a-z)</option>
          <option value="name-z-a">name (z-a)</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
