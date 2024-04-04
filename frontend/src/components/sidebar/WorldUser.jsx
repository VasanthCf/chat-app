import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";

import useStartConversation from "./../../hooks/useStartConversation";
function WorldUser({ setWorld }) {
  const [allUser, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const { startChat, loading: chatLoading } = useStartConversation();
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setAllUsers(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  async function handleClick(id) {
    await startChat(id);

    if (!chatLoading) {
      setWorld(false);
    }
  }

  if (!allUser || loading) {
    return <span className="loading loading-spinner"></span>;
  }
  return (
    <motion.div
      className="py-2 w-[95%] flex flex-col overflow-auto border-t-2 border-gray-500 "
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      exit={{ y: 300 }}
    >
      <div className="w-full text-end flex justify-end">
        {" "}
        <span
          className="gap-2 bg-gray-100 rounded-full px-2 py-1 bg-opacity-20 backdrop-blur-lg text-white flex items-center justify-end hover:bg-opacity-30 cursor-pointer mb-0.5
        "
          onClick={() => setWorld(false)}
        >
          {" "}
          <FaArrowLeft /> back
        </span>
      </div>
      {allUser?.map((item, i) => (
        <div key={i}>
          <div
            className={`flex mb-1 gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
            onClick={() => handleClick(item._id)}
          >
            {/* <div className={`avatar ${isOnline ? "online" : ""}`}> */}
            <div className="w-12 rounded-full">
              <img src={item.profilePic} alt="user avatar" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">{item.fullName}</p>

                {/* <span className="text-xl">{emoji}</span> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default WorldUser;
