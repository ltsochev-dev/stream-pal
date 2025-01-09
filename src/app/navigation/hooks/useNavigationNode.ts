import { RefObject, useEffect, useRef } from "react";
import { useNavContext } from "@/app/navigation/NavigationContext";

let nodeCounter = 1;

export const useNavigationNode = (focusKey?: string) => {
  const resolvedFocusKey = focusKey ?? `sn:item-${++nodeCounter}`;
  const ref = useRef<any>(null);
  const {
    registerNode,
    unregisterNode,
    updateNodeDimensions,
    focusPath,
    setFocusPath,
    nodes,
  } = useNavContext();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateNodeDimensions(resolvedFocusKey);
    });

    registerNode(resolvedFocusKey, ref as RefObject<HTMLElement>);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }

      unregisterNode(resolvedFocusKey);
    };
  }, [resolvedFocusKey, registerNode, unregisterNode, updateNodeDimensions]);

  const setPath = (focusPath: string) => {
    setFocusPath(focusPath);
  };

  const focusSelf = () => {
    setPath(resolvedFocusKey);
  };

  console.log({ nodes });

  return { ref, focusSelf, focused: focusKey === focusPath };
};
