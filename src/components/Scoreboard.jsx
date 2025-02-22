import React from "react";
import { PieChart, Pie, Tooltip, Cell, LabelList } from "recharts";

const Scoreboard = ({ score, totalQuestions, questions }) => {
  // Data for pie chart
  const data = [
    { name: "Correct", value: score },
    { name: "Wrong", value: totalQuestions - score },
  ];

  // Colors for correct and wrong sections
  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-bold">Scoreboard</h2>
      <p className="mt-4 text-xl">
        You scored {score} out of {totalQuestions}
      </p>

      {/* Pie chart showing correct and wrong answers */}
      <div className="flex justify-center mt-8">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}

            {/* Add values inside each section */}
            <LabelList
              dataKey="value"
              position="inside"
              style={{ fontSize: "16px", fill: "#fff", fontWeight: "bold" }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Display questions and correct answers */}
      <div className="mt-8 text-left">
      <h3 className="text-xl font-bold text-gray-700 text-center">Correct Answers</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    {questions.map((q, idx) => (
      <div
        key={idx}
        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <h4 className="text-lg font-semibold text-blue-600 mb-2">
          Question {idx + 1}
        </h4>
        <p className="text-gray-800">{q.question}</p>
        <div className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-700">
            <strong>Correct Answer:</strong> {q.correctAnswer}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Scoreboard;
