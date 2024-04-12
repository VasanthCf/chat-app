import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

function useListenConversation() {
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { allConversation, setAllConversation } = useConversation();

  useEffect(() => {
    socket?.on("notify", (data) => {
      if (authUser._id === data.receiverId && allConversation) {
        const updatedConversation = allConversation?.map((item) => {
          if (item._id === data.conversationId) {
            const index = item?.unreadCounts.findIndex(
              (users) => users.user === authUser._id
            );
            return {
              ...item,
              unreadCounts: item?.unreadCounts.map((unread, i) => {
                if (i === index) {
                  return { ...unread, count: data.counted };
                }
                return unread;
              }),
            };
          }
          return item;
        });

        setAllConversation(updatedConversation);
      }
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("notify");
    };
  }, [authUser._id, socket, setAllConversation, allConversation]);
}

export default useListenConversation;
