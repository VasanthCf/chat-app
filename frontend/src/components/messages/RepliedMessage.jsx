function isURL(str) {
  // Regular expression for URL pattern
  const urlPattern =
    /^(https?:\/\/)?([\w.-]+)(\.[\w]{2,})+([\w\-.~:/?#[\]@!$&'()*+,;=]*)?$/;
  return urlPattern.test(str);
}

function RepliedMessage({ fromMe, replyMsg, whoReplied }) {
  const isReplyImg = isURL(replyMsg);
  return (
    <div
      className={`text-white chat-header w-fit max-w-[80%] mb-1 text-sm ${
        fromMe
          ? "border-r-2 border-gray-300 pr-1"
          : "border-l-2  border-gray-300 pl-1"
      }`}
    >
      <span className={`absolute -top-3 text-gray-400 `}>{whoReplied}</span>
      {isReplyImg ? (
        <div className="w-14 h-14 ml-2 rounded-lg bg-black">
          <img
            src={replyMsg}
            className="w-full h-full  object-contain rounded-lg"
          />
        </div>
      ) : (
        <p className=" bg-gray-800  px-5 text-start py-1 w-full rounded-full">
          {replyMsg.length > 80 && `${replyMsg.slice(0, 80)}...`}
          {replyMsg.length <= 80 && replyMsg}
        </p>
      )}
    </div>
  );
}

export default RepliedMessage;
