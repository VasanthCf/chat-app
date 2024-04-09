import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "./../../context/SocketContext";
import useListenTyping from "./../../hooks/useListenTyping";
import useConversation from "../../zustand/useConversation";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";
import { MdClose } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";
import { IoCamera } from "react-icons/io5";
import usePreviewImage from "../../hooks/usePreviewImage";
const MessageInput = () => {
  const inputRef = useRef(null);
  const { authUser } = useAuthContext();
  const { sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedReceiver, reply, setReply } = useConversation();
  const { handleImageChange, img, setImg } = usePreviewImage();
  const [localInput, setLocalInput] = useState("");
  const fromMe = reply?.senderId === authUser._id || false;
  const imgRef = useRef(null);
  const whoReplies = fromMe ? "You" : selectedReceiver?.fullName;
  useListenTyping();
  useAutosizeTextArea(inputRef.current, localInput);
  const handleFocus = () => {
    socket.emit("sendTyping", {
      isTyping: true,
      senderId: authUser._id,
      receiverId: selectedReceiver?._id,
    });
  };
  useEffect(() => {
    if (img) {
      document.getElementById("my_modal_3").showModal();
    }
  }, [img]);
  const handleBlur = () => {
    socket.emit("sendTyping", {
      isTyping: false,
      senderId: authUser._id,
      receiverId: selectedReceiver?._id,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localInput) return;
    await sendMessage(localInput, reply);
    setLocalInput("");
    setReply({ replyingMsg: "", senderId: "" });
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setImg(null)}
            >
              ✕
            </button>
          </form>
          <div className="w-full rounded-xl">
            <img src={img} />
          </div>
        </div>
      </dialog>
      <form
        className={`transition-all ease-in duration-300 pb-2 my-0 w-full ${
          reply.replyingMsg
            ? "backdrop-blur-md sm:bg-gray-500/70 bg-gray-500/30  backdrop-filter"
            : ""
        } `}
        onSubmit={handleSubmit}
      >
        {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button> */}

        {reply.replyingMsg && (
          <div className="w-[100%]  max-w-[100%] leading-snug px-2.5 py-1.5 text-base truncate text-black">
            <div className="flex justify-between">
              {" "}
              <p className="text-[14px] text-gray-700 font-bold">
                Replying to <span className="font-pacific">{whoReplies} </span>
              </p>
              <p
                className=" rounded-full text-black text-lg cursor-pointer"
                onClick={() => setReply({ replyingMsg: "", senderId: "" })}
              >
                <MdClose />
              </p>
            </div>
            {reply.replyingMsg}
          </div>
        )}

        <div className="flex flex-col w-full px-2">
          <div
            className={` ${
              localInput === "" ? "px-1" : "pl-3"
            }  w-full h-full  relative bg-slate-800 border-gray-600  flex rounded-full items-center  gap-1`}
          >
            {localInput === "" && (
              <span
                className="text-white text-2xl bg-blue-600 cursor-pointer rounded-full p-2"
                onClick={() => imgRef?.current?.click()}
              >
                <IoCamera />
                <input
                  type="file"
                  hidden
                  ref={imgRef}
                  onChange={handleImageChange}
                />
              </span>
            )}
            <textarea
              ref={inputRef}
              className={`border-none block  pt-2.5 pb-1 resize-none flex-1 bg-transparent  min-h-12 text-white outline-none`}
              placeholder="Send a message"
              value={localInput}
              onChange={(e) => {
                setLocalInput(e.target.value);
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
              className=" w-10   h-10 rounded-full flex items-center  justify-center text-white text-xl"
            >
              <BsSend />
            </button>
          </div>{" "}
        </div>
      </form>
    </>
  );
};
export default MessageInput;
