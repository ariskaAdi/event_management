"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { EventData } from "@/types/eventData";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DeleteEventButton } from "./button-action";
import LoadingSpinner from "../atoms/loading-spinner";
import { formatCurrency, formatDate } from "@/lib/utils";

const ListEvent = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/organizer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setEvents(res.data.result);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">TITLE</th>
              <th className="px-4 py-2 text-left">LOCATION</th>
              <th className="px-4 py-2 text-left">SEATS</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">START DATE</th>
              <th className="px-4 py-2 text-left">CATEGORY</th>
              <th className="px-4 py-2 text-left">VOUCHER</th>
              <th className="px-4 py-2 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{event.id}</td>
                <td className="px-4 py-2">{event.title}</td>

                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{event.seats}</td>
                <td className="px-4 py-2">{formatCurrency(event.price)}</td>
                <td className="px-4 py-2">{formatDate(event.startDate)}</td>
                <td className="px-4 py-2">{event.category}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    {event.vouchers.length > 0 ? (
                      <span className="text-sm font-medium text-green-600">
                        {event.vouchers[0].code}
                      </span>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/dashboard/manage/voucher/${event.id}`}
                          className="text-sm text-blue-600 hover:underline">
                          Add Voucher
                        </Link>
                      </Button>
                    )}
                  </div>
                </td>

                <td className="px-4 py-2 text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-amber-500 hover:text-white">
                    <Link href={`/dashboard/manage/edit/${event.id}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <DeleteEventButton id={event.id} />
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
