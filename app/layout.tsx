import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "@/app/components/Hydrate";
import Nav from "@/app/components/Nav";
import { Roboto, Lobster_Two } from "next/font/google";
import "./globals.css";

//Define main font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-robot",
});

// Define secondary font
const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "Styled",
  description: "eCommerce website created with next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className={`${roboto.variable} ${lobster.variable}  `} lang="en">
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
