import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from "./components/QuizList";
import QuizPage from "./components/QuizPage";
import quizzes from "./data/quizData";
import QuizHistory from "./components/QuizHistory";
import QuizHistoryPage from "./components/QuizHistory";


const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<QuizList quizzes={quizzes} />} />
          <Route path="/quiz/:id" element={<QuizPage quizzes={quizzes} />} />
          <Route path="/history" element={<QuizHistoryPage quizzes={quizzes}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
