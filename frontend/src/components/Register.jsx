import React from "react";

const Register = () => {
  return (
    <div className="bg-blue-900 min-h-screen py-8 flex justify-center items-center">
      <div className="backdrop-blur-md bg-sky-100 rounded-lg border border-white shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Join the New Era!
        </h1>
        <p className="text-lg text-blue-900 mb-6">
          Get ready to immerse yourself in a unique online chess experience.
          Registration is opening soon, offering you a chance to battle it out
          on our striking blue and red themed chessboard. Prepare for strategic
          duels and a vibrant community.
        </p>
        <div className="text-xl font-semibold text-rose-600">
          Registrations will open soon!
        </div>
        <br />
        <div className="text-xl font-semibold text-green-700">
          Until then use........
          <div>Usernames : test1 (or) test2</div>
          <div>Password : 12345678</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
