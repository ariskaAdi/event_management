import LoginForm from "@/components/layout/login-form";
import React from "react";

const SignIn = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="relative h-screen bg-cover bg-cente flex items-center justify-center "
        style={{
          backgroundImage: "url(/hero.jpg)",
        }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl"></div>
        <div className="relative z-10 w-full max-w-md px-4 mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default SignIn;
