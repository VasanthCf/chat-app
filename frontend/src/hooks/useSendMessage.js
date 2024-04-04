import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { findParticipant } from "../utils/findParticipant";
import { useAuthContext } from "../context/AuthContext";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  let findReceiver =
    findParticipant(selectedConversation, authUser._id) === 1
      ? selectedConversation?.participants[0]
      : selectedConversation?.participants[1];
  const sendMessage = async (message, reply = "") => {
    setLoading(true);

    try {
      const res = await fetch(`/api/message/send/${findReceiver._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, reply }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendMessage;
