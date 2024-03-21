import { createContext, useContext, useState } from "react";

const MobileContext = createContext(null);

export function MobileContextProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <MobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </MobileContext.Provider>
  );
}

export default MobileContextProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useMobileContext = () => {
  return useContext(MobileContext);
};
