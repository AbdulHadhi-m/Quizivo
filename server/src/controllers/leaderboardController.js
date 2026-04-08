import User from "../models/User.js";
import QuizAttempt from "../models/QuizAttempt.js";

export const getLeaderboard = async (req, res) => {
  const { range } = req.query;

  const now = new Date();
  let fromDate = null;

  if (range === "today") {
    fromDate = new Date(now);
    fromDate.setHours(0, 0, 0, 0);
  } else if (range === "week") {
    fromDate = new Date(now);
    fromDate.setDate(now.getDate() - 7);
  } else if (range === "month") {
    fromDate = new Date(now);
    fromDate.setMonth(now.getMonth() - 1);
  }

  // Default: all-time leaderboard from User totals
  if (!fromDate) {
    const users = await User.find()
      .select("name avatar totalScore quizzesPlayed")
      .sort({ totalScore: -1, quizzesPlayed: -1 })
      .limit(20);

    return res.json(
      users.map((u) => ({
        _id: u._id,
        name: u.name,
        avatar: u.avatar,
        score: u.totalScore,
        quizzesPlayed: u.quizzesPlayed,
      }))
    );
  }

  // Time-ranged leaderboard from attempts
  const rows = await QuizAttempt.aggregate([
    { $match: { createdAt: { $gte: fromDate } } },
    {
      $group: {
        _id: "$user",
        score: { $sum: "$score" },
        quizzesPlayed: { $sum: 1 },
      },
    },
    { $sort: { score: -1, quizzesPlayed: -1 } },
    { $limit: 20 },
  ]);

  const userIds = rows.map((r) => r._id);
  const users = await User.find({ _id: { $in: userIds } }).select("name avatar");
  const userMap = new Map(users.map((u) => [String(u._id), u]));

  res.json(
    rows.map((r) => {
      const u = userMap.get(String(r._id));
      return {
        _id: r._id,
        name: u?.name || "Unknown",
        avatar: u?.avatar || "",
        score: r.score || 0,
        quizzesPlayed: r.quizzesPlayed || 0,
      };
    })
  );
};