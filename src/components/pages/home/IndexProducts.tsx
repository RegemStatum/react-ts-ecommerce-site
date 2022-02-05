import React, { FC, useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { formatPrice } from "../../../utils/formatPrice";
import ProductFields from "../../../types/ProductFields";
import Product from "../../Product";
import adImg from "../../../assets/images/index/ad-img.png";
import { BiRefresh } from "react-icons/bi";

const IndexProducts: FC = () => {
  const {
    state: { products },
  } = useAppContext();

  const [isLoadMore, setIsLoadMore] = useState(false);
  const [curProducts, setCurProducts] = useState(products);

  useEffect(() => {
    setCurProducts(products.slice(3, 8));
  }, [products]);

  const loadMoreProducts = () => {
    setIsLoadMore(true);
    setCurProducts(products.slice(3, 12));
  };

  return (
    <section className="index-products container-2">
      {curProducts.map((product, index) => {
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
      <div className="ad">
        <div className="info">
          <span>new</span>
          <h5>lifestyle</h5>
          <h4>New Nox: Striped cotton</h4>
          <a href="/" className="buy-ref">
            <p>$50.00 USD</p>
            <p>buy now</p>
          </a>
        </div>
        <img src={adImg} alt="orange shirt" />
      </div>
      {!isLoadMore && (
        <button className="load" type="button" onClick={loadMoreProducts}>
          <BiRefresh />
          load more
        </button>
      )}
    </section>
  );
};

export default IndexProducts;
