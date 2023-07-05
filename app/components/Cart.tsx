"use client";

import Image from "next/image";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { useCartStore } from "@/store";
import formatPrice from "@/utils/formatPrice";
import basket from "@/public/basket.png";

export default function Cart() {
  const cartStore = useCartStore();

  //Total Price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

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

              {/* Update quantity of a product */}
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>

                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>

              <p className="text-sm">
                {item.unit_amount && formatPrice(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}

        {/* Checkout and total */}
        {cartStore.cart.length > 0 && <p>Total: {formatPrice(totalPrice)}</p>}
        {cartStore.cart.length > 0 && (
          <button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">
            Checkout
          </button>
        )}
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center gap-12 pt-56 text-2xl font-medium opacity-75">
            <h1>It's empty 😢</h1>
            <Image
              src={basket}
              alt="Empty Cart"
              width={200}
              height={200}
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
}
