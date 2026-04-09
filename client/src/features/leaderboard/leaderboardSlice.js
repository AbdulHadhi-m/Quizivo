import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchLeaderboard = createAsyncThunk(
  "leaderboard/fetchLeaderboard",
  async (range = "all", { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/leaderboard", {
        params: { range },
      });

      let leaderboardData = [];

      if (Array.isArray(data)) {
        leaderboardData = data;
      } else if (Array.isArray(data?.users)) {
        leaderboardData = data.users;
      } else if (Array.isArray(data?.leaderboard)) {
        leaderboardData = data.leaderboard;
      } else if (Array.isArray(data?.data)) {
        leaderboardData = data.data;
      }

      return {
        range,
        users: leaderboardData,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load leaderboard"
      );
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    users: [],
    range: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setRange: (state, action) => {
      state.range = action.payload;
    },
    clearLeaderboard: (state) => {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.range = action.payload.range;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload || "Failed to load leaderboard";
      });
  },
});

export const { setRange, clearLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;