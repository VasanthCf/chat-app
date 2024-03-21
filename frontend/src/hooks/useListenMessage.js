import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "./../zustand/useConversation";

import pop from "./../assets/sounds/pop.mp3";
function useListenMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(pop);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket]);
}

export default useListenMessage;
