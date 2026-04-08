import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function QuizProgress({ currentIndex, totalQuestions, answeredCount }) {
  const progressPercentage = totalQuestions
    ? ((currentIndex + 1) / totalQuestions) * 100
    : 0;
  
  const answeredPercentage = totalQuestions
    ? (answeredCount / totalQuestions) * 100
    : 0;

  return (
    <div className="glass-card p-6 shadow-premium overflow-hidden relative">
      <div className="mb-4 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">Current Progress</span>
          <p className="text-xl font-display font-black text-slate-900 leading-none">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 leading-none">Status</span>
          <p className="font-bold text-slate-700">
            {answeredCount} <span className="text-slate-400 font-medium">/ {totalQuestions} Answered</span>
          </p>
        </div>
      </div>

      <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 relative shadow-inner">
        {/* Answered progress (background layer) */}
        <MotionDiv
          initial={{ width: 0 }}
          animate={{ width: `${answeredPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-primary/20"
        />
        
        {/* Current position (foreground layer) */}
        <MotionDiv
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative h-full rounded-full bg-gradient-to-r from-primary via-primary-dark to-accent shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          {/* Gleam effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
        </MotionDiv>
      </div>

      {/* Subtle indicator dots */}
      <div className="mt-4 flex justify-between px-1">
        {[...Array(totalQuestions)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1 w-1 rounded-full transition-colors duration-500 ${
              i <= currentIndex ? 'bg-primary' : 'bg-slate-200'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}