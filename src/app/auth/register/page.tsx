import Image from "next/image";
import RegisterForm from "@/components/layout/register-form";

export default function Register() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover z-0"
          priority
        />

        <div className="absolute inset-0 bg-black/10 z-10"></div>

        <div className="relative flex flex-col justify-between px-20 text-white py-20 h-full">
          <div className="text-4xl font-bold tracking-tight text-white">
            TixFlow.
          </div>

          <div className="">
            <h1 className="text-white text-4xl md:text-4xl font-bold leading-tight mb-4">
              Manage Events. Sell Tickets. <br className=" md:block" />
              <span className="text-amber-400 ">Flow Seamlessly.</span>
            </h1>

            <p className="text-white text-lg italic leading-relaxed max-w-xl mx-auto ">
              Platform terpercaya untuk kelola acara dan penjualan tiket tanpa
              ribet.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8   bg-grey-100  relative overflow-hidden">
        <div className="w-full max-w-md">
          {/* Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
