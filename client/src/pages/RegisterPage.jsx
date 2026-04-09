import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { registerUserAPI } from "../api/authApi";
import { setUser } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      setLoading(true);
      const data = await registerUserAPI(formData);
      dispatch(setUser(data));
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout showFooter={false}>
      <section className="relative overflow-hidden bg-mesh py-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-24 h-48 w-48 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute right-6 top-10 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
        </div>

        <div className="container-app relative flex min-h-[calc(100vh-120px)] items-center justify-center py-10">
          <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-orange-500">
              <Sparkles size={14} />
              Start Journey
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Join Quizivo and start improving your score every day.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="relative">
                <UserRound
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-2xl border border-orange-100 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-orange-100 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div className="relative">
                <LockKeyhole
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-orange-100 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}