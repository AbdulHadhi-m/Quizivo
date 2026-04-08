import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import axios from "../api/axios";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import { Play, ArrowLeft, Trophy, BarChart, Clock } from "lucide-react";

export default function CategoryDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`/categories/${slug}`);
        setCategory(data);
        setImageError(false);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) return <Loader />;

  if (!category) {
    return (
      <MainLayout>
        <div className="container-app py-20 text-center">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <Button onClick={() => navigate("/categories")} className="mt-6">
            Back to Categories
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-20 md:py-32">
        <div className="container-app">
          <button
            onClick={() => navigate("/categories")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to all categories</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[40px] blur-2xl opacity-10 animate-pulse" />
              {category.image && !imageError ? (
                <img
                  src={category.image}
                  alt={category.name}
                  onError={() => setImageError(true)}
                  className="relative rounded-[40px] shadow-2xl w-full h-[400px] object-cover border border-white/20"
                />
              ) : (
                <div
                  className={`relative rounded-[40px] shadow-2xl w-full h-[400px] border border-white/20 overflow-hidden bg-gradient-to-br ${
                    category.color || "from-slate-200 to-slate-100"
                  }`}
                >
                  <div className="absolute inset-0 bg-mesh opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl drop-shadow-sm">
                        {category.emoji || "🧠"}
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-700">
                        {category.name}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                 <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                    <Trophy size={14} />
                    Expert Recommended
                 </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-black text-slate-900 leading-none mb-6">
                  {category.name}
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 py-8 border-y border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <BarChart size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Difficulty</p>
                    <p className="text-lg font-bold text-slate-900">Adaptive</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Duration</p>
                    <p className="text-lg font-bold text-slate-900">Customizable</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    navigate("/quiz/setup", {
                      state: { category: category.name },
                    })
                  }
                  className="premium-button flex items-center gap-3 bg-primary px-10 py-5 text-white shadow-xl hover:scale-105 transition-all"
                >
                  <Play size={20} fill="currentColor" />
                  Start Your Mission
                </button>
                <button
                  onClick={() =>
                    navigate("/quiz/play", {
                      state: {
                        category: category.name,
                        amount: 10,
                        difficulty: "easy",
                        type: "multiple",
                        practice: true,
                      },
                    })
                  }
                  className="premium-button flex items-center gap-3 border border-slate-200 bg-white px-10 py-5 text-slate-700 hover:bg-slate-50"
                >
                   Practice Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}