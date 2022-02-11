import React, { FC, useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useCatalogContext } from "../../../../context/CatalogContext";
import { catalogActions } from "../../../../types/catalogReducer";

interface Category {
  category: string;
  amount: number;
}

const FilterCategories: FC = () => {
  const {
    state: { products: allProducts },
  } = useAppContext();
  const { state, dispatch } = useCatalogContext();
  const [categoriesArr, setCategoriesArr] = useState<Array<Category>>([]);

  // add categories to filtersArr
  useEffect(() => {
    if (!categoriesArr.length && state.products.length > 0) {
      const newCategoriesArr: Category[] = [];

      state.products.forEach((product) => {
        const category = product.fields.category;
        const categoryIndex = newCategoriesArr.findIndex(
          (item) => item.category === category
        );
        if (categoryIndex === -1) {
          newCategoriesArr.push({ category, amount: 1 });
        } else {
          newCategoriesArr[categoryIndex].amount += 1;
        }
      });

      setCategoriesArr(newCategoriesArr);
      dispatch({
        type: catalogActions.SET_FILTERS_OBJ,
        payload: { filtersArrItem: newCategoriesArr, name: "category" },
      });
    }
  }, [state.products, categoriesArr.length, dispatch]);

  // on category click
  const handleCategoryClick = (category: string) => {
    dispatch({
      type: catalogActions.FILTER_PRODUCTS_TO_SHOW,
      payload: { name: "category", allProducts, category },
    });
  };

  return (
    <div className="categories">
      {categoriesArr.map((item, index) => {
        let amount: string | number = item.amount;
        if (amount < 10) {
          amount = `0${amount}`;
        }
        return (
          <div
            key={index}
            className="category"
            onClick={() => handleCategoryClick(item.category)}
          >
            <p>{item.category}</p>
            <p>{amount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FilterCategories;