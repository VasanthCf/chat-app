import { useAuthContext } from "../../context/AuthContext";
import useLongPress from "../../hooks/useLongPress";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { HiReply } from "react-icons/hi";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation, setReply, setOptionBlur, optionBlur } =
    useConversation();

  const handleMessageClick = () => {
    setOptionBlur(message._id);
  };

  const handleSetReply = () => {
    setReply(message.message);
    setOptionBlur(null);
  };
  const longpress = useLongPress(handleMessageClick, 500);
  const replyDialogue = optionBlur === message._id;
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
    <>
      <div
        className={`sm:text-base text-base chat py-1.5  px-1 ${chatClassName}`}
      >
        {message.replyMsg !== "" && (
          <div
            className={`text-white chat-header w-fit max-w-[80%] mb-1 text-sm ${
              fromMe
                ? "border-r-2 border-gray-300 pr-1"
                : "border-l-2  border-gray-300 pl-1"
            }`}
          >
            <p className=" bg-gray-700  px-5 text-start py-1 w-full rounded-full">
              {message.replyMsg}{" "}
            </p>
          </div>
        )}
        <div className="chat-image avatar ">
          <div className="w-8 rounded-full">
            {" "}
            <img src={profilePic} />
          </div>
        </div>

        <div
          className={`chat-bubble min-h-0.5 relative ${
            !fromMe && message.replyMsg === "" ? "top-2" : ""
          } text-white break-all  leading-snug py-[6px] ${bubbleBgColor} ${shakeClass}`}
          {...longpress}
        >
          {message.message}
          {replyDialogue && (
            <div className="absolute bg-gray-800  w-max p-2 rounded-lg right-0 z-20 min-w-28 ">
              <ul>
                <li
                  className="flex justify-evenly items-center text-lg px-2 cursor-pointer"
                  onClick={() => handleSetReply()}
                >
                  Reply{" "}
                  <span className=" ">
                    <HiReply />{" "}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className={`chat-footer opacity-50 
          text-xs  text-white`}
        >
          {formattedTime}
        </div>
      </div>
    </>
  );
}

export default Message;
