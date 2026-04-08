export function calculateScore(questions, answersMap) {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const reviewData = questions.map((question) => {
    const selectedAnswer = answersMap[question.id] ?? null;
    const isCorrect = selectedAnswer === question.answer;

    if (!selectedAnswer) {
      unansweredCount += 1;
    } else if (isCorrect) {
      correctCount += 1;
    } else {
      wrongCount += 1;
    }

    return {
      ...question,
      selectedAnswer,
      isCorrect,
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  return {
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    percentage,
    reviewData,
  };
}