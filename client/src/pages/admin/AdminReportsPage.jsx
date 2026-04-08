import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MainLayout from "../../components/layout/MainLayout";
import Loader from "../../components/common/Loader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axios.get("/admin/stats");
        setData(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <Loader />;

  const pieData = [
    { name: "Correct", value: data?.recentAttempts?.reduce((acc, curr) => acc + curr.correctAnswers, 0) || 0 },
    { name: "Incorrect", value: data?.recentAttempts?.reduce((acc, curr) => acc + curr.wrongAnswers, 0) || 0 },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <MainLayout>
      <div className="container-app py-10">
        <h1 className="text-3xl font-bold mb-8">Platform Reports & Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-200">Recent Performance Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-gray-400">Correct Answers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="text-sm text-gray-400">Incorrect Answers</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-200">Latest Quiz Scores</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.recentAttempts?.map((a, i) => ({ name: `Attempt ${i+1}`, score: a.score }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-gray-800 rounded-2xl p-6 border border-gray-700">
           <h2 className="text-xl font-bold mb-4">Summary Statistics</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Avg Accuracy</p>
                 <p className="text-2xl font-bold text-blue-400">
                    {data?.recentAttempts?.length 
                      ? Math.round(data.recentAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / data.recentAttempts.length) 
                      : 0}%
                 </p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Points</p>
                 <p className="text-2xl font-bold text-emerald-400">
                    {data?.recentAttempts?.reduce((acc, curr) => acc + curr.score, 0) || 0}
                 </p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Active Quizzes</p>
                 <p className="text-2xl font-bold text-purple-400">{data?.stats?.questions || 0}</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Players</p>
                 <p className="text-2xl font-bold text-orange-400">{data?.stats?.users || 0}</p>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}