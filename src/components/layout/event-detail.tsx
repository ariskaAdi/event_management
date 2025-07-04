import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Heart, MapPin, Share2, Users } from "lucide-react";
import { EventDetailProps } from "@/types/eventData";
import Link from "next/link";

const EventDetail = ({ event }: EventDetailProps) => {
  if (!event) {
    return (
      <div className="text-center text-gray-500 p-8">
        Event data not available.
      </div>
    );
  }

  const price =
    typeof event.price === "number"
      ? `Rp${event.price.toLocaleString("id-ID")}`
      : "-";

  const startDate = event.startDate
    ? new Date(event.startDate).toLocaleString("id-ID")
    : "-";

  const endDate = event.endDate
    ? new Date(event.endDate).toLocaleString("id-ID")
    : "-";
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="grid lg:grid-cols-3 gap-6 border border-dashed border-black/20 rounded-2xl p-4 items-stretch">
        {/* Left Column - Images */}
        <div className="lg:col-span-2 h-full">
          <div className="lg:col-span-2 h-64 lg:h-full relative rounded-lg overflow-hidden">
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
                {startDate} - {endDate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-amber-500">{price}</div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Capacity</h3>
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-amber-500" />
              <p className="text-gray-700 leading-relaxed">{event.seats}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-500" />
                <p className="text-gray-700 leading-relaxed">
                  {event.location}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <Button
              className="w-full rounded-4xl cursor-pointer h-16 text-2xl "
              asChild>
              <Link href={`/transaction/${event.id}`}>Buy Tickets</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* event organizer Section */}
      <div className="mt-2">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">BM</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg uppercase">
                  {event.organizer.role}
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
