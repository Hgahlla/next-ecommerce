"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import formatPrice from "@/utils/formatPrice";
import { ProductType } from "@/types/ProductType";

export default function Dashboard() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    const res = await fetch("/api/get-orders");
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        console.log(data);
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div layout>
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-base-200 my-4 space-y-2 rounded-lg p-8"
          >
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs">
              Status:
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } mx-2 rounded-md px-2 py-1 text-xs text-white`}
              >
                {order.status}
              </span>
            </p>

            <p className="text-xs">
              Time: {new Date(order.createdDate).toString()}
            </p>
            <div className="items-center gap-4 text-sm lg:flex">
              {order.products.map((product: ProductType) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-baseline gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                      priority={true}
                      className="w-auto"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="py-2 font-medium">
              Total: {formatPrice(order.amount)}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
