import { CartItemType } from "@/types/CartItemType";

export type CartStateType = {
  isOpen: boolean;
  cart: CartItemType[];
  toggleCart: () => void;
  addProduct: (item: CartItemType) => void;
  removeProduct: (item: CartItemType) => void;
};
