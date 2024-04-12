import { useMobileContext } from "../../context/MobileContext.jsx";
import useGetWidth from "../../hooks/useGetWidth";
import MessageContainer from "./../../components/messages/MessageContainer";
import Sidebar from "./../../components/sidebar/Sidebar";

function Home() {
  const { windowRef, viewWidth } = useGetWidth();

  const { isMobile } = useMobileContext();
  return (
    <div
      className={` flex h-[100dvh] w-full sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0`}
      ref={windowRef}
    >
      {(viewWidth >= 786 || !isMobile) && <Sidebar />}
      {(viewWidth >= 786 || isMobile) && <MessageContainer />}
    </div>
  );
}

export default Home;
