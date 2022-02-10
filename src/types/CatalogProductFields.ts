interface ProductFields {
  name: string;
  price: number;
  discountedPrice: number;
  images: Array<{ [key: string]: any }>;
  isDiscounted?: boolean;
  id: string;
}

export default ProductFields;
