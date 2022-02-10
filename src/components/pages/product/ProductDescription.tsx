import React, { FC, useState } from "react";
import ProductPageFields from "../../../types/ProductPageFields";

interface ProductDescriptionProps {
  product: ProductPageFields;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const [curTitle, setCurTitle] = useState("specification");
  const specificationArr = product.specification.trim().split("- ").splice(1);

  return (
    <div className="specification-description container-2">
      <div className="titles">
        <p
          className={`${curTitle === "specification" ? "highlight" : ""}`}
          onClick={() => setCurTitle("specification")}
        >
          Specification
        </p>
        <p
          className={`${curTitle === "description" ? "highlight" : ""}`}
          onClick={() => setCurTitle("description")}
        >
          Description
        </p>
      </div>
      <div className="info">
        <div
          className={`specification ${
            curTitle === "specification" ? "show" : "hide"
          }`}
        >
          {specificationArr.map((item, index) => (
            <p key={index}>- {item}</p>
          ))}
        </div>
        <div
          className={`description ${
            curTitle === "description" ? "show" : "hide"
          }`}
        >
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
