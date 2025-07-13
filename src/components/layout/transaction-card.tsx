"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EventDetailProps } from "@/types/eventData";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDateDetail } from "@/lib/utils";
import { IVoucher } from "@/types/voucher";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/user";

export default function TransactionCard({ event }: EventDetailProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  if (!event) {
    return (
      <div className="text-center text-gray-500 p-8">
        Event data not available.
      </div>
    );
  }
  const usedPoints = 0;
  const price = event.price || 0;
  const totalBeforeDiscount = quantity * price;
  const totalPaid = Math.max(
    0,
    totalBeforeDiscount - discountAmount - usedPoints
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to proceed.");
      setIsSubmitting(false);
      return;
    }

    console.log({
      eventId: event.id,
      quantity,
      totalPaid,
      voucherCode,
      usedPoints,
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        {
          eventId: event.id,
          quantity,
          totalPaid,
          voucherCode,
          usedPoints,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment successful!");
      console.log({
        quantity,
        price,
        totalBeforeDiscount,
        discountAmount,
        usedPoints,
        totalPaid,
      });

      alert("Payment successful!");
      router.push("/payment");
    } catch (err) {
      console.error(err);
      setError("Failed to complete payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckVoucher = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to proceed.");
      return;
    }
    const decode = jwtDecode<JwtPayload>(token);
    const userId = decode.userId;

    if (!voucherCode) return;

    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/voucher/${event.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // result is already an array of vouchers
      const allVouchers = res.data.result as IVoucher[];

      const validVoucher = allVouchers.find(
        (voucher: IVoucher) =>
          voucher.code.toLowerCase() === voucherCode.toLowerCase() &&
          voucher.used < voucher.quota
      );

      if (!validVoucher) {
        setError("Voucher is invalid or has expired.");
        setDiscountAmount(0);
        return;
      }

      const alreadyUsedByUser = validVoucher.usages.some(
        (usage) => usage.userId === userId
      );

      if (alreadyUsedByUser) {
        setError("Voucher has already been used.");
        setDiscountAmount(0);
        return;
      }

      const calculatedDiscount =
        validVoucher.discountType === "PERCENTAGE"
          ? Math.floor((price * quantity * validVoucher.discount) / 100)
          : validVoucher.discount * quantity;

      setDiscountAmount(calculatedDiscount);
      setError(""); // clear error
    } catch (error) {
      console.log(error);
      setError("Failed to validate voucher.");
      setDiscountAmount(0);
    } finally {
      setIsLoading(false);
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
                      <p className="text-sm text-gray-500 font-bold">
                        Start Date: {formatDateDetail(event.startDate)}
                      </p>
                      <p className="text-sm text-gray-500 font-bold">
                        End Date: {formatDateDetail(event.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per ticket</span>
                      <span className="text-gray-900">
                        {formatCurrency(price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <Input
                        type="number"
                        value={quantity}
                        inputMode="numeric"
                        min={1}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-40 text-right font-bold"
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voucher Code:</span>
                      <div className="gap-2 flex flex-col">
                        <Input
                          type="text"
                          value={voucherCode}
                          onChange={(e) =>
                            setVoucherCode(e.target.value.toUpperCase())
                          }
                          className="w-40 text-right font-bold "
                          style={{ textTransform: "uppercase" }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleCheckVoucher}
                          className="bg-green-500 hover:bg-green-600 text-white w-full cursor-pointer"
                          disabled={isLoading}>
                          {isLoading ? "Checking..." : "Apply"}
                        </Button>
                      </div>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-green-600">Discount</span>
                        <span className="text-green-600">
                          - {formatCurrency(discountAmount)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                          Total Price
                        </span>
                        <span className="font-semibold text-gray-900 text-xl">
                          {formatCurrency(totalPaid)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Checkout
                    </h2>

                    <div className="space-y-4">
                      {error && (
                        <p className="text-sm text-red-500 font-medium">
                          {error}
                        </p>
                      )}

                      <Button
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="w-full h-14 text-xl bg-purple-500 hover:bg-purple-600 text-white py-3 mt-6 cursor-pointer">
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
