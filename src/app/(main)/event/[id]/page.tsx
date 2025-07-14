// app/event/[id]/page.tsx
import EventDetail from "@/components/layout/event-detail";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Event | TixFlow",
};

const getEventById = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${id}`
    );
    return res.data.result;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
};

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Event not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero.jpg)",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <div className="flex items-center text-white/80 text-sm">
            <span>Detail Event</span>
          </div>
        </div>
      </div>

      <EventDetail event={event} />
    </main>
  );
}
