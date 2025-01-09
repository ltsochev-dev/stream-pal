import type { ComponentType, SVGProps, SyntheticEvent } from "react";

export interface NavItem {
  to: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
   
  onClick?: (e: SyntheticEvent) => void;
}

export interface NavBarPropsBase {
  items: NavItem[];
}
