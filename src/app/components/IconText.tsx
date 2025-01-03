import type { FC, ReactNode } from "react";

interface IconTextProps {
  icon?: ReactNode;
  children?: ReactNode;
  active?: boolean;
}

const IconText: FC<IconTextProps> = ({ active, icon, children }) => {
  return (
    <div className="flex items-center gap-2">
      {icon && <span>{icon}</span>}
      <span className={`text-base ${active ? "font-medium" : "font-normal"}`}>
        {children}
      </span>
    </div>
  );
};

export default IconText;
