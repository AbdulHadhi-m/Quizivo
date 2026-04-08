import { ArrowLeft, ArrowRight, CheckSquare } from "lucide-react";

export default function QuizNavigation({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="glass-card p-6 shadow-premium">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="premium-button flex items-center gap-2 border border-slate-200 bg-white px-8 py-4 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center gap-4">
          {!isLast ? (
            <button
              onClick={onNext}
              className="premium-button flex items-center gap-2 bg-slate-900 px-10 py-4 text-white hover:bg-slate-800"
            >
              Continue
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="premium-button flex items-center gap-2 bg-primary px-10 py-4 text-white hover:bg-primary-dark shadow-[0_10px_20px_-5px_rgba(139,92,246,0.3)]"
            >
              <CheckSquare size={20} />
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}