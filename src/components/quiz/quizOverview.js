"use client";

import { GET_QUIZ } from "@/config/constants/apiConstants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import apihelper from "@/utils/apiHelper";
import Loader from "@/components/loader/loader";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import { resetQuiz } from "@/GlobalRedux/features/quiz/quizSlice";
import { ImSpinner11 } from "react-icons/im";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

const QuizOverview = () => {
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();

  const id = getCookie("quizId");

  useEffect(() => {
    if (!id) {
      redirect("/categories");
    }
  }, []);

  const defaultImage = "/assets/images/icons/scorecard.svg";

  const fetchScore = async () => {
    try {
      const response = await apihelper.get(`${GET_QUIZ}/${id}/overview`);

      if (response.success && response.statusCode === 200) {
        setScore(response.data);
        dispatch(resetQuiz());
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching the data.");
    }
  };

  // Fetch score data
  useEffect(() => {
    fetchScore();
  }, []);

  if (!score && !errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-11 md:mt-16">
      <div className="flex flex-col justify-center items-center h-full px-4">
        {/* Display error message at the top */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-6">{errorMessage}</p>
        )}

        <div className="-mb-6 z-50">
          <Image
            src={score?.achievement?.image || defaultImage}
            width={300}
            height={170}
            alt="Scorecard Icon"
            className="w-full h-[170px]"
            priority
            unoptimized
          />
        </div>
        <div
          className={`${
            score?.achievement?.name == "Explorer"
              ? "bg-[#841325]"
              : score?.achievement?.name == "Knowledge Seeker"
              ? "bg-[#4703A6]"
              : score?.achievement?.name == "PathFinder"
              ? "bg-[#F97F40]"
              : score?.achievement?.name == "Conqueror"
              ? "bg-[#B540F9]"
              : score?.achievement?.name == "Grandmaster"
              ? "bg-[#6840F9]"
              : ""
          } text-white border-2 border-white rounded-2xl pt-[40px] pb-6 px-8 w-full max-w-[320px] z-10`}
        >
          <div className="bg-[#F85E2A] border-2 border-white p-4 rounded-xl mb-4 shadow-custom">
            <p className="text-white text-[18px]/4 font-passionOne text-center tracking-wide">
              {score?.achievement?.description}
            </p>
          </div>

          {!errorMessage && score && (
            <>
              <div className="flex justify-center mb-3">
                <p className="flex items-center gap-1 bg-white px-3 py-1 text-center text-[#F85E2A] text-3xl rounded-lg font-bold font-passionOne">
                  <span className="text-xl">Score :</span>{" "}
                  {score.earnedPoints.total}
                </p>
              </div>

              <div>
                <div className="flex justify-between border-b border-[#FFFFFF1A] py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Correct Answer</p>
                  <p>{score.correctAnswers}</p>
                </div>
                <div className="flex justify-between border-b border-[#FFFFFF1A] py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Skipped:</p>
                  <p>{score.skippedAnswers}</p>
                </div>
                <div className="flex justify-between border-b border-[#FFFFFF1A] py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Wrong answer</p>
                  <p>{score.wrongAnswers}</p>
                </div>
                {/* <div className="flex justify-between border-b border-[#FFFFFF1A] py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Average time:</p>
                  <p>{score.earnedPoints.total}</p>
                </div> */}
                <div className="flex justify-between border-b border-[#FFFFFF1A] py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Streak bonus:</p>
                  <p>{score.earnedPoints.streak}</p>
                </div>
                <div className="flex justify-between border-b border-[#FFFFFF1A] py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Speed bonus:</p>
                  <p>{score.earnedPoints.speed}</p>
                </div>
                <div className="flex justify-between py-2 text-white text-base font-passionOne text-center tracking-wide">
                  <p>Difficulty bonus:</p>
                  <p>{score.earnedPoints.difficulty}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex justify-between gap-4 mt-6 max-w-[320px]">
          <Link
            href={"/"}
            className="w-full flex justify-center items-center text-center py-3 px-2 uppercase text-sm sm:text-base border-2 font-bold border-[#949EFF] rounded-xl bg-[#5D6CFD] text-white"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href={"/categories"}
            className="w-full text-center flex justify-center items-center text-sm sm:text-base font-bold py-3 px-2 uppercase border-2 border-[#949EFF] rounded-xl text-white"
            prefetch={false}
          >
            Play Again
            <ImSpinner11 className="text-sm sm:text-base ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default QuizOverview;
