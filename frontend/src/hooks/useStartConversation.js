import { useState } from "react";
import toast from "react-hot-toast";

function useStartConversation() {
  const [loading, setLoading] = useState(false);

  const startChat = async (receiverId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/startChat/${receiverId}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, startChat };
}

export default useStartConversation;
