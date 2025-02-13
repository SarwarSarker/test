"use client";

import ScoreChart from "@/components/chart/scoreChart";
import Link from "next/link";
import { PAYMENT_CHANNEL, GET_PROFILE } from "@/config/constants/apiConstants";
import { useEffect, useState } from "react";
import useApiFetch from "@/hooks/useApiFetch";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Loader from "@/components/loader/loader";
import { setCookie } from "cookies-next";
const ProfileDetails = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useApiFetch(GET_PROFILE);
  const {
    data: paymentChannel,
    isLoading: channelLoading,
    error: channelError,
  } = useApiFetch(PAYMENT_CHANNEL);

  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState(null);

  useEffect(() => {
    if (userData) {
      setCookie("userData", JSON.stringify(userData), { path: "/" });
    }
  }, [userData]);

  // Loading and error handling
  if (userLoading || channelLoading) {
    return <Loader />; // Show a loader component while data is loading
  }

  if (userError || channelError) {
    return (
      <p className="pt-5 text-white">
        An error occurred while loading data. Please try again later.
      </p>
    );
  }

  const handlePaymentChange = (e) => {
    setSelectedPaymentChannel(e.target.value);
  };

  return (
    <div className="">
      <Link
        href="/my-account/edit"
        className="block mb-4 text-[#FFC003] underline text-base font-lato font-bold text-end"
        prefetch={false}
      >
        Edit Profile
      </Link>

      <div className="flex flex-col items-center w-full gap-[12px] mb-9">
        {/* Name */}
        <div className="w-full">
          <label className="font-poppins text-sm font-normal text-white">
            Your name
          </label>
          <div className="mt-[10px] px-[17px] py-[13px] border border-[#0D7BFC33] rounded-2xl bg-[#FFFFFF0F]">
            <p className="text-sm py-[9px] text-white min-h-9">
              {userData?.name || (
                <span className="text-[#FFFFFF80] font-poppins text-sm font-normal">
                  Your Name
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="w-full">
          <label className="font-poppins text-sm font-normal text-white">
            Phone Number
          </label>
          <div className="mt-[10px] px-[17px] py-[13px] border border-[#0D7BFC33] rounded-2xl bg-[#FFFFFF0F]">
            <p className="text-sm py-[9px] text-white min-h-9">
              {userData?.msisdn ? (
                `+${userData?.msisdn}`
              ) : (
                <span className="text-[#FFFFFF80] font-poppins text-sm font-normal">
                  Phone Number
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="font-poppins text-sm font-normal text-white">
            Email
          </label>
          <div className="mt-[10px] px-[17px] py-[13px] border border-[#0D7BFC33] rounded-2xl bg-[#FFFFFF0F]">
            <p className="text-sm py-[9px] text-white min-h-9">
              {userData?.email || (
                <span className="text-[#FFFFFF80] font-poppins text-sm font-normal">
                  Email
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Payment Channel */}
        <div className="w-full px-[17px] py-[13px] flex justify-between items-center border border-[#0D7BFC33] rounded-2xl bg-[#FFFFFF0F]">
          <p className="text-sm py-[9px] text-white min-h-9">Default Payment</p>
          <select
            name="payment"
            value={selectedPaymentChannel || ""}
            onChange={handlePaymentChange}
            className="bg-[#EF5A29] border-0 text-xs text-white outline-none rounded-md p-2"
          >
            {paymentChannel?.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subscription Status */}
        <Link
          href="/subscription-status"
          className="w-full px-4 py-3  border-2 border-[#949EFF33] rounded-xl bg-[#5D6CFD33]"
          prefetch={false}
        >
          <div className="flex justify-center items-center">
            <p className="text-sm text-white ">Subscription Status</p>
            <MdOutlineKeyboardArrowRight className="text-white text-2xl" />
          </div>
        </Link>
      </div>

      {/* Score Chart */}
      {userData?.report ? (
        <div className="w-full max-w-2xl mx-auto p-[22px] bg-white rounded-lg shadow-lg mb-4">
          <ScoreChart stats={userData?.report} />
        </div>
      ) : (
        <p>Loading...</p> // Placeholder if report is not available
      )}
    </div>
  );
};

export default ProfileDetails;
