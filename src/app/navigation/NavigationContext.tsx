import {
  type FC,
  type RefObject,
  type ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

export const LRUP = {
  left: ["ArrowLeft"],
  right: ["ArrowRight"],
  up: ["ArrowUp"],
  down: ["ArrowDown"],
};

export type Direction = keyof typeof LRUP;

export interface FocusableNode {
  focusKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: RefObject<any>;
  rect: DOMRect;
  parentKey?: string;
  children: FocusableNode[];
}

export type NavMap = Map<string, FocusableNode>;

interface NavigationContextType {
  register: (node: FocusableNode) => void;
  unregister: (id: string) => void;
  focusNode: (id: string) => void;
  navigationTree: FocusableNode[];
  currentFocus?: string;
  setFocused: (focusKey: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useFocusable = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useFocusable must be used within NavigationProvider");
  }

  return context;
};

const NavigationProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [navigationTree, setNavigationTree] = useState<FocusableNode[]>([]);
  const [currentFocusedId, setCurrentFocusedId] = useState<string>("");
  const nodeMap = useRef(new Map<string, FocusableNode>());

  const register = (node: FocusableNode) => {
    if (!nodeMap.current.has(node.focusKey)) {
      nodeMap.current.set(node.focusKey, node);
      updateTree();
    }
  };

  const unregister = (focusKey: string) => {
    if (nodeMap.current.has(focusKey)) {
      nodeMap.current.delete(focusKey);
      updateTree();
    }
  };

  const updateTree = () => {
    const nodes = Array.from(nodeMap.current.values());

    const buildTree = (parentId?: string): FocusableNode[] => {
      return nodes
        .filter((node) => node.focusKey === parentId)
        .map((node) => ({
          ...node,
          children: buildTree(node.focusKey),
        }));
    };

    // Build tree recursively
    setNavigationTree(buildTree());
  };

  return (
    <NavigationContext.prototype
      value={{
        register,
        unregister,
        navigationTree,
        currentFocusedId,
        setFocused: setCurrentFocusedId,
      }}
    >
      {children}
    </NavigationContext.prototype>
  );
};

export default NavigationProvider;
