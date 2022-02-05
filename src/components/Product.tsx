import React, { FC } from "react";
import { Link } from "react-router-dom";

interface PropsType {
  name: string;
  price: string;
  discountedPrice: string;
  image: string;
  isDiscounted?: boolean;
  id: string;
}

const Product: FC<PropsType> = ({
  name,
  price,
  discountedPrice,
  image,
  isDiscounted,
  id,
}) => {
  return (
    <Link to={`/products/product-${id}`} className="product">
      <div className="img-container">
        <img src={image} alt="product" />
        {isDiscounted && <div className="sale-div">sale</div>}
      </div>

      <div className="info">
        <p className="name">{name}</p>
        <div className={`price-container ${isDiscounted ? "discounted" : ""}`}>
          <p className="price">{price}</p>
          {isDiscounted && (
            <p className="discounted-price">{discountedPrice}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;
