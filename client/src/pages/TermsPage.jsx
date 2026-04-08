import MainLayout from "../components/layout/MainLayout";

export default function TermsPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-16 md:pt-36 bg-mesh min-h-screen">
        <div className="container-app">
          <div className="glass-card p-10 md:p-14 shadow-2xl max-w-4xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Legal
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-black text-slate-900">
              Terms of Service
            </h1>

            <div className="mt-8 space-y-6 text-slate-600 leading-relaxed">
              <p>
                By using Quizivo, you agree to use the platform responsibly and comply with
                applicable laws. Do not attempt to abuse, disrupt, or reverse engineer the
                service.
              </p>
              <p>
                Accounts are for personal use. You are responsible for keeping your login
                details secure. We may suspend accounts that violate these terms.
              </p>
              <p className="text-sm text-slate-500">
                This is a project/demo policy page. Replace with your official terms before
                production use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

