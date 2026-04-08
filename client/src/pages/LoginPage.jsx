import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { loginUserAPI } from "../api/authApi";
import { setUser } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      setLoading(true);
      const data = await loginUserAPI(formData);
      dispatch(setUser(data));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="py-14">
        <div className="container-app">
          <div className="mx-auto max-w-md quiz-card p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Login</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-300">
              Welcome back to Quizivo.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-2xl border border-orange-100 bg-white/50 px-4 py-3 outline-none focus:border-orange-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-2xl border border-orange-100 bg-white/50 px-4 py-3 outline-none focus:border-orange-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 dark:bg-orange-500"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account? <Link to="/register" className="font-semibold text-orange-500 hover:text-orange-600">Sign up</Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}