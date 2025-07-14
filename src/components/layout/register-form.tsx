"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = res;
      console.log("Login response:", data);

      router.push("/auth/signIn");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register</h2>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <Label htmlFor="fullName" className="text-gray-600 text-sm">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={name}
            className="mt-1 h-12 border-gray-200 rounded-lg"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-600 text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            className="mt-1 h-12 border-gray-200 rounded-lg"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-600 text-sm">
            Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              className="h-12 border-gray-200 rounded-lg pr-10"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium mt-6"
          type="submit"
          disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative"></div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <Link
            href="/auth/signIn"
            className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
