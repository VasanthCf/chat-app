import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  console.log(isTyping);
  const handleFocus = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-2 pb-2 my-0" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border  rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white outline-none h-14"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-white"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
