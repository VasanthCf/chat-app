import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";
import useListenLike from "../../hooks/useListenLike";
import { AnimatePresence, motion } from "framer-motion";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  useListenMessage();
  useListenLike();
  const lastMsgRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView();
    }, 50);
  }, [messages]);

  return (
    <div
      className={`px-1 flex-1 overflow-x-hidden overflow-y-auto  transition-all duration-300 ease-in-out pt-3`}
    >
      {!loading &&
        messages.length > 0 &&
        messages.map((item, i) => {
          if (i === messages.length - 1) {
            return (
              <AnimatePresence key={i}>
                <motion.div
                  ref={lastMsgRef}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 8,
                    bounce: 3,
                    stiffness: 150,
                    delay: 0.2,
                  }}
                >
                  <Message message={item} />
                </motion.div>
              </AnimatePresence>
            );
          } else {
            return (
              <div key={i} ref={lastMsgRef}>
                <Message message={item} />
              </div>
            );
          }
        })}

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
