import type { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useNavigationNode } from "@/app/navigation/hooks/useNavigationNode";
import IconText from "./IconText";

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
  const { ref, focused } = useNavigationNode({ focusKey });

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
