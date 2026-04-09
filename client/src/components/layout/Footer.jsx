import { Sparkles, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white pt-16 pb-8">
      <div className="container-app">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg transition-transform group-hover:rotate-12">
  <img
    src="/favicon.png"
    alt="logo"
    className="h-full w-full object-cover"
  />
</div>
              <h3 className="font-display text-2xl font-black text-slate-900 leading-none">Quizivo</h3>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-xs">
              The world's most delightful quiz platform. We make learning interactive, 
              competitive, and most importantly, fun.
            </p>
            <div className="mt-8 flex gap-4">
              <SocialLink
                href="https://x.com/hadhixz"
                label="X (Twitter)"
                icon={<Twitter size={18} />}
              />
              <SocialLink
                href="https://github.com/AbdulHadhi-m"
                label="GitHub"
                icon={<Github size={18} />}
              />
              <SocialLink
                href="https://www.linkedin.com/in/abdul-hadhi-m/"
                label="LinkedIn"
                icon={<Linkedin size={18} />}
              />
              <SocialLink href="#" label="Email" icon={<Mail size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-slate-900 uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4">
              <FooterLink label="All Categories" to="/categories" />
              <FooterLink label="Weekly Challenge" to="/quiz/setup" />
              <FooterLink label="Global Leaderboard" to="/leaderboard" />
              <FooterLink label="Practice Mode" to="/quiz/setup" />
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-slate-900 uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink label="About Quizivo" to="/about" />
              <FooterLink label="Terms of Service" to="/terms" />
              <FooterLink label="Privacy Policy" to="/privacy" />
            </ul>
          </div>

          <div>
             <div className="glass-card p-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 blur-xl rounded-full" />
                <h5 className="font-display font-bold text-lg mb-2">Join the Club</h5>
                <p className="text-xs text-white/60 leading-relaxed mb-4">Get notified about new categories and special events.</p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 transition-colors" 
                  />
                  <button className="bg-orange-500 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-primary-dark transition-colors">
                    Subscribe
                  </button>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-400">
            © 2026 Quizivo Labs. Built with precision and passion.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, to }) {
  return (
    <li>
      <Link to={to} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
        {label}
      </Link>
    </li>
  );
}

function SocialLink({ icon, href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
    >
      {icon}
    </a>
  );
}