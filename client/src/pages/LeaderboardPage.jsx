import MainLayout from "../components/layout/MainLayout";

const topUsers = [
  { id: 1, name: "Ava", score: 980, rank: 1, emoji: "🥇" },
  { id: 2, name: "Liam", score: 940, rank: 2, emoji: "🥈" },
  { id: 3, name: "Noah", score: 910, rank: 3, emoji: "🥉" },
];

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-14 md:pt-36">
        <div className="container-app">
          <h1 className="section-title">Leaderboard</h1>
          <p className="section-subtitle">
            See the top Quizivo players and climb the rankings.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {topUsers.map((user) => (
              <div key={user.id} className="quiz-card p-6 text-center">
                <div className="text-6xl">{user.emoji}</div>
                <h3 className="mt-4 text-2xl font-black text-slate-900">
                  {user.name}
                </h3>
                <p className="mt-1 text-slate-500">Rank #{user.rank}</p>
                <p className="mt-4 text-3xl font-black text-orange-500">
                  {user.score}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}