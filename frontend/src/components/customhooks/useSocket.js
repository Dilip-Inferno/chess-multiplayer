import { useEffect, useState } from "react";

// const URL = "ws://localhost:8085";
const URL = "wss://chess-multiplayer-bbvr.onrender.com";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(URL);
    ws.onopen = () => {
      setSocket(ws);
    };
    ws.onclose = () => {
      setSocket(null);
    };
    // causing network bug
    // return () => {
    //   ws.close();
    // };
  }, []);
  return socket;
};
