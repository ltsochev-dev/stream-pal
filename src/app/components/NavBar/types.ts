import type { ComponentType, SVGProps, SyntheticEvent } from "react";

export interface NavItem {
  to: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: SyntheticEvent) => void;
}

export interface NavBarPropsBase {
  items: NavItem[];
}
