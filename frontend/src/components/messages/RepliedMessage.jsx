function RepliedMessage({ fromMe, replyMsg, whoReplied }) {
  return (
    <div
      className={`text-white chat-header w-fit max-w-[80%] mb-1 text-sm ${
        fromMe
          ? "border-r-2 border-gray-300 pr-1"
          : "border-l-2  border-gray-300 pl-1"
      }`}
    >
      <span className={`absolute -top-3 text-gray-400 `}>{whoReplied}</span>
      <p className=" bg-gray-800  px-5 text-start py-1 w-full rounded-full">
        {replyMsg.length > 80 && `${replyMsg.slice(0, 80)}...`}
        {replyMsg.length <= 80 && replyMsg}
      </p>
    </div>
  );
}

export default RepliedMessage;
