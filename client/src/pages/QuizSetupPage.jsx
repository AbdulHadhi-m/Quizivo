import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { dummyCategories } from "../data/dummyCategories";
import { motion } from "framer-motion";
import {
  Timer,
  LayoutGrid,
  BarChart3,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import { generateAIQuizAPI } from "../services/quizService";

const MotionDiv = motion.div;

const difficultyOptions = ["easy", "medium", "hard"];
const typeOptions = ["multiple", "boolean"];
const questionOptions = [5, 10, 15];
const timerOptions = [30, 60, 90, 120];

export default function QuizSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = useMemo(() => {
    const incoming = location.state?.category;
    if (typeof incoming !== "string") return "General Knowledge";

    const matched = dummyCategories.find(
      (item) => item.name.toLowerCase() === incoming.toLowerCase()
    );

    return matched?.name || incoming;
  }, [location.state]);

  const [formData, setFormData] = useState({
    category: initialCategory,
    amount: 10,
    difficulty: "easy",
    type: "multiple",
    time: 60,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleStart = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await generateAIQuizAPI(formData);
      const questions = Array.isArray(response?.questions) ? response.questions : [];

      if (!questions.length) {
        throw new Error("No questions were generated. Please try again.");
      }

      navigate("/quiz/play", {
        state: {
          ...formData,
          questions,
        },
      });
    } catch (error) {
      console.error("Gemini quiz generation failed:", error);
      setErrorMessage(error.message || "Failed to generate quiz. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="bg-[#fffaf3] py-24 md:py-32">
        <div className="container-app">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-primary">
              Personalize
            </span>
            <h1 className="section-title">Configure Your Challenge</h1>
            <p className="section-subtitle mx-auto">
              Custom-tailor your learning experience. Select your preferred
              difficulty, length, and topic to begin.
            </p>
          </MotionDiv>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-12">
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
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
                        <div className="text-4xl filter grayscale transition-all duration-300 group-hover:grayscale-0">
                          {item.emoji}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display leading-tight text-slate-900 font-bold">
                            {item.name}
                          </h4>
                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        {active && (
                          <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

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

            <aside className="h-fit lg:sticky lg:top-32">
              <div className="glass-card relative overflow-hidden bg-slate-900 p-10 text-white shadow-2xl">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-light/60">
                    Your Selection
                  </span>
                  <h3 className="font-display mt-2 mb-8 text-2xl font-black">
                    Summary
                  </h3>

                  <div className="space-y-6">
                    <SummaryRow label="Category" value={formData.category} />
                    <SummaryRow
                      label="Difficulty"
                      value={formData.difficulty}
                    />
                    <SummaryRow label="Questions" value={formData.amount} />
                    <SummaryRow
                      label="Type"
                      value={formData.type}
                    />
                    <SummaryRow
                      label="Timer"
                      value={`${formData.time} Seconds`}
                    />
                  </div>

                  <button
                    onClick={handleStart}
                    disabled={loading}
                    className="premium-button mt-12 flex w-full items-center justify-center gap-3 bg-white px-8 py-5 text-slate-900 shadow-xl hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <PlayCircle size={22} className="text-primary" />
                    {loading ? "Generating AI Quiz..." : "Begin Quiz"}
                  </button>

                  <p className="mt-6 text-center text-xs font-medium italic text-white/40">
                    You're about to engage in a timed session.
                  </p>
                  {errorMessage ? (
                    <p className="mt-4 text-center text-xs font-semibold text-rose-300">
                      {errorMessage}
                    </p>
                  ) : null}
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
    <div className="glass-card border-slate-100 p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-primary">{icon}</div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const active = value === item;

          return (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`min-w-[80px] flex-1 rounded-xl px-4 py-3 text-sm font-bold capitalize transition-all duration-300 ${
                active
                  ? "bg-primary text-white shadow-lg"
                  : "border border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              {item}
              {suffix}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-white/40">
        {label}
      </span>
      <span className="font-display font-medium capitalize text-white">
        {value}
      </span>
    </div>
  );
}