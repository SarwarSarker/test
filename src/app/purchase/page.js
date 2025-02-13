"use client";

import { PAYMENT } from "@/config/constants/apiConstants";
import apihelper from "@/utils/apiHelper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Purchase = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const router = useRouter();

  const submitPayment = async () => {
    setErr("");
    setLoading(true);

    // Combined regex to handle both empty check and valid Grameenphone check
    const regex = /^(017|013)\d{8}$/;

    // Validate phone number with regex (checks for non-empty and valid Grameenphone number)
    if (!regex.test(phoneNumber)) {
      setErr("Please enter a valid Grameenphone number");
      setLoading(false);
      return;
    }

    const channelId = 1;

    try {
      const response = await apihelper.post(PAYMENT, {
        planId: 1,
        paymentChannelId: channelId,
        msisdn: phoneNumber,
      });

      if (response.success && response.statusCode === 200) {
        if (response.data.redirectUrl) {
          router.push(response.data.redirectUrl);
        } else {
          setErr("Invalid redirect URL from server.");
        }
      } else if (response.error) {
        setErr(response.error.data.message);
      } else {
        setErr(response.message);
      }
    } catch (error) {
      setErr("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
    setErr(null);
  };

  return (
    <>
      <div className="bg-[url('/assets/images/banner_spa.png')] h-[290px] bg-cover bg-no-repeat relative">
        <Image
          src="/assets/images/logo_spa.png"
          width={175}
          height={100}
          alt="logo_spa"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 h-[100px]"
        />
      </div>

      <form action="#" className="w-full p-4">
        <label className="text-white text-base font-semibold">
          Your Phone Number
        </label>
        <input
          type="text"
          className="block w-full py-4 px-4 mb-4 mt-2 border border-[#0D7BFC33] bg-transparent outline-none rounded-xl text-slate-200 placeholder:text-[#FFFFFF80]"
          placeholder="01xxxxxxxxx"
          value={phoneNumber}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitPayment();
          }}
          className="w-full rounded-xl font-passionOne border-2 bg-[#5D6CFD33] border-[#949EFF33] text-[#FFFFFF80] hover:text-white hover:bg-[#5D6CFD] hover:border-[#949EFF] px-6 py-3 text-xl font-medium uppercase"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
        {err && <p className="text-red-500 mt-2">{err}</p>}
      </form>

      <div className="mt-10 px-4">
        <p className="text-xs text-[#FFFFFF4D] font-poppins text-justify">
          Test your knowledge and challenge your mind with QuizMuiz – the
          ultimate quiz gaming experience! Whether you're a trivia enthusiast or
          a curious learner, QuizMuiz offers exciting challenges that keep you
          engaged and entertained. Sharpen your skills, compete with friends,
          and climb the leaderboard.
        </p>
        <p className="text-xs text-[#FFFFFF4D] font-poppins text-center mt-4">
          Subscribe now for only 5 BDT + SC
        </p>
      </div>
    </>
  );
};

export default Purchase;
