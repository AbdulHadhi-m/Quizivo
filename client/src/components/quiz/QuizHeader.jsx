import { Clock3, Layers3, Target, Gauge } from "lucide-react";
import { formatTime } from "../../utils/formatTime";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function QuizHeader({
  currentIndex,
  totalQuestions,
  timeLeft,
  category,
  difficulty,
  type,
  practice = false,
}) {
  const isTimeLow = !practice && timeLeft < 15;

  return (
    <div className="glass-card p-6 shadow-premium">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              {practice ? "Practice Mode" : "Live Session"}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-xs font-medium text-slate-500">
              Q{currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          
          <h2 className="font-display text-3xl font-black text-slate-900 leading-tight">
            {category}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <Gauge size={12} className="text-primary" />
              {difficulty}
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <Target size={12} className="text-accent" />
              {type}
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          {!practice ? (
            <MotionDiv 
              animate={isTimeLow ? { scale: [1, 1.05, 1], color: ['#0f172a', '#ef4444', '#0f172a'] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`flex items-center gap-3 rounded-2xl border ${isTimeLow ? 'border-red-100 bg-red-50' : 'border-slate-100 bg-white'} px-6 py-4 shadow-sm`}
            >
              <div className={`p-2 rounded-xl ${isTimeLow ? 'bg-red-500' : 'bg-primary'} text-white`}>
                <Clock3 size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time Left</span>
                <span className={`font-display text-2xl font-black tabular-nums ${isTimeLow ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </MotionDiv>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
              <div className="p-2 rounded-xl bg-secondary text-white">
                <Clock3 size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Timer</span>
                <span className="font-display text-2xl font-black text-slate-900">
                  Off
                </span>
              </div>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
            <div className="p-2 rounded-xl bg-accent text-white">
              <Layers3 size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</span>
              <span className="font-display text-2xl font-black text-slate-900">
                {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}