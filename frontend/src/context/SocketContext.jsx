import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io({
        query: {
          userId: authUser._id,
        },
      });
      console.log(socket);
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        console.log(users);
        setOnlineUsers(users);
      });

      socket.emit("check", "hello server", (response) => {
        console.log(response);
      });
      return () => {
        console.log("socket disconnected");
        socket.close();
      };
    }
    //else {
    //   if (socket) {
    //     setSocket(null);
    //   }
    // }
  }, [authUser]);
  // socket?.on("check", (data) => {
  //   console.log(data);
  // });
  const emitCustomEvent = (eventName, eventData) => {
    if (socket) {
      socket.emit(eventName, eventData);
    }
  };
  return (
    <SocketContext.Provider value={{ socket, onlineUsers, emitCustomEvent }}>
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};
