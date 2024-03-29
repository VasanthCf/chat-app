import { MdClose } from "react-icons/md";
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
    setReply({ replyingMsg: message.message, senderId: message.senderId });
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
  const whoReplied =
    message.replied.senderId === authUser._id
      ? "You"
      : selectedConversation?.fullName;

  const bubbleBgColor = fromMe
    ? "bg-gradient-to-b from-purple-500 bg-violet-500"
    : "bg-blue-500";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <>
      <div
        className={`sm:text-base text-base chat ${
          message.replied.replyMsg ? "py-2" : "py-1.5"
        } relative  px-1 ${chatClassName}`}
      >
        {message.replied.replyMsg && (
          <div
            className={`text-white chat-header w-fit max-w-[80%] mb-1 text-sm ${
              fromMe
                ? "border-r-2 border-gray-300 pr-1"
                : "border-l-2  border-gray-300 pl-1"
            }`}
          >
            <span className={`absolute -top-3  text-gray-400 `}>
              {whoReplied}
            </span>
            <p className=" bg-gray-800  px-5 text-start py-1 w-full rounded-full">
              {message.replied.replyMsg.length > 80 &&
                `${message.replied.replyMsg.slice(0, 80)}...`}
              {message.replied.replyMsg.length <= 80 &&
                message.replied.replyMsg}
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
          className={`chat-bubble min-h-0.5 ${
            !fromMe && !message.replied.replyMsg ? "top-2" : ""
          } text-white break-all  leading-snug py-[6px] ${bubbleBgColor} ${shakeClass}`}
          {...longpress}
        >
          {message.message}
          {replyDialogue && (
            <div
              className={`absolute bg-gray-800 min-h-14  w-max px-2 py-1 rounded-lg   ${
                fromMe ? "right-0" : "-right-12"
              } z-50 min-w-28 `}
            >
              <ul className="text-lg px-2 text-right relative ">
                {" "}
                <span
                  className="absolute text-red-400 cursor-pointer top-0 right-0"
                  onClick={() => setOptionBlur(null)}
                >
                  <MdClose />
                </span>
                <li
                  className="flex pt-3 justify-start gap-2 items-center cursor-pointer"
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
