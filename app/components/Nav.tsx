"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Nav({ user }: Session) {
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/">
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* If the user is not signed in */}
        {!user && (
          <li className="rounded-md bg-teal-600 px-4 py-2 text-white">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={48}
              height={48}
              className="rounded-full"
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
