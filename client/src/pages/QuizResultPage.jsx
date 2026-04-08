import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import QuizResultSummary from "../components/quiz/QuizResultSummary";
import ReviewAnswerCard from "../components/quiz/ReviewAnswerCard";
import { motion } from "framer-motion";
import { ListChecks, MessageSquareText, ChevronRight } from "lucide-react";

const MotionDiv = motion.div;

export default function QuizResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Redirect if no result data
  if (!state?.result) {
    return (
      <MainLayout>
        <section className="py-24 md:py-32">
          <div className="container-app">
            <div className="glass-card p-12 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-6">
                <ListChecks size={40} />
              </div>
              <h1 className="font-display text-3xl font-black text-slate-900">
                No Result Available
              </h1>
              <p className="mt-4 text-slate-500 text-lg">
                It looks like you haven't completed a quiz yet. Start a new session to see your performance!
              </p>
              <button
                onClick={() => navigate("/quiz/setup")}
                className="premium-button mt-8 inline-flex items-center gap-2 bg-primary px-8 py-4 text-white hover:bg-primary-dark shadow-xl"
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

  const { result, quizSettings = {} } = state;

  return (
    <MainLayout>
      <section className="py-16 md:py-24 bg-mesh min-h-screen">
        <div className="container-app space-y-12">
          {/* Main Hero Summary */}
          <QuizResultSummary result={result} />

          {/* Quiz Details Bar */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-card p-8 md:p-10 border-slate-100 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="font-display text-2xl font-black text-slate-900">
                  Mission Details
                </h2>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-slate-500">
                  <DetailTag label="Topic" value={quizSettings.category || "General"} />
                  <DetailTag label="Level" value={quizSettings.difficulty || "Mixed"} />
                  <DetailTag label="Format" value={quizSettings.type || "Multiple"} />
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
                  className="premium-button bg-slate-900 px-8 py-4 text-white hover:bg-slate-800 shadow-md"
                >
                  Global Ranking
                </button>
              </div>
            </div>
          </MotionDiv>

          {/* Answer Review Section */}
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-secondary text-white shadow-lg">
                <MessageSquareText size={24} />
              </div>
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">
                  Detailed Review
                </h2>
                <p className="text-slate-500 font-medium">Analyze your performance and learn from the expert insights.</p>
              </div>
            </div>

            <div className="grid gap-6">
              {result.reviewData?.map((item, index) => (
                <ReviewAnswerCard key={item.id || index} item={item} index={index} />
              ))}
            </div>
          </div>
          
          {/* Bottom Action Footer */}
          <div className="text-center py-12">
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Want to improve your score?</p>
            <button
               onClick={() => navigate("/quiz/setup")}
               className="premium-button bg-primary px-12 py-5 text-white text-lg shadow-2xl hover:scale-105"
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
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">{label}:</span>
      <span className="text-slate-900 font-bold capitalize">{value}</span>
    </div>
  );
}
