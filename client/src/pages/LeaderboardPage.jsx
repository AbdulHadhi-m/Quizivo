import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Loader from "../components/common/Loader";
import { Coins } from "lucide-react";

const ranges = [
  { key: "today", label: "Today" },
  { key: "week", label: "Weekly" },
  { key: "month", label: "Monthly" },
];

function Avatar({ name, avatarUrl }) {
  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U";

  return avatarUrl ? (
    <img
      src={avatarUrl}
      alt={name}
      className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
    />
  ) : (
    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 text-white font-black flex items-center justify-center ring-2 ring-white shadow">
      {initials}
    </div>
  );
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("today");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/leaderboard", { params: { range } });
        if (!mounted) return;
        setUsers(data);
      } catch (e) {
        console.error("Failed to load leaderboard", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [range]);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-36 bg-mesh min-h-screen">
        <div className="container-app">
          <div className="text-center">
            <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Leaderboard
            </h1>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/60 shadow-glass p-1 backdrop-blur">
              {ranges.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRange(r.key)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition ${
                    range === r.key
                      ? "bg-secondary text-white shadow"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px] items-start">
            {/* Podium */}
            <div className="glass-card p-8 md:p-10 overflow-hidden relative">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.25),transparent_40%)]" />
              <div className="relative">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="mx-auto max-w-xl">
                    <div className="flex items-end justify-center gap-4 md:gap-8">
                      {[
                        { idx: 1, place: 2, height: "h-28 md:h-32", label: "2" },
                        { idx: 0, place: 1, height: "h-36 md:h-44", label: "1" },
                        { idx: 2, place: 3, height: "h-24 md:h-28", label: "3" },
                      ].map(({ idx, place, height, label }) => {
                        const u = top3[idx];
                        return (
                          <div key={place} className="flex flex-col items-center gap-3 w-28 md:w-32">
                            <div className="flex flex-col items-center">
                              <div className="relative">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-secondary to-primary blur opacity-30" />
                                <div className="relative rounded-full bg-white p-1">
                                  <Avatar name={u?.name} avatarUrl={u?.avatar} />
                                </div>
                              </div>
                              <div className="mt-3 text-center">
                                <div className="text-sm font-black text-slate-900 truncate">
                                  {u?.name || "—"}
                                </div>
                                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-100">
                                  <Coins size={14} className="text-secondary" />
                                  {u?.score ?? 0}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`w-full ${height} rounded-3xl bg-gradient-to-b from-secondary to-orange-600 text-white flex items-center justify-center shadow-premium`}
                            >
                              <span className="font-display text-3xl md:text-4xl font-black">
                                {label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ranked list */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-slate-900">
                  Ranking
                </h2>
                <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                  Top 20
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {loading ? (
                  <Loader />
                ) : (
                  rest.map((u, i) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between rounded-2xl bg-white/70 border border-white/60 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-slate-100 text-slate-700 font-black flex items-center justify-center">
                          {i + 4}
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} avatarUrl={u.avatar} />
                          <div>
                            <div className="font-bold text-slate-900 leading-none">
                              {u.name}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              {u.quizzesPlayed ?? 0} quizzes
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 font-black text-orange-600">
                        <Coins size={16} />
                        {u.score ?? 0}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}