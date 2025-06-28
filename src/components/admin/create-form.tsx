"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // hanya untuk preview
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isFree) {
      formData.set("price", "0");
      formData.set("isPaid", "false");
    } else {
      formData.set("isPaid", "true");
    }

    try {
      setPending(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/event`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Success:", res.data);
      router.push("/manage");
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };
  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      onSubmit={handleSubmit}>
      <div className="lg:col-span-8 space-y-6">
        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.name} */}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
            rows={8}
            placeholder="Description"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.description} */}
            </span>
          </div>
        </div>
        {/* Category */}
        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.name} */}
            </span>
          </div>
        </div>
        {/* Location */}
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.name} */}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="datetime-local"
            name="startDate"
            className="w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <input
            type="datetime-local"
            name="endDate"
            className="w-full border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>
      </div>

      {/* file upload */}
      <div className="lg:col-span-4 space-y-6">
        {/* file */}
        <label
          htmlFor="input-file"
          className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10 text-gray-500">
            <CloudUpload className="w-8 h-8 mb-2" />
            <p className="text-xs">SVG, PNG, JPG or GIF (Max: 2MB)</p>
          </div>
          <input
            type="file"
            name="picture"
            id="input-file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-md aspect-video absolute brightness-75"
            />
          )}
        </label>

        <div>
          <input
            type="text"
            name="seats"
            placeholder="Capacity..."
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.capacity} */}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Switch checked={isFree} onCheckedChange={setIsFree} id="free" />
            <Label htmlFor="free">Free</Label>
          </div>
          <input
            type="number"
            name="price"
            placeholder="Price..."
            disabled={isFree}
            className="mt-2 w-full border border-gray-300 rounded-md p-2 bg-white"
          />

          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.price} */}
            </span>
          </div>
        </div>
        <div>
          <input
            type="text"
            name="organizerId"
            placeholder="Organizer ID..."
            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.name} */}
            </span>
          </div>
        </div>
        {/* general messages */}

        {/* Submit */}
        <Button
          className="w-full text-white rounded-md py-2 transition"
          type="submit"
          disabled={isPending}>
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
