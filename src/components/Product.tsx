import React, { FC } from "react";

interface PropsType {
  name: string;
  price: string;
  discountedPrice: string;
  image: string;
  isDiscounted?: boolean;
}

const Product: FC<PropsType> = ({
  name,
  price,
  discountedPrice,
  image,
  isDiscounted,
}) => {
  return (
    <div className="product">
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
    </div>
  );
};

export default Product;
