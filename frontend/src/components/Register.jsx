import React from "react";

const Register = () => {
  return (
    <div className="bg-blue-900 min-h-screen py-8 flex justify-center items-center">
      <div className="backdrop-blur-md bg-blue-900/10 rounded-lg border border-blue-500/20 shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Join the Blue & Red Chess Arena!
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          Get ready to immerse yourself in a unique online chess experience.
          Registration is opening soon, offering you a chance to battle it out
          on our striking blue and red themed chessboard. Prepare for strategic
          duels and a vibrant community.
        </p>
        <div className="text-xl font-semibold text-white">
          Registrations will open soon!
        </div>
      </div>
    </div>
  );
};

export default Register;
