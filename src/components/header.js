"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MENU } from "@/config/menu.config";
import ProfileMenu from "./menu/profileMenu";
import LogoutModal from "./modal/logoutModal";
import { useAppSelector } from "@/GlobalRedux/hooks";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNavChange = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <div className="pt-5">
      <div
        className={`${
          showNav ? "hidden" : "block"
        } flex justify-between items-center px-4`}
      >
        <button
          className="bg-[#2D205480] border border-[#3F2E72] p-4 rounded-2xl"
          onClick={handleNavChange}
        >
          <Image
            src="/assets/images/icons/hambarger.svg"
            height={30}
            width={25}
            alt=""
          />
        </button>

        <ProfileMenu />
      </div>
      <AnimatePresence>
        {showNav && (
          <motion.div
            id="mobileMenu"
            className={`${
              showNav ? "block" : "hidden"
            } w-full h-full mx-auto text-center z-50 top-0 absolute bg-[url('/assets/images/background.jpg')] px-4 py-8`}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-[#2D205480] border border-[#3F2E72] p-4 rounded-2xl"
                onClick={handleNavChange}
              >
                <FaChevronLeft className="w-6 h-6 text-white" />
              </button>

              <h3 className="font-bold text-2xl text-white">Menu</h3>
              <p></p>
            </div>
            <div className="flex flex-col items-center w-full gap-[12px]">
              {MENU.map((menu, index) => (
                <Link
                  href={menu.path}
                  className="w-full flex justify-between items-center text-white cursor-pointer border border-[#0D7BFC33] rounded-2xl py-4 px-4 transition duration-300 "
                  key={index}
                  prefetch={false}
                >
                  <div className="flex justify-center items-center gap-4">
                    <Image src={menu.icon} width={28} height={28} alt="icon" />
                    <span>{menu.title}</span>
                  </div>
                  <FaChevronRight className="w-5 h-5 text-white" />
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleOpen}
                    className="w-full flex justify-between items-center text-white cursor-pointer border border-[#0D7BFC33] rounded-2xl py-4 px-4 transition duration-300 "
                  >
                    <div className="flex justify-center items-center gap-4">
                      <Image
                        src="/assets/images/icons/Enter.svg"
                        width={28}
                        height={28}
                        alt="icon"
                      />
                      <span>Logout</span>
                    </div>
                    <FaChevronRight className="w-5 h-5 text-white" />
                  </button>

                  {isVisible && <LogoutModal handleClose={handleClose} />}
                </>
              ) : (
                <Link
                  href="/signin"
                  className="w-full flex justify-between items-center text-white cursor-pointer border border-[#0D7BFC33] rounded-2xl py-4 px-4 transition duration-300 "
                  prefetch={false}
                >
                  <div className="flex justify-center items-center gap-4">
                    <Image
                      src="/assets/images/icons/Enter.svg"
                      width={28}
                      height={28}
                      alt="icon"
                    />
                    <span>Login/sign-in</span>
                  </div>
                  <FaChevronRight className="w-5 h-5 text-white" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
