"use client";

import { GET_PROFILE, OTP_VERIFY, REGISTER_USER } from "@/config/constants/apiConstants";
import { setUser } from "@/GlobalRedux/features/auth/authSlice";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import useApiFetch from "@/hooks/useApiFetch";
import apihelper from "@/utils/apiHelper";
import apiHelperWithoutToken from "@/utils/apiHelperWithoutToken";
import { validatePhoneNumber } from "@/utils/helper";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Signinform = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState({ d1: "", d2: "", d3: "", d4: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [countdown, setCountdown] = useState(60);

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Refs for OTP inputs
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [step, countdown]);

  const sendOTP = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErr("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    const response = await apiHelperWithoutToken.post(REGISTER_USER, {
      msisdn: phoneNumber,
    });
    setLoading(false);

    if (response.success && response.statusCode === 200) {
      setSuccessMessage(response.message);
      setStep(2);
      setErr();
    } else {
      setSuccessMessage();
      setErr(response.message || "Failed to send OTP. Please try again.");
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    const response = await apiHelperWithoutToken.post(OTP_VERIFY, {
      msisdn: phoneNumber,
      otp: otp.d1 + otp.d2 + otp.d3 + otp.d4,
    });
    setLoading(false);

    if (response.success && response.statusCode === 200) {
      dispatch(
        setUser({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
        })
      );
      setStep(3);
      fetchUser();
    } else {
      setSuccessMessage();
      setErr(response.message || "Invalid OTP. Please try again.");
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;

    if (/^\d?$/.test(value)) {
      const updatedOtp = { ...otp };
      updatedOtp[`d${index + 1}`] = value;
      setOtp(updatedOtp);

      // Move focus to the next input if a digit is entered
      if (value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].current.focus();
      }
    }

    // Handle back-navigation when pressing backspace in an empty input
    if (e.key === "Backspace" && value === "" && index > 0) {
      otpInputs[index - 1].current.focus();
    }
  };

  const fetchUser = async() => {
    const response = await apihelper.get(GET_PROFILE);

    if (response.success && response.statusCode === 200) {
      setCookie("userData", JSON.stringify(response.data), { path: "/" });
    } else {
      console.log(response.message || "Failed to get user.");
    }
  }

  const handleSubmit = () => {
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-center items-center h-[70vh]">
        <form action="#" className="w-full">
          {/* Step 1: Phone Number */}
          {step === 1 && (
            <>
              <label className="text-white text-base font-semibold">
                Your Phone Number
              </label>
              <input
                type="text"
                className="block w-full py-4 px-4 mb-4 mt-2 border border-[#0D7BFC33] bg-transparent outline-none rounded-xl text-slate-200 placeholder:text-[#FFFFFF80]"
                placeholder="01xxxxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  sendOTP();
                }}
                className="w-full rounded-xl font-passionOne border-2 bg-[#5D6CFD33] border-[#949EFF33] text-[#FFFFFF80] hover:text-white hover:bg-[#5D6CFD] hover:border-[#949EFF] px-6 py-2 text-xl font-medium uppercase"
              >
                {loading ? "Sending OTP..." : "NEXT"}
              </button>
              {err && <p className="text-red-500 mt-2">{err}</p>}
            </>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="w-full">
              <div className="text-green-500 py-4">{successMessage}</div>
              <div className="text-blue-200 text-xs mb-2">
                OTP code will expire in <span className="text-yellow-500 mx-1 text-sm">{countdown}</span> seconds
              </div>
              <label className="text-white text-base font-semibold">
                Fill the OTP
              </label>
              <div className="flex gap-2 text-center">
                {otpInputs.map((inputRef, index) => (
                  <input
                    key={index}
                    type="tel"
                    className="block w-full text-center py-4 px-4 mb-4 mt-2 border border-[#0D7BFC33] bg-transparent outline-none rounded-xl text-slate-200 placeholder:text-[#FFFFFF80]"
                    placeholder="0"
                    maxLength="1"
                    ref={inputRef}
                    value={otp[`d${index + 1}`]}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpChange(e, index)}
                  />
                ))}
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  verifyOTP();
                }}
                disabled={!Object.values(otp).every((value) => value !== "")}
                className={`w-full font-passionOne rounded-xl border-2 ${
                  Object.values(otp).every((value) => value !== "")
                    ? "bg-[#5D6CFD] border-[#949EFF] text-white hover:bg-[#4a5ccd]"
                    : "bg-[#5D6CFD33] border-[#949EFF33] text-[#FFFFFF80] cursor-not-allowed"
                } px-6 py-2 text-xl font-medium uppercase`}
              >
                {loading ? "Verifying OTP..." : "VERIFY"}
              </button>
              {err && <p className="text-red-500 mt-2">{err}</p>}
            </div>
          )}

          {/* Step 3: Success Message */}
          {step === 3 && (
            <div className="flex flex-col justify-center items-center rounded-[20px] gap-4 py-9 px-4 border bg-gradient-to-b from-[#4703A6] to-[#1B0140]">
              <Image
                src="/assets/images/loginsuccess.svg"
                width={172}
                height={147}
                alt="Success"
              />
              <p className="font-bold text-xl md:text-2xl font-passionOne text-center text-white">
                Successfully Login.
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="w-full font-passionOne rounded-xl border-2 text-white bg-[#5D6CFD] border-[#949EFF] px-6 py-2 text-xl font-medium uppercase"
              >
                DONE
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signinform