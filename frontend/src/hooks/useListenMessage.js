import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "./../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

import { checkBothParticipant } from "./../utils/findParticipant";
import pop from "./../assets/sounds/pop.mp3";
function useListenMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  useEffect(() => {
    socket?.on("newMessage", (data) => {
      data.newMessage.shouldShake = true;

      const person1 = checkBothParticipant(
        selectedConversation.participants,
        data.senderId
      );
      const person2 = checkBothParticipant(
        selectedConversation.participants,
        data.receiverId
      );
      console.log(person1, person2, person1 && person2);
      if (authUser._id === data.receiverId && person1 && person2) {
        const sound = new Audio(pop);

        sound.play();

        setMessages([...messages, data.newMessage]);
      }
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket, selectedConversation, authUser._id]);
}

export default useListenMessage;
