"use client";

import Image from "next/image";
import { useState } from "react";
import StartModal from "../modal/startModal";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const CategoryCard = ({ categories = [], errorMessage = "" }) => {
  console.log("🚀 ~ CategoryCard ~ categories:", categories)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const router = useRouter();

  const handleCategoryClick = (e, item) => {
    e.preventDefault();
    if (item.has_subcategories !== 0) {
      setCookie("categoryId", item.id, { path: "/" });
      // Navigate to subcategories page
      router.push(`/categories/${item.slug}`);
    } else {
      // Open modal if no subcategories
      setSelectedCategoryId(item.id);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
  };

  const defaultImage = "/assets/images/banner.png";

  return (
    <>
      {isModalOpen && (
        <StartModal onClose={closeModal} categoryId={selectedCategoryId} />
      )}

      <div className="grid grid-cols-2 gap-x-[10px] gap-y-4 mb-5">
        {errorMessage ? (
          <p className="col-span-2 text-center text-lg text-red-500">
            {errorMessage}
          </p>
        ) : categories.length === 0 ? (
          <p className="col-span-2 text-center text-lg text-gray-500">
            No categories found.
          </p>
        ) : (
          categories.map((item) => (
            <button
              key={item.id}
              className="flex flex-col gap-[6px] cursor-pointer"
              onClick={(e) => handleCategoryClick(e, item)}
            >
              <Image
                width={300}
                height={300}
                src={item.image || defaultImage}
                alt={item.name}
                className="w-full h-[150px] rounded-[20px]"
                priority
                unoptimized
              />

              <p className="text-base font-semibold text-white">
                {item.name}
              </p>
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default CategoryCard;