import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

interface FocusState {
  focusPath: string;
}

type FocusAction = { type: "SET_FOCUS"; payload: string };

const initialState: FocusState = {
  focusPath: "/app/menu",
};

const focusReducer = (state: FocusState, action: FocusAction): FocusState => {
  switch (action.type) {
    case "SET_FOCUS":
      return { ...state, focusPath: action.payload };

    default:
      return state;
  }
};

interface FocusContextType {
  focusPath: FocusState["focusPath"];
  setFocusPath: (path: string) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

interface FocusProviderProps {
  children?: ReactNode;
}

const FocusProvider = ({ children }: FocusProviderProps) => {
  const [state, dispatch] = useReducer(focusReducer, initialState);

  const setFocusPath = useCallback((path: string) => {
    dispatch({ type: "SET_FOCUS", payload: path });
  }, []);

  return (
    <FocusContext.Provider value={{ focusPath: state.focusPath, setFocusPath }}>
      {children}
    </FocusContext.Provider>
  );
};

export default FocusProvider;

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocus must be used within a FocusProvider");
  }

  return context;
};
