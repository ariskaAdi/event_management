"use client";

import { useState, useRef, useEffect } from "react";
import {
  Music,
  Trophy,
  GraduationCap,
  Wrench,
  Briefcase,
  Laptop,
  Palette,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
} from "lucide-react";
import { EventCard } from "./event-card";
import { EventData } from "@/types/eventData";
import axios from "axios";

enum EventCategory {
  ALL = "ALL",
  MUSIC = "MUSIC",
  SPORTS = "SPORTS",
  EDUCATION = "EDUCATION",
  WORKSHOP = "WORKSHOP",
  BUSINESS = "BUSINESS",
  TECHNOLOGY = "TECHNOLOGY",
  ART = "ART",
  OTHER = "OTHER",
}

const categoryConfig = {
  [EventCategory.ALL]: {
    icon: PartyPopper,
    label: "All Events",
    color: "bg-red-400",
  },
  [EventCategory.MUSIC]: {
    icon: Music,
    label: "Music",
    color: "bg-yellow-400",
  },
  [EventCategory.SPORTS]: {
    icon: Trophy,
    label: "Sports",
    color: "bg-blue-400",
  },
  [EventCategory.EDUCATION]: {
    icon: GraduationCap,
    label: "Education",
    color: "bg-green-400",
  },
  [EventCategory.WORKSHOP]: {
    icon: Wrench,
    label: "Workshop",
    color: "bg-orange-400",
  },
  [EventCategory.BUSINESS]: {
    icon: Briefcase,
    label: "Business",
    color: "bg-purple-400",
  },
  [EventCategory.TECHNOLOGY]: {
    icon: Laptop,
    label: "Technology",
    color: "bg-cyan-400",
  },
  [EventCategory.ART]: {
    icon: Palette,
    label: "Art",
    color: "bg-pink-400",
  },
  [EventCategory.OTHER]: {
    icon: MoreHorizontal,
    label: "Other",
    color: "bg-gray-400",
  },
};

export default function EventCategories() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(
    EventCategory.ALL
  );
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const query =
        selectedCategory === EventCategory.ALL
          ? ""
          : `?category=${selectedCategory}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/event${query}`
      );
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      console.log(res.data);

      setEvents(res.data.events);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Event Categories</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          aria-label="Scroll left">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          aria-label="Scroll right">
          <ChevronRight size={20} className="text-gray-600" />
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {Object.values(EventCategory).map((category) => {
            const config = categoryConfig[category];
            const Icon = config.icon;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                 flex-shrink-0 w-24 h-24 md:w-32 md:h-32 p-3 md:p-4 rounded-xl md:rounded-2xl 
                transition-all duration-200 hover:scale-105
                 ${
                   isSelected
                     ? `${config.color} text-white shadow-lg`
                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                 }
                    `}>
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <div
                    className={`
                    p-2 rounded-full 
                    ${isSelected ? "bg-white/20" : "bg-white"}
                  `}>
                    <Icon
                      size={20}
                      className={isSelected ? "text-white" : "text-gray-600"}
                    />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {config.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-center text-gray-600">
          Upcoming Events:{" "}
          <span className="font-semibold">
            {categoryConfig[selectedCategory].label}
          </span>
        </p>
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {isLoading ? (
          <div className="col-span-3 flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          // Jika tidak ada data tampilkan pesan
          <p className="col-span-3 text-center text-gray-400">
            No events found in this category.
          </p>
        ) : (
          // Jika ada data tampilkan cards
          events.map((event) => (
            <EventCard
              id={event.id}
              key={event.id}
              picture={event.picture}
              title={event.title}
              description={event.description}
              price={event.price}
              location={event.location}
              organizer={{
                name: event.organizer.name,
                email: event.organizer.email,
                profilePicture: event.organizer.profilePicture,
              }}
            />
          ))
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
