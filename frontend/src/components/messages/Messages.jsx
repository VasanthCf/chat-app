import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { optionBlur, setOptionBlur } = useConversation();
  useListenMessage();
  const lastMsgRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView();
    }, 50);
  }, [messages]);

  return (
    <div className="px-1 flex-1 overflow-auto">
      {optionBlur !== null && (
        <div
          className="bg-gray-800/30 bg-opacity-0 absolute inset-0 z-10"
          onClick={() => setOptionBlur(null)}
        >
          {" "}
        </div>
      )}

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
