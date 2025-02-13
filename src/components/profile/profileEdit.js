"use client";

import NavMenu from "@/components/menu/navMenu";
import PrivateRoute from "@/components/privateRoute";
import {
  PAYMENT_CHANNEL,
  UPDATE_PROFILE,
} from "@/config/constants/apiConstants";
import useApiFetch from "@/hooks/useApiFetch";
import apihelper from "@/utils/apiHelper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [paymentChannel, setPaymentChannel] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({}); // For field-specific errors
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { data: paymentChannels } = useApiFetch(PAYMENT_CHANNEL);

  const [storedUserData, setStoredUserData] = useState({});

  useEffect(() => {
    const storedData = getCookie("userData");
    if (storedData) {
      const parsedUserData = JSON.parse(storedData);
      setStoredUserData(parsedUserData);
      setName(parsedUserData.name || "");
      setEmail(parsedUserData.email || "");
      setPaymentChannel(parsedUserData.default_payment_channel || "");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim() && storedUserData.name) {
      newErrors.name = "Name cannot be empty.";
    }

    if (storedUserData.email && !email.trim()) {
      newErrors.email = "Email cannot be empty.";
    } else if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please provide a valid email.";
    }

    if (!paymentChannel && storedUserData.default_payment_channel) {
      newErrors.paymentChannel = "Payment channel cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    setIsSubmitting(true);
    setMessage(""); // Reset message

    const payload = {};
    if (name && name !== storedUserData.name) payload.name = name;
    if (
      paymentChannel &&
      paymentChannel !== storedUserData.default_payment_channel
    )
      payload.defaultPaymentChannel = paymentChannel;
    if (email && email !== storedUserData.email) payload.email = email;

    try {
      const response = await apihelper.put(UPDATE_PROFILE, payload);

      if (response.success && response.statusCode === 200) {
        setMessage("Profile updated successfully!");

        setTimeout(() => {
          router.push("/my-account");
        }, 1000);
      } else {
        setMessage(response.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      updateProfile();
    }
  };

  const isFormEmpty =
    name === storedUserData.name &&
    email === storedUserData.email &&
    paymentChannel === storedUserData.default_payment_channel;

  return (
    <div>

      {/* Success or Error Message */}
      {message && (
        <p
          className={`text-center my-4 ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      <form
        action="#"
        className="flex flex-col items-center w-full gap-3 mb-9"
        onSubmit={handleSubmit}
      >
        {/* Name Input */}
        <input
          type="text"
          className="block w-full py-6 px-4 border border-[#0D7BFC33] bg-transparent outline-none rounded-xl text-slate-200 placeholder:text-[#FFFFFF80]"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        {/* Payment Channel Select */}
        <div className="flex justify-between w-full py-4 px-4 border border-[#0D7BFC33] bg-transparent outline-none rounded-xl text-slate-200 placeholder:text-[#FFFFFF80]">
          <p className="text-sm py-[9px] text-white min-h-9">Default Payment</p>
          <select
            className="bg-[#EF5A29] border-0 text-xs text-white outline-none rounded-md p-2"
            value={paymentChannel}
            onChange={(e) => setPaymentChannel(e.target.value)}
          >
            <option value="">Select Payment Channel</option>
            {paymentChannels?.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </div>
        {errors.paymentChannel && (
          <p className="text-red-500 text-xs">{errors.paymentChannel}</p>
        )}

        {/* Email Input */}
        <input
          type="email"
          className="block w-full py-6 px-4 border border-[#0D7BFC33] bg-transparent outline-none rounded-xl text-slate-200 placeholder:text-[#FFFFFF80]"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isFormEmpty}
          className={`border ${isSubmitting || isFormEmpty ? "cursor-not-allowed" : ""} border-white font-bold text-slate-200 py-2 px-4 rounded-md mt-5 hover:text-black hover:bg-white`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit