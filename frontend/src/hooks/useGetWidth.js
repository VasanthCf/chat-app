import { useEffect, useRef, useState } from "react";

function useGetWidth() {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const windowRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setViewWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { viewWidth, windowRef };
}

export default useGetWidth;
