import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import Product from "./Product";
import fireIcon from "../assets/images/index/flame.png";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { formatPrice } from "../utils/formatPrice";

import ProductFields from "../types/ProductFields";

const PopularProducts: FC = () => {
  const {
    state: { popularProducts },
  } = useAppContext();

  return (
    <section className="popular-products container-2">
      <div className="product-more">
        <img src={fireIcon} alt="fire-icon" className="icon" />
        <p className="name">popular product</p>
        <Link to="/products" className="link">
          More Product
          <BsArrowRightShort className="arrow" />
        </Link>
      </div>
      {popularProducts.map((product, index) => {
        const fields: ProductFields = product.fields;
        const { name, price, discountedPrice, images, isDiscounted } = fields;
        const image = images[0].url;
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
          />
        );
      })}
    </section>
  );
};

export default PopularProducts;
