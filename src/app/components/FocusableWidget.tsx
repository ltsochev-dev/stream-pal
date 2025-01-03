import { useEffect, useRef } from "react";

export interface FocusableWidgetProps {
  focusKey: string;
  children: React.ReactNode;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  disabled?: boolean;
  tabIndex?: number;
  className?: string;
}

export default function FocusableWidget({
  focusKey,
  focused,
  onBlur,
  onFocus,
  children,
  disabled,
  tabIndex,
}: FocusableWidgetProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Trigger focus/blur effects when `focused` changes
  useEffect(() => {
    if (focused && onFocus) {
      onFocus();
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (!focused && onBlur) {
      onBlur();
    }
  }, [focused, onfocus, onBlur]);

  return (
    <div
      ref={ref}
      className={`focusable-widget ${focused ? "focused" : ""}`}
      tabIndex={disabled || !tabIndex ? -1 : tabIndex}
      data-focus-key={focusKey}
    >
      {children}
    </div>
  );
}
