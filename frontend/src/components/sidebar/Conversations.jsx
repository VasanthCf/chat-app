import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emoji";

import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();

  return (
    <div className="py-2  w-[95%] flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}

      {conversation.map((conv, i) => (
        <Conversation
          key={i}
          conv={conv}
          emoji={getRandomEmoji()}
          lastIdx={i === conversation.length - 1}
        />
      ))}
    </div>
  );
};
export default Conversations;
