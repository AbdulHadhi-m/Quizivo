import axios from "axios";

export const generateAIQuizAPI = async (quizData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/ai-quiz/generate`,
      quizData
    );

    return response.data;
  } catch (error) {
    const messageFromApi = error?.response?.data?.message;
    const message =
      typeof messageFromApi === "string" && messageFromApi.trim()
        ? messageFromApi
        : "Failed to generate AI quiz.";
    throw new Error(message);
  }
};