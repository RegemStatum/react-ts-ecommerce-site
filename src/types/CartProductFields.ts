interface CartProductFields {
  name: string;
  image: { url: string; id: string };
  isDiscounted: boolean;
  price: number;
  discountedPrice: number;
  color: string;
  size: string;
  amount: number;
  maxAmount: number;
  id: string;
}

export default CartProductFields;
