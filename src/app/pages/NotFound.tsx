import { NavLink } from "react-router";
import IconText from "../components/IconText";
import HomeIcon from "@/app/icons/home.svg?react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="px-8 mx-auto flex justify-start items-center gap-12 min-h-10">
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
            </ul>
          </nav>
        </div>
      </header>
      <main className="app-container flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center mt-8">404 Not Found</h1>
        <p className="text-center mt-4">
          The page you are looking for does not exist.
        </p>
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
}
