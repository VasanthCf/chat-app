import { useEffect } from "react";
import useGetConversation from "../../hooks/useGetConversation";

import { getRandomEmoji } from "../../utils/emoji";

import Conversation from "./Conversation";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useListenConversation from "../../hooks/useListenConversation";

const Conversations = () => {
  const { loading } = useGetConversation();
  const { socket } = useSocketContext();

  const {
    setAllConversation,
    allConversation: conversation,
    selectedReceiver,
  } = useConversation();

  useEffect(() => {
    socket?.on("messageSeen", ({ conversationId }) => {
      const updatedConversation = conversation?.map((item) => {
        if (item._id === conversationId) {
          const index = item.unreadCounts.findIndex(
            (users) => users.user === selectedReceiver?._id
          );
          return {
            ...item,
            lastMessage: { ...item.lastMessage, seen: true },
            unreadCounts: item.unreadCounts.map((unread, i) => {
              if (i === index) {
                return { ...unread, count: 0 };
              }
              return unread;
            }),
          };
        }
        return item;
      });

      setAllConversation(updatedConversation);
    });
  }, [conversation, setAllConversation, socket, selectedReceiver?._id]);
  useListenConversation();
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
