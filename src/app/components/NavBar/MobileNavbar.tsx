import { useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import IconLink from "@/app/components/IconLink";
import type { NavBarPropsBase } from "./types";
import Backdrop from "./Backdrop";
import { useNavigationNode } from "@/app/navigation/hooks/useNavigationNode";

export interface MobileNavbarProps extends NavBarPropsBase {
  focusKey?: string;
}

export default function MobileNavbar({
  items,
  focusKey = "mobile-navbar",
}: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, focused } = useNavigationNode(focusKey);

  const isReallyOpen = focused || isOpen;

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <FocusContext.Provider value={focusKey}>
        <header
          className={clsx(
            "bg-gray-800 text-white transition-all duration-300 ease-in-out h-full overflow-hidden px-4 py-8 fixed top-0 bottom-0 z-20",
            isReallyOpen ? "w-64" : "w-20",
            focused && "shadow-md border-2 border-white"
          )}
          ref={ref}
        >
          <button
            type="button"
            onClick={toggleOpen}
            className="p-4 cursor-pointer text-xl flex space-x-2 hover:bg-white hover:text-black rounded-lg"
            title="Toggle menu"
          >
            <span className="select-none">&#9776;</span>
            {isReallyOpen && <h1 className="select-none">StreamPal</h1>}
          </button>

          <nav className="pt-4">
            <ul className="flex flex-col items-start justify-start space-y-4">
              {items.map((item, index) => (
                <li
                  key={`mobile-navbar-${item.to}-${index}`}
                  className="px-4 py-2 flex-grow flex-shrink-0 w-full hover:bg-white hover:text-black rounded-lg"
                >
                  <IconLink
                    to={item.to}
                    icon={item.icon && <item.icon width={25} height={25} />}
                    onClick={item.onClick}
                    className="block select-none"
                    title={item.label}
                    focusKey={`app-root/mobile-navbar/button/${index}`}
                  >
                    {isReallyOpen && item.label}
                  </IconLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </FocusContext.Provider>
      {isReallyOpen &&
        createPortal(
          <Backdrop onClick={toggleOpen} />,
          document.body,
          "mobile-nav"
        )}
    </>
  );
}
