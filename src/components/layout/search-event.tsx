"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { MapPin, Search, X } from "lucide-react";
import { EventData } from "@/types/eventData";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const SearchEvent = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const query = `?title=${title}&location=${location}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/event${query}`
      );
      setResults(res.data.result);
    } catch (error) {
      console.error("Error fetching:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (title || location) fetchEvents();
      else setResults([]);
    }, 500);
    return () => clearTimeout(delay);
  }, [title, location]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:px-0">
      {/* Search Bar */}

      <div className="flex items-center gap-0 bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden w-full">
        <div className="flex items-center flex-1 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <Input
            className="bg-transparent p-0 text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 "
            placeholder="Event Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="h-8 w-px bg-gray-200" />
        <div className="flex items-center flex-1 px-4 py-3">
          <MapPin className="h-5 w-5 text-gray-400 mr-3" />

          <Input
            className="border-0 bg-transparent p-0 text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button
          size="icon"
          onClick={() => {
            if (title || location) {
              setTitle("");
              setLocation("");
              setResults([]);
            }
          }}
          className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 m-1">
          {title || location ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Search className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>

      {/* Result Box */}
      {(title || location) && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full md:w-[600px] bg-white shadow-lg rounded-xl max-h-80 overflow-y-auto z-50 border mt-2">
          {loading ? (
            <p className="p-4 text-center text-gray-400">Loading...</p>
          ) : results.length === 0 ? (
            <p className="p-4 text-center text-gray-400">No results found.</p>
          ) : (
            results.map((event) => (
              <Link href={`/event/${event.id}`} key={event.id}>
                <div className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer transition">
                  <Image
                    src={event.picture}
                    alt={event.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover w-[60px] h-[60px]"
                  />
                  <div>
                    <h1 className="text-base font-semibold">{event.title}</h1>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchEvent;
