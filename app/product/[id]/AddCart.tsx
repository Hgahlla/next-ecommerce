"use client";

import { useState } from "react";
import { useCartStore } from "@/store";
import { CartItemType } from "@/types/CartItemType";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: CartItemType) {
  const cartStore = useCartStore();

  const handleAddAddToCart = () => {
    cartStore.addProduct({ id, name, unit_amount, quantity, image });
  };

  return (
    <>
      <button
        onClick={handleAddAddToCart}
        className="my-12 rounded-md bg-teal-700 px-6 py-2 font-medium text-white"
      >
        Add to cart
      </button>
    </>
  );
}
