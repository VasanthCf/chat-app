import { useEffect, useRef } from "react";

import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";
import useListenLike from "../../hooks/useListenLike";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { selectedConversation, selectedReceiver, setMessages } =
    useConversation();
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const lastRef = useRef();
  useListenMessage();
  useListenLike();
  useEffect(() => {
    const getLastMessage = messages[messages.length - 1]?.senderId;
    const timer = setTimeout(() => {
      const lastMessageFromOtherUser =
        messages && getLastMessage !== authUser._id;

      if (lastMessageFromOtherUser) {
        socket?.emit("markSeen", {
          senderId: authUser._id,
          receiverId: selectedReceiver?._id,
        });
      }
    }, 250);

    socket?.on("messageSeen", ({ conversationId }) => {
      if (selectedConversation?._id === conversationId) {
        const updatedMessage = messages.map((item) => {
          if (!item.seen) {
            return { ...item, seen: true };
          }
          return item;
        });

        setMessages(updatedMessage);
      }
    });

    return () => {
      socket?.off("markSeen");
      clearTimeout(timer);
    };
  }, [
    authUser._id,
    messages,
    socket,
    selectedReceiver?._id,
    selectedConversation?._id,
    setMessages,
  ]);
  useEffect(() => {
    setTimeout(() => {
      lastRef.current?.scrollIntoView();
    }, 50);
  }, [messages]);

  return (
    <div
      className={`px-1 flex-1 h-[50vh] overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out pt-3`}
    >
      {!loading &&
        messages?.length > 0 &&
        messages?.map((item, i) => (
          <div key={i} ref={lastRef}>
            <Message message={item} recent={messages.length - 1 === i} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}

      {messages.length === 0 && !loading && (
        <p className="text-center text-indigo-400">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
