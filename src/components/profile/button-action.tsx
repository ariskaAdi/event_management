"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: number;
};

export const DeleteEventButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`);

      // Pakai transition untuk smooth re-render & push
      startTransition(() => {
        router.refresh(); // Refresh data
        router.push("/dashboard/manage"); // Redirect
      });

      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-red-500 hover:text-white"
      onClick={handleDelete}
      disabled={isPending}>
      <Trash className="w-4 h-4" />
    </Button>
  );
};
