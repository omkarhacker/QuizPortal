import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizHistory } from '../idb/idbUtils'; // Assuming no changes to idbUtils
import NormalHeader from './NormalHeader';

const QuizHistoryPage = ({ quizzes }) => {
  const [quizHistory, setQuizHistory] = useState([]);

  // Fetch quiz history from IndexedDB
  useEffect(() => {
    const fetchQuizHistory = async () => {
      const history = await getAllQuizHistory();
      setQuizHistory(history);
    };
    fetchQuizHistory();
  }, []);

  // Check if the quiz has already been completed
  const isQuizCompleted = (quizId) => {
    return quizHistory.some((history) => history.quizId === quizId);
  };

  // Handle retake
  const handleRetakeQuiz = (quizId) => {
    // Remove the quiz from history (optional depending on retake logic)
    const updatedHistory = quizHistory.filter((history) => history.quizId !== quizId);
    setQuizHistory(updatedHistory);
  };

  return (
    <div>
      <NormalHeader />
      <div className="p-4 border rounded bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Quiz History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
              <h3 className="text-lg font-bold mb-2">{quiz.title}</h3>
              {isQuizCompleted(quiz.id) ? (
                <div>
                  <p className="text-green-600 mb-2">Completed</p>
                  <button
                    onClick={() => handleRetakeQuiz(quiz.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <Link to={`/quiz/${quiz.id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Start Quiz
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryPage;
