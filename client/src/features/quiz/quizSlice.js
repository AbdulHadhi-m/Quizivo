import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {
    category: "General Knowledge",
    amount: 10,
    difficulty: "easy",
    type: "multiple",
    time: 60,
  },
  questions: [],
  currentIndex: 0,
  answers: [],
  score: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateQuizSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.currentIndex = 0;
      state.answers = [];
      state.score = 0;
    },
  },
});

export const {
  updateQuizSettings,
  setQuestions,
  setCurrentIndex,
  setAnswers,
  setScore,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;