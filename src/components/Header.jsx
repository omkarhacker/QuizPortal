import React from "react";
import { Link } from "react-router-dom";

const Header = ({ quizCompleted }) => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">Quiz Platform</div>
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <Link
            to="/"
            className={`${
              quizCompleted ? "text-white" : "text-gray-500 cursor-not-allowed"
            }`}
          >
            <button
              disabled={!quizCompleted}
              className={`px-4 py-2 rounded ${
                quizCompleted ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"
              } text-white transition`}
            >
              Home
            </button>
          </Link>
          {!quizCompleted && (
            <span className="absolute left-0 top-14 text-xs text-black-500 hidden group-hover:block">
              Please complete the quiz
            </span>
          )}
        </div>

        <div className="relative group">
          <Link
            to="/history"
            className={`${
              quizCompleted ? "text-white" : "text-gray-500 cursor-not-allowed"
            }`}
          >
            <button
              disabled={!quizCompleted}
              className={`px-4 py-2 rounded ${
                quizCompleted ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"
              } text-white transition`}
            >
              View History
            </button>
          </Link>
          {!quizCompleted && (
            <span className="absolute left-0 top-14 text-xs text-black-500 hidden group-hover:block">
              Please complete the quiz
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
