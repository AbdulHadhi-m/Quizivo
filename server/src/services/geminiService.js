import { GoogleGenAI } from "@google/genai";
import seededQuestions from "../seed/questions.js";

let aiClient = null;

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  return aiClient;
};

const BOOLEAN_OPTIONS = ["True", "False"];

const extractJsonArray = (rawText = "") => {
  const trimmed = String(rawText).trim();
  const withoutFence = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const start = withoutFence.indexOf("[");
  const end = withoutFence.lastIndexOf("]");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Gemini did not return a valid JSON array.");
  }

  return withoutFence.slice(start, end + 1);
};

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGeminiWithRetry = async (ai, payload, retries = 2) => {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await ai.models.generateContent(payload);
    } catch (error) {
      lastError = error;
      const status = Number(error?.status || error?.response?.status || 0);
      const isRetriable = status === 429 || status === 503;
      const hasMoreAttempts = attempt < retries;

      if (!isRetriable || !hasMoreAttempts) {
        break;
      }

      await wait(800 * (attempt + 1));
    }
  }

  const status = Number(lastError?.status || lastError?.response?.status || 0);
  const unavailableError = new Error(
    "AI service is busy right now. Please try again in a few seconds."
  );
  unavailableError.statusCode = status === 429 || status === 503 ? 503 : 500;
  throw unavailableError;
};

const getCandidateModels = () => {
  const candidates = [
    process.env.GEMINI_MODEL,
    "gemini-2.5-flash",
    "gemini-1.5-flash",
  ].filter(Boolean);

  return [...new Set(candidates)];
};

const generateFallbackQuestions = ({ category, difficulty, amount, type }) => {
  const normalizedCategory = String(category || "").trim().toLowerCase();
  const normalizedDifficulty = String(difficulty || "").trim().toLowerCase();
  const normalizedType = String(type || "").trim().toLowerCase();

  const exact = seededQuestions.filter(
    (item) =>
      String(item.categoryName || "").toLowerCase() === normalizedCategory &&
      String(item.difficulty || "").toLowerCase() === normalizedDifficulty &&
      String(item.type || "").toLowerCase() === normalizedType
  );

  const categoryTypeFallback = seededQuestions.filter(
    (item) =>
      String(item.categoryName || "").toLowerCase() === normalizedCategory &&
      String(item.type || "").toLowerCase() === normalizedType
  );

  const typeFallback = seededQuestions.filter(
    (item) => String(item.type || "").toLowerCase() === normalizedType
  );

  const basePool =
    exact.length > 0
      ? exact
      : categoryTypeFallback.length > 0
      ? categoryTypeFallback
      : typeFallback;

  if (!basePool.length) {
    throw new Error("No fallback questions available for the selected type.");
  }

  const shuffledPool = shuffleArray(basePool);
  const selected = [];

  while (selected.length < amount && shuffledPool.length > 0) {
    const next = shuffledPool[selected.length % shuffledPool.length];
    selected.push(next);
  }

  return selected.map((item, index) => {
    const options =
      normalizedType === "boolean"
        ? ["True", "False"]
        : shuffleArray(
            Array.isArray(item.options)
              ? item.options.map((opt) => String(opt))
              : []
          );

    const answer = String(item.answer || "");
    const correctAnswer =
      normalizedType === "boolean"
        ? answer.toLowerCase() === "false"
          ? "False"
          : "True"
        : options.includes(answer)
        ? answer
        : options[0] || answer;

    return {
      question: String(item.question || `Question ${index + 1}`),
      options,
      correctAnswer,
      category,
      difficulty,
      type,
    };
  });
};

export const validateAndNormalizeGeminiQuestions = (questions, expected) => {
  if (!Array.isArray(questions)) {
    throw new Error("Gemini response is not an array.");
  }

  if (questions.length !== expected.amount) {
    throw new Error(
      `Gemini returned ${questions.length} questions, expected ${expected.amount}.`
    );
  }

  return questions.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid question object at index ${index}.`);
    }

    const question = String(item.question || "").trim();
    const correctAnswer = String(item.correctAnswer || "").trim();
    let options = Array.isArray(item.options)
      ? item.options.map((opt) => String(opt).trim()).filter(Boolean)
      : [];

    if (!question || !correctAnswer) {
      throw new Error(`Question ${index + 1} is missing required fields.`);
    }

    if (expected.type === "boolean") {
      options = [...BOOLEAN_OPTIONS];
      const normalizedCorrect = correctAnswer.toLowerCase();
      if (!["true", "false"].includes(normalizedCorrect)) {
        throw new Error(`Boolean question ${index + 1} has invalid answer.`);
      }
      return {
        question,
        options,
        correctAnswer: normalizedCorrect === "true" ? "True" : "False",
        category: expected.category,
        difficulty: expected.difficulty,
        type: "boolean",
      };
    }

    if (options.length !== 4) {
      throw new Error(`Multiple choice question ${index + 1} must have 4 options.`);
    }

    if (!options.includes(correctAnswer)) {
      throw new Error(
        `Correct answer must be present in options for question ${index + 1}.`
      );
    }

    return {
      question,
      options: shuffleArray(options),
      correctAnswer,
      category: expected.category,
      difficulty: expected.difficulty,
      type: "multiple",
    };
  });
};

export const generateQuizQuestions = async ({
  category,
  difficulty,
  amount,
  type,
}) => {
  const ai = getAiClient();

  const generateBatch = async (batchAmount) => {
    const prompt = `Generate exactly ${batchAmount} quiz questions as a JSON array.

Rules:
- category: "${category}"
- difficulty: "${difficulty}"
- type: "${type}"
- Return only JSON array (no markdown, no extra text).
- Keep each question concise and clear.
- Each object must include: question, options, correctAnswer, category, difficulty, type.
- If type is "multiple": options must have exactly 4 strings.
- If type is "boolean": options must be exactly ["True", "False"].
- correctAnswer must exactly match one of the options.

Example item:
{
  "question": "Which planet is known as the Red Planet?",
  "options": ["Mars", "Venus", "Jupiter", "Mercury"],
  "correctAnswer": "Mars",
  "category": "Science",
  "difficulty": "easy",
  "type": "multiple"
}`;

    let response = null;
    let modelError = null;
    const models = getCandidateModels();

    for (const model of models) {
      try {
        response = await callGeminiWithRetry(
          ai,
          {
            model,
            contents: prompt,
          },
          3
        );
        modelError = null;
        break;
      } catch (error) {
        modelError = error;
      }
    }

    if (!response) {
      if (modelError) {
        throw modelError;
      }
      throw new Error("Unable to generate quiz questions right now.");
    }

    let parsed;
    try {
      parsed = JSON.parse(extractJsonArray(response?.text || ""));
    } catch (error) {
      throw new Error("Failed to parse Gemini response as valid JSON.");
    }

    return validateAndNormalizeGeminiQuestions(parsed, {
      category,
      difficulty,
      amount: batchAmount,
      type,
    });
  };

  // Generate in small chunks for better reliability under API load.
  const MAX_BATCH_SIZE = 5;
  const combinedQuestions = [];
  let remaining = amount;

  try {
    while (remaining > 0) {
      const batchAmount = Math.min(MAX_BATCH_SIZE, remaining);
      const batchQuestions = await generateBatch(batchAmount);
      combinedQuestions.push(...batchQuestions);
      remaining -= batchAmount;
    }

    return combinedQuestions;
  } catch (error) {
    console.error("Gemini unavailable, using fallback questions:", error.message);
    return generateFallbackQuestions({ category, difficulty, amount, type });
  }
};