import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;

  const bubbleBgColor = fromMe
    ? "bg-gradient-to-b from-purple-500 bg-violet-500"
    : "bg-blue-500";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`sm:text-base text-sm chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          {" "}
          <img src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble min-h-0.5 ${
          !fromMe ? "top-3" : ""
        } text-white break-all  leading-snug py-[6px] ${bubbleBgColor} ${shakeClass}`}
      >
        {message.message}
      </div>
      <div
        className={`chat-footer opacity-50 
          text-xs  text-white`}
      >
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
