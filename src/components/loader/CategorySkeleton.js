import React from "react";

const CategorySkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-[6px] animate-pulse">
        <div className="w-full h-[150px] rounded-[20px] bg-[#3F2E72]"></div>
        <div className="h-4 w-3/4 bg-[#3F2E72] rounded"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
