import React, { FC } from "react";

const Sort: FC = () => {
  return (
    <div className="catalog-control-sort-filter sort">
      <form>
        <label htmlFor="sort-select">Sort by: </label>
        <select name="sort-select">
          <option value="price-low-high">Price $ - $$</option>
          <option value="price-high-low">Price $$ - $</option>
          <option value="name-a-z">Name A - Z</option>
          <option value="name-z-a">Name Z - A</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
