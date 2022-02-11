import React, { FC } from "react";
import FilterElContainer from "./FilterElContainer";
import {
  FilterCategories,
  FilterColor,
  FilterPrice,
  FilterSize,
} from "./filters";

const Filter: FC = () => {
  return (
    <div className="filters-container">
      <FilterElContainer name="categories">
        <FilterCategories />
      </FilterElContainer>
      <FilterElContainer name="price range">
        <FilterPrice />
      </FilterElContainer>
      <FilterElContainer name="color">
        <FilterColor />
      </FilterElContainer>
      <FilterElContainer name="size">
        <FilterSize />
      </FilterElContainer>
    </div>
  );
};

export default Filter;
