import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the user
    const userSession = await getServerSession(req, res, authOptions);
    if (!userSession?.user) {
      res.status(403).json({ message: "Not logged in" });
      return;
    }

    // Find all orders for this user
    const orders = await prisma.order.findMany({
      where: { userId: userSession.user.id, status: "complete" },
      include: { products: true },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}
