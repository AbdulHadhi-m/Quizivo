import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Sparkles, Trophy, UserCircle2, Zap, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const MotionDiv = motion.div;

const navItems = [
  { label: "Home", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Challenge", path: "/quiz/setup" },
  { label: "Leaderboard", path: "/leaderboard" },
];

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <MotionDiv 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="container-app mx-auto pointer-events-auto"
      >
        <div className="flex h-20 items-center justify-between rounded-3xl border border-white/40 bg-white/60 px-6 backdrop-blur-2xl shadow-premium">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg transition-transform group-hover:rotate-12">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black text-slate-900 leading-none">Quizivo</h1>
              <div className="flex items-center gap-1 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Live Platform
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex bg-slate-100/50 p-1.5 rounded-2xl">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/leaderboard"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 shadow-sm transition hover:scale-105 hover:text-primary"
              >
                <Trophy size={20} />
              </Link>
              
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 shadow-sm transition hover:scale-105 hover:text-primary"
                  title="Profile"
                >
                  <UserCircle2 size={20} />
                </Link>
              )}
            </div>

            {isAuthenticated ? (
               <button
                 onClick={handleLogout}
                 className="premium-button hidden md:flex items-center gap-2 bg-slate-100 px-6 py-3 text-sm text-slate-700 hover:bg-slate-200"
               >
                 <LogOut size={16} />
                 Logout
               </button>
            ) : (
              <Link
                to="/login"
                className="premium-button hidden md:flex items-center gap-2 bg-slate-900 px-6 py-3 text-sm text-white hover:bg-slate-800"
              >
                <Zap size={16} className="text-primary-light" fill="currentColor" />
                Sign In
              </Link>
            )}

            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 lg:hidden focus:outline-none">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </MotionDiv>
    </header>
  );
}
