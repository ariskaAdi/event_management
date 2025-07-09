import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About Us | TixFlow",
};

const About = () => {
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
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            ABOUT US.
          </h1>
        </div>

        {/* Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="md:col-span-1">
            <nav className="space-y-2 text-sm">
              <div className="font-medium text-gray-800">Company Profile</div>
              <div className="font-medium text-gray-800">Our Team</div>
              <div className="font-medium text-gray-800">Media</div>
            </nav>
          </div>

          <div className="md:col-span-3 p-2">
            <div className="max-w-3xl">
              <p className="text-sm mb-6">
                TixFlow is a modern event management platform that simplifies
                the way people create, manage, and attend events. Since our
                inception, we’ve helped organizers launch thousands of
                successful events — from concerts and conferences to workshops
                and festivals.
              </p>
              <p className="text-sm mb-6">
                At TixFlow, we believe that great events start with great tools.
                That’s why we continuously innovate and improve our technology
                to make event planning seamless, efficient, and accessible. With
                our passionate team and user-focused platform, we empower
                organizers and engage attendees across the country.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-serif italic">
              <span className="text-5xl">“</span>
              <p className="my-4">
                We don’t just power events — we connect people, passions, and
                possibilities.
              </p>
              <div className="text-right">
                <span className="text-5xl">”</span>
              </div>
            </div>
            <p className="text-sm mt-2">— CEO, TixFlow</p>
          </div>
          <div>
            <Image
              src="/EO-GOAL.jpg"
              alt="TixFlow Vision"
              width={600}
              height={400}
              className="w-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/EO-TEAM.jpg"
              alt="TixFlow Team"
              width={500}
              height={500}
              className="w-full max-w-sm md:max-w-lg object-cover rounded-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              OUR TEAM.
            </h2>
            <div className="space-y-6 max-w-lg">
              <p className="text-sm text-gray-600">
                We are a team of passionate individuals driven by innovation and
                a shared mission: to deliver the best event experiences. From
                developers to support staff, we work together to ensure that
                organizers and attendees feel empowered, supported, and
                inspired.
              </p>
              <p className="text-sm text-gray-600">
                Our culture blends creativity, technology, and customer-centric
                values — allowing us to constantly raise the bar in event
                management.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold">5,000+</div>
                <div className="text-xs text-gray-500">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">1M+</div>
                <div className="text-xs text-gray-500">Tickets Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">98%</div>
                <div className="text-xs text-gray-500">
                  Customer Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">100+</div>
                <div className="text-xs text-gray-500">
                  Partners & Collaborators
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
