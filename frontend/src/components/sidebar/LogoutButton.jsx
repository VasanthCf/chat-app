import { BiLogOut } from "react-icons/bi";

import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto pl-2 w-full gap-2 flex">
      {!loading ? (
        <>
          <BiLogOut
            className="w-6 h-6 text-white cursor-pointer"
            onClick={logout}
          />{" "}
          <span className="text-white"> logout</span>{" "}
        </>
      ) : (
        <span className="loading loading-spinner"> </span>
      )}
    </div>
  );
}

export default LogoutButton;
