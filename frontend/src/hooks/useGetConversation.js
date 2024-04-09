import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const { setAllConversation } = useConversation();
  const [conversation, setConversation] = useState([]);
  const { socket } = useSocketContext();
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/message/conversation");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversation(data.conversations);
        setAllConversation(data.conversations);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    function handleStart() {
      getConversation();
    }
    socket?.on("startConv", handleStart);
    getConversation();
    return () => {
      socket?.off("startConv", handleStart);
    };
  }, [socket, setAllConversation]);
  return { loading, conversation };
};

export default useGetConversation;
