"use client";

import QuizSkeleton from "@/components/loader/QuizSkeleton";
import QuizButton from "@/components/quiz/quizButton";
import Quizcard from "@/components/quiz/quizcard";
import Timer from "@/components/quiz/timer";
import { GET_QUESTION, GET_QUIZ } from "@/config/constants/apiConstants";
import {
  getCurrentQuestion,
  setCurrentQuestion,
  setIsAnswerSubmitted,
  setIsWorngAnswer,
  setIsTimeUp,
  setQuizTime,
  setSelectedAnswer,
  toggleTimeRunning,
  setQuiz,
  getQuiz,
  setSubmitted,
  incrementCurrentQuestion,
} from "@/GlobalRedux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import apihelper from "@/utils/apiHelper";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const QuizDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const quizDetail = useAppSelector(getQuiz);
  const { questionData, quizTime, isSubmitted, isTimeUp, isWorngAnswer } =
    useAppSelector(getCurrentQuestion);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if state.quiz exists
  useEffect(() => {
    const categoryId = getCookie("categoryId");

    // if (!categoryId) {
    //   router.push("/categories");
    //   return;
    // }

    const fetchQuizData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apihelper.post(
          `${GET_QUIZ}/${categoryId}/start`
        );

        if (response.success && response.statusCode === 200) {
          dispatch(setQuiz(response.data));

          const questionArray = JSON.parse(response.data.question_ids);
          const questionId = questionArray[response.data.current];

          if (questionId) {
            fetchQuestionData(questionId);
          } else {
            setError("Question was not found.");
          }
        }else if (response.error) {
          setError(response.error.data.message);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Failed to fetch quiz data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [dispatch, router]);

  const fetchQuestionData = async (questionId) => {
    if (error) return;

    setIsLoading(true);

    try {
      const response = await apihelper.get(`${GET_QUESTION}/${questionId}`);
      if (response.success && response.statusCode === 200) {
        dispatch(setCurrentQuestion(response.data));
      } else {
        setError(response.message || "Failed to fetch question data.");
      }
    } catch (err) {
      setError("Failed to fetch question.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to call the API
  const submitAnswer = async (answer, status, submittedOn) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    try {
      const response = await apihelper.post(
        `${GET_QUIZ}/${quizDetail?.id}/question/${questionData?.id}/submit`,
        { answer, status, submittedOn }
      );

      if (response.success && response.statusCode === 200) {
        dispatch(setIsAnswerSubmitted(true));
        dispatch(toggleTimeRunning(false));
      } else {
        setError(response.message || "Failed to submit the answer.");
      }
    } catch (err) {
      setError("Failed to submit the answer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle time-up
  useEffect(() => {
    if (quizTime === 0 && !isSubmitted && !isTimeUp) {
      dispatch(setIsTimeUp(true));
      submitAnswer("", "not_submitted", 10);
    }
  }, [quizTime, isSubmitted, isTimeUp]);

  // after answer select_submission
  const selectAnswer = (answer) => {
    if (isSubmitted || isTimeUp) return;
    dispatch(setSelectedAnswer(answer)); //select Answer
    dispatch(setSubmitted(true));
    dispatch(toggleTimeRunning(false)); // Stop the timer

    submitAnswer(answer, "submitted", quizTime === 10 ? 1 : 10 - quizTime);
  };

  // after answer skip_submission
  const skipCurrentQuestion = () => {
    dispatch(setIsTimeUp(true));
    dispatch(toggleTimeRunning(false));
    submitAnswer("", "skipped", 10);
  };

  // after next button click submission
  const moveToNextQuestion = () => {
    const nextIndex = quizDetail?.current + 1;
    const indexArray = JSON.parse(quizDetail?.question_ids || "[]");

    // Save quizId to cookies
    if (quizDetail?.id) {
      setCookie("quizId", quizDetail.id, { path: "/" });
    }

    if (nextIndex >= indexArray.length) {
      router.push("/quiz/overview");
      return;
    }

    setIsLoading(true);
    dispatch(setIsWorngAnswer(false));

    // Increment the current question index in Redux
    dispatch(incrementCurrentQuestion());

    dispatch(setQuizTime(10));
    dispatch(toggleTimeRunning(true));
    dispatch(setIsAnswerSubmitted(true));
    fetchQuestionData(indexArray[nextIndex]);
  };

  if (isLoading) {
    return <QuizSkeleton />;
  }

  if (error) {
    return (
      <>
        <p className="text-red-500 text-center py-4">{error}</p>
        <div className="flex justify-center">
          <Link
            href="/categories"
            className="mt-6 py-2 px-8 border border-[#F97F40] rounded text-[#F97F40] hover:bg-[#F97F40] hover:text-white"
            prefetch={false}
          >
            Go Back to Categories
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      <Timer />
      <Quizcard selectAnswer={selectAnswer} />
      <QuizButton
        moveToNextQuestion={moveToNextQuestion}
        skipCurrentQuestion={skipCurrentQuestion}
      />
    </div>
  );
};

export default QuizDetails;
