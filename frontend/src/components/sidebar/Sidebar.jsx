import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { IoMdTrendingUp } from "react-icons/io";
import WorldUser from "./WorldUser";

const Sidebar = () => {
  const [world, setWorld] = useState(false);

  return (
    <div className="sm:border-r w-full sm:border-slate-500 py-4 flex justify-start items-center flex-col">
      <SearchInput />

      {!world && (
        <>
          {" "}
          <div
            className="text-white w-[95%] flex items-center  h-14 my-2 px-2 rounded-md m-auto  justify-between bg-gray-200 bg-opacity-40 font-bold   font-cat text-xl tracking-wider cursor-pointer"
            onClick={() => setWorld(true)}
          >
            Find more peoples{" "}
            <span className=" text-xl">
              <IoMdTrendingUp />
            </span>
          </div>
          <Conversations />
        </>
      )}

      {world && <WorldUser setWorld={setWorld} />}
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
