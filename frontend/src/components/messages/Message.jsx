import { useAuthContext } from "../../context/AuthContext";
import useLongPress from "../../hooks/useLongPress";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import usePostLike from "../../hooks/usePostLike";

import RepliedMessage from "./RepliedMessage";
import { findParticipant } from "./../../utils/findParticipant";
import { MdClose } from "react-icons/md";
import { HiReply } from "react-icons/hi";
function Message({ message }) {
  const x = useMotionValue(0);
  const [like, setLike] = useState([]);
  const { authUser } = useAuthContext();
  const { selectedConversation, setReply, setOptionBlur, optionBlur } =
    useConversation();
  let findReceiver = "";
  if (selectedConversation) {
    findReceiver =
      findParticipant(selectedConversation, authUser._id) === 1
        ? selectedConversation?.participants[0]
        : selectedConversation?.participants[1];
  }
  useEffect(() => {
    if (message.like.length !== 0) {
      const likeEmojis = message.like.map((likeObj) => likeObj.likeEmoji);
      setLike(likeEmojis);
    } else {
      setLike([]);
    }
  }, [message.like]);
  const { postLike, loading } = usePostLike();

  // handlersss............................

  const handleSetLike = async (value) => {
    if (loading) return;
    setLike((prev) => [...prev, value]);
    setOptionBlur(null);

    await postLike(value, message._id, findReceiver._id);
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
  const profilePic = fromMe ? authUser.profilePic : findReceiver.profilePic;
  const whoReplied =
    message.replied.senderId === authUser._id ? "You" : findReceiver.fullName;

  const bubbleBgColor = fromMe
    ? "bg-gradient-to-b from-purple-500 bg-violet-500"
    : "bg-blue-500";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <>
      <div
        className={`sm:text-base text-base chat ${
          message.replied.replyMsg ? "py-2" : "-mt-5 py-1.5"
        } relative px-1 ${chatClassName}`}
      >
        {message.replied.replyMsg && (
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
            !fromMe && !message.replied.replyMsg ? "top-2" : ""
          } text-white break-all  leading-snug py-[6px] ${bubbleBgColor} ${shakeClass}`}
          {...longpress}
          onDoubleClick={() => {
            if (like) {
              handleSetLike("❤️");
              setLike([]);
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
          {message.message}
          {like.length !== 0 && (
            <div
              className={` flex  items-end absolute bg-gray-800 rounded-full px-1 border-2 border-gray-700 text-center z-10  ${
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
                  {like[0]}
                </motion.p>
              )}

              {message.likeAnimated && <p>{like[0]}</p>}
              {like.length === 2 && (
                <span className="text-xs">{like.length}</span>
              )}
              {/* {message?.like?.length !== 0 && (
                  <p>{message.like[0].likeEmoji}</p>
                )} */}
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
          text-xs  text-white pb-2`}
        >
          {formattedTime}
        </div>
      </div>
    </>
  );
}

export default Message;
