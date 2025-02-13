import { UNSUBSCRIBE } from "@/config/constants/apiConstants";
import apihelper from "@/utils/apiHelper";
import { useState } from "react";

const UnsubscribeModal = ({ handleClose,handleMessage }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnsubscribe = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await apihelper.post(UNSUBSCRIBE, {});

      if (response.success && response.statusCode === 200) {
        handleMessage(response.message);
        setTimeout(handleClose, 300);
      } else if (response.error) {
        setErrorMessage(response.error.data.message);
      } else {
        setErrorMessage(
          response.message || "Failed to unsubscribe. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#1B0140] bg-opacity-90 z-50 flex justify-center items-center">
        <div className="bg-gradient-to-b from-[#4703A6] to-[#1B0140] py-16 px-4 border-2 border-white rounded-3xl shadow-custom1 w-[320px] mx-auto">
          {/* start popup */}
          {isSubmitting ? (
            <p className="text-center text-white">Loading..</p>
          ) : (
            <div>
              <h2 className="font-passionOne text-center text-[32px]/9 font-bold text-white mb-6">
                Do you want to unsubscribe?
              </h2>

              {/* Show error message if it exists */}
              {errorMessage && (
                <p className="text-red-500 text-center text-sm mb-4">
                  {errorMessage}
                </p>
              )}

              <div className="flex justify-center items-center">
                {/* Bind handleUnsubscribe to the Yes button */}
                <button
                  onClick={handleUnsubscribe}
                  className="text-white text-[22px]/6 mr-4 bg-[#5D6CFD] border-2 border-[#949EFF] uppercase font-passionOne py-2 px-6 block rounded-xl"
                >
                  Yes
                </button>
                <button
                  onClick={handleClose}
                  className="text-white text-[22px]/6 bg-[#F97F40] border-2 border-[#F9AE40] uppercase font-passionOne py-2 px-6 block rounded-xl"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UnsubscribeModal;
