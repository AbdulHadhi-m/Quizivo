export default function QuestionPalette({
  questions,
  currentIndex,
  answersMap,
  setCurrentIndex,
}) {
  return (
    <div className="glass-card p-6 shadow-premium">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-black text-slate-900 leading-none">Question Hub</h3>
          <p className="mt-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400 font-body">
            Quick Navigation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {questions.map((question, index) => {
          const isActive = currentIndex === index;
          const isAnswered = Boolean(answersMap[question.id]);

          return (
            <button
              key={question.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex h-11 w-full items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg scale-110 z-10"
                  : isAnswered
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              }`}
            >
              {index + 1}
              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-slate-900" />
          <span className="text-xs font-bold text-slate-600">Current Question</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs font-bold text-slate-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-slate-200" />
          <span className="text-xs font-bold text-slate-600">Pending</span>
        </div>
      </div>
    </div>
  );
}