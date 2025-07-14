import EventDetail from "@/components/layout/event-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Event | TixFlow",
};

const EventDetailPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url(/hero.jpg)" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <div className="flex items-center text-white/80 text-sm">
            <span>Detail Event</span>
          </div>
        </div>
      </div>

      <EventDetail />
    </main>
  );
};

export default EventDetailPage;
