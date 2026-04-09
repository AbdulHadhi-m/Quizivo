import submitQuizAttemptAPI from "../app/quizApi";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import QuizResultSummary from "../components/quiz/QuizResultSummary";
import ReviewAnswerCard from "../components/quiz/ReviewAnswerCard";
import { motion } from "framer-motion";
import {
  ListChecks,
  MessageSquareText,
  ChevronRight,
  Loader2,
} from "lucide-react";


const MotionDiv = motion.div;

export default function QuizResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasSubmittedRef = useRef(false);
  const result = state?.result;
  const quizSettings = state?.quizSettings;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!result) return;
    const settings = quizSettings || {};

    const submitAttempt = async () => {
      if (hasSubmittedRef.current) return;
      hasSubmittedRef.current = true;

      try {
        setSubmitLoading(true);
        setSubmitError("");

        const totalQuestions =
          Number(result?.totalQuestions) ||
          Number(result?.reviewData?.length) ||
          0;

        const correctAnswers = Number(result?.correctAnswers) || 0;
        const wrongAnswers = Number(result?.wrongAnswers) || 0;
        const unanswered =
          typeof result?.unanswered === "number"
            ? result.unanswered
            : Math.max(totalQuestions - correctAnswers - wrongAnswers, 0);

        const score = Number(result?.score) || 0;
        const percentage =
          typeof result?.percentage === "number"
            ? result.percentage
            : totalQuestions > 0
            ? Math.round((correctAnswers / totalQuestions) * 100)
            : 0;

        const payload = {
          category: settings.categoryId || "",
          categoryId: settings.categoryId || "",
          categorySlug: settings.categorySlug || "",
          categoryName: settings.category || "",
          difficulty: settings.difficulty || "easy",
          type: settings.type || "multiple",
          totalQuestions,
          correctAnswers,
          wrongAnswers,
          unanswered,
          score,
          percentage,
          timeTaken: Number(result?.timeTaken) || Number(settings.time) || 0,
        };

        await submitQuizAttemptAPI(payload);
        setSubmitSuccess(true);
      } catch (error) {
        console.error("Failed to submit quiz attempt:", error);
        setSubmitError(
          error?.response?.data?.message || "Failed to save quiz attempt"
        );
      } finally {
        setSubmitLoading(false);
      }
    };

    submitAttempt();
  }, [result, quizSettings]);

  if (!result) {
    return (
      <MainLayout>
        <section className="py-24 md:py-32">
          <div className="container-app">
            <div className="glass-card mx-auto max-w-2xl p-12 text-center shadow-2xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ListChecks size={40} />
              </div>
              <h1 className="font-display text-3xl font-black text-slate-900">
                No Result Available
              </h1>
              <p className="mt-4 text-lg text-slate-500">
                It looks like you haven&apos;t completed a quiz yet. Start a new
                session to see your performance.
              </p>
              <button
                onClick={() => navigate("/quiz/setup")}
                className="premium-button mt-8 inline-flex items-center gap-2 bg-primary px-8 py-4 text-white shadow-xl hover:bg-primary-dark"
              >
                Go to Quiz Setup
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="min-h-screen bg-mesh py-16 md:py-24">
        <div className="container-app space-y-12">
          <QuizResultSummary result={result} />

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border-slate-100 p-8 shadow-sm md:p-10"
          >
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="font-display text-2xl font-black text-slate-900">
                  Mission Details
                </h2>

                <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500 md:justify-start">
                  <DetailTag
                    label="Topic"
                    value={quizSettings?.category || "General"}
                  />
                  <DetailTag
                    label="Level"
                    value={quizSettings?.difficulty || "Mixed"}
                  />
                  <DetailTag
                    label="Format"
                    value={quizSettings?.type || "Multiple"}
                  />
                </div>

                <div className="mt-4">
                  {submitLoading && (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                      <Loader2 size={16} className="animate-spin" />
                      Saving result to leaderboard...
                    </div>
                  )}

                  {!submitLoading && submitSuccess && (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                      Result saved successfully
                    </div>
                  )}

                  {!submitLoading && submitError && (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                      {submitError}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/quiz/setup")}
                  className="premium-button bg-slate-100 px-8 py-4 text-slate-700 hover:bg-slate-200"
                >
                  Configure New Quiz
                </button>

                <button
                  onClick={() => navigate("/leaderboard")}
                  className="premium-button bg-slate-900 px-8 py-4 text-white shadow-md hover:bg-slate-800"
                >
                  Global Ranking
                </button>
              </div>
            </div>
          </MotionDiv>

          <div className="mt-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white shadow-lg">
                <MessageSquareText size={24} />
              </div>
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">
                  Detailed Review
                </h2>
                <p className="font-medium text-slate-500">
                  Analyze your performance and learn from the expert insights.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {result.reviewData?.map((item, index) => (
                <ReviewAnswerCard
                  key={item.id || index}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="py-12 text-center">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Want to improve your score?
            </p>
            <button
              onClick={() => navigate("/quiz/setup")}
              className="premium-button bg-primary px-12 py-5 text-lg text-white shadow-2xl hover:scale-105"
            >
              Start Another Session
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function DetailTag({ label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {label}:
      </span>
      <span className="font-bold capitalize text-slate-900">{value}</span>
    </div>
  );
}