"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { EventData } from "@/types/eventData";
import { JwtPayload } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "../atoms/loading-spinner";

const EditForm = () => {
  const { id: eventId } = useParams();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [isPending, setPending] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [organizerId, setOrganizerId] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      const decoded: JwtPayload = jwtDecode(storedToken);
      setOrganizerId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    if (!eventId) return;
    const fetchEvent = async () => {
      try {
        setPending(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}`
        );
        setEventData(res.data.result);
        setIsFree(res.data.event.price === 0);
        setPreview(res.data.event.picture || null);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/dashboard/manage");
      console.log("Success:", res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  if (!eventData) return <LoadingSpinner />;

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      onSubmit={handleSubmit}>
      <div className="lg:col-span-8 space-y-6">
        <input
          type="text"
          name="title"
          defaultValue={eventData.title}
          placeholder="Event Title"
          className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
        />
        <textarea
          name="description"
          defaultValue={eventData.description}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
          rows={8}
          placeholder="Description"
        />
        <select
          name="category"
          defaultValue={eventData.category}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white">
          <option value="" disabled>
            Select category
          </option>
          <option value="MUSIC">Music</option>
          <option value="SPORTS">Sports</option>
          <option value="EDUCATION">Education</option>
          <option value="WORKSHOP">Workshop</option>
          <option value="BUSINESS">Business</option>
          <option value="TECHNOLOGY">Technology</option>
          <option value="ART">Art</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="text"
          name="location"
          defaultValue={eventData.location}
          placeholder="Location"
          className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="datetime-local"
            name="startDate"
            defaultValue={eventData.startDate.slice(0, 16)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <input
            type="datetime-local"
            name="endDate"
            defaultValue={eventData.endDate.slice(0, 16)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
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

        <input
          type="text"
          name="seats"
          defaultValue={eventData.seats.toString()}
          placeholder="Capacity..."
          className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
        />

        <div>
          <div className="flex items-center space-x-2">
            <Switch checked={isFree} onCheckedChange={setIsFree} id="free" />
            <Label htmlFor="free">Free</Label>
          </div>
          <input
            type="number"
            name="price"
            defaultValue={eventData.price}
            disabled={isFree}
            placeholder="Price..."
            className="mt-2 w-full border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>
        <div>
          <input
            type="text"
            name="organizerId"
            value={organizerId || ""}
            readOnly
            placeholder="Organizer ID..."
            className=" hidden"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {/* {state?.error?.name} */}
            </span>
          </div>
        </div>

        <Button
          className="w-full text-white rounded-md py-2"
          type="submit"
          disabled={isPending}>
          {isPending ? "Updating..." : "Update Event"}
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
