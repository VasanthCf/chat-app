import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import { checkBothParticipant } from "../utils/findParticipant";

function useListenTyping() {
  const { authUser } = useAuthContext();
  const { setIsTyping } = useConversation();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("isTyping", (data) => {
      const person1 = checkBothParticipant(
        selectedConversation.participants,
        data.senderId
      );
      const person2 = checkBothParticipant(
        selectedConversation.participants,
        data.receiverId
      );

      if (authUser._id === data.receiverId && person1 && person2) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("isTyping");
    };
  }, [setIsTyping, authUser._id, socket, selectedConversation]);
}

export default useListenTyping;
