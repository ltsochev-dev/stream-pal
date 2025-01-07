import type { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import IconText from "./IconText";
import clsx from "clsx";

export interface IconLinkProps extends NavLinkProps {
  icon?: ReactNode;
  children?: ReactNode;
  focusKey?: string;
}

export default function IconLink({
  icon,
  children,
  focusKey,
  ...props
}: IconLinkProps) {
  const { ref, focused } = useFocusable({ focusKey });

  return (
    <NavLink
      className={twMerge(
        clsx(
          "flex hover:underline focus:outline-none focus:bg-white focus:text-black rounded-md p-2",
          focused && "bg-white text-black"
        )
      )}
      {...props}
      ref={ref}
    >
      <IconText icon={icon}>{children}</IconText>
    </NavLink>
  );
}
