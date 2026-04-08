import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizProgress from "../components/quiz/QuizProgress";
import QuestionPalette from "../components/quiz/QuestionPalette";
import QuizQuestionCard from "../components/quiz/QuizQuestionCard";
import QuizNavigation from "../components/quiz/QuizNavigation";
import questionsData from "../data/questions.json";
import { shuffleArray } from "../utils/shuffleArray";
import { calculateScore } from "../utils/calculateScore";

export default function QuizPlayPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const quizSettings = useMemo(() => {
    return (
      state || {
        category: "General Knowledge",
        amount: 10,
        difficulty: "easy",
        type: "multiple",
        time: 60,
      }
    );
  }, [state]);

  const [answersMap, setAnswersMap] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizSettings.time);

  const questions = useMemo(() => {
    const exactMatch = questionsData.filter(
      (item) =>
        item.category === quizSettings.category &&
        item.difficulty === quizSettings.difficulty &&
        item.type === quizSettings.type
    );

    let selectedQuestions = exactMatch;

    if (selectedQuestions.length < quizSettings.amount) {
      const fallback = questionsData.filter(
        (item) =>
          item.category === quizSettings.category && item.type === quizSettings.type
      );

      selectedQuestions = fallback;
    }

    return shuffleArray(selectedQuestions).slice(0, quizSettings.amount);
  }, [quizSettings]);

  const handleSubmitQuiz = useCallback(() => {
    const result = calculateScore(questions, answersMap);

    navigate("/quiz/result", {
      state: {
        result,
        quizSettings,
      },
    });
  }, [answersMap, navigate, questions, quizSettings]);

  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions.length, handleSubmitQuiz]);

  const currentQuestion = questions[currentIndex];

  const answeredCount = useMemo(() => {
    return Object.keys(answersMap).length;
  }, [answersMap]);

  const handleSelectAnswer = (questionId, answer) => {
    setAnswersMap((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!questions.length) {
    return (
      <MainLayout>
        <section className="py-16">
          <div className="container-app">
            <div className="quiz-card p-8 text-center">
              <h1 className="text-3xl font-black text-slate-900">
                No questions found
              </h1>
              <p className="mt-3 text-slate-600">
                Try another category, difficulty, or question type.
              </p>
              <Link
                to="/quiz/setup"
                className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
              >
                Back to Setup
              </Link>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-10 md:py-14">
        <div className="container-app grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <QuizHeader
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              timeLeft={timeLeft}
              category={quizSettings.category}
              difficulty={quizSettings.difficulty}
              type={quizSettings.type}
            />

            <QuizProgress
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              answeredCount={answeredCount}
            />

            {currentQuestion ? (
              <QuizQuestionCard
                question={currentQuestion}
                selectedAnswer={answersMap[currentQuestion.id] || ""}
                onSelectAnswer={handleSelectAnswer}
              />
            ) : null}

            <QuizNavigation
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onSubmit={handleSubmitQuiz}
            />
          </div>

          <div className="space-y-6">
            <QuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              answersMap={answersMap}
              setCurrentIndex={setCurrentIndex}
            />

            <div className="quiz-card p-5">
              <h3 className="text-lg font-black text-slate-900">Quick Summary</h3>
              <div className="mt-4 space-y-3">
                <SummaryRow label="Category" value={quizSettings.category} />
                <SummaryRow label="Difficulty" value={quizSettings.difficulty} />
                <SummaryRow label="Type" value={quizSettings.type} />
                <SummaryRow label="Answered" value={`${answeredCount}/${questions.length}`} />
              </div>

              <button
                onClick={handleSubmitQuiz}
                className="mt-5 w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-orange-50 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-semibold capitalize text-slate-900">{value}</span>
    </div>
  );
}