import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

function usePostLike() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();
  const postLike = async (likeIcon, messageId, receiverId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/like/${messageId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likeIcon, receiverId }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const index = messages.findIndex((message) => message._id === messageId);
      if (index !== -1) {
        // Update the message at the found index
        const updatedMessages = [...messages];
        updatedMessages[index].like = data.message.like;
        setMessages(updatedMessages);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { postLike, loading };
}

export default usePostLike;
