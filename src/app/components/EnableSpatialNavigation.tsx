import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router";

const defaultSelectors = [
  [
    "button",
    "a[href]",
    "input",
    "select",
    "textarea",
    "[tabindex]:not([tabindex='-1'])",
  ],
] as const;

export default function EnableSpatialNavigation({
  children,
}: {
  children?: ReactNode;
}) {
  const location = useLocation();
  const focusableElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    updateFocusableElements();

    document.addEventListener("keydown", handleKeyDown);

    // Handle dynamic DOM changes
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [location]);

  const updateFocusableElements = () => {
    const elements = document.querySelectorAll<HTMLElement>(
      Array.from(defaultSelectors).join(", ")
    );

    focusableElements.current = Array.from(elements);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(
          e.key
        )
      ) {
        return;
      }

      const currentElement = document.activeElement as HTMLElement;
      const currentIndex = focusableElements.current.indexOf(currentElement);

      // If no element is focused, focus the first element
      if (currentIndex === -1 && focusableElements.current.length > 0) {
        focusableElements.current[0].focus();
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
          if (currentIndex > 0) {
            focusableElements.current[currentIndex - 1].focus();
          }
          break;
        case "ArrowDown":
        case "ArrowRight":
          if (currentIndex < focusableElements.current.length - 1) {
            focusableElements.current[currentIndex + 1].focus();
          }
          break;
        case "Enter":
          (currentElement as HTMLElement)?.click();
          break;
      }
    },
    [focusableElements.current]
  );

  return <>{children}</>;
}
