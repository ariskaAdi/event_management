"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { IUser } from "@/types/user";
import LoadingSpinner from "../atoms/loading-spinner";

const UserForm = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/get/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchedUser = res.data.user;
        setUser(fetchedUser);
        console.log("Fetched user:", fetchedUser);
        setLoading(false);
      })

      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!user) return <p className="p-4 text-red-500">User not found</p>;

  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto p-8">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-4">
          {/* Left: Profile Image */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border">
              <Image
                src={user.profilePicture || "undraw_avatar.svg"}
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          {/* Right: Form */}
          <div className="flex-1 space-y-4 lg:space-y-6">
            <div className="grid">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium mb-2 block">
                  Name
                </Label>
                <Input id="name" defaultValue={user.name} />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email}
                  className="pr-20"
                />
                <Badge
                  variant="secondary"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Verified</span>
                  <span className="sm:hidden">✓</span>
                </Badge>
              </div>
            </div>

            <div>
              <Label htmlFor="role" className="text-sm font-medium mb-2 block">
                Role
              </Label>
              <h1>{user.role}</h1>
            </div>

            <div className="grid ">
              <div>
                <Label htmlFor="bio" className="text-sm font-medium mb-2 block">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  defaultValue={user.bio || ""}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 lg:pt-6">
              <Button
                variant="outline"
                className="flex-1 bg-transparent order-2 sm:order-1">
                Discard Changes
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 order-1 sm:order-2">
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
