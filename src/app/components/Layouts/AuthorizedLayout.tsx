import { type FC } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "@/app/context/AuthContext";
import AvatarCircle from "@/app/components/AvatarCircle";
import IconText from "@/app/components/IconText";
import HomeIcon from "@/app/icons/home.svg?react";
import SearchIcon from "@/app/icons/search.svg?react";
import PlusIcon from "@/app/icons/plus.svg?react";
import UserIcon from "@/app/icons/user.svg?react";
import SettingsIcon from "@/app/icons/settings.svg?react";
import LogoutIcon from "@/app/icons/log-out.svg?react";

const AuthorizedLayout: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="px-8 mx-auto flex justify-between items-center gap-12 min-h-10">
          <h1 className="text-2xl font-bold select-none">StreamPal</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <NavLink to="/home" className="hover:underline">
                  <IconText icon={<HomeIcon width={15} height={15} />} active>
                    Home
                  </IconText>
                </NavLink>
              </li>
              <li>
                <NavLink to="/search" className="hover:underline">
                  <IconText icon={<SearchIcon width={15} height={15} />} active>
                    Search
                  </IconText>
                </NavLink>
              </li>
              <li>
                <NavLink to="/watchlist" className="hover:underline">
                  <IconText icon={<PlusIcon width={15} height={15} />}>
                    Watchlist
                  </IconText>
                </NavLink>
              </li>
              <li>
                <NavLink to="/home" className="hover:underline">
                  <IconText icon={<UserIcon width={15} height={15} />}>
                    Profile
                  </IconText>
                </NavLink>
              </li>
              <li>
                <NavLink to="/home" className="hover:underline">
                  <IconText icon={<SettingsIcon width={15} height={15} />}>
                    Settings
                  </IconText>
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:underline"
                  onClick={handleLogout}
                >
                  <IconText icon={<LogoutIcon width={15} height={15} />}>
                    Logout
                  </IconText>
                </button>
              </li>
            </ul>
          </nav>
          {user && (
            <div className="ml-auto flex gap-2 items-center">
              <span>{user?.name}</span>
              <AvatarCircle
                src={user?.avatarUrl}
                alt={`${user.name} Profile Image`}
              />
            </div>
          )}
        </div>
      </header>
      <main className="app-container">
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
