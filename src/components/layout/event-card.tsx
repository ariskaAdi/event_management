import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { EventData } from "@/types/eventData";
import { formatCurrency, formatDate } from "@/lib/utils";

export function EventCard({
  id,
  picture,
  title,
  price,
  location,
  organizer,
  startDate,
}: EventData) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-200">
      <Link href={`/event/${id}`} target="_blank">
        <Image
          src={picture}
          alt={title}
          width={600}
          height={300}
          className="h-48 w-full object-cover hover:scale-105 transition-all duration-200"
          priority
        />

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-1">{title}</h3>

          <div className="text-sm text-gray-700 font-medium flex items-center gap-1 ">
            {formatDate(startDate)}
          </div>
          <div className="mt-2 text-sm text-gray-700 flex items-center gap-1 ">
            <MapPin size={16} className="text-amber-500" />
            <span>{location}</span>
          </div>

          <div className="mt-3 flex items-center font-medium  justify-between">
            <span className="text-lg font-semibold text-amber-600">
              {formatCurrency(price)}
            </span>

            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={organizer.profilePicture || "undraw_avatar.svg"}
                  alt={organizer.name}
                />
              </Avatar>
              <div className="text-sm">
                <p className="font-medium leading-none">{organizer.name}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
