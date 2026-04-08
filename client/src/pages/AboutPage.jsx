import MainLayout from "../components/layout/MainLayout";

export default function AboutPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-36 bg-mesh min-h-screen">
        <div className="container-app">
          <div className="glass-card p-10 md:p-14 shadow-2xl max-w-4xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              About
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-black text-slate-900">
              About Quizivo
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Quizivo is a premium quiz platform built to make learning feel like a game—
              fast, beautiful, and motivating. Explore categories, practice without pressure,
              and climb the leaderboard as you level up.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Feature title="Premium UI" desc="Modern glassy layout with smooth interactions." />
              <Feature title="MongoDB Backend" desc="Scores, attempts, leaderboard and profiles persist." />
              <Feature title="Practice Mode" desc="Learn freely with timer off, then take the real challenge." />
            </div>

            <div className="mt-12 border-t border-slate-100 pt-8">
              <p className="text-sm font-bold text-slate-900">Created by</p>
              <p className="mt-2 text-slate-600">
                <span className="font-black text-slate-900">Abdul Hadhi</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white/70 p-6 shadow-sm">
      <h3 className="font-display text-xl font-black text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

