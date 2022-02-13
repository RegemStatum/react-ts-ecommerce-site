interface ProductPageFields {
  name: string;
  reviewsStars: number;
  colors: Array<string>;
  sizes: Array<string>;
  isDiscounted: boolean;
  price: number;
  discountedPrice: number;
  maxAmount: number;
  images: Array<{ id: string; url: string }>;
  specification: string;
  description: string;
  category: string;
  id: string;
}

export default ProductPageFields;
