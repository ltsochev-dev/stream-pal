import { FC } from "react";

export interface AvatarCircleProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function AvatarCircle({
  src,
  alt,
  size = "md",
}: AvatarCircleProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={`rounded-full overflow-hidden ${sizes[size]}`}>
      <img src={src} alt={alt} className="object-cover" />
    </div>
  );
}
