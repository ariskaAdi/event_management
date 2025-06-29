"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { EventData } from "@/types/eventData";
import { Edit, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const ListEvent = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event`);
        console.log(res.data);
        setEvents(res.data.events);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="col-span-3 flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">TITLE</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">LOCATION</th>
              <th className="px-4 py-2 text-left">SEATS</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">START DATE</th>
              <th className="px-4 py-2 text-left">CATEGORY</th>
              <th className="px-4 py-2 text-left">ORGANIZER</th>
              <th className="px-4 py-2 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">{event.id}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{event.seats}</td>
                <td className="px-4 py-2">
                  Rp {event.price.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-2">
                  {new Date(event.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{event.category}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          event.organizer?.profilePicture || "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {event.organizer?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{event.organizer?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash className="w-4 h-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEvent;
