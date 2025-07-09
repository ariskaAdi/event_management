import TransactionCard from "@/components/layout/transaction-card";
import axios from "axios";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Transaction | TixFlow",
};

const getEventById = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = await params;
    const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`);
    console.log(res.data);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};
const TransactionPage = async ({ params }: { params: { id: string } }) => {
  const event = await getEventById({ params });
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
            <span>Checkout Ticket Event</span>
          </div>
        </div>
      </div>

      <TransactionCard event={event} />
    </main>
  );
};

export default TransactionPage;
