import { CartItemType } from "@/types/CartItemType";

export type CartStateType = {
  isOpen: boolean;
  cart: CartItemType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: CartItemType) => void;
  removeProduct: (item: CartItemType) => void;
  paymentIntent: string;
  onCheckout: string;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
};
