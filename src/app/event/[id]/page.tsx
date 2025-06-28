import EventDetail from "@/components/layout/event-detail";

const getEventById = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
    cache: "no-store", // atau gunakan revalidate kalau mau ISR
  });
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getEventById({ params });
  const event = data.event;

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
