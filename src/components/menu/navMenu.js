"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

const NavMenu = ({ name }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-5">
        <button
          className="bg-[#2D205480] border border-[#3F2E72] p-4 rounded-2xl"
          onClick={goBack}
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>

        <h3 className="font-bold text-2xl text-white capitalize">{name}</h3>
        <p></p>
      </div>
    </div>
  );
};

export default NavMenu;
