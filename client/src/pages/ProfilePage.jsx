import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../components/layout/MainLayout";
import axios from "../api/axios";
import Loader from "../components/common/Loader";
import { User, Trophy, BarChart3, Clock, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get("/quiz/my-attempts");
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <Loader />;

  return (
    <MainLayout>
      <section className="py-20 md:py-28 bg-mesh min-h-screen">
        <div className="container-app">
          {/* Header Profile Section */}
          <div className="glass-card p-10 md:p-14 shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-32 w-32 rounded-full bg-white p-1 shadow-xl">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User size={64} />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-black text-slate-900">{user?.name}</h1>
                  <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {user?.role || 'Explorer'}
                  </span>
                </div>
                <p className="text-slate-500 font-medium text-lg">{user?.email}</p>
                
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-8">
                  <StatItem icon={<Trophy className="text-orange-500" size={18} />} label="Total Score" value={user?.totalScore || 0} />
                  <StatItem icon={<BarChart3 className="text-blue-500" size={18} />} label="Quizzes Played" value={user?.quizzesPlayed || 0} />
                  <StatItem icon={<Clock className="text-emerald-500" size={18} />} label="Joined" value={new Date(user?.createdAt).toLocaleDateString()} />
                </div>
              </div>
            </div>
          </div>

          {/* Quiz History Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900">Quiz History</h2>
              <div className="text-slate-400 font-bold text-sm">{history.length} Sessions Total</div>
            </div>

            <div className="grid gap-6">
              {history.map((attempt) => (
                <div key={attempt._id} className="glass-card p-6 md:p-8 hover:shadow-premium transition-all group">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                         <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Trophy size={28} />
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{attempt.category?.name || 'Quiz Session'}</h3>
                            <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                               <span className="capitalize">{attempt.difficulty}</span>
                               <span className="h-1 w-1 rounded-full bg-slate-300" />
                               <span>{new Date(attempt.createdAt).toLocaleDateString()}</span>
                            </p>
                         </div>
                      </div>

                      <div className="flex items-center gap-12">
                         <div className="text-center">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Score</p>
                            <p className="text-2xl font-black text-slate-900">{attempt.score}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Accuracy</p>
                            <p className="text-2xl font-black text-primary">{attempt.percentage}%</p>
                         </div>
                         <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                            <ChevronRight size={20} />
                         </div>
                      </div>
                   </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="glass-card p-20 text-center border-dashed border-2 border-slate-200 bg-transparent">
                  <div className="mx-auto h-20 w-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                    <Clock size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No History Yet</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8">You haven't completed any quizzes yet. Start your first session now!</p>
                  <button className="premium-button bg-primary px-8 py-4 text-white">Start New Quiz</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 leading-none mb-1">{label}</p>
        <p className="text-lg font-bold text-slate-900 leading-none">{value}</p>
      </div>
    </div>
  );
}