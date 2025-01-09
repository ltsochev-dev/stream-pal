import { useEffect, useRef } from "react";
import { useFocusable } from "@/app/navigation/NavigationContext";

let nodeCounter = 1;

export interface UseNavigationNodeProps {
  focusKey?: string;
  parentFocusKey?: string;
}

export const useNavigationNode = ({
  focusKey,
  parentFocusKey,
}: UseNavigationNodeProps) => {
  const resolvedFocusKey = focusKey ?? `sn:item-${++nodeCounter}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const { register, unregister, navigationTree, setFocused, currentFocus } =
    useFocusable();

  useEffect(() => {
    if (!ref.current) return;

    register({
      focusKey: resolvedFocusKey,
      ref,
      rect: (ref.current as HTMLElement).getBoundingClientRect(),
      children: [],
      parentKey: parentFocusKey,
    });

    return () => {
      unregister(resolvedFocusKey);
    };
  }, [resolvedFocusKey, parentFocusKey, register, unregister]);

  const setPath = (focusPath: string) => {
    setFocused(focusPath);
  };

  const focusSelf = () => {
    setPath(resolvedFocusKey);
  };

  console.log({ navigationTree });

  return { ref, focusSelf, focused: focusKey === currentFocus };
};
