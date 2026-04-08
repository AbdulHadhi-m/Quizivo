import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const MotionDiv = motion.div;

export default function QuizQuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <MotionDiv 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass-card p-6 md:p-10 shadow-premium"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Question Challenge
        </p>
      </div>

      <h2 className="font-display text-2xl font-black leading-tight text-slate-900 md:text-3xl lg:text-4xl">
        {question.question}
      </h2>

      <div className="mt-10 grid gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const letter = String.fromCharCode(65 + index); // A, B, C, D...

          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(question.id, option)}
              className={`group relative flex w-full items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                isSelected
                  ? "border-primary bg-primary/5 text-primary shadow-md"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-black transition-colors duration-300 ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                }`}
              >
                {letter}
              </div>

              <span className={`text-lg font-bold transition-colors duration-300 ${
                isSelected ? "text-primary" : "text-slate-700"
              }`}>
                {option}
              </span>

              {isSelected && (
                <MotionDiv 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </MotionDiv>
              )}
              
              {!isSelected && (
                <div className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="h-6 w-6 rounded-full border-2 border-slate-200" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </MotionDiv>
  );
}