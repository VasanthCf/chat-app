import { useAuthContext } from "../../context/AuthContext";
import useLongPress from "../../hooks/useLongPress";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

import { motion, useMotionValue } from "framer-motion";
import usePostLike from "../../hooks/usePostLike";
import RepliedMessage from "./RepliedMessage";
import { BsCheckAll } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { HiReply } from "react-icons/hi";
import { LuSendHorizonal } from "react-icons/lu";

function Message({ message, recent }) {
  const x = useMotionValue(0);

  const { authUser } = useAuthContext();
  const {
    selectedReceiver,
    setReply,
    setOptionBlur,
    globalLoading,
    optionBlur,
  } = useConversation();
  let likeEmojis = [];
  if (message.like?.length) {
    likeEmojis = message.like?.map((likeObj) => likeObj.likeEmoji);
  }

  const { postLike, loading } = usePostLike();

  // handlersss............................

  const handleSetLike = async (value) => {
    if (loading) return;
    setOptionBlur(null);

    await postLike(value, message._id, selectedReceiver._id);
  };
  const handleSetReply = () => {
    setReply({ replyingMsg: message.message, senderId: message.senderId });
    setOptionBlur(null);
  };
  const handleMessageClick = () => {
    setOptionBlur(message._id);
  };
  //hook
  const longpress = useLongPress(handleMessageClick, 500);
  // Dynamic styles................................

  const replyDialogue = optionBlur === message._id;
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedReceiver?.profilePic;
  const whoReplied =
    message.replied?.senderId === authUser._id
      ? "You"
      : selectedReceiver?.fullName;

  const bubbleBgColor = fromMe
    ? "bg-gradient-to-b from-purple-500 bg-violet-500"
    : "bg-blue-500";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div>
      <div
        className={`sm:text-base text-base chat transition-all duration-300 ${
          fromMe && recent && globalLoading ? "top-5 right-2" : "top-0 right-0"
        } ${
          message.replied?.replyMsg ? "py-2" : "-mt-5 py-1.5"
        } relative px-1 ${chatClassName}`}
      >
        {message.replied?.replyMsg && (
          <RepliedMessage
            fromMe={fromMe}
            replyMsg={message.replied.replyMsg}
            whoReplied={whoReplied}
          />
        )}
        <div className="chat-image avatar ">
          <div className="w-8 rounded-full">
            {" "}
            <img src={profilePic} />
          </div>
        </div>

        <motion.div
          className={`chat-bubble min-h-0.5 ${
            !fromMe && !message.replied?.replyMsg ? "top-2" : ""
          } text-white  break-all leading-snug py-[6px] ${bubbleBgColor} ${shakeClass}`}
          {...longpress}
          onDoubleClick={() => {
            if (likeEmojis) {
              handleSetLike("❤️");
            } else {
              handleSetLike("❤️");
            }
          }}
          whileTap={{ scale: optionBlur ? 1 : 0.85 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{
            power: 0.2,
            min: 0,
            max: 100,
            bounceStiffness: 100,
            bounceDamping: 8,
          }}
          style={{ x }}
        >
          {message?.message && message.message}
          {/* {message?.img && (
            <div className="avatar">
              <div className="w-36 rounded-xl">
                <img src={"./bg.png"} />
              </div>
            </div>
          )} */}
          {fromMe && (
            <span
              className={`absolute -bottom-0.5 right-0 ${
                message.seen ? "text-green-500" : "text-gray-200"
              } `}
            >
              <BsCheckAll />
            </span>
          )}

          {likeEmojis.length !== 0 && (
            <div
              className={`flex items-end absolute bg-gray-800 rounded-full px-1 border-2 border-gray-700 text-center z-10  ${
                !fromMe ? "right-3" : ""
              }`}
            >
              {!message.likeAnimated && (
                <motion.p
                  initial={{
                    x: fromMe ? -50 : 50,
                    opacity: 1,
                    y: 0,
                    scale: 18,
                    overflow: "hidden",
                  }}
                  animate={{
                    x: 0,
                    y: [70, -70, 0],
                    opacity: 1,
                    scale: 1,
                    overflow: "hidden",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {likeEmojis}
                </motion.p>
              )}

              {message.likeAnimated && <p> {likeEmojis}</p>}
              {likeEmojis.length === 2 && (
                <span className="text-xs">{likeEmojis.length}</span>
              )}
            </div>
          )}
          {replyDialogue && (
            <div
              className={`absolute bg-gray-800 min-h-16 w-max px-2 py-1 rounded-lg z-50 min-w-28 ${
                fromMe ? "end-10 inset-y-5" : "start-10 inset-y-5"
              }`}
            >
              <div
                className={`absolute ${
                  fromMe ? "right-0" : "left-0"
                } -top-14 px-2 py-1 rounded-full bg-gray-800 space-x-2 w-40 text-center sm:text-xl text-2xl`}
              >
                <span
                  className="cursor-pointer"
                  onClick={() => handleSetLike("😂")}
                >
                  😂
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleSetLike("😅")}
                >
                  😅
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleSetLike("❤️")}
                >
                  ❤️
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleSetLike("😤")}
                >
                  😤
                </span>
              </div>
              <ul className="text-lg px-2 text-right relative  ">
                {" "}
                <li className="flex">
                  {" "}
                  <span className="text-xs text-gray-300">
                    {formattedTime}
                  </span>{" "}
                  <span
                    className="absolute text-red-400 cursor-pointer top-0 right-0"
                    onClick={() => setOptionBlur(null)}
                  >
                    <MdClose />
                  </span>
                </li>
                <li
                  className="flex mt-2 justify-start gap-2 items-center cursor-pointer"
                  onClick={() => handleSetReply()}
                >
                  Reply{" "}
                  <span>
                    <HiReply />{" "}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </motion.div>

        <div
          className={`chat-footer opacity-50 
          text-xs text-white pb-2`}
        >
          {formattedTime}
        </div>
        {fromMe && recent && globalLoading && (
          <div className="text-gray-400 text-sm flex items-center gap-1  transition-all duration-300 absolute">
            <motion.div
              initial={{ x: -30 }}
              animate={{ x: [-20, -10, 0] }}
              transition={{ duration: 0.3 }}
            >
              sending...
            </motion.div>
            <motion.div
              initial={{ x: -30, y: 20, rotate: -40 }}
              animate={{ x: [-20, -10, 0], y: 0, rotate: [-40, -40, 0] }}
              transition={{ duration: 0.3 }}
            >
              <LuSendHorizonal />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
