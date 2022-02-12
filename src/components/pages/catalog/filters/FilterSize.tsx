import React, { FC, useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useCatalogContext } from "../../../../context/CatalogContext";
import { catalogActions } from "../../../../types/catalogReducer";

const FilterSize: FC = () => {
  const {
    state: { products: allProducts },
  } = useAppContext();
  const { state, dispatch } = useCatalogContext();
  const [sizesArr, setSizesArr] = useState<string[]>([]);
  const [chosenSizes, setChosenSizes] = useState<string[]>([]);

  // add colors to filtersObj
  useEffect(() => {
    if (!sizesArr.length && state.products.length > 0) {
      let newSizesArr: string[] = [];
      allProducts.forEach((item) => {
        const product = item.fields;
        newSizesArr.push(...product.sizes);
      });
      newSizesArr = Array.from(new Set(newSizesArr));
      setSizesArr(newSizesArr);
      dispatch({
        type: catalogActions.SET_FILTERS_OBJ,
        payload: { filtersArrItem: newSizesArr, name: "sizes" },
      });
    }
  }, [state.products, sizesArr.length, dispatch, allProducts]);

  // on color click
  const handleSizeClick = (size: string) => {
    let newChosenSizes: string[] = [];
    // add color to filter
    if (!state.chosenFiltersObj.sizes?.includes(size)) {
      newChosenSizes = [...chosenSizes, size];
    }
    // remove color from filter
    else {
      newChosenSizes = chosenSizes.filter((sizeItem) => sizeItem !== size);
    }
    setChosenSizes(newChosenSizes);
    console.log("chosen sizes: ", newChosenSizes);
    dispatch({
      type: catalogActions.FILTER_PRODUCTS,
      payload: { property: "sizes", value: newChosenSizes, allProducts },
    });
  };

  return (
    <div className="sizes">
      {sizesArr.map((size, index) => {
        return (
          <div
            className={`size ${chosenSizes.includes(size) ? "chosen" : ""}`}
            key={index}
            onClick={() => handleSizeClick(size)}
          >
            <p>{size}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FilterSize;
