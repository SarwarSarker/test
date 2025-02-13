import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: 'Payment Error',
  description: 'Think you’re a trivia master? Play premium quizzes at QuizMuiz! Test your skills, compete for high scores & unlock exclusive challenges. No ads, just fun!',
}

const PaymentErrorPage = async () => {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl p-4 bg-white shadow-2xl sm:p-10 sm:rounded-3xl">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full ">
              <svg
                className="h-12 w-12 text-red-600 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-red-700 ">
              Payment Failed!
            </h1>
            <p className="mt-4 text-lg text-gray-800 ">Try Again.</p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href={"/"}
              className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 "
              prefetch={false}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentErrorPage;
