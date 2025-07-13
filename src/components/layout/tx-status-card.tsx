"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, XCircle, Ban, CheckCircle, AlertTriangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ITransaction, ITransactionStatus } from "@/types/transaction";
import CountdownTimer from "../atoms/CountdownTimer";
import UploadPaymentProofForm from "./UploadPaymentProofForm";

const statusConfig = {
  WAITING_PAYMENT: { label: "Waiting Payment", icon: Clock, color: "yellow" },
  WAITING_CONFIRMATION: {
    label: "Waiting Confirmation",
    icon: Clock,
    color: "yellow",
  },
  EXPIRED: { label: "Expired", icon: XCircle, color: "red" },
  CANCELED: { label: "Canceled", icon: Ban, color: "red" },
  DONE: { label: "Done", icon: CheckCircle, color: "green" },
  REJECTED: { label: "Rejected", icon: AlertTriangle, color: "red" },
};

export default function TransactionStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus =
    (searchParams.get("status") as ITransactionStatus) || "WAITING_PAYMENT";

  const [status, setStatus] = useState<ITransactionStatus>(initialStatus);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async (status: ITransactionStatus) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        {
          params: { status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (newStatus: ITransactionStatus) => {
    setStatus(newStatus);
    const params = new URLSearchParams(window.location.search);
    params.set("status", newStatus);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    fetchTransactions(status);
  }, [status]);

  return (
    <div className="w-full max-w-8xl mx-auto p-8">
      <Tabs
        value={
          (searchParams.get("status") as ITransactionStatus) ||
          "WAITING_PAYMENT"
        }
        onValueChange={(val) => handleStatusChange(val as ITransactionStatus)}>
        <TabsList className="grid grid-cols-6 w-full mb-4">
          {Object.entries(statusConfig).map(([key, conf]) => (
            <TabsTrigger key={key} value={key}>
              <conf.icon className="w-4 h-4 mr-1" />
              {conf.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={status}>
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">No transactions found.</p>
          ) : (
            <div className="space-y-6">
              {transactions.map((current) => (
                <Card key={current.id} className="p-6">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{current.event.title}</span>
                      <Badge
                        className={`flex items-center gap-1 bg-amber-50 text-${
                          statusConfig[current.status].color
                        }-500`}>
                        {current.status === "WAITING_PAYMENT" &&
                        current.expiredAt ? (
                          <>
                            <Clock className="h-3 w-3 text-yellow-500" />
                            <CountdownTimer
                              expiredAt={new Date(current.expiredAt)}
                            />
                          </>
                        ) : (
                          <>
                            {(() => {
                              const Icon = statusConfig[current.status].icon;
                              return <Icon className="h-3 w-3" />;
                            })()}
                            <span>{statusConfig[current.status].label}</span>
                          </>
                        )}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* LEFT */}
                      <div className="space-y-3 text-sm text-gray-700">
                        <p>
                          <strong>Customer:</strong> {current.user.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {current.user.email}
                        </p>
                        <p>
                          <strong>Location:</strong> {current.event.location}
                        </p>
                        <p>
                          <strong>Start:</strong>{" "}
                          {new Date(current.event.startDate).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                        <p>
                          <strong>End:</strong>{" "}
                          {new Date(current.event.endDate).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                        <p>
                          <strong>Ticket Price:</strong> Rp
                          {current.event.price.toLocaleString("id-ID")}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {current.quantity}
                        </p>
                      </div>

                      {/* RIGHT */}
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>
                            Rp
                            {(
                              current.quantity * current.event.price
                            ).toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Paid</span>
                          <span>
                            Rp{current.totalPaid.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transaction Date</span>
                          <span>
                            {new Date(current.createdAt).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-end">
                      {current.status === "WAITING_PAYMENT" && (
                        <UploadPaymentProofForm
                          transactionId={current.id}
                          onSuccess={() => fetchTransactions(status)}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
