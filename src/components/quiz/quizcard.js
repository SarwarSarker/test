import { useState, useEffect } from "react";
import {
  getCurrentQuestion,
  getQuiz,
} from "@/GlobalRedux/features/quiz/quizSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import Image from "next/image";

const Quizcard = ({ selectAnswer }) => {
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const quizDetail = useAppSelector(getQuiz);
  const currentQuestion = useAppSelector(getCurrentQuestion);
  const { questionData, isSubmitted, isTimeUp, selectedAnswer, isWorngAnswer } =
    currentQuestion;
  const quizArray = JSON.parse(quizDetail?.question_ids || "[]");

  useEffect(() => {
    if (isSubmitted && selectedAnswer !== questionData?.correct_answer) {
      const timer = setTimeout(() => {
        setShowCorrectAnswer(true);
      }, 500);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [
    isSubmitted,
    questionData?.correct_answer,
    selectedAnswer,
    isWorngAnswer,
  ]);

  const getImageSrc = (index) => {
    const imageNames = ["a", "b", "c", "d"];
    return `/assets/images/icons/${imageNames[index]}.svg`;
  };

  const getButtonStyle = (name) => {
    let borderColor = "border-[#F9DB89CC]";

    if (isSubmitted || isTimeUp) {
      if (name === selectedAnswer) {
        // If the selected answer is correct, show green immediately
        if (name === questionData?.correct_answer) {
          borderColor = "border-[#92F989] bg-[#92F98933]";
        } else {
          // Highlight the selected wrong answer in red
          borderColor = "border-[#F98989] bg-[#F98E8E33]";
        }
      }

      if (showCorrectAnswer && name === questionData?.correct_answer) {
        // Show the correct answer in green after the delay
        borderColor = "border-[#92F989] bg-[#92F98933]";
      }
    }

    return borderColor;
  };

  const playVideo = (name) => {
    const isplayAudio = name === questionData?.correct_answer;
    // Create a new Audio instance for the sound
    const audio = new Audio(
      isplayAudio ? "/assets/audio/correct.mp3" : "/assets/audio/error.mp3"
    );

    // Pause any previous audio if it's playing and play the new one
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <>
      <div className="bg-white px-4 py-6 rounded-3xl mb-12">
        <p className="mb-3">
          <span className="text-[#EF5A29] text-xs">
            Questions: {quizDetail?.current + 1}/{quizArray.length}
          </span>
        </p>
        <p className="text-[#141414] font-fontRem text-xl font-bold text-center w-5/6 mx-auto mb-[30px]">
          {questionData?.question}
        </p>
        <div className="flex flex-col gap-2">
          {questionData?.options?.map((name, index) => (
            <button
              className={`p-4 border rounded-2xl relative ${
                isSubmitted || isTimeUp ? "cursor-not-allowed" : ""
              } ${getButtonStyle(name)}`}
              key={index}
              onClick={() => {
                selectAnswer(name);
                playVideo(name);
              }}
              disabled={isSubmitted || isTimeUp}
            >
              <div className="text-black text-base flex items-center gap-2">
                <Image src={getImageSrc(index)} width={22} height={22} alt="" />
                <p>{name}</p>
              </div>
              {/* Show checkmark or cross for selected answer */}
              {isSubmitted && name === selectedAnswer && (
                <Image
                  src={
                    name === questionData?.correct_answer
                      ? "assets/images/icons/Checkmark.svg"
                      : "assets/images/icons/Decline.svg"
                  }
                  width={18}
                  height={18}
                  alt=""
                  className="absolute right-5 inset-y-5"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quizcard;
