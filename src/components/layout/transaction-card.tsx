"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const steps = [
  { id: 1, name: "Order", completed: true },
  { id: 2, name: "Shipping", completed: true },
  { id: 3, name: "Payment", completed: false, current: true },
  { id: 4, name: "Review", completed: false },
];

const items = [
  {
    id: 1,
    name: "Basic",
    description: "Casual Sneaker",
    color: "White",
    size: "41",
    price: 100,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Basic",
    description: "Casual T-Shirt",
    color: "Black",
    size: "L",
    price: 100,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function TransactionCard() {
  const [cartItems, setCartItems] = useState(items);
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 20;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.current
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                    {step.id}
                  </div>
                  <span className="mt-2 text-sm text-gray-600">
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-px bg-gray-300 mx-4 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Items and Order Summary */}
          <div className="space-y-6">
            {/* Items Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Items ({cartItems.length} Items)
                  </h2>
                  <button className="text-red-500 text-sm hover:text-red-600">
                    Remove all
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Color: {item.color} | Size: {item.size}
                        </p>

                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center hover:bg-blue-200">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center hover:bg-blue-200">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-gray-900">-${discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        Total Price
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${total}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Checkout Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Checkout
                </h2>

                {/* Payment Method Icons */}
                <div className="flex space-x-3 mb-6">
                  <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="cardholder"
                      className="text-sm font-medium text-gray-700">
                      Cardholder name
                    </Label>
                    <Input
                      id="cardholder"
                      type="text"
                      className="mt-1"
                      value={formData.cardholderName}
                      onChange={(e) =>
                        handleInputChange("cardholderName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="cardnumber"
                      className="text-sm font-medium text-gray-700">
                      Card number
                    </Label>
                    <Input
                      id="cardnumber"
                      type="text"
                      className="mt-1"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="expiration"
                        className="text-sm font-medium text-gray-700">
                        Expiration date
                      </Label>
                      <Input
                        id="expiration"
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1"
                        value={formData.expirationDate}
                        onChange={(e) =>
                          handleInputChange("expirationDate", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cvc"
                        className="text-sm font-medium text-gray-700">
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        type="text"
                        placeholder="123"
                        className="mt-1"
                        value={formData.cvc}
                        onChange={(e) =>
                          handleInputChange("cvc", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 mt-6">
                    Pay now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
