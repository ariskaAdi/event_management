import SearchEvent from "./search-event";

export function HeroSection() {
  return (
    <section
      className="relative w-full h-[650px] bg-cover bg-center pt-16"
      style={{ backgroundImage: "url(/hero.jpg)" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
            Manage Events. Sell Tickets. <br className=" md:block" />
            <span className="text-amber-400 ">Flow Seamlessly.</span>
          </h1>

          <p className="text-white text-lg italic leading-relaxed max-w-xl mx-auto ">
            Platform terpercaya untuk kelola acara dan penjualan tiket tanpa
            ribet.
          </p>
        </div>

        <div className="mb-20 flex justify-center">
          <SearchEvent />
        </div>
      </div>
    </section>
  );
}
