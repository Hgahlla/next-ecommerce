"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/utils/formatPrice";

export default function Cart() {
  const cartStore = useCartStore();

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed left-0 top-0 h-screen w-full bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-screen w-1/4 overflow-y-scroll bg-white p-14 text-gray-700"
      >
        <h1>Here's your shopping list 📃</h1>

        {/* Cart Items */}
        {cartStore.cart.map((item) => (
          <div className="flex gap-4 py-4">
            <Image
              className="h-24 rounded-md"
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <p>{item.unit_amount && formatPrice(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">
          Checkout
        </button>
      </div>
    </div>
  );
}
