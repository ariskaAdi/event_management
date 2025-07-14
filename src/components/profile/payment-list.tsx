"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../atoms/loading-spinner";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types/tx-organizer";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, X, ZoomIn } from "lucide-react";

// Fallback Image Component
const PaymentImageWithFallback = ({ imageUrl }: { imageUrl: string }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  return (
    <Image
      src={imgSrc}
      alt="Payment Proof Preview"
      fill
      className="object-cover"
      sizes="64px"
      onError={() => setImgSrc("/placeholder.svg")}
    />
  );
};

const PaymentList = () => {
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    transactionId: number;
    userName: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchAllTransaction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransaction(res.data.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTransaction();
  }, [token]);

  const handleImageClick = (
    imageUrl: string,
    transactionId: number,
    userName: string
  ) => {
    setSelectedImage({
      url: imageUrl,
      transactionId,
      userName,
    });
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (
    id: number,
    action: "done" | "rejected"
  ) => {
    if (!token) return;

    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/admin/${id}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state after successful change
      setTransaction((prev) =>
        prev.map((tx) =>
          tx.id === id
            ? {
                ...tx,
                status: action.toUpperCase() as Transaction["status"],
              }
            : tx
        )
      );
    } catch (error) {
      console.error("Failed to update transaction status", error);
      alert("Failed to update transaction.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (selectedImage) {
      const link = document.createElement("a");
      link.href = selectedImage.url;
      link.download = `payment-proof-${selectedImage.transactionId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">NAME</th>
              <th className="px-4 py-2 text-left">EMAIL</th>
              <th className="px-4 py-2 text-left">QUANTITY</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">PAYMENT PROOF</th>
              <th className="px-4 py-2 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{tx.id}</td>
                <td className="px-4 py-2">{tx.user.name}</td>
                <td className="px-4 py-2">{tx.user.email}</td>
                <td className="px-4 py-2">{tx.quantity}</td>
                <td className="px-4 py-2">{formatCurrency(tx.totalPaid)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === "DONE"
                        ? "bg-green-100 text-green-800"
                        : tx.status === "WAITING_PAYMENT" ||
                          tx.status === "WAITING_CONFIRMATION"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {tx.paymentProof ? (
                    <div className="relative group">
                      <div
                        className="relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-colors"
                        onClick={() =>
                          handleImageClick(
                            tx.paymentProof!,
                            tx.id,
                            tx.user.name
                          )
                        }>
                        <PaymentImageWithFallback imageUrl={tx.paymentProof} />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Click to view
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      <p className="text-xs text-gray-500 text-center">
                        No Proof
                      </p>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  {tx.status !== "DONE" &&
                  tx.status !== "REJECTED" &&
                  tx.status !== "EXPIRED" ? (
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="destructive"
                        onClick={() => handleUpdateStatus(tx.id, "rejected")}
                        disabled={loading}>
                        {loading ? "Rejecting..." : "Reject"}
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleUpdateStatus(tx.id, "done")}
                        disabled={loading}>
                        {loading ? "Confirming..." : "Confirm"}
                      </Button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-lg font-semibold">Payment Proof</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Transaction ID: {selectedImage?.transactionId} •{" "}
                  {selectedImage?.userName}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadImage}
                  className="flex items-center gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            {selectedImage && (
              <div className="relative w-full max-h-[70vh] overflow-hidden rounded-lg border">
                <Image
                  src={selectedImage.url}
                  alt="Payment Proof Full Size"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentList;
