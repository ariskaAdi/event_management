import React from "react";

const page = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero.jpg)",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        {/* <Header /> */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
          <div className="flex items-center text-white/80 text-sm">
            <p className="hover:text-white">Admin</p>
            <span className="mx-2">/</span>
            <span>Dashboard</span>
          </div>
        </div>
      </div>
      {/* dashboard admin */}
    </main>
  );
};

export default page;
