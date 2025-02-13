"use client"

import { useState, useEffect } from "react";
import UnsubscribeModal from "@/components/modal/unsubscribeModal";
import Link from "next/link";
import { getCookie } from "cookies-next";

const SubscriptionStatusCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [validTill, setValidTill] = useState(null);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client side

  let parsedUserData = null;
  const userData = getCookie("userData");

  if (userData) {
    parsedUserData = JSON.parse(userData);
  }

  useEffect(() => {
    // Set isClient to true after the component mounts
    setIsClient(true);

    if (parsedUserData?.subscription?.validTill) {
      const formattedDate = new Date(parsedUserData.subscription.validTill).toLocaleString();
      setValidTill(formattedDate);
    }
  }, [parsedUserData]);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMessage = (data) => {
    setMessage(data);
  };

  // If it's the client side, render the actual content
  if (!isClient) {
    return null; // or a loading spinner, or skeleton, etc.
  }

  return (
    <div>
      {message && (
        <p className="text-green-500 text-center text-sm mb-4">{message}</p>
      )}
      <div className="flex flex-col items-center w-full gap-[12px] mb-9">
        {parsedUserData ? (
          <>
            <div className="w-full px-[17px] py-[13px] border border-[#0D7BFC33] rounded-2xl bg-[#FFFFFF0F]">
              <p className="text-center text-sm py-[9px] text-white min-h-9">
                {`+${parsedUserData?.msisdn}`}
              </p>
            </div>

            <div className="w-full px-[17px] py-[13px] border border-[#0D7BFC33] rounded-2xl bg-[#FFFFFF0F]">
              <p className="text-center text-sm py-[9px] text-white min-h-9">
                Validity : {validTill || "N/A"}
              </p>
            </div>

            {parsedUserData?.subscription?.status ? (
              <>
                <button
                  onClick={handleOpen}
                  disabled={parsedUserData?.subscription?.status === "stopped"}
                  className={`w-full mt-6 px-4 py-3  border-2 border-[#949EFF] rounded-xl  ${
                    parsedUserData?.subscription?.status === "stopped"
                      ? "cursor-not-allowed bg-[#8d97f8]"
                      : "cursor-pointer bg-[#5D6CFD]"
                  }`}
                >
                  <p className="text-[22px]/6 uppercase text-white font-passionOne">
                    Unsubscription
                  </p>
                </button>

                {isVisible && (
                  <UnsubscribeModal
                    handleClose={handleClose}
                    handleMessage={handleMessage}
                  />
                )}
              </>
            ) : (
              <Link
                href="/subscription-package"
                className="text-white mb-6 text-center cursor-pointer text-[22px]/6 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne p-3 w-full block rounded-xl"
                prefetch={false}
              >
                Get Subscription
              </Link>
            )}
          </>
        ) : (
          <p className="text-white pt-10 font-poppins">
            No subscription data found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatusCard;
