"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { EventData } from "@/types/eventData";
import LoadingSpinner from "../atoms/loading-spinner";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const VoucherForm = () => {
  const { id: eventId } = useParams();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isPending, setPending] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPercentage, setIsPercentage] = useState(true);
  const [quota, setQuota] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code || discount <= 0 || quota <= 0 || !startDate || !endDate) {
      alert("Please fill out all fields correctly.");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("You must be logged in to proceed.");

      return;
    }

    if (!eventId) return;
    const payload = {
      eventId: Number(eventId),
      code,
      discount,
      discountType: isPercentage ? "PERCENTAGE" : "FIXED",
      quota,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    };

    try {
      setPending(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/voucher`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Voucher successfully added!");
      router.push("/dashboard/manage");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add voucher.");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (!eventId) return;
    const fetchEvent = async () => {
      try {
        setPending(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}`
        );
        setEventData(res.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!eventData) return <LoadingSpinner />;

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
      onSubmit={handleSubmit}>
      {/* LEFT SIDE */}
      <div className="lg:col-span-8 space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <label htmlFor="title" className="font-medium text-sm">
            Event Title
          </label>
          <h1 className="w-full border border-gray-300 rounded-md p-3 bg-white">
            {eventData.title}
          </h1>
          <span className="text-sm text-red-500 mt-1 block">
            {/* Error here */}
          </span>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="font-medium text-sm">
            Image
          </label>
          <div className="w-full h-64 relative border border-gray-300 rounded-md bg-white overflow-hidden">
            {eventData.picture ? (
              <Image
                src={eventData.picture}
                alt={eventData.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="font-medium text-sm">Date Range</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="datetime-local"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 bg-white"
            />
            <input
              type="datetime-local"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 bg-white"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-4 space-y-6">
        {/* Code Voucher */}
        <div className="space-y-1">
          <label htmlFor="code" className="font-medium text-sm">
            Voucher Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. DISC50"
            className="w-full uppercaseborder border-gray-300 rounded-md p-3 bg-white"
          />
          <span className="text-sm text-red-500 mt-1 block">
            {/* Error here */}
          </span>
        </div>

        {/* Discount & Switch */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="free"
              checked={isPercentage}
              onCheckedChange={setIsPercentage}
            />
            <Label htmlFor="free">Use Percentage</Label>
          </div>
          <input
            type="number"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="Discount value"
            className="w-full border border-gray-300 rounded-md p-3 bg-white"
          />
          <span className="text-sm text-red-500 mt-1 block">
            {/* Error here */}
          </span>
        </div>

        {/* Quota */}
        <div className="space-y-1">
          <label htmlFor="quota" className="font-medium text-sm">
            Quota
          </label>
          <input
            type="number"
            name="quota"
            value={quota}
            onChange={(e) => setQuota(Number(e.target.value))}
            placeholder="e.g. 100"
            className="w-full border border-gray-300 rounded-md p-3 bg-white"
          />
        </div>

        {/* Organizer ID (hidden) */}
        <input type="text" name="organizerId" readOnly className="hidden" />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full text-white rounded-md py-3"
          disabled={isPending}>
          {isPending ? "Loading..." : "Add Voucher"}
        </Button>
      </div>
    </form>
  );
};

export default VoucherForm;
