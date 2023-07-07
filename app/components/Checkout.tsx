"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);

export default function Checkout() {
  const router = useRouter();
  const cartStore = useCartStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create a paymentIntent as soon as the page loads up
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push("/api/auth/signin");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);
        console.log(data);
      });
  }, []);

  return <div>Checkout</div>;
}
