"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EventDetailProps } from "@/types/eventData";
import axios from "axios";

export default function TransactionCard({ event }: EventDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!event) {
    return (
      <div className="text-center text-gray-500 p-8">
        Event data not available.
      </div>
    );
  }

  const price = event.price || 0;
  const totalPaid = quantity * price;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to proceed.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        {
          eventId: event.id,
          quantity,
          totalPaid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment successful!");
      alert("Payment successful!");
    } catch (err) {
      console.error(err);
      setError("Failed to complete payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Image
                      src={event.picture || "/placeholder.svg"}
                      alt={event.title}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {event.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.startDate).toLocaleString("id-ID")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.endDate).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per ticket</span>
                      <span className="text-gray-900">
                        Rp{price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <Input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-20 text-right"
                      />
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                          Total Price
                        </span>
                        <span className="font-semibold text-gray-900">
                          Rp{totalPaid.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Checkout
                    </h2>

                    <div className="space-y-4">
                      {/* Bisa tambahkan form input lainnya jika perlu */}

                      {error && (
                        <p className="text-sm text-red-500 font-medium">
                          {error}
                        </p>
                      )}

                      <Button
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="w-full h-14 text-xl bg-purple-500 hover:bg-purple-600 text-white py-3 mt-6">
                        {isSubmitting ? "Processing..." : "Pay now"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Checkout Form */}
        </div>
      </div>
    </div>
  );
}
