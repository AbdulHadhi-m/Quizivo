import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Trophy,
  Brain,
  Star,
  ChevronRight,
  Medal,
  Sparkles,
} from "lucide-react";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden  pt-24 pb-16 md:pt-28 lg:pt-32"> {/*bg-[#fffaf3]}
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#ffd166]/40 blur-2xl" />
      <div className="absolute top-20 right-0 h-52 w-52 rounded-full bg-[#ff7a1a]/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full  blur-3xl" /> 

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 order-2 lg:order-1"
          >
            <MotionDiv
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#ffb703] bg-white px-4 py-2 text-sm font-semibold text-[#ff7a1a] shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Learn, Play, and Win
            </MotionDiv>

            <MotionH1
              variants={itemVariants}
              className="max-w-xl text-4xl font-black leading-tight text-[#111827] sm:text-5xl lg:text-6xl"
            >
              Pick a Topic,
              <br />
              <span className="text-[#ff7a1a]">Play Quiz, Win Big!</span>
            </MotionH1>

            <MotionP
              variants={itemVariants}
              className="mt-5 max-w-lg text-base leading-7 text-[#6b7280] sm:text-lg"
            >
              Practice with fun quizzes, challenge your friends, climb the
              leaderboard, and improve your knowledge every day with a colorful
              and exciting experience.
            </MotionP>

            <MotionDiv
              variants={itemVariants}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/quiz/setup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff7a1a] px-7 py-4 text-sm font-bold text-white shadow-md transition hover:scale-[1.02]"
              >
                <Play className="h-5 w-5 fill-white" />
                Start Quiz
              </Link>

              <Link
                to="/leaderboard"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#111827] bg-white px-7 py-4 text-sm font-bold text-[#111827] transition hover:bg-[#fff1df]"
              >
                <Trophy className="h-5 w-5" />
                View Ranking
              </Link>
            </MotionDiv>

            {/* Stats */}
            <MotionDiv
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3"
            >
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="text-2xl font-black text-[#111827]">15+</p>
                <p className="mt-1 text-sm text-[#6b7280]">Quiz Categories</p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="text-2xl font-black text-[#111827]">10K+</p>
                <p className="mt-1 text-sm text-[#6b7280]">Active Players</p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 col-span-2 sm:col-span-1">
                <p className="text-2xl font-black text-[#111827]">24/7</p>
                <p className="mt-1 text-sm text-[#6b7280]">Live Challenges</p>
              </div>
            </MotionDiv>
          </MotionDiv>

          {/* Right Visual */}
         <MotionDiv
  initial={{ opacity: 0, x: 40, scale: 0.9 }}
  animate={{ y: [0, -12, 0], opacity: 1, x: 0, scale: 1 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
    y: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  }}
  className="relative flex w-full order-1 items-center justify-center overflow-visible lg:order-2 lg:justify-end"
>
  <img
    src="/images/quizivo-mascot.png"
    alt="Quizivo mascot"
    className="block w-full max-w-[900px] scale-[1.45] object-contain drop-shadow-2xl lg:max-w-[1100px]"
  />
</MotionDiv>
        </div>
      </div>
    </section>
  );
}