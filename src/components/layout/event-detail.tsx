"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MapPin, Users } from "lucide-react";
import { EventDetailProps } from "@/types/eventData";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatCurrency, formatDateDetail } from "@/lib/utils";
import { Badge } from "../ui/badge";
import axios from "axios";
import LoadingSpinner from "../atoms/loading-spinner";

const EventDetail = () => {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState<EventDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}`
        );
        setEvent(res.data.result);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return (
      <div className="text-center text-gray-500 p-8">
        Event data not available.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="grid lg:grid-cols-3 gap-6 border border-dashed border-black/20 rounded-2xl p-4 items-stretch">
        {/* Left Column - Image */}
        <div className="lg:col-span-2 h-full">
          <div className="h-64 lg:h-full relative rounded-lg overflow-hidden">
            <Image
              src={event.picture}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col h-full space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {event.title}
              </h1>
              <p className="text-gray-600">
                {formatDateDetail(event.startDate)} -{" "}
                {formatDateDetail(event.endDate)}
              </p>
            </div>
            {event.vouchers.length > 0 && (
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-amber-500">
                  {event.vouchers[0].code}
                </Badge>
                <Badge variant="secondary" className="text-amber-500">
                  {event.vouchers[0].quota - event.vouchers[0].used} left
                </Badge>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-amber-500">
            {formatCurrency(event.price)}
          </div>

          {/* Discount Info */}
          {event.vouchers.length > 0 && (
            <p className="text-sm text-gray-500">
              Use a voucher to get a discount:{" "}
              {event.vouchers[0].discountType === "PERCENTAGE"
                ? `${event.vouchers[0].discount}%`
                : formatCurrency(event.vouchers[0].discount * 1000)}
            </p>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Capacity */}
          <div>
            <h3 className="text-lg font-semibold">Capacity</h3>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-amber-500" />
              <p className="text-gray-700">{event.seats}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold">Location</h3>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-amber-500" />
              <p className="text-gray-700">{event.location}</p>
            </div>
          </div>

          {/* Buy Button */}
          <div className="mt-auto space-y-4">
            <Button
              className="w-full rounded-4xl cursor-pointer h-16 text-2xl"
              asChild>
              <Link href={`/transaction/${event.id}`}>Buy Tickets</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Organizer */}
      <div className="mt-2">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">BM</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg uppercase">
                  {event.organizer.role || "ORGANIZER"}
                </h4>
                <p className="text-gray-600">{event.organizer.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {event.organizer.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
