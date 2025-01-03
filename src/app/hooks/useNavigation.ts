import { useFocus } from "@/app/context/FocusProvider";

type Direction = "up" | "down" | "left" | "right";

interface FocusableNode {
  path: string;
  direction: Direction;
  [key: string]: any; // Allows for additional properties specific to the node
}

type FocusableTree = FocusableNode[];

export const useNavigation = (focusableTree: FocusableTree) => {
  const { focusPath, setFocusPath } = useFocus();

  const handleNavigation = (direction: Direction) => {
    const currentElement = focusableTree.find(
      (node) => node.path === focusPath
    );

    if (!currentElement) {
      return;
    }

    const nextElement = getNearestNeighbor(
      currentElement,
      direction,
      focusableTree
    );
    if (nextElement) {
      setFocusPath(nextElement.path);
    }
  };

  const getNearestNeighbor = (
    currentElement: FocusableNode,
    direction: Direction,
    tree: FocusableTree
  ) => {
    // @todo Implement Minkowski distance algorithm
    return tree.find((node) => node.direction === currentElement.direction);
  };

  return { handleNavigation };
};
