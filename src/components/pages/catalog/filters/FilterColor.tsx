import React, { FC, useEffect, useState } from "react";
import { useCatalogContext } from "../../../../context/CatalogContext";
import { catalogActions } from "../../../../types/catalogReducer";

const FilterColor: FC = () => {
  const { state, dispatch } = useCatalogContext();
  const [colorsArr, setColorsArr] = useState<string[]>([]);

  // add colors to filtersArr
  useEffect(() => {
    if (!colorsArr.length && state.products.length > 0) {
      let newColorsArr: string[] = [];
      state.products.forEach((item) => {
        const product = item.fields;
        newColorsArr.push(...product.colors);
      });
      newColorsArr = Array.from(new Set(newColorsArr));
      setColorsArr(newColorsArr);
      dispatch({
        type: catalogActions.SET_FILTERS_OBJ,
        payload: { filtersArrItem: newColorsArr, name: "colors" },
      });
    }
  }, [state.products, colorsArr.length, dispatch]);

  return <div>FilterColor</div>;
};

export default FilterColor;
