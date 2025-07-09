import EventCategories from "@/components/layout/event-categories";
import EventServicesSection from "@/components/layout/event-services-section";
import { HeroSection } from "@/components/layout/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />

      <section className="p-4 bg-gray-50" id="EventCategory">
        <EventCategories />
      </section>
      <section className="p-4 bg-gray-50 ">
        <EventServicesSection />
      </section>
    </main>
  );
}
