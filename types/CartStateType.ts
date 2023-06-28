import { AddCartType } from "@/types/AddCartType";

export type CartStateType = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
};
