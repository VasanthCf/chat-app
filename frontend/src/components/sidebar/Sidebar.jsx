import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="sm:border-r w-full sm:border-slate-500 py-4 flex justify-start items-center flex-col">
      <SearchInput />
      <div className="divider "></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
