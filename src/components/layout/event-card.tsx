import { MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface EventCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  location: string;
}

export function EventCard({
  id,
  image,
  title,
  description,
  price,
  location,
}: EventCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-200">
      <Image
        src={image}
        alt={title}
        width={600}
        height={300}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1">{title}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-3 text-sm text-gray-700 flex items-center gap-1">
          <MapPin size={16} className="text-amber-500" />
          <span>{location}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-amber-600">{price}</span>

          <Button
            className="px-4 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition "
            asChild>
            <Link href={`/event/${id}`} target="_blank">
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
