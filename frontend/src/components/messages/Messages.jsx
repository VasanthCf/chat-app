import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";
import useListenLike from "../../hooks/useListenLike";
// import { useAuthContext } from "../../context/AuthContext";
// import { useSocketContext } from "../../context/SocketContext";
// import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  // const { authUser } = useAuthContext();
  // const { socket } = useSocketContext();
  // const { selectedReceiver } = useConversation();

  // useEffect(() => {
  //   const lastMessageFromOtherUser =
  //     messages && messages[messages.length - 1].senderId !== authUser._id;

  //   if (lastMessageFromOtherUser) {
  //     socket?.emit("markSeen", {
  //       senderId: authUser._id,
  //       receiverId: selectedReceiver._id,
  //     });
  //   }

  //   return () => socket?.off("markSeen");
  // }, [authUser._id, messages, socket, selectedReceiver._id]);
  const lastRef = useRef();
  useListenMessage();
  useListenLike();

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
