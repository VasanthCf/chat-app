import { useEffect } from "react";
import useGetConversation from "../../hooks/useGetConversation";

import { getRandomEmoji } from "../../utils/emoji";

import Conversation from "./Conversation";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversations = () => {
  const { loading } = useGetConversation();
  const { socket } = useSocketContext();
  const { setAllConversation, allConversation: conversation } =
    useConversation();
  useEffect(() => {
    socket?.on("messageSeen", ({ conversationId }) => {
      const updatedConversation = conversation?.map((item) => {
        if (item._id === conversationId) {
          return { ...item, lastMessage: { ...item.lastMessage, seen: true } };
        }
        return item;
      });

      setAllConversation(updatedConversation);
    });
  }, [conversation, setAllConversation, socket]);

  return (
    <div className="py-2  w-[95%] flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}

      {conversation?.map((conv, i) => (
        <Conversation
          key={i}
          conv={conv}
          emoji={getRandomEmoji()}
          lastIdx={i === conversation.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
