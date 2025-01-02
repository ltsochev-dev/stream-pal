import { type FC } from "react";
import ChevronLeftIcon from "@/app/icons/chevron-left.svg?react";
import SystemClock from "./SystemClock";

export interface HeaderProps {
  title: string;
  hidden?: boolean;
  utcTime?: number | null;
  onGoBack?: () => void;
}

const Header: FC<HeaderProps> = ({ title, hidden = false, onGoBack }) => {
  return (
    <div
      className={`top-bar fixed top-0 left-0 right-0 pt-4 px-8 pb-16 bg-gradient-to-b from-black to-transparent transition-transform ${
        hidden ? "transform -translate-y-full" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <button type="button" onClick={onGoBack} title="Go Back">
          <div className="flex items-center justify-center">
            <span className="mr-2">
              <ChevronLeftIcon />
            </span>
            <span className="font-bold text-xl">{title}</span>
          </div>
        </button>
        <SystemClock />
      </div>
    </div>
  );
};

export default Header;
