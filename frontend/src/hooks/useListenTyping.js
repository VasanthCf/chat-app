import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

function useListenTyping() {
  const { authUser } = useAuthContext();
  const { setIsTyping } = useConversation();
  const { socket } = useSocketContext();
  useEffect(() => {
    socket?.on("isTyping", (data) => {
      if (authUser._id === data.id) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("isTyping");
    };
  }, [setIsTyping, authUser._id, socket]);
}

export default useListenTyping;
