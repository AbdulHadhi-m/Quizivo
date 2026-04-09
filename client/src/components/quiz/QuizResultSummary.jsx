import CountUp from "react-countup";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { Trophy, Target, XCircle, Award, RefreshCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

export default function QuizResultSummary({
  result,
  showConfetti = true,
}) {
  const { width, height } = useWindowSize();
  const passed = result.percentage >= 60;
  const navigate = useNavigate();

  return (
    <div className="relative">
      {showConfetti && passed && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          colors={["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#f97316"]}
        />
      )}


      <div className="glass-card overflow-hidden">
        <div className={`h-2 w-full ${passed ? 'bg-emerald-500' : 'bg-secondary'}`} />
        
        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <MotionDiv
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className={`flex h-28 w-28 items-center justify-center rounded-3xl shadow-2xl mb-8 ${
              passed ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-white' : 'bg-gradient-to-tr from-orange-400 to-amber-500 text-white'
            }`}
          >
            {passed ? <Trophy size={56} /> : <Award size={56} />}
          </MotionDiv>

          <MotionH1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl font-black text-slate-900 md:text-6xl"
          >
            {passed ? "Champion Performance!" : "Great Effort!"}
          </MotionH1>

          <MotionP 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-xl text-slate-500 max-w-xl"
          >
            {passed 
              ? "You've mastered this topic. Your knowledge is truly impressive!" 
              : "You're getting closer. A little more practice and you'll be a pro!"}
          </MotionP>

          <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-4xl md:grid-cols-4">
            <StatCard 
              label="Total Score" 
              value={result.correctCount} 
              suffix={`/${result.totalQuestions}`}
              icon={<Target className="text-primary" size={20} />}
              delay={0.5}
            />
            <StatCard 
              label="Accuracy" 
              value={result.percentage} 
              suffix="%" 
              icon={<Award className="text-secondary" size={20} />}
              delay={0.6}
            />
            <StatCard 
              label="Correct" 
              value={result.correctCount} 
              icon={<Trophy className="text-emerald-500" size={20} />}
              delay={0.7}
            />
            <StatCard 
              label="Mistakes" 
              value={result.wrongCount} 
              icon={<XCircle className="text-rose-500" size={20} />}
              delay={0.8}
            />
          </div>

          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => navigate("/quiz/setup")}
              className="premium-button flex items-center gap-3 bg-primary px-10 py-5 text-white shadow-xl hover:bg-primary-dark"
            >
              <RefreshCcw size={20} />
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="premium-button flex items-center gap-3 border border-slate-200 bg-white px-10 py-5 text-slate-700 hover:bg-slate-50"
            >
              <Home size={20} />
              Home Page
            </button>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, suffix = "", icon, delay = 0 }) {
  const numericValue = typeof value === 'number' ? value : 0;

  return (
    <MotionDiv 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center"
    >
      {icon && (
        <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
      )}
      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{label}</p>
      <div className="font-display text-2xl font-black text-slate-900 flex items-baseline">
        {CountUp && typeof CountUp === 'function' ? (
          <CountUp end={numericValue} duration={2} />
        ) : (
          <span>{numericValue}</span>
        )}
        <span className="text-base font-bold text-slate-400 ml-0.5">{suffix}</span>
      </div>
    </MotionDiv>
  );
}