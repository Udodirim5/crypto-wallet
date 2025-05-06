import React from "react";

const Skeleton = () => {
  return Array.from({ length: 9 }).map((_, index) => (
    <div
      key={index}
      className="flex items-center px-10 py-4 border-b border-[#1e2322] animate-pulse"
    >
      <div className="w-8 h-8 rounded-full bg-[#1e2322] mr-3" />
      <div className="flex-1 space-y-1">
        <div className="h-4 bg-[#1e2322] rounded w-3/4"></div>
        <div className="h-3 bg-[#1e2322] rounded w-1/2"></div>
      </div>
      <div className="text-right space-y-1">
        <div className="h-4 bg-[#1e2322] rounded w-16 ml-auto"></div>
        <div className="h-3 bg-[#1e2322] rounded w-12 ml-auto"></div>
      </div>
    </div>
  ));
};

export default Skeleton;
