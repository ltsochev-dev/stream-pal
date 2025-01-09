import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getNearestObject } from "./utils";

const LRUP = {
  left: ["ArrowLeft"],
  right: ["ArrowRight"],
  up: ["ArrowUp"],
  down: ["ArrowDown"],
};

export type Direction = keyof typeof LRUP;

export interface NavNode {
  focusKey: string;
  bounds: BoundingRect | null;
  ref: RefObject<any>;
}

export type BoundingRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type NavMap = Map<string, NavNode>;

interface NavContextType {
  registerNode: (focusKey: string, ref: RefObject<HTMLElement>) => void;
  unregisterNode: (focusKey: string) => void;
  updateNodeDimensions: (focusKey: string) => void;
  nodes: NavMap;
  focusPath: string;
  setFocusPath: Dispatch<SetStateAction<string>>;
}

const NavContext = createContext<NavContextType | null>(null);

export const NavProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const nodes = useRef(new Map<string, NavNode>());
  const [focusPath, setFocusPath] = useState("sn:root");

  const registerNode = (focusKey: string, ref: RefObject<HTMLElement>) => {
    if (!nodes.current.has(focusKey)) {
      const element = ref.current;
      const { width, height, x, y } = element?.getBoundingClientRect() ?? {};

      nodes.current.set(focusKey, {
        focusKey,
        bounds: element ? { width, height, x, y } : null,
        ref,
      });
    }
  };

  const unregisterNode = (focusKey: string) => {
    nodes.current.delete(focusKey);
  };

  const updateNodeDimensions = (focusKey: string) => {
    const node = nodes.current.get(focusKey);
    if (node && node.ref.current) {
      const element = node.ref.current;
      const { width, height, x, y } = element?.getBoundingClientRect() ?? {};

      nodes.current.set(focusKey, { ...node, bounds: { width, height, x, y } });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const direction = Object.entries(LRUP)
      .find(([dir, codes]) => (codes.includes(e.code) ? dir : false))
      ?.at(0);

    if (!direction) return;

    const currentNode = nodes.current.get(focusPath);

    if (!currentNode) return;

    switch (direction) {
      case "left":
        const newNode = getNearestObject(currentNode, nodes.current, "left");
        console.log({ newNode });
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes]);

  return (
    <NavContext.Provider
      value={{
        registerNode,
        unregisterNode,
        updateNodeDimensions,
        focusPath,
        setFocusPath,
        nodes: nodes.current,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNavContext must be used within a NavProvider");
  }

  return context;
};

export default NavProvider;
