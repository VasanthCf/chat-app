import { BsCheckAll } from "react-icons/bs";
import { useAuthContext } from "../../context/AuthContext";
import { useMobileContext } from "../../context/MobileContext";
import { useSocketContext } from "../../context/SocketContext";

import { findParticipant } from "../../utils/findParticipant";
import useConversation from "../../zustand/useConversation";
import { IoImageOutline } from "react-icons/io5";
const Conversation = ({ conv, lastIdx }) => {
  const { setSelectedConversation, selectedReceiver, setSelectedReceiver } =
    useConversation();

  const { onlineUsers } = useSocketContext();
  const { setIsMobile } = useMobileContext();
  const { authUser } = useAuthContext();

  let findReceiver1 =
    findParticipant(conv, authUser._id) === 1
      ? conv?.participants[0]
      : conv?.participants[1];
  const isSelected = selectedReceiver?._id === findReceiver1?._id;
  const isOnline = onlineUsers.includes(findReceiver1?._id);
  function handleClick() {
    setSelectedConversation(conv);
    setSelectedReceiver(findReceiver1);
    setIsMobile(true);
  }

  const receiverNotify = conv?.unreadCounts.filter(
    (item) => item.user === authUser._id
  );

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        } `}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={findReceiver1?.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1 relative">
          <div className="flex gap-3 justify-between items-center">
            <p className="font-bold text-gray-200">{findReceiver1?.fullName}</p>

            {/* {!receiverNotify && receiverNotify[0]?.count && (
              <span className="text-xl">{emoji}</span>
            )} */}
            {receiverNotify && receiverNotify[0]?.count !== 0 && (
              <p className=" bg-green-500 p-0.5 px-2 text-sm font-semibold rounded-full border-none ">
                {receiverNotify[0]?.count}
              </p>
            )}
          </div>
          <div className="text-gray-200 flex items-end justify-start">
            {authUser._id === conv?.lastMessage.sender ? (
              <span
                className={`text-xl ${
                  conv?.lastMessage.seen === true
                    ? "text-blue-800"
                    : "text-white"
                }`}
              >
                <BsCheckAll />
              </span>
            ) : (
              ""
            )}
            {conv?.lastMessage?.text ? (
              conv?.lastMessage?.text?.length > 20 ? (
                conv?.lastMessage?.text.substring(0, 18) + "..."
              ) : (
                conv?.lastMessage?.text
              )
            ) : (
              <IoImageOutline />
            )}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
