import { CheckCircle2, XCircle, Info } from "lucide-react";

export default function ReviewAnswerCard({ item, index }) {
  return (
    <div className="glass-card p-8 transition-all hover:shadow-premium group">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">
              {index + 1}
            </span>
            <div
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                item.isCorrect
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {item.isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
              {item.isCorrect ? "Correct" : "Incorrect"}
            </div>
          </div>

          <h3 className="font-display text-xl font-bold text-slate-900 leading-tight">
            {item.question}
          </h3>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className={`rounded-2xl p-5 border ${item.isCorrect ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Your Choice</p>
          <div className="flex items-center gap-3">
             <div className={`h-2 w-2 rounded-full ${item.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />
             <h4 className={`text-base font-bold ${item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
              {item.selectedAnswer || "No answer provided"}
            </h4>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Correct Answer</p>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-primary" />
             <h4 className="text-base font-bold text-slate-800">
              {item.answer}
            </h4>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Info size={20} />
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Expert Insight</p>
          <p className="text-sm font-medium leading-relaxed text-slate-600">
            {item.explanation || "No additional explanation available for this question."}
          </p>
        </div>
      </div>
    </div>
  );
}