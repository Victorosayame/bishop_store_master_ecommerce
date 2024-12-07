"use client";

import useCart from "@/hooks/use-cart";
import Link from "next/link";
import { useEffect } from "react";


const PaymentSuccessPage = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-blue-500">Payment Successful</p>
      <p className="">Thank you for your purchase.</p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white rounded"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
