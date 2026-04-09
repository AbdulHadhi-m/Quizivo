import MainLayout from "../components/layout/MainLayout";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Coins, Crown, Sparkles } from "lucide-react";
import Loader from "../components/common/Loader";
import {
  fetchLeaderboard,
  setRange,
} from "../features/leaderboard/leaderboardSlice";
import {
  selectLeaderboardUsers,
  selectLeaderboardLoading,
  selectLeaderboardRange,
} from "../features/leaderboard/leaderboardSelectors";

const ranges = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "week", label: "Weekly" },
  { key: "month", label: "Monthly" },
];

const getCartoonAvatar = (name = "Player") =>
  `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

function Avatar({ name, avatarUrl, size = "h-16 w-16", winner = false }) {
  const src = avatarUrl || getCartoonAvatar(name);

  return (
    <div className="relative">
      {winner && (
        <div className="absolute -top-2 -right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-orange-700 shadow-md">
          <Crown size={14} />
        </div>
      )}

      <div className="rounded-full bg-white p-1 shadow-md">
        <img
          src={src}
          alt={name}
          className={`${size} rounded-full object-cover bg-orange-50`}
        />
      </div>
    </div>
  );
}

function PodiumCard({ place, user, height, winner = false }) {
  return (
    <div className="flex flex-col items-center justify-end">
      <Avatar
        name={user?.name || "Player"}
        avatarUrl={user?.avatar}
        size={winner ? "h-20 w-20 md:h-24 md:w-24" : "h-16 w-16 md:h-20 md:w-20"}
        winner={winner}
      />

      <p className="mt-3 max-w-[110px] truncate text-center text-sm font-black text-slate-900">
        {user?.name || "—"}
      </p>

      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-orange-600 shadow-sm">
        <Coins size={14} />
        {user?.score ?? 0}
      </div>

      <div
        className={`mt-4 flex w-24 items-center justify-center rounded-t-[24px] bg-gradient-to-b from-orange-400 to-orange-600 text-white shadow-[0_14px_30px_rgba(249,115,22,0.28)] md:w-28 ${height}`}
      >
        <span className="text-4xl font-black md:text-5xl">{place}</span>
      </div>
    </div>
  );
}

function RankingRow({ user, index }) {
  const src = user?.avatar || getCartoonAvatar(user?.name || "Player");

  return (
    <div className="flex items-center justify-between rounded-2xl border border-orange-50 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-700">
          {index}
        </div>

        <img
          src={src}
          alt={user?.name}
          className="h-11 w-11 rounded-full bg-orange-50 p-0.5 shadow-sm"
        />

        <div>
          <p className="max-w-[150px] truncate text-sm font-black text-slate-900">
            {user?.name || "Unknown User"}
          </p>
          <p className="text-[11px] text-slate-500">
            {user?.quizzesPlayed ?? 0} quizzes played
          </p>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-extrabold text-orange-600">
        <Coins size={14} />
        {user?.score ?? 0}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const dispatch = useDispatch();

  const users = useSelector(selectLeaderboardUsers);
  const loading = useSelector(selectLeaderboardLoading);
  const range = useSelector(selectLeaderboardRange);

  useEffect(() => {
    dispatch(fetchLeaderboard(range));
  }, [dispatch, range]);

  const top3 = useMemo(() => users.slice(0, 3), [users]);
  const rest = useMemo(() => users.slice(3), [users]);

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#f8f5ee] px-4 pb-14 pt-24 md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 top-24 h-60 w-60 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-yellow-200/25 blur-3xl" />
          <div className="absolute bottom-8 left-1/3 h-44 w-44 rounded-full bg-orange-100/30 blur-3xl" />
          <div className="absolute left-16 top-40 text-3xl text-orange-300">✦</div>
          <div className="absolute right-20 top-52 text-2xl text-yellow-400">✦</div>
          <div className="absolute right-32 top-28 text-4xl text-orange-300">~</div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-orange-500 shadow-sm">
              <Sparkles size={14} />
              Quizivo Champions
            </div> */}

            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Leaderboard
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-[15px]">
              Track all quiz players from MongoDB, then compare today, weekly,
              and monthly performance on Quizivo.
            </p>

            <div className="mx-auto mt-7 inline-flex items-center rounded-full border-2 border-slate-900 bg-white p-1 shadow-sm">
              {ranges.map((r) => (
                <button
                  key={r.key}
                  onClick={() => dispatch(setRange(r.key))}
                  className={`min-w-[96px] rounded-full px-5 py-2.5 text-sm font-extrabold transition ${
                    range === r.key
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] bg-white/80 px-5 pb-8 pt-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur md:px-8 lg:px-10">
              {loading ? (
                <div className="py-20">
                  <Loader />
                </div>
              ) : top3.length > 0 ? (
                <div className="flex items-end justify-center gap-4 md:gap-6">
                  <PodiumCard
                    place={2}
                    user={top3[1]}
                    height="h-32 md:h-36 lg:h-40"
                  />
                  <PodiumCard
                    place={1}
                    user={top3[0]}
                    height="h-40 md:h-48 lg:h-52"
                    winner
                  />
                  <PodiumCard
                    place={3}
                    user={top3[2]}
                    height="h-28 md:h-32 lg:h-36"
                  />
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm font-medium text-slate-500">
                  No leaderboard data found for this range
                </div>
              )}
            </div>

            <div className="rounded-[32px] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                    Ranking List
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 md:text-sm">
                    All players after top 3
                  </p>
                </div>

                <div className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-orange-500 md:text-xs">
                  Top {users.length || 0}
                </div>
              </div>

              <div className="mt-5">
                {loading ? (
                  <div className="py-10">
                    <Loader />
                  </div>
                ) : rest.length > 0 ? (
                  <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                    {rest.map((user, i) => (
                      <RankingRow
                        key={user?._id || i}
                        user={user}
                        index={i + 4}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
                    No additional rankings available
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[26px] bg-white p-5 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Current Winner
              </p>
              <p className="mt-2 truncate text-xl font-black text-slate-900">
                {top3[0]?.name || "No user"}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-extrabold text-orange-600">
                <Coins size={14} />
                {top3[0]?.score ?? 0} points
              </div>
            </div>

            <div className="rounded-[26px] bg-white p-5 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Total Players
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {users.length}
              </p>
            </div>

            <div className="rounded-[26px] bg-white p-5 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Top Score
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {top3[0]?.score ?? 0}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}