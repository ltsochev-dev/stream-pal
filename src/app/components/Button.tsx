import { forwardRef, ReactNode, type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
  startIcon?: ReactNode;
}

export const ButtonStyles =
  "bg-white text-black px-4 py-2 rounded flex items-center justify-center disabled:bg-gray-400" as const;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, startIcon, classes, ...props }, ref) => {
    const classList = twMerge(ButtonStyles, classes);

    return (
      <button type="button" className={classList} ref={ref} {...props}>
        {startIcon && (
          <span className={children ? "mr-2" : ""}>{startIcon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
