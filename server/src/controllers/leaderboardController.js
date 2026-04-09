import User from "../models/User.js";
import QuizAttempt from "../models/QuizAttempt.js";

const mapUsersForLeaderboard = (users) =>
  users.map((u) => ({
    _id: u._id,
    name: u.name,
    avatar: u.avatar,
    score: u.totalScore || 0,
    quizzesPlayed: u.quizzesPlayed || 0,
  }));

const getFallbackUsers = async () => {
  const users = await User.find()
    .select("name avatar totalScore quizzesPlayed")
    .sort({ totalScore: -1, quizzesPlayed: -1 });

  return mapUsersForLeaderboard(users);
};

export const getLeaderboard = async (req, res) => {
  try {
    const { range = "all" } = req.query;
    const now = new Date();

    let matchStage = {};

    if (range === "today") {
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      matchStage = {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      };
    } else if (range === "week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - 7);

      matchStage = {
        createdAt: {
          $gte: startOfWeek,
        },
      };
    } else if (range === "month") {
      const startOfMonth = new Date();
      startOfMonth.setMonth(now.getMonth() - 1);

      matchStage = {
        createdAt: {
          $gte: startOfMonth,
        },
      };
    } else if (range === "all") {
      return res.json(await getFallbackUsers());
    }

    const rows = await QuizAttempt.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$user",
          score: { $sum: "$score" },
          quizzesPlayed: { $sum: 1 },
        },
      },
      { $sort: { score: -1, quizzesPlayed: -1 } },
    ]);

    // Keep leaderboard populated for time ranges with no recent attempts.
    if (!rows.length) {
      return res.json(await getFallbackUsers());
    }

    const userIds = rows.map((r) => r._id);

    const users = await User.find({
      _id: { $in: userIds },
    }).select("name avatar");

    const userMap = new Map(users.map((u) => [String(u._id), u]));

    return res.json(
      rows.map((r) => {
        const user = userMap.get(String(r._id));

        return {
          _id: r._id,
          name: user?.name || "Unknown User",
          avatar: user?.avatar || "",
          score: r.score || 0,
          quizzesPlayed: r.quizzesPlayed || 0,
        };
      })
    );
  } catch (error) {
    console.error("Leaderboard error:", error);
    return res.status(500).json({
      message: "Failed to fetch leaderboard",
    });
  }
};