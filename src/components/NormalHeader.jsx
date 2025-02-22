import React from "react";
import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="relative group">
  <Link
    to="/"
    className="text-white font-bold text-lg px-4 py-2 rounded bg-transparent hover:text-white transition duration-300"
  >
    Quiz Platform
  </Link>
</div>
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <Link
            to="/"
            className={`"text-white"}`}
          >
            <button
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition "
            >
              Home
            </button>
          </Link>
          
        </div>

        <Link to={`/history`}>
          <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition">
            View History
          </button>
        </Link>
      </div>
    </header>
  );
};

export default NormalHeader;
