"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "@/app/components/Cart";
import { useCartStore } from "@/store";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();

  return (
    <nav className="flex items-center justify-between py-12">
      <Link href="/">
        <h1>Styled</h1>
      </Link>
      {/* Toggle the cart */}
      <ul
        onClick={() => cartStore.toggleCart()}
        className="flex items-center gap-12"
      >
        {/* Toggle the cart */}
        <li className="relative flex cursor-pointer items-center text-3xl">
          <AiFillShopping />
        </li>
        <AnimatePresence>
          {cartStore.cart.length > 0 && (
            <motion.span
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              exit={{ scale: 0 }}
              className="absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white"
            >
              {cartStore.cart.length}
            </motion.span>
          )}
        </AnimatePresence>
        {/* If the user is not signed in */}
        {!user && (
          <li className="rounded-md bg-teal-600 px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}

        {/* If the use is signed in */}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={36}
              height={36}
              className="rounded-full"
            />
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
