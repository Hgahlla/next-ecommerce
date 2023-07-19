"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import DarkLight from "@/app/components/DarkLight";
import Cart from "@/app/components/Cart";
import { useCartStore } from "@/store";

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();

  return (
    <nav className="flex items-center justify-between py-12">
      <Link href={"/"}>
        <h1 className="font-lobster text-xl">Styled</h1>
      </Link>
      <ul className="flex items-center gap-8">
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="relative flex cursor-pointer items-center text-3xl"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>

        {/* {Dark Mode} */}
        <DarkLight />

        {/* If the user is not signed in */}
        {!user && (
          <li className="rounded-md bg-primary px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}

        {/* If the user is signed in */}
        {user && (
          <li>
            <div className="dropdown-end dropdown cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-72 space-y-4 bg-base-100 p-4 shadow"
              >
                <Link
                  className="rounded-md p-4 hover:bg-base-300"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="rounded-md p-4 hover:bg-base-300"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
