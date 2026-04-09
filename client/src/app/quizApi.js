import axios from "../api/axios";

const submitQuizAttemptAPI = async (payload) => {
  const { data } = await axios.post("/quiz/attempt", payload);
  return data;
};

export default submitQuizAttemptAPI;    