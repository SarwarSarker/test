import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: {
    id: null,
    question_ids: [],
    current: 0, // Add current index here
  },
  currentQuestion: {
    questionData: null,
    quizTime: 10,
    isTimeRunning: true,
    isAnswerSubmitted: false,
    selectedAnswer: null,
    isSubmitted: false,
    isTimeUp: false,
    isWorngAnswer: false,
  },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    resetQuiz: (state) => {
      state.quiz = initialState.quiz;
      state.currentQuestion = initialState.currentQuestion;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentQuestion(state, action) {
      state.currentQuestion = {
        ...initialState.currentQuestion,
        questionData: action.payload,
      };
    },
    setQuizTime(state, action) {
      state.currentQuestion.quizTime = action.payload;
    },
    toggleTimeRunning(state, action) {
      state.currentQuestion.isTimeRunning = action.payload;
    },
    setSelectedAnswer(state, action) {
      state.currentQuestion.selectedAnswer = action.payload;
    },
    setSubmitted(state, action) {
      state.currentQuestion.isSubmitted = action.payload;
    },
    setIsTimeUp(state, action) {
      state.currentQuestion.isTimeUp = action.payload;
    },
    setIsAnswerSubmitted(state, action) {
      state.currentQuestion.isAnswerSubmitted = action.payload;
    },
    setIsWorngAnswer(state, action) {
      state.currentQuestion.isWorngAnswer = action.payload;
    },
    incrementCurrentQuestion(state) {
      state.quiz.current += 1; // Increment the current index
    },
  },
});

export const {
  setQuiz,
  resetQuiz,
  clearError,
  setCurrentQuestion,
  setQuizTime,
  toggleTimeRunning,
  setSelectedAnswer,
  setSubmitted,
  setIsTimeUp,
  setIsAnswerSubmitted,
  setIsWorngAnswer,
  incrementCurrentQuestion, // Export the new action
} = quizSlice.actions;

// Selectors
export const getCurrentQuestion = (state) => state.quiz.currentQuestion;
export const getQuiz = (state) => state.quiz.quiz;

export default quizSlice.reducer;
