"use client";

import Image from "next/image";
import StartModal from "../modal/startModal";
import CategorySkeleton from "../loader/CategorySkeleton";
import { useState } from "react";

const SubCategoryCard = ({ subcategories, errorMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const defaultImage = "/assets/images/banner.png";

  const handleSubCategoryClick = (e, item) => {
    e.preventDefault();
    setSelectedSubCategoryId(item.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <StartModal onClose={closeModal} categoryId={selectedSubCategoryId} />
      )}

      {subcategories.length === 0 && !errorMessage ? (
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-4">
          {/* Render skeletons */}
          {[...Array(5)].map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-4 mb-5">
          {errorMessage ? (
            <p className="col-span-2 text-center text-lg text-red-500">
              {errorMessage}
            </p>
          ) : subcategories.length === 0 ? (
            <p className="col-span-2 text-center text-lg text-gray-500">
              No subcategories found.
            </p>
          ) : (
            subcategories.map((item) => (
              <button
                className="flex flex-col gap-[6px] cursor-pointer"
                key={item.id}
                onClick={(e) => handleSubCategoryClick(e, item)}
              >
                <Image
                  width={300}
                  height={300}
                  src={item.image || defaultImage}
                  alt={item.name || "Category Image"}
                  className="w-full h-[150px] rounded-[20px]"
                  priority
                  unoptimized
                />
                <p className="text-base font-semibold text-white">{item.name}</p>
              </button>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SubCategoryCard;
