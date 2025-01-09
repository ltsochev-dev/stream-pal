import type { ReactNode } from "react";

export interface FocusableWidgetProps {
  focusKey: string;
  parentFocusKey?: string;
  children: ReactNode;
}

export default function FocusableWidget() {}
