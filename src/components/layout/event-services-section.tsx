import { Calendar, Users, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function EventServicesSection() {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image Illustration */}
          <div className="flex justify-center">
            <Image
              src="/undraw_celebration.svg"
              alt="Event planning illustration"
              width={500}
              height={500}
              className="w-full max-w-md md:max-w-lg"
              priority
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              POWER UP YOUR EVENTS
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Manage events effortlessly with TixFlow
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              TixFlow is your all-in-one solution for creating, managing, and
              growing unforgettable events — whether online or offline. From
              smart planning to real-time insights, we empower organizers to
              take full control.
            </p>

            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 cursor-pointer rounded-4xl"
              asChild>
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
          {/* Smart Planning */}
          <div className="bg-amber-600 text-white p-6 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Smart Event Planning
              </h3>
              <p className="text-amber-100 text-sm">
                Plan, schedule, and manage events using intuitive and
                intelligent tools built into TixFlow.
              </p>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
          </div>

          {/* Guest Management */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Guest Management
            </h3>
            <p className="text-gray-600 text-sm">
              Handle RSVPs, check-ins, and attendee communication seamlessly in
              one platform.
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Live Event Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor ticket sales, engagement, and performance with real-time
              dashboards and reports.
            </p>
          </div>

          {/* Security */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600 text-sm">
                  Built with enterprise-grade security and privacy standards to
                  protect your events and data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
