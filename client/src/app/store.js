import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import quizReducer from "../features/quiz/quizSlice";
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    quiz: quizReducer,
    leaderboard: leaderboardReducer,
  },
});