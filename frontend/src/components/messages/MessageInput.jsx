import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "./../../context/SocketContext";
import useListenTyping from "./../../hooks/useListenTyping";
import useConversation from "../../zustand/useConversation";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const inputRef = useRef(null);
  const { loading, sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  useListenTyping();
  useAutosizeTextArea(inputRef.current, message);
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
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className={`px-2 pb-2 my-0`} onSubmit={handleSubmit}>
      <div className=" pl-2 w-full h-full  relative bg-slate-800 border-gray-600 flex rounded-lg items-center  gap-1">
        <textarea
          ref={inputRef}
          className={`border-none block  pt-1.5 pb-1 resize-none flex-1 bg-transparent  min-h-10 text-white outline-none`}
          placeholder="Send a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
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
    </form>
  );
};
export default MessageInput;
