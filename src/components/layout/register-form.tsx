"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register</h2>

      <form className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-600 text-sm">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            className="mt-1 h-12 border-gray-200 rounded-lg"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-600 text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            className="mt-1 h-12 border-gray-200 rounded-lg"
            placeholder="Enter your email"
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
              className="h-12 border-gray-200 rounded-lg pr-10"
              placeholder="Enter your password"
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

        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium mt-6">
          Sign Up
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or Sign Up With</span>
          </div>
        </div>

        {/* <div className="mt-4 flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-transparent">
                  <span className="text-red-500 font-bold">G</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-transparent">
                  <span className="text-blue-600 font-bold">f</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-transparent">
                  <span className="text-pink-500 font-bold">@</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-transparent">
                  <span className="text-blue-400 font-bold">t</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-transparent">
                  <span className="text-blue-700 font-bold">in</span>
                </Button>
              </div> */}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
