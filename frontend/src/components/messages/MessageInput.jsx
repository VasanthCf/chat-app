import { useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "./../../context/SocketContext";
import useListenTyping from "./../../hooks/useListenTyping";
import useConversation from "../../zustand/useConversation";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";

import { MdClose } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";

const MessageInput = () => {
  const inputRef = useRef(null);
  const { authUser } = useAuthContext();
  const { loading, sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const {
    selectedConversation,
    setInputMessage,
    inputMessage,
    reply,
    setReply,
  } = useConversation();

  const fromMe = reply?.senderId === authUser._id || false;
  const whoReplies = fromMe ? "You" : selectedConversation?.fullName;
  useListenTyping();
  useAutosizeTextArea(inputRef.current, inputMessage);
  const handleFocus = () => {
    socket.emit("sendTyping", {
      isTyping: true,
      receiverId: selectedConversation._id,
    });
  };

  const handleBlur = () => {
    socket.emit("sendTyping", {
      isTyping: false,
      receiverId: selectedConversation._id,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage) return;
    await sendMessage(inputMessage, reply);
    setInputMessage("");
    setReply("");
  };

  return (
    <form
      className={` pb-2 my-0 w-full ${
        reply
          ? "backdrop-blur-md sm:bg-gray-500/70 bg-gray-500/30  backdrop-filter bg-opacity-0"
          : " bg-transparent"
      } `}
      onSubmit={handleSubmit}
    >
      {reply && (
        <div
          className="w-[100%]   max-w-[100%]  leading-snug px-2.5 py-1.5 text-base truncate text-black 
        "
        >
          <div className="flex justify-between ">
            {" "}
            <p className="text-[14px] text-gray-700 font-bold">
              Replying to <span className=" font-pacific  ">{whoReplies} </span>
            </p>
            <p
              className=" rounded-full text-black text-lg cursor-pointer"
              onClick={() => setReply("")}
            >
              <MdClose />
            </p>
          </div>
          {reply}
        </div>
      )}
      <div className="flex flex-col w-full px-2">
        <div className=" pl-2 w-full h-full  relative bg-slate-800 border-gray-600  flex rounded-lg items-center  gap-1">
          <textarea
            ref={inputRef}
            className={`border-none block  pt-1.5 pb-1 resize-none flex-1 bg-transparent  min-h-10 text-white outline-none`}
            placeholder="Send a message"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={1}
          />

          {/* <input
          type="text"
          className="border-none  block flex-1  bg-transparent  text-white outline-none  "
          placeholder="Send a message"
          value={message}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        /> */}

          <button
            type="submit"
            className=" w-10 h-full rounded-full flex items-center  justify-center text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend />
            )}
          </button>
        </div>{" "}
      </div>
    </form>
  );
};
export default MessageInput;
