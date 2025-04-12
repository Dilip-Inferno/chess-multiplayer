import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-blue-900 min-h-screen py-8">
      <div className="pt-8 max-w-screen-lg w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 backdrop-blur-md bg-sky-200 rounded-lg border border-gray-200 shadow-lg  p-6 sm:p-8">
          {/* Left Section: Image */}
          <div className="flex justify-center md:justify-start w-full bg-white border-4 border-blue-900 shadow-lg">
            <img
              src={"/chess.png"}
              className="w-full shadow-md"
              alt="Chess Illustration"
            />
          </div>

          {/* Right Section: Content */}
          <div className="flex flex-col items-center md:items-start">
            {/* Heading and Description */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center md:text-left mb-4">
                Strategize and Conquer Online
              </h1>
              <p className="text-lg text-blue-900 text-center md:text-left">
                Dive into the world of online chess with our sleek and intuitive
                platform. Challenge friends or compete with players globally in
                thrilling matches. Sharpen your tactical skills and rise through
                the ranks in a visually captivating environment.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 w-full justify-center md:justify-start">
              <button
                onClick={() => navigate("/game")}
                className="text-base sm:text-lg px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold border-t-4 border-blue-700 hover:border-blue-500 rounded-b-xl shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Play Online
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-base sm:text-lg px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold border-t-4 border-blue-700 hover:border-blue-500 rounded-b-xl shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
