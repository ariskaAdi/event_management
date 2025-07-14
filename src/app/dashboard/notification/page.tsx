import PaymentList from "@/components/profile/payment-list";
import { ChevronRight } from "lucide-react";
import React from "react";

const NotificationPayment = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Payment List
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span>Organizer</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-purple-600">Events</span>
            </div>
          </div>

          <div className="flex items-center space-x-4"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <PaymentList />
      </div>
    </div>
  );
};

export default NotificationPayment;
