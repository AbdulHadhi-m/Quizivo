import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { dummyCategories } from "../data/dummyCategories";
import { motion } from "framer-motion";
import { Timer, LayoutGrid, BarChart3, ListChecks, PlayCircle } from "lucide-react";

const MotionDiv = motion.div;

const difficultyOptions = ["easy", "medium", "hard"];
const typeOptions = ["multiple", "boolean"];
const questionOptions = [5, 10, 15];
const timerOptions = [30, 60, 90, 120];

export default function QuizSetupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "General Knowledge",
    amount: 10,
    difficulty: "easy",
    type: "multiple",
    time: 60,
  });

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleStart = () => {
    navigate("/quiz/play", { state: formData });
  };

  return (
    <MainLayout>
      <section className="py-24 md:py-32">
        <div className="container-app">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 block">Personalize</span>
            <h1 className="section-title">Configure Your Challenge</h1>
            <p className="section-subtitle mx-auto">
              Custom-tailor your learning experience. Select your preferred 
              difficulty, length, and topic to begin.
            </p>
          </MotionDiv>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-12">
              {/* Category Grid */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg">
                    <ListChecks size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-black text-slate-900">
                    Which topic to explore?
                  </h3>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {dummyCategories.map((item) => {
                    const active = formData.category === item.name;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect("category", item.name)}
                        className={`group relative flex items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-100 bg-white hover:border-slate-200"
                        }`}
                      >
                        <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                          {item.emoji}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                        {active && (
                          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Other Options */}
              <div className="grid gap-8 md:grid-cols-2">
                <SelectorGroup
                  icon={<BarChart3 size={18} />}
                  title="Difficulty Level"
                  options={difficultyOptions}
                  value={formData.difficulty}
                  onChange={(v) => handleSelect("difficulty", v)}
                />
                <SelectorGroup
                  icon={<LayoutGrid size={18} />}
                  title="Question Type"
                  options={typeOptions}
                  value={formData.type}
                  onChange={(v) => handleSelect("type", v)}
                />
                <SelectorGroup
                  icon={<ListChecks size={18} />}
                  title="Question Count"
                  options={questionOptions}
                  value={formData.amount}
                  onChange={(v) => handleSelect("amount", v)}
                />
                <SelectorGroup
                  icon={<Timer size={18} />}
                  title="Time Limit"
                  options={timerOptions}
                  value={formData.time}
                  onChange={(v) => handleSelect("time", v)}
                  suffix=" sec"
                />
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside className="lg:sticky lg:top-32 h-fit">
              <div className="glass-card p-10 bg-slate-900 text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-black tracking-widest text-primary-light/60">Your Selection</span>
                  <h3 className="font-display text-2xl font-black mt-2 mb-8">Summary</h3>
                  
                  <div className="space-y-6">
                    <SummaryRow label="Category" value={formData.category} />
                    <SummaryRow label="Difficulty" value={formData.difficulty} />
                    <SummaryRow label="Questions" value={formData.amount} />
                    <SummaryRow label="Timer" value={`${formData.time} Seconds`} />
                  </div>

                  <button
                    onClick={handleStart}
                    className="premium-button mt-12 w-full flex items-center justify-center gap-3 bg-white px-8 py-5 text-slate-900 hover:bg-slate-50 shadow-xl"
                  >
                    <PlayCircle size={22} className="text-primary" />
                    Begin Quiz
                  </button>
                  
                  <p className="mt-6 text-center text-xs text-white/40 font-medium italic">
                    You're about to engage in a timed session. 
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function SelectorGroup({ title, options, value, onChange, icon, suffix = "" }) {
  return (
    <div className="glass-card p-6 border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const active = value === item;
          return (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`flex-1 min-w-[80px] rounded-xl px-4 py-3 text-sm font-bold capitalize transition-all duration-300 ${
                active
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white border border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              {item}{suffix}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4">
      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</span>
      <span className="font-display font-medium text-white capitalize">{value}</span>
    </div>
  );
}
