import { ReactNode } from "react";
import { NavLink } from "react-router";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

export interface WatchNowProps {
  to: string;
  focusKey?: string;
  children?: ReactNode;
}

export default function WatchNowButton({
  to,
  children,
  focusKey,
}: WatchNowProps) {
  const { ref, focused } = useFocusable({ focusKey });

  console.log({ ref, focusKey, focused });

  return (
    <NavLink
      to={to}
      className={twMerge(
        clsx(
          "px-5 py-2 text-lg bg-blue-500 text-white rounded",
          focused && "bg-white text-black"
        )
      )}
      ref={ref}
    >
      {children}
    </NavLink>
  );
}
