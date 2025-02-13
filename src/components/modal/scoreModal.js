"use client";

import Image from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ScoreModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="flex flex-col justify-center items-center relative">
          <RxCross2
            className="h-8 w-8 text-white absolute top-0 right-4 cursor-pointer"
            onClick={handleClose}
          />
          <div className="-mb-6 z-50">
            <Image
              src="assets/images/icons/scorecard.svg"
              width={229}
              height={142}
              alt="Scorecard Icon"
              className=""
            />
          </div>
          <div className="bg-[#F97F40] text-white rounded-2xl pt-[46px] pb-6 px-8 w-[270px] mx-auto z-10">
            <div className="bg-[#F85E2A] border-2 border-white p-4 rounded-xl mb-6 shadow-custom">
              <p className="text-white text-[18px]/4 font-passionOne text-center tracking-wide">
                "Brilliance Unleashed! A true master of skill and strategy!"
              </p>
            </div>

            <div className="">
              <div className="flex justify-between border-b border-[#FFFFFF1A] py-3 text-white text-[18px]/4 font-passionOne text-center tracking-wide">
                <p>Total Score</p>
                <p>20</p>
              </div>
              <div className="flex justify-between border-b border-[#FFFFFF1A] py-3 text-white text-[18px]/4 font-passionOne text-center tracking-wide">
                <p>Correct Answer</p>
                <p>20</p>
              </div>
              <div className="flex justify-between py-3 text-white text-[18px]/4 font-passionOne text-center tracking-wide">
                <p>Average Time</p>
                <p>10 min</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreModal;
