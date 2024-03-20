function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {" "}
          <img src="" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white bg-gradient-to-b from-purple-600 bg-violet-500 pb-2`}
      >
        hi there
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        12.22
      </div>
    </div>
  );
}

export default Message;
