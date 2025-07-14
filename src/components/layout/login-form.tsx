"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
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
      const token = data.token;
      if (!token) {
        setError("Token not found in response");
        return;
      }

      localStorage.setItem("token", token);
      router.push("/");
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <Label htmlFor="email" className="text-gray-600 text-sm">
            Email Address
          </Label>
          <Input
            required
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
              required
              value={password}
              type={showPassword ? "text" : "password"}
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
          disabled={loading}
          type="submit">
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative"></div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 ">
          don&apos;t have an account?
          <Link
            href="/auth/signUp"
            className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
