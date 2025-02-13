"use client"; // Ensure this is a Client Component

import { getAccessToken } from "@/utils/helper";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Import useState

const StartModal = ({ onClose, categoryId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartQuiz = async () => {
    const token = getAccessToken();

    if (!token) {
      setErrorMessage("You need to signin first.");

      setTimeout(() => {
        router.push("/signin");
      }, 1000);
      return;
    }

    setIsLoading(true);

    setCookie("categoryId", categoryId, { path: "/" });

    setTimeout(() => {
      router.push("/quiz");
    }, 1000);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1B0140] bg-opacity-90 z-50 flex justify-center items-center">
      <div className="bg-gradient-to-b from-[#4703A6] to-[#1B0140] py-16 px-4 border-2 border-white rounded-3xl shadow-custom1 w-[320px] mx-auto">
        {/* Display error message at the top */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-6">{errorMessage}</p>
        )}

        {/* Start popup */}
        {isLoading ? (
          <div className="flex justify-center items-center flex-col">
            <div className="animate-spin border-t-4  border-white border-solid w-6 h-6 rounded-full"></div>
            <p className="text-center mt-4 font-passionOne text-white text-2xl">
              Loading..
            </p>
          </div>
        ) : (
          <div>
            <p className="font-passionOne text-center text-[32px]/9 font-bold text-white mb-6">
              Are You Ready?
            </p>

            <div className="flex justify-center items-center">
              {/* "Let's start" button */}
              <button
                onClick={handleStartQuiz}
                className="text-white text-[22px]/6 mr-2 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne py-2 px-6 block rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Let’s start
              </button>

              {/* "Close" button */}
              <button
                onClick={handleClose}
                className="text-white text-[22px]/6 bg-[#fd5d5d] border-2 border-[#ff9494] uppercase font-passionOne py-2 px-6 block rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartModal;
