import { useActionState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formState, submitAction, isPending] = useActionState(
    (_: unknown, formData: FormData) => {
      const userData = JSON.stringify({
        uid: 1337,
        name: formData.get("email"),
        avatarUrl: "https://picsum.photos/300",
      });

      login(userData, "1337-refresh-pls");

      navigate("/home", { replace: true });

      return formData;
    },
    null
  );

  return (
    <form action={submitAction}>
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-8">Login</h1>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="text"
              inputMode="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isPending}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
