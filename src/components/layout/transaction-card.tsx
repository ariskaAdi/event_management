"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { formatCurrency, formatDateDetail } from "@/lib/utils";
import { EventDetailProps } from "@/types/eventData";
import { IVoucher } from "@/types/voucher";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/user";
import LoadingSpinner from "../atoms/loading-spinner";

export default function TransactionCard() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const usedPoints = 0;

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/${id}`
        );
        setEvent(res.data.result);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="text-center text-gray-500 p-8">
        Event data not available.
      </div>
    );
  }

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

    if (!voucherCode.trim()) {
      setError("Please enter a voucher code.");
      return;
    }

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

      const allVouchers = res.data.result as IVoucher[];

      const validVoucher = allVouchers.find(
        (v) =>
          v.code.toLowerCase() === voucherCode.toLowerCase() && v.used < v.quota
      );

      if (!validVoucher) {
        setError("Voucher is invalid or has expired.");
        setDiscountAmount(0);
        return;
      }

      const alreadyUsed = validVoucher.usages.some((u) => u.userId === userId);

      if (alreadyUsed) {
        setError("Voucher has already been used.");
        setDiscountAmount(0);
        return;
      }

      const calculatedDiscount =
        validVoucher.discountType === "PERCENTAGE"
          ? Math.floor((price * quantity * validVoucher.discount) / 100)
          : validVoucher.discount * quantity;

      setDiscountAmount(calculatedDiscount);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to validate voucher.");
      setDiscountAmount(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Event Info */}
            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <Image
                src={event.picture || "/placeholder.svg"}
                alt={event.title}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.description}</p>
                <p className="text-sm font-bold text-gray-500">
                  Start: {formatDateDetail(event.startDate)}
                </p>
                <p className="text-sm font-bold text-gray-500">
                  End: {formatDateDetail(event.endDate)}
                </p>
              </div>
            </div>

            {/* Price and Voucher */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price per ticket</span>
                <span className="text-gray-900">{formatCurrency(price)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity</span>
                <Input
                  type="number"
                  value={quantity}
                  inputMode="numeric"
                  min={1}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-40 text-right font-bold"
                />
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Voucher Code:</span>
                <div className="flex flex-col gap-2">
                  <Input
                    type="text"
                    value={voucherCode}
                    onChange={(e) =>
                      setVoucherCode(e.target.value.toUpperCase())
                    }
                    className="w-40 text-right font-bold uppercase"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCheckVoucher}
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
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

            {/* Checkout */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Checkout
              </h2>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full h-14 text-xl bg-purple-500 hover:bg-purple-600 text-white py-3 mt-4">
                {isSubmitting ? "Processing..." : "Pay now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
