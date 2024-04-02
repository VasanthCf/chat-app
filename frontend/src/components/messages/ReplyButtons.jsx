import { HiReply } from "react-icons/hi";
import { MdClose } from "react-icons/md";

function ReplyButtons({
  fromMe,
  formattedTime,
  handleSetLike,
  handleSetReply,
  setOptionBlur,
}) {
  return (
    <div
      className={`absolute bg-gray-800 min-h-16 w-max px-2 py-1 rounded-lg z-50 min-w-28 ${
        fromMe ? "end-10 inset-y-5" : "start-10 inset-y-5"
      }`}
    >
      <div
        className={`absolute ${
          fromMe ? "right-0" : "left-0"
        } -top-14 px-2 py-1 rounded-full bg-gray-800 space-x-2 w-40 text-center text-2xl`}
      >
        <span className="cursor-pointer" onClick={() => handleSetLike("😂")}>
          😂
        </span>
        <span className="cursor-pointer" onClick={() => handleSetLike("😅")}>
          😅
        </span>
        <span className="cursor-pointer" onClick={() => handleSetLike("❤️")}>
          ❤️
        </span>
        <span className="cursor-pointer" onClick={() => handleSetLike("😤")}>
          😤
        </span>
      </div>
      <ul className="text-lg px-2 text-right relative  ">
        {" "}
        <li className="flex">
          {" "}
          <span className="text-xs text-gray-300">{formattedTime}</span>{" "}
          <span
            className="absolute text-red-400 cursor-pointer top-0 right-0"
            onClick={() => setOptionBlur(null)}
          >
            <MdClose />
          </span>
        </li>
        <li
          className="flex mt-2 justify-start gap-2 items-center cursor-pointer"
          onClick={() => handleSetReply()}
        >
          Reply{" "}
          <span>
            <HiReply />{" "}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ReplyButtons;
