import type { FC, ReactNode } from "react";

interface IconTextProps {
  icon?: ReactNode;
  children?: ReactNode;
  active?: boolean;
}

const IconText: FC<IconTextProps> = ({ active, icon, children }) => {
  return (
    <div className="flex items-center justify-start space-x-2">
      {icon && <span>{icon}</span>}
      {children && (
        <span className={`text-base ${active ? "font-medium" : "font-normal"}`}>
          {children}
        </span>
      )}
    </div>
  );
};

export default IconText;
