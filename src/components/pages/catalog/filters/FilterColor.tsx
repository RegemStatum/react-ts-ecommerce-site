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
  const [colorsArr, setColorsArr] = useState<string[]>([]);
  const [chosenColorsArr, setChosenColorsArr] = useState<string[]>([]);

  // add colors to filtersArr
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
    if (!chosenColorsArr.includes(color)) {
      setChosenColorsArr([...chosenColorsArr, color]);
      dispatch({
        type: catalogActions.FILTER_PRODUCTS_TO_SHOW,
        payload: { name: "color", color, setColor: true },
      });
    } else {
      const newChosenColorsArr = chosenColorsArr.filter(
        (colorItem) => colorItem !== color
      );
      setChosenColorsArr(newChosenColorsArr);
      dispatch({
        type: catalogActions.FILTER_PRODUCTS_TO_SHOW,
        payload: { name: "color", color, setColor: false },
      });
    }
  };

  return (
    <div className="colors">
      {colorsArr.map((color, index) => {
        return (
          <div
            className={`color ${color} ${
              chosenColorsArr.includes(color) ? "chosen-clr" : ""
            }`}
            key={index}
            onClick={() => handleColorClick(color)}
          >
            <BsCheck2 className="chosen" />
          </div>
        );
      })}
    </div>
  );
};

export default FilterColor;
