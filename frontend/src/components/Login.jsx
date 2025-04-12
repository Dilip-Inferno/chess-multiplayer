import React, { useState } from "react";

const Login = ({
  handleGamePlay,
  loginStatus,
  handleLoginData,
  loginMessage,
  userLogged,
  // errorMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginData({ username, password });
  };

  return (
    <div className="w-full max-w-md px-6 py-8 rounded-lg shadow-xl backdrop-blur-md bg-white/20 border border-white/30 flex flex-col items-stretch">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {!loginStatus ? "Log In" : "Game Options"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {!loginStatus && (
          <>
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-semibold text-white mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-lg text-white bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-lg text-white bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          onClick={!loginStatus ? null : handleGamePlay}
          className={`w-full text-base sm:text-lg px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
            loginStatus
              ? "bg-pink-500 hover:bg-pink-600 text-white font-semibold"
              : "bg-white text-purple-800 font-bold hover:bg-gray-100"
          }`}
        >
          {loginStatus ? "Start Game" : "Log In"}
        </button>

        {loginMessage && (
          <div className="text-center mt-4 text-md text-red-400 font-semibold">
            {loginMessage}
          </div>
        )}
        {/* {errorMessage && (
          <div className=" bg-red-600 text-white text-sm sm:text-base border-2 border-red-700 p-3 rounded shadow-md">
            {errorMessage}
          </div>
        )} */}
        {loginStatus && (
          <div className="text-center mt-4 text-md text-green-400 font-semibold">
            Welcome {userLogged}!
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
