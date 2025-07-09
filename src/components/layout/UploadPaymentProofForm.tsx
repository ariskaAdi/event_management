"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  transactionId: number;
  onSuccess: () => void;
}

export default function UploadPaymentProofForm({
  transactionId,
  onSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Please select an image");

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("paymentProof", file);

      const token = localStorage.getItem("token");

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/payment-proof/${transactionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment proof uploaded successfully!");
      onSuccess();
      router.push("/payment?status=WAITING_CONFIRMATION");
    } catch (err) {
      console.error(err);
      setError("Failed to upload payment proof.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-500 text-white py-2 px-4 rounded-2xl hover:bg-amber-600 disabled:opacity-50">
          {isSubmitting ? "Uploading..." : "Submit Proof"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {file && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <Image
            src={URL.createObjectURL(file)}
            alt="Payment Preview"
            width={120}
            height={80}
            className="rounded border"
          />
        </div>
      )}
    </form>
  );
}
