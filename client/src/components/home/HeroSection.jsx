import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Sparkles, Trophy, Brain, ArrowRight, Zap } from "lucide-react";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center pt-32 md:pt-36 pb-16">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />

      <div className="container-app relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionDiv 
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-bold text-primary"
            >
              <span className="flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-primary text-[10px] text-white">
                <Zap size={10} fill="currentColor" />
              </span>
              Level Up Your Knowledge
            </MotionDiv>

            <MotionH1 
              variants={itemVariants}
              className="section-title mb-6 leading-[1.1]"
            >
              Master Any Topic <br />
              <span className="text-gradient">Through Play</span>
            </MotionH1>

            <MotionP 
              variants={itemVariants}
              className="section-subtitle mb-10"
            >
              The ultimate quiz destination for curious minds. 
              Explore thousands of questions, compete with friends, and 
              earn exclusive badges along the way.
            </MotionP>

            <MotionDiv 
              variants={itemVariants}
              className="flex flex-wrap gap-5"
            >
              <Link
                to="/quiz/setup"
                className="premium-button flex items-center gap-3 bg-primary px-8 py-5 text-white hover:bg-primary-dark"
              >
                <PlayCircle size={22} />
                Start Playing Now
              </Link>

              <Link
                to="/categories"
                className="premium-button flex items-center gap-3 border border-slate-200 bg-white px-8 py-5 text-slate-800 hover:bg-slate-50"
              >
                <Brain size={22} className="text-primary" />
                Browse Categories
              </Link>
            </MotionDiv>

            <MotionDiv 
              variants={itemVariants}
              className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8"
            >
              <div>
                <p className="font-display text-4xl font-black text-slate-900">24/7</p>
                <p className="mt-1 text-sm font-medium text-slate-500">Live Quizzes</p>
              </div>
              <div>
                <p className="font-display text-4xl font-black text-slate-900">10k+</p>
                <p className="mt-1 text-sm font-medium text-slate-500">Active Users</p>
              </div>
              <div>
                <p className="font-display text-4xl font-black text-slate-900">15</p>
                <p className="mt-1 text-sm font-medium text-slate-500">Categories</p>
              </div>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="perspective-1000 hidden lg:block"
          >
            <div className="glass-card relative aspect-square w-full overflow-hidden p-1 bg-gradient-to-br from-white/80 to-white/40">
              <div className="absolute inset-0 bg-mesh opacity-30" />
              
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[calc(var(--radius-xl)-2px)] bg-white/40 p-12 text-center backdrop-blur-sm">
                <div className="relative mb-10 h-64 w-64 rounded-3xl bg-gradient-to-tr from-primary to-accent p-0.5 shadow-2xl rotate-3">
                  <div className="flex h-full w-full items-center justify-center rounded-[calc(var(--radius-3xl)-2px)] bg-slate-900 text-[100px]">
                    <Brain className="h-40 w-40 text-white animate-pulse" />
                  </div>
                  
                  {/* Floating Badges */}
                  <MotionDiv 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -right-8 -top-8 rounded-2xl bg-white p-4 shadow-xl"
                  >
                    <Trophy className="h-10 w-10 text-secondary" />
                  </MotionDiv>
                  
                  <MotionDiv 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -left-10 bottom-10 rounded-2xl bg-white p-4 shadow-xl"
                  >
                    <Sparkles className="h-10 w-10 text-primary" />
                  </MotionDiv>
                </div>

                <h3 className="font-display text-3xl font-black text-slate-900">Weekly Challenge</h3>
                <p className="mt-4 text-slate-600">Join the General Knowledge Grand Prix and win exclusive avatar frames.</p>
                
                <button className="mt-8 flex items-center gap-2 font-display font-bold text-primary group">
                  Join Challenge <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}