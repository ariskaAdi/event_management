import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <div className="text-2xl p-6">page {params.id}</div>;
};

export default page;
