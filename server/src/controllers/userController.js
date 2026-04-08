import User from "../models/User.js";

export const updateMyAvatar = async (req, res) => {
  const { avatar } = req.body;

  if (!avatar || typeof avatar !== "string") {
    res.status(400);
    throw new Error("Avatar is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.avatar = avatar;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    totalScore: user.totalScore,
    quizzesPlayed: user.quizzesPlayed,
    createdAt: user.createdAt,
  });
};

