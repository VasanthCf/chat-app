import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedReceiver } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedReceiver._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        if (data.length !== 0) {
          localStorage.setItem(
            "currentMsg",
            JSON.stringify(data[data.length - 1])
          );
        }
        setMessages(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedReceiver._id) getMessage();
  }, [selectedReceiver._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
