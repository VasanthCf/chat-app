import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { FaArrowLeft } from "react-icons/fa6";
import { useMobileContext } from "../../context/MobileContext";
import { findParticipant } from "../../utils/findParticipant";

const MessageContainer = () => {
  const { selectedConversation, isTyping, setReply } = useConversation();
  const { setIsMobile } = useMobileContext();
  const { authUser } = useAuthContext();
  // useEffect(() => {
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);
  let findReceiver = "";
  if (selectedConversation) {
    findReceiver =
      findParticipant(selectedConversation, authUser._id) === 1
        ? selectedConversation?.participants[0]
        : selectedConversation?.participants[1];
  }

  const profilePic = findReceiver.profilePic || "";
  return (
    <div className="md:min-w-[450px] w-full overflow-y-auto flex flex-col transition-all ease-in duration-300">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-800 flex items-center gap-2 justify-start px-4 py-2 mb-0">
            <span
              className="p-2 text-lg text-white rounded-full cursor-pointer"
              onClick={() => {
                setIsMobile(false);
                setReply({ replyingMsg: "", senderId: "" });
              }}
            >
              <FaArrowLeft />
            </span>
            <div className="w-8 rounded-full cursor-pointer">
              {" "}
              <img src={profilePic} />
            </div>
            <span className="text-white text-lg font-pacific leading-loose">
              {findReceiver.fullName}
            </span>
          </div>

          <Messages />
          {isTyping && (
            <div className=" bg-gray-400/70 backdrop-blur-3xl px-2 py-1 rounded-full flex gap-2 ml-4  absolute bottom-14  bg-clip-padding backdrop-filter">
              <div className="w-7 rounded-full">
                <img src={findReceiver.profilePic} />
              </div>
              <p className="flex  bg-gray-800 justify-center items-center rounded-full h-7 w-12 ">
                <span className=" text-gray-400 loading loading-dots loading-md"></span>
              </p>
            </div>
          )}
          <MessageInput />
        </>
      )}
    </div>
  );
};
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
export default MessageContainer;
