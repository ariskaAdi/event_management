import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="col-span-3 flex justify-center items-center h-60">
      <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
