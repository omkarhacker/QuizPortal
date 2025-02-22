import React from "react";
import { Link } from "react-router-dom";
import NormalHeader from "./NormalHeader";

const QuizList = ({ quizzes }) => {
  return (
    <div>
    <NormalHeader/>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="border p-4 rounded bg-gray-100">
          <h3 className="text-lg font-bold">{quiz.title}</h3>
          <p className="mb-4">Total Questions: {quiz.questions.length}</p>
          <Link to={`/quiz/${quiz.id}`}>
            <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition">
              Start Quiz
            </button>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default QuizList;
