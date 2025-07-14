import VoucherForm from "@/components/profile/voucher-form";
import React from "react";

const VoucherEvent = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Voucher for Event</h1>
      <VoucherForm />
    </div>
  );
};

export default VoucherEvent;
