import { NavLink } from "react-router";
import { useNavigator } from "@/app/context/NavigatorContext";

export default function LandingPage() {
  const { isMobile, isTV, hasInternetConnection } = useNavigator();

  return (
    <div className="container mx-auto flex flex-col justify-between items-center gap-12">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Landing Page</h1>

      <p>This is the home page of your WebOS React application.</p>

      <div className="mt-8">
        <p>**Device Information:**</p>
        <ul>
          <li>Is Mobile: {isMobile ? "Yes" : "No"}</li>
          <li>Is TV: {isTV ? "Yes" : "No"}</li>
          <li>
            Internet Connection:{" "}
            {hasInternetConnection ? "Available" : "Unavailable"}
          </li>
        </ul>
        <div className="text-center mt-4">
          <NavLink to="/home" className="hover:underline">
            Home
          </NavLink>
        </div>
        <div className="text-center mt-2">
          <NavLink to="/movie/details/1337" className="hover:underline">
            Straight to details
          </NavLink>
        </div>
      </div>
    </div>
  );
}
