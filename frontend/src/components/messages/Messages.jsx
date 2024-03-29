import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  useListenMessage();
  const lastMsgRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView();
    }, 50);
  }, [messages]);

  return (
    <div className="px-1 flex-1 overflow-auto ">
      {!loading &&
        messages.length > 0 &&
        messages.map((item, i) => (
          <div key={i} ref={lastMsgRef}>
            <Message message={item} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}

      {messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
