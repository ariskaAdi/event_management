import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { EventData } from "@/types/eventData";

export function EventCard({
  id,
  picture,
  title,
  description,
  price,
  location,
  organizer,
}: EventData) {
  const formattedPrice = `Rp ${price.toLocaleString("id-ID")}`;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-200">
      <Link href={`/event/${id}`} target="_blank">
        <Image
          src={picture}
          alt={title}
          width={600}
          height={300}
          className="h-48 w-full object-cover"
          priority
        />

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-1">{title}</h3>

          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="mt-3 text-sm text-gray-700 flex items-center gap-1">
            <MapPin size={16} className="text-amber-500" />
            <span>{location}</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">
              {formattedPrice}
            </span>

            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={organizer.profilePicture || ""}
                  alt={organizer.name}
                />
              </Avatar>
              <div className="text-sm">
                <p className="font-medium leading-none">{organizer.name}</p>
                <p className="text-xs text-gray-500">{organizer.email}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
