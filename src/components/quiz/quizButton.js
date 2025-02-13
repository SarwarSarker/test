import { getCurrentQuestion } from "@/GlobalRedux/features/quiz/quizSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { memo } from "react";
import { FaChevronRight } from "react-icons/fa6";

const QuizButton = memo(({ moveToNextQuestion, skipCurrentQuestion }) => {
  const currentQuestion = useAppSelector(getCurrentQuestion);

  return (
    <div className="flex gap-4 w-full">
      {!currentQuestion.isAnswerSubmitted && (
        <button
          className="border-2 border-[#949EFF] text-white text-center uppercase text-2xl font-passionOne py-4 rounded-2xl w-full"
          onClick={skipCurrentQuestion}
        >
          Skip
        </button>
      )}

      <button
        className={`border-2 text-2xl font-passionOne flex justify-center items-center gap-2 py-4 rounded-2xl w-full ${
          currentQuestion.isAnswerSubmitted
            ? "border-[#949EFF] text-white cursor-pointer"
            : "border-[#c5c5c5] text-[#c5c5c5] cursor-not-allowed"
        }`}
        disabled={!currentQuestion.isAnswerSubmitted}
        onClick={moveToNextQuestion}
      >
        <span>Next</span> <FaChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
});

// Set displayName manually
QuizButton.displayName = "QuizButton";

export default QuizButton;
