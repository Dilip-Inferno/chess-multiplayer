import React, { useEffect, useState } from "react";

const ChessBoard = ({ board, socket, onPieceMove, party, errorMessage }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    if (from && to) {
      socket.send(
        JSON.stringify({
          type: "move",
          payload: { move: { from, to } },
        })
      );
      onPieceMove({ from, to });
      setFrom(null);
      setTo(null);
    }
  }, [from, to, onPieceMove, socket]);

  const handleSquares = (convertedSq) => {
    if (!from) {
      setFrom(convertedSq);
    } else {
      setTo(convertedSq);
    }
  };

  const flippedBoard = party === "black" ? [...board].reverse() : board;

  return (
    <div className="backdrop-blur-md bg-white rounded-lg border border-gray-200 shadow-lg p-2">
      <div className="flex flex-col items-center sm:items-start text-white w-full border-3 border-purple-900">
        {/* Chessboard */}
        <div className="w-full max-w-fit">
          {flippedBoard.map((row, i) => {
            const displayRow = party === "black" ? [...row].reverse() : row;

            return (
              <div key={i} className="flex w-full">
                {displayRow.map((square, j) => {
                  const realI = party === "black" ? 7 - i : i;
                  const realJ = party === "black" ? 7 - j : j;

                  const convertedSquare =
                    String.fromCharCode(97 + realJ) + (8 - realI);
                  const isLight = (realI + realJ) % 2 === 0;

                  return (
                    <div
                      key={j}
                      onClick={() => handleSquares(convertedSquare)}
                      className={`w-[12.5%] aspect-square flex items-center justify-center cursor-pointer
                        ${isLight ? "bg-fuchsia-100/70" : "bg-violet-950/70"}
                        hover:opacity-80 transition-opacity duration-200`}
                    >
                      {square && (
                        <img
                          src={`/${
                            square.color === "b"
                              ? `black-${square.type}`
                              : `white-${square.type}`
                          }.svg`}
                          alt={square.type}
                          className="h-full max-h-full p-1"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Error Message */}
        {/* {errorMessage && (
          <div className="mt-4 bg-red-600/80 text-white w-full text-center text-sm sm:text-base border border-red-700 rounded shadow-md p-3 backdrop-blur-sm ">
            {errorMessage}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ChessBoard;
