import React, { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import { useSocket } from "./customhooks/useSocket";
import Login from "./Login";
import { USER_DATA } from "../constants/userData";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "GAME_OVER";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [dots, setDots] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [userLogged, setUserLogin] = useState("");
  const [started, setStarted] = useState(false);
  const [party, setParty] = useState(null);
  const [showStartedMessage, setShowStartedMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);

      switch (message.type) {
        case INIT_GAME:
          const newGame = new Chess();
          setBoard(newGame.board());
          setStarted(true);
          setShowStartedMessage(true);
          setParty(message.payload.color);

          setTimeout(() => {
            setShowStartedMessage(false);
          }, 3000);
          break;

        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;

        case GAME_OVER:
          break;

        default:
          break;
      }
    };
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 4 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleGamePlay = () => {
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };

  const handleMoves = ({ from, to }) => {
    try {
      chess.move({ from, to });
      setBoard(chess.board());
    } catch (error) {
      setErrorMessage("Invalid Move");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLoginData = (data) => {
    let email = data.username;
    let pass = data.password;

    if (!loginStatus) {
      let userFound = USER_DATA.find(
        (record) => record.username === email && record.password === pass
      );

      if (userFound) {
        setLoginStatus(true);
        setUserLogin(email);
        setLoginMessage("Logged in successfully");
        setTimeout(() => {
          setLoginMessage("");
        }, 3000);
      } else {
        setLoginMessage("Wrong Credentials");
        setTimeout(() => {
          setLoginMessage("");
        }, 3000);
      }
    } else {
      console.log("error");
    }
  };

  if (!socket) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-lg shadow-xl text-lg font-semibold text-center">
        Connecting to backend services please wait{dots}
      </div>
    );
  }

  return (
    <div className="bg-purple-900 min-h-screen py-8 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg w-full flex flex-col justify-start items-center gap-8">
        <h1 className="text-4xl font-bold text-white mb-6 backdrop-blur-sm rounded-t-3xl bg-white/10 py-2 px-6 border border-white/20 shadow-md">
          Chess - New Era
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full">
          {/* Chess Board */}
          <div className="md:col-span-4 flex justify-center">
            {/* <div className="w-full backdrop-blur-md bg-white/10 rounded-lg border border-white/20 shadow-lg p-4"> */}
            <ChessBoard
              onPieceMove={({ from, to }) => handleMoves({ from, to })}
              socket={socket}
              board={board}
              party={party}
              errorMessage={errorMessage}
            />
            {/* {errorMessage && (
              <div className="mt-4 bg-red-600 text-white text-sm sm:text-base border-2 border-red-700 p-3 rounded shadow-md">
                {errorMessage}
              </div>
            )} */}
            {/* </div> */}
          </div>

          {/* Login + Messages */}
          <div className="md:col-span-2 flex flex-col items-center gap-6 w-full">
            {!started && (
              <Login
                handleGamePlay={handleGamePlay}
                loginStatus={loginStatus}
                userLogged={userLogged}
                handleLoginData={({ username, password }) =>
                  handleLoginData({ username, password })
                }
                loginMessage={loginMessage}
                // errorMessage={errorMessage}
              />
            )}

            {showStartedMessage && (
              <div className="text-lg font-semibold text-white bg-green-600 px-6 py-3 rounded-lg shadow-lg animate-fade-out backdrop-blur-sm border border-white/20">
                The game has started!
              </div>
            )}

            {party && (
              <div className="text-base font-medium text-white bg-purple-600 px-6 py-3 rounded-lg shadow-md backdrop-blur-sm  border border-white/20">
                {`You are ${party.toUpperCase()}'s now`}
              </div>
            )}
            {errorMessage && (
              <div className=" bg-red-600 text-white text-sm sm:text-base border-2 border-red-700 p-3 rounded shadow-md">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
