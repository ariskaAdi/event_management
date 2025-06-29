import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const UserForm = () => {
  return (
    <div className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Profile Image (Mobile: Top, Desktop: Left) */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border">
              <Image
                src="/profile-placeholder.png" // Ganti sesuai kebutuhan
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
            {/* Gender */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Gender</Label>
              <RadioGroup className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium mb-2 block">
                  First Name
                </Label>
                <Input id="firstName" defaultValue="Roland" />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium mb-2 block">
                  Last Name
                </Label>
                <Input id="lastName" defaultValue="Donald" />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  defaultValue="roland.donald@gmail.com"
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

            {/* Address */}
            <div>
              <Label
                htmlFor="address"
                className="text-sm font-medium mb-2 block">
                Address
              </Label>
              <Input id="address" defaultValue="3605 Parker Rd." />
            </div>

            {/* Phone & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium mb-2 block">
                  Phone Number
                </Label>
                <Input id="phone" defaultValue="(405) 555-0128" />
              </div>
              <div>
                <Label htmlFor="dob" className="text-sm font-medium mb-2 block">
                  Date of Birth
                </Label>
                <Input id="dob" defaultValue="1 Feb, 1995" />
              </div>
            </div>

            {/* Location & Postal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label
                  htmlFor="location"
                  className="text-sm font-medium mb-2 block">
                  Location
                </Label>
                <Select defaultValue="atlanta">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atlanta">Atlanta, USA</SelectItem>
                    <SelectItem value="newyork">New York, USA</SelectItem>
                    <SelectItem value="losangeles">Los Angeles, USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="postal"
                  className="text-sm font-medium mb-2 block">
                  Postal Code
                </Label>
                <Input id="postal" defaultValue="30301" />
              </div>
            </div>

            {/* Buttons */}
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
