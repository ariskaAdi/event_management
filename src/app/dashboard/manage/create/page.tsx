import CreateForm from "@/components/profile/create-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateEvent = () => {
  return (
    <div className="p-8 bg-gray-50">
      <div>
        <div className="mb-8 flex gap-4">
          <Button
            asChild
            className="rounded-full w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-200 text-black">
            <Link href="/dashboard/manage">
              <ArrowLeft className="w-5 h-5 " />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold ">Create New Event</h1>
        </div>
        <CreateForm />
      </div>
    </div>
  );
};

export default CreateEvent;
