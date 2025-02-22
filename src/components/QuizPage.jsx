import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { storeQuizHistory } from "../idb/idbUtils"; // Import the function
import Scoreboard from "./Scoreboard"; // Your scoreboard component
import Header from "./Header";

const QuizPage = ({ quizzes }) => {
  const { id } = useParams();
  const quiz = quizzes.find((q) => q.id === parseInt(id));

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [attemptedAnswers, setAttemptedAnswers] = useState([]);
  const [integerAnswer, setIntegerAnswer] = useState("");

  const time = new Date();
  time.setMinutes(time.getMinutes() + 30); // 30 minutes timer

  const { seconds, minutes, start, pause, reset } = useTimer({
    expiryTimestamp: time,
    onExpire: () => handleSubmit(), // Auto-submit when timer ends
  });

  useEffect(() => {
    start(); // Start the timer when the quiz starts
  }, []);

  const handleAnswerSelection = (selectedOption) => {
    const correctAnswer = quiz?.questions[currentQuestion]?.correctAnswer;

    const updatedAnswers = [...attemptedAnswers];
    updatedAnswers[currentQuestion] = { answer: selectedOption, isCorrect: selectedOption === correctAnswer };
    setAttemptedAnswers(updatedAnswers);

    if (selectedOption === correctAnswer) setScore(score + 1);

    if (currentQuestion < quiz?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      reset(time);
    } else {
      handleSubmit(); // End quiz if last question
    }
  };

  const handleIntegerAnswerSubmit = () => {
    const correctAnswer = quiz?.questions[currentQuestion]?.correctAnswer;

    const updatedAnswers = [...attemptedAnswers];
    updatedAnswers[currentQuestion] = { answer: integerAnswer, isCorrect: parseInt(integerAnswer) === correctAnswer };
    setAttemptedAnswers(updatedAnswers);

    if (parseInt(integerAnswer) === correctAnswer) setScore(score + 1);

    setIntegerAnswer("");

    if (currentQuestion < quiz?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      reset(time);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      reset(time); // Reset timer for the previous question
    }
  };

  const handleSubmit = () => {
    setIsComplete(true);
    pause(); // Stop the timer after the quiz ends

    // Save quiz history
    const quizHistoryData = {
      quizId: quiz?.id,
      score,
      totalQuestions: quiz?.questions.length,
      date: new Date().toISOString(),
    };

    storeQuizHistory(quizHistoryData); // Save data in IndexedDB
  };

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div>
      <Header quizCompleted={isComplete} />
      <div className="p-4 border rounded bg-white">
        <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
        <div className="instructions mb-4">
          <h3 className="text-lg font-bold">Sample Quiz Instructions:</h3>
          <ul className="list-disc pl-5">
            {quiz.instructions.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ul>
        </div>
        {isComplete ? (
          <Scoreboard
          score={score}
          totalQuestions={quiz?.questions.length}
          questions={quiz.questions} // Passing questions to the Scoreboard
        />
        ) : (
          <div>
            <div className="timer mb-4">
              <p className="text-red-500 font-bold">
                Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Question {currentQuestion + 1}</h3>
              <p>{quiz?.questions[currentQuestion]?.question}</p>

              {/* Multiple Choice Question */}
              {quiz?.questions[currentQuestion]?.type === "multiple-choice" && (
                <div className="mt-4">
                  {quiz?.questions[currentQuestion]?.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelection(option)}
                      className={`block px-4 py-2 mt-2 rounded ${
                        attemptedAnswers[currentQuestion]?.answer === option
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-blue-600"
                      }`}
                      disabled={attemptedAnswers[currentQuestion] !== undefined} // Disable after submission
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Integer-Type Question */}
              {quiz?.questions[currentQuestion]?.type === "integer" && (
                <div className="mt-4">
                  <input
                    type="number"
                    value={integerAnswer}
                    onChange={(e) => setIntegerAnswer(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Enter your answer"
                    disabled={attemptedAnswers[currentQuestion] !== undefined} // Disable after submission
                  />
                  <button
                    onClick={handleIntegerAnswerSubmit}
                    className="block px-4 py-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={!integerAnswer || attemptedAnswers[currentQuestion] !== undefined}
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                  Previous
                </button>
                {currentQuestion === quiz?.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Next
                  </button>
                )}
                <button
                onClick={handleSubmit}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                End Quiz
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
