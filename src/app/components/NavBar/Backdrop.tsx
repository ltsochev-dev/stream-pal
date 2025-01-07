import type { HTMLProps } from "react";

export default function Backdrop(props?: HTMLProps<HTMLDivElement>) {
  return <div {...props} className="fixed inset-0  z-10 bg-black opacity-65" />;
}
