import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import quizReducer from "./features/quiz/quizSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      quiz: quizReducer,
    },
  });

  setupListeners(store.dispatch);
  return store
};


