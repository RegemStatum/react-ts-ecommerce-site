import React, { FC, useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useAppContext } from "../../../../context/AppContext";
import { useCatalogContext } from "../../../../context/CatalogContext";
import { catalogActions } from "../../../../types/catalogReducer";

const FilterColor: FC = () => {
  const {
    state: { products: allProducts },
  } = useAppContext();
  const { state, dispatch } = useCatalogContext();
  const initialChosenColors = state.chosenFiltersObj?.colors as string[];
  const [colorsArr, setColorsArr] = useState<string[]>([]);
  const [chosenColors, setChosenColors] = useState<string[]>(
    initialChosenColors || []
  );

  // add colors to filtersObj
  useEffect(() => {
    if (!colorsArr.length && state.products.length > 0) {
      let newColorsArr: string[] = [];
      allProducts.forEach((item) => {
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
  }, [state.products, colorsArr.length, dispatch, allProducts]);

  // on color click
  const handleColorClick = (color: string) => {
    let newChosenColors: string[] = [];
    // add color to filter
    if (!state.chosenFiltersObj.colors?.includes(color)) {
      newChosenColors = [...chosenColors, color];
    }
    // remove color from filter
    else {
      newChosenColors = chosenColors.filter((colorItem) => colorItem !== color);
    }
    setChosenColors(newChosenColors);
    dispatch({
      type: catalogActions.FILTER_PRODUCTS,
      payload: { property: "colors", value: newChosenColors, allProducts },
    });
  };

  return (
    <div className="colors">
      {colorsArr.map((color, index) => {
        return (
          <div
            className={`color ${color} ${
              state.chosenFiltersObj.colors?.includes(color) ? "chosen-clr" : ""
            }`}
            key={index}
            onClick={() => handleColorClick(color)}
          >
            {state.chosenFiltersObj.colors?.includes(color) && (
              <BsCheck2 className="chosen" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterColor;
