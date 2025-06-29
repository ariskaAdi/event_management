import ListEvent from "@/components/profile/list-event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const ManageEvent = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Events List
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span>Profile</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-purple-600">Events</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/dashboard/manage/create">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <ListEvent />
      </div>
    </div>
  );
};

export default ManageEvent;
