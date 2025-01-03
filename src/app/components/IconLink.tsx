import { forwardRef, ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router";
import IconText from "./IconText";

export interface IconLinkProps extends NavLinkProps {
  icon?: ReactNode;
  children?: ReactNode;
}

const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
  ({ icon, children, ...props }, ref) => (
    <NavLink
      className="flex hover:underline focus:outline-none focus:bg-white focus:text-black rounded-md p-2"
      {...props}
      ref={ref}
    >
      <IconText icon={icon}>{children}</IconText>
    </NavLink>
  )
);

export default IconLink;
