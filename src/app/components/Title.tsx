import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-bold select-none">{children}</h1>
    </div>
  );
}
