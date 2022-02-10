import React, { FC } from "react";
import { useCatalogContext } from "../../../context/CatalogContext";
import ProductFields from "../../../types/CatalogProductFields";
import adImg from "../../../assets/images/index/webp/ad-img.webp";
import { formatPrice } from "../../../utils/formatPrice";
import Product from "../../Product";
import { BiRefresh } from "react-icons/bi";
import { catalogActions } from "../../../types/catalogReducer";

const CatalogProducts: FC = () => {
  const { state, dispatch } = useCatalogContext();
  const productsToShow = state.productsToShow;

  const loadMoreProducts = () => {
    dispatch({ type: catalogActions.LOAD_MORE_PRODUCTS });
  };

  return (
    <div className="catalog-products-container">
      {productsToShow.map((product, index) => {
        if (!product) return <></>;
        const fields: ProductFields = product.fields;
        const { name, price, discountedPrice, images, isDiscounted } = fields;
        let image = "";
        if (images) {
          image = images[0].url;
        } else {
          image = adImg;
        }

        let formattedDiscountedPrice = formatPrice(discountedPrice);
        let formattedPrice = formatPrice(price);
        return (
          <Product
            key={index}
            name={name}
            price={formattedPrice}
            discountedPrice={formattedDiscountedPrice}
            isDiscounted={isDiscounted}
            image={image}
            id={product.id}
          />
        );
      })}
      <button
        className={`btn-load-more ${
          state.products[state.products.length - 1]?.id ===
          state.productsToShow[state.productsToShow.length - 1]?.id
            ? "hide"
            : "show"
        }`}
        onClick={loadMoreProducts}
      >
        <BiRefresh />
        Load more
      </button>
    </div>
  );
};

export default CatalogProducts;