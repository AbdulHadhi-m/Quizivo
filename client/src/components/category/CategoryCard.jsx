import { Link } from "react-router-dom";
import { ArrowRight, Layers } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function CategoryCard({ category }) {
  const emoji = category.emoji || "🧠";
  const totalQuestions =
    typeof category.totalQuestions === "number" ? category.totalQuestions : null;

  return (
    <MotionDiv 
      whileHover={{ y: -8 }}
      className="glass-card flex flex-col overflow-hidden p-2 group"
    >
      <div
        className={`relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br ${category.color} p-8 text-white transition-all duration-500 group-hover:shadow-xl`}
      >
        {/* Animated pattern background */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <svg width="100%" height="100%">
            <pattern id="pattern-hex" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0l10 5v10l-10 5-10-5V5z" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-hex)" />
          </svg>
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="text-6xl filter drop-shadow-md transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            {emoji}
          </div>
          <div className="rounded-full bg-white/20 p-2.5 backdrop-blur-md">
            <Layers size={20} />
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <h3 className="font-display text-2xl font-black tracking-tight">{category.name}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-2 mb-6">
          {category.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Questions</span>
            <span className="text-xl font-display font-black text-slate-900 leading-none">
              {totalQuestions ?? 0}+
            </span>
          </div>

          <Link
            to={`/category/${category.slug}`}
            className="premium-button flex h-12 items-center gap-2 bg-slate-900 px-6 text-sm text-white group-hover:bg-primary"
          >
            Play Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </MotionDiv>
  );
}