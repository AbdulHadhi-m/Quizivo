import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  const users = await User.find()
    .select("name avatar totalScore quizzesPlayed")
    .sort({ totalScore: -1, quizzesPlayed: -1 })
    .limit(20);

  res.json(users);
};