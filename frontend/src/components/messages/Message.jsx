import { useAuthContext } from "../../context/AuthContext";
import useLongPress from "../../hooks/useLongPress";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import usePostLike from "../../hooks/usePostLike";
import ReplyButtons from "./ReplyButtons";
import RepliedMessage from "./RepliedMessage";
function Message({ message }) {
  const x = useMotionValue(0);
  const [like, setLike] = useState([]);
  const { authUser } = useAuthContext();
  const { selectedConversation, setReply, setOptionBlur, optionBlur } =
    useConversation();

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

    await postLike(value, message._id, selectedConversation._id);
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
            <ReplyButtons
              fromMe={fromMe}
              handleSetLike={handleSetLike}
              handleSetReply={handleSetReply}
              setOptionBlur={setOptionBlur}
              formattedTime={formattedTime}
            />
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
