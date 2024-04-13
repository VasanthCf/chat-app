import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { findParticipant } from "../utils/findParticipant";
import { useAuthContext } from "../context/AuthContext";

const generateUniqueId = (flag = "_") =>
  flag + Math.random().toString(36).substring(2, 9);

function useSendMessage() {
  const { authUser } = useAuthContext();
  const { messages, setMessages, setGlobalLoading, selectedConversation } =
    useConversation();
  let findReceiver =
    findParticipant(selectedConversation, authUser._id) === 1
      ? selectedConversation?.participants[0]
      : selectedConversation?.participants[1];
  const dates = new Date();
  const formatted = dates.toISOString();

  const sendMessage = async (
    message,
    reply = "",
    img = "",
    setLocalInput,
    setImg,
    setReply
  ) => {
    setGlobalLoading(true);
    setLocalInput("");
    setImg("");
    setReply({ replyingMsg: "", senderId: "" });
    const id = generateUniqueId(message);
    let replied = {
      replyMsg: "",
      senderId: "",
    };
    if (reply) {
      replied = { replyMsg: reply?.replyingMsg, senderId: reply?.senderId };
    }

    const newMessage = {
      createdAt: formatted,
      like: [],
      likeAnimated: false,
      message: message,
      receiverId: findReceiver._id,
      replied,
      senderId: authUser._id,
      updatedAt: "2024-04-08T04:05:14.401Z",
      __v: 0,
      _id: id,
      seen: false,
      img,
    };
    let temp = [...messages, newMessage];

    setMessages([...messages, newMessage]);

    try {
      const res = await fetch(`/api/message/send/${findReceiver._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, reply, img }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const findFakeIndex = temp.findIndex((item) => item._id === id);
      temp[findFakeIndex] = data;
      localStorage.setItem("currentMsg", JSON.stringify(data));
      setMessages(temp);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGlobalLoading(false);
    }
  };

  return { sendMessage };
}

export default useSendMessage;
