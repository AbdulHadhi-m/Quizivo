import MainLayout from "../components/layout/MainLayout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-36 bg-mesh min-h-screen">
        <div className="container-app">
          <div className="glass-card p-10 md:p-14 shadow-2xl max-w-4xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Legal
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-black text-slate-900">
              Privacy Policy
            </h1>

            <div className="mt-8 space-y-6 text-slate-600 leading-relaxed">
              <p>
                Quizivo stores your account information (name, email) and gameplay data
                (quiz attempts, scores) to provide features like profiles and leaderboards.
              </p>
              <p>
                We do not sell your personal information. You can update your avatar and
                profile experience within the app.
              </p>
              <p className="text-sm text-slate-500">
                This is a project/demo policy page. Replace with your official privacy policy
                before production use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

