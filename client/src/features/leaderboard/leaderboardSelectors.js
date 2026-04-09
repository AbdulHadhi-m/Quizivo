export const selectLeaderboardUsers = (state) => state.leaderboard.users;

export const selectLeaderboardLoading = (state) => state.leaderboard.loading;

export const selectLeaderboardError = (state) => state.leaderboard.error;

export const selectLeaderboardRange = (state) => state.leaderboard.range;

export const selectTopThreeUsers = (state) =>
  state.leaderboard.users.slice(0, 3);

export const selectRemainingUsers = (state) =>
  state.leaderboard.users.slice(3);