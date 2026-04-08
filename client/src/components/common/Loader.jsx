import React from "react";

export default function Loader({ label = "Loading...", className = "" }) {
  return (
    <div className={`flex w-full items-center justify-center py-16 ${className}`}>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
        <span
          aria-hidden="true"
          className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-primary"
        />
        <span className="text-sm font-semibold text-slate-600">{label}</span>
      </div>
    </div>
  );
}
