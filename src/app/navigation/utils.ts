import type { Direction, NavMap, FocusableNode } from "./NavigationContext";

export const getCenter = (rect: FocusableNode["rect"]) => {
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  return { centerX, centerY };
};

export const getNearestObject = (
  current: FocusableNode,
  nodes: NavMap,
  direction: Direction
) => {
  const { centerX: currentX, centerY: currentY } = getCenter(
    current.rect ?? { x: 0, y: 0, width: 0, height: 0 }
  );

  const filteredNodes = Array.from(nodes.entries())
    .map(([_, node]) => ({
      ...node,
      ...(node.rect && getCenter(node.rect)),
    }))
    .filter(({ centerX = 0, centerY = 0 }) => {
      switch (direction) {
        case "up":
          return centerY < currentY;
        case "down":
          return centerY > currentY;
        case "left":
          return centerX < currentX;
        case "right":
          return centerX > currentX;
        default:
          return false;
      }
    });

  // Quit if no nearby objects in the required direction
  if (filteredNodes.length === 0) {
    return null;
  }

  const nearest = filteredNodes.reduce((closest, node) => {
    const distance = Math.sqrt(
      Math.pow(node.centerX - currentX, 2) +
        Math.pow(node.centerY - currentY, 2)
    );

    const closestDistance = Math.sqrt(
      Math.pow(closest.centerX - currentX, 2) +
        Math.pow(closest.centerY - currentY, 2)
    );
    return distance < closestDistance ? node : closest;
  });

  return nearest;
};
