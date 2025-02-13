"use client";

import { PAYMENT } from "@/config/constants/apiConstants";
import apihelper from "@/utils/apiHelper";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { GoCheck } from "react-icons/go";
import Image from "next/image";
import { useState } from "react";

const SubscriptionPackageCard = ({ packages, error }) => {
  console.log("🚀 ~ SubscriptionPackageCard ~ packages:", packages.length)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle payment submission
  const submitPayment = async (packageId) => {
    const storedUserData = getCookie("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    if (!parsedUserData || !parsedUserData.msisdn) {
      setMessage("User not found. Please log in again.");
      router.push("/signin");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apihelper.post(PAYMENT, {
        planId: packageId,
        paymentChannelId: 1,
        msisdn: parsedUserData.msisdn,
      });

      if (response.success && response.statusCode === 200) {
        if (response.data.redirectUrl) {
          router.push(response.data.redirectUrl);
        } else {
          setMessage("Invalid redirect URL from server.");
        }
      } else if (response.error) {
        setMessage(response.error.data.message);
      } else {
        setMessage(response.message || "Payment error.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center my-2">{error}</p>}

      {/* Display success or error message */}
      {message && (
        <p
          className={`text-center my-2 ${
            message.includes("error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      {packages?.map((packageItem) => (
        <div className="px-4 my-8" key={packageItem.id}>
          <div className="bg-gradient-to-r from-[#FFC003] from-10% to-[#FFC003] to-100% p-4 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="bg-white px-4 inline rounded-[6px] py-1 text-xs">
                  {packageItem.name}
                </p>
                <h3 className="font-passionOne text-white text-[28px] leading-[30px] mt-[10px]">
                  Get Subscription
                </h3>
                <p className="flex items-center text-xs gap-3">
                  <GoCheck />
                  <span>Unlimited Game play</span>
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  width={40}
                  height={30}
                  src="/assets/images/icons/crown_icon.svg"
                  alt=""
                />
                <p className="font-passionOne text-white font-bold text-[30px] leading-[33px]">
                  ৳{packageItem.amount}
                </p>
              </div>
            </div>
            <button
              onClick={() => submitPayment(packageItem.id)}
              disabled={isSubmitting} // Disable the button when submitting
              className={`w-full font-passionOne text-[18px] leading-[20px] py-[10px] rounded-xl mt-[10px] drop-shadow-md ${
                isSubmitting ? "bg-[#ffc830]" : "bg-[#F9DB89]"
              }`}
            >
              {isSubmitting ? "Processing..." : "Click here"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPackageCard;
