import TransactionStatus from "@/components/layout/tx-status-card";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Payment | TixFlow",
};
const PaymentPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero.jpg)",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <div className="flex items-center text-white/80 text-sm">
            <span>My Payment</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <TransactionStatus />
    </main>
  );
};

export default PaymentPage;
