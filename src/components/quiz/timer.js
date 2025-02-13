"use client"; // Ensure this is a Client Component

import { getCurrentQuestion, setQuizTime, toggleTimeRunning } from "@/GlobalRedux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import Image from "next/image";
import { useState, useEffect } from "react";

const Timer = () => {
  const [progress, setProgress] = useState(100);

  const dispatch = useAppDispatch();
  const currentQuestion = useAppSelector(getCurrentQuestion);
  const { quizTime, isTimeRunning } = currentQuestion;

  useEffect(() => {
    let timerInterval;

    if (isTimeRunning && quizTime > 0) {
      timerInterval = setInterval(() => {
        const changetime = quizTime - 1
        dispatch(setQuizTime(changetime));
      }, 1000);
    } else if (quizTime === 0) {
      dispatch(toggleTimeRunning(false));
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [quizTime, isTimeRunning, dispatch]);

  useEffect(() => {
    setProgress((quizTime / 10) * 100); // Assuming a 10-second timer
  }, [quizTime]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 items-center">
          <Image
            src="/assets/images/icons/Clock.svg"
            width={30}
            height={30}
            alt="Clock icon"
          />
          <p className="text-white text-base font-fontRem">Time left</p>
        </div>
        <p className="text-white text-base font-fontRem">{quizTime}s</p>
      </div>
      <div>
        <span id="ProgressLabel" className="sr-only">
          Loading
        </span>

        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow={progress}
          className="block rounded-full bg-gray-200"
        >
          <span
            className="block h-3 rounded-full bg-gradient-to-r from-[#EF2929] to-[#1783FB] text-center text-[10px]/4 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default Timer;
