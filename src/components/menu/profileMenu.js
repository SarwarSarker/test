"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import LogoutModal from "../modal/logoutModal";
import { useState } from "react";
import { useAppSelector } from "@/GlobalRedux/hooks";

const ProfileMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <div>
        <button
          onClick={handleShow}
          className="bg-[#2D205480] border border-[#3F2E72] p-4 rounded-full relative"
        >
          <FaUser className="w-6 h-6 text-white" />
        </button>
        {isShow && (
          <div className="absolute z-50 right-4 block rounded-lg bg-[#4f2cb7] text-white p-2 w-36">
            <Link
              className="block hover:bg-blue-100 font-poppins p-2 hover:text-[#3F2E72] rounded text-sm cursor-pointer"
              href="/my-account"
              prefetch={false}
            >
              My Account
            </Link>

            {isAuthenticated ? (
              <p
                onClick={handleOpen}
                className="block hover:bg-blue-100 font-poppins p-2 hover:text-[#3F2E72] rounded text-sm cursor-pointer"
              >
                Logout
              </p>
            ) : (
              <Link
                className="block hover:bg-blue-100 font-poppins p-2 hover:text-[#3F2E72] rounded text-sm cursor-pointer"
                href="/signin"
                prefetch={false}
              >
                SignIn
              </Link>
            )}
          </div>
        )}
      </div>
      {isVisible && <LogoutModal handleClose={handleClose} />}
    </>
  );
};

export default ProfileMenu;
