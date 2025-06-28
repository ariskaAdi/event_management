// import { RoomsList } from "@/components/layout/rooms.list";

import EventCategories from "@/components/layout/event-categories";
import { HeroSection } from "@/components/layout/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />

      <div className="p-4 bg-gray-50">
        <EventCategories />
      </div>
    </main>
  );
}
