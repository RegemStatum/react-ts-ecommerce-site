import React, { FC, useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useCatalogContext } from "../../../../context/CatalogContext";
import { catalogActions } from "../../../../types/catalogReducer";
import { formatPrice } from "../../../../utils/formatPrice";

const FilterPrice: FC = () => {
  const {
    state: { products: allProducts },
  } = useAppContext();

  const { state, dispatch } = useCatalogContext();
  const initialPrice: number = Number(state.chosenFiltersObj?.price) || 0;

  // add prices to filtersArr
  const [minPrice, setMinPrice] = useState(0);
  const [price, setPrice] = useState(initialPrice);
  const [maxPrice, setMaxPrice] = useState(0);

  // set min-max prices
  useEffect(() => {
    if (allProducts.length > 0) {
      let newMinPrice = 0;
      let newMaxPrice = 0;
      allProducts.forEach((product) => {
        let productPrice = 0;
        if (!product.fields.isDiscounted) {
          productPrice = product.fields.price;
        } else {
          productPrice = product.fields.discountedPrice;
        }

        if (productPrice > newMaxPrice) {
          newMaxPrice = productPrice;
        }
        if (productPrice < newMinPrice || newMinPrice === 0) {
          newMinPrice = productPrice;
        }
      });
      setMinPrice(newMinPrice);
      setMaxPrice(newMaxPrice);
      if (!price) {
        setPrice(newMaxPrice);
      }
      dispatch({
        type: catalogActions.SET_FILTERS_OBJ,
        payload: { name: "prices", filtersArrItem: [newMinPrice, newMaxPrice] },
      });
    }
  }, [allProducts, minPrice, maxPrice, dispatch, price]); // added price

  // set price to max price if filtersObj was refreshed
  useEffect(() => {
    if (!state.chosenFiltersObj.hasOwnProperty("price")) {
      setPrice(maxPrice);
    }
  }, [state.chosenFiltersObj, maxPrice]);

  const filterByPrice = (price: number) => {
    dispatch({
      type: catalogActions.FILTER_PRODUCTS,
      payload: {
        property: "price",
        value: price,
        allProducts,
      },
    });
  };

  // on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
    filterByPrice(Number(e.target.value));
  };

  return (
    <div className="price">
      <div className="show-price-container">
        <div className="show-price min-price">
          <p>{formatPrice(minPrice)}</p>
        </div>
        <div className="show-price max-price">
          <p>{formatPrice(maxPrice)}</p>
        </div>
      </div>
      <form action="" className="price-input-form">
        <input
          className="price-input"
          type="range"
          name="price"
          id="price"
          value={price}
          onChange={handleChange}
          min={minPrice}
          max={maxPrice}
        />
        <div className="cur-price">
          <p>
            Max price: <span>{formatPrice(price)}</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default FilterPrice;
