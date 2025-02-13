"use client";

import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa6";

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBackClick}
      className="bg-[#2D205480] border border-[#3F2E72] p-4 rounded-2xl"
    >
      <FaChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
};

export default BackButton;
