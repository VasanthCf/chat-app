import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();

  const { conversation } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search atleast 3 Characters");
    }
    const conversationFound = conversation.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationFound) {
      // setSelectedConversation(conversationFound);
      setSearch("");
    } else {
      toast.error("No User Found!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-2 mb-2 w-full"
    >
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered flex-1 rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
