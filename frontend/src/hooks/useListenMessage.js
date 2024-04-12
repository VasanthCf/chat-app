import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "./../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

import pop from "./../assets/sounds/pop.mp3";
function useListenMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  useEffect(() => {
    socket?.on("newMessage", (data) => {
      data.newMessage.shouldShake = true;
      if (
        authUser._id === data.receiverId &&
        selectedConversation._id === data.conversationId
      ) {
        const sound = new Audio(pop);

        sound.play();
        localStorage.setItem("currentMsg", JSON.stringify(data.newMessage));
        setMessages([...messages, data.newMessage]);
      }
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket, selectedConversation, authUser._id]);
}

export default useListenMessage;
