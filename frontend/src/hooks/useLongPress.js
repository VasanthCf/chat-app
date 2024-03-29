import { useEffect, useRef, useState } from "react";

const useLongPress = (callback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const timerIdRef = useRef(null); // useRef for persistent reference

  useEffect(() => {
    if (startLongPress) {
      timerIdRef.current = setTimeout(callback, ms);
    } else {
      clearTimeout(timerIdRef.current);
    }

    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => {
      setStartLongPress(true);
    },
    onMouseUp: () => {
      setStartLongPress(false);
    },
    onMouseLeave: () => {
      setStartLongPress(false);
    },
    onTouchStart: () => {
      setStartLongPress(true);
    },
    onTouchEnd: () => {
      setStartLongPress(false);
    },
  };
};

export default useLongPress;
