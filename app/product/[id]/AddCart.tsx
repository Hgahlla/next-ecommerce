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
  const [added, setAdded] = useState(false);

  const handleAddAddToCart = () => {
    cartStore.addProduct({ id, name, unit_amount, quantity, image });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleAddAddToCart}
        disabled={added}
        className="btn-primary btn my-4 w-full"
      >
        {!added ? <span>Add to cart</span> : <span>Adding to cart</span>}
      </button>
    </>
  );
}
