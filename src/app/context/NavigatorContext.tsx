import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface NavigatorContextType {
  isMobile: boolean;
  isTV: boolean;
  hasInternetConnection: boolean;
  hasMouse: boolean;
  screen: {
    width: number;
    height: number;
  };
}

const NavigatorContext = createContext<NavigatorContextType | null>(null);

const NavigatorProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTV, setIsTV] = useState(false);
  const [hasInternetConnection, setHasInternetConnection] = useState(true);
  const [hasMouse, setHasMouse] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handlePointerEvent = () => {
      setHasMouse(true);
    };

    const setOnline = () => setHasInternetConnection(true);
    const setOffline = () => setHasInternetConnection(false);

    handleResize();
    setHasInternetConnection(window.navigator.onLine);

    const isTvTest = /(?:Smart\s*TV|Web0S|webOS|Tizen|Android\s*TV)/i.test(
      navigator.userAgent
    );

    setIsTV(isTvTest);

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerEvent);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerEvent);
    };
  }, []);

  return (
    <NavigatorContext.Provider
      value={{
        isMobile,
        isTV,
        hasInternetConnection,
        hasMouse,
        screen: screenSize,
      }}
    >
      {children}
    </NavigatorContext.Provider>
  );
};

export const useNavigator = () => {
  const context = useContext(NavigatorContext);
  if (context === null) {
    throw new Error("useNavigator must be used within a NavigatorProvider");
  }
  return context;
};

export default NavigatorProvider;
