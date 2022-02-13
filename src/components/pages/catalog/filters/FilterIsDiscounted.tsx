import React, { FC, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useCatalogContext } from "../../../../context/CatalogContext";
import { catalogActions } from "../../../../types/catalogReducer";

const FilterIsDiscounted: FC = () => {
  const {
    state: { products: allProducts },
  } = useAppContext();
  const { state, dispatch } = useCatalogContext();
  const initialState = Boolean(state.chosenFiltersObj?.isDiscounted);
  const [isDiscounted, setIsDiscounted] = useState<boolean>(
    initialState || false
  );

  const handleChange = () => {
    const newIsDiscounted = !isDiscounted;
    setIsDiscounted(newIsDiscounted);
    dispatch({
      type: catalogActions.FILTER_PRODUCTS,
      payload: {
        property: "isDiscounted",
        value: newIsDiscounted,
        allProducts,
      },
    });
  };

  return (
    <div className="is-discounted">
      <form action="">
        <label htmlFor="isDiscounted">Discounted products: </label>
        <input
          type="checkbox"
          name="isDiscounted"
          id="isDiscounted"
          checked={isDiscounted}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default FilterIsDiscounted;
