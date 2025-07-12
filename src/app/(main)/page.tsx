import EventCategories from "@/components/layout/event-categories";
import EventServicesSection from "@/components/layout/event-services-section";
import { HeroSection } from "@/components/layout/hero";
import VoucherCard from "@/components/layout/voucher-card";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <HeroSection />

      <section className="p-4 " id="EventCategory">
        <EventCategories />
      </section>
      <VoucherCard />
      <section className="p-4 ">
        <EventServicesSection />
      </section>
    </main>
  );
}
