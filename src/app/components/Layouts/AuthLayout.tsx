import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
  );
}
