import clsx from "clsx";
import { SyntheticEvent, type FC } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/app/context/AuthContext";
import { useNavigator } from "@/app/context/NavigatorContext";
import HomeIcon from "@/app/icons/home.svg?react";
import SearchIcon from "@/app/icons/search.svg?react";
import PlusIcon from "@/app/icons/plus.svg?react";
import UserIcon from "@/app/icons/user.svg?react";
import SettingsIcon from "@/app/icons/settings.svg?react";
import LogoutIcon from "@/app/icons/log-out.svg?react";
import { NavItem } from "@/app/components/NavBar/types";
import DesktopNavbar from "@/app/components/NavBar/DesktopNavbar";
import MobileNavbar from "@/app/components/NavBar/MobileNavbar";

const AuthorizedLayout: FC = () => {
  const { user, logout } = useAuth();
  const { isTV, isMobile } = useNavigator();
  const navigate = useNavigate();

  const isDesktop = isTV || isMobile;
  // const isDesktop = !isTV && !isMobile;

  const handleLogout = (e: SyntheticEvent): void => {
    e.preventDefault();

    logout();

    navigate("/login");
  };

  const NavItems: NavItem[] = [
    { to: "/home", label: "Home", icon: HomeIcon },
    {
      to: "/search",
      label: "Search",
      icon: SearchIcon,
    },
    {
      to: "/watchlist",
      label: "Watchlist",
      icon: PlusIcon,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: UserIcon,
    },
    {
      to: "/settings",
      label: "Settings",
      icon: SettingsIcon,
    },
    {
      to: "#",
      label: "Logout",
      icon: LogoutIcon,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {isDesktop && <DesktopNavbar items={NavItems} user={user} />}
      {!isDesktop && (
        <MobileNavbar items={NavItems} focusKey="app-root/mobile-navbar" />
      )}
      <main className={clsx("app-container", !isDesktop && "pl-20")}>
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024-{new Date().getFullYear()} StreamPal. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthorizedLayout;
