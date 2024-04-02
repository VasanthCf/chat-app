import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

function useListenLike() {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newLike", (data) => {
      if (authUser._id === data.receiverId) {
        const index = messages.findIndex(
          (message) => message._id === data.message._id
        );
        if (index !== -1) {
          // Update the message at the found index
          const updatedMessages = [...messages];
          updatedMessages[index].like = data.message.like;
          setMessages(updatedMessages);
        }
      }

      socket.emit("animateDone", data.message._id);
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("newLike");
    };
  }, [authUser._id, socket, messages, setMessages]);
}

export default useListenLike;
