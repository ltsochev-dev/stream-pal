import IconLink from "@/app/components/IconLink";
import AvatarCircle from "@/app/components/AvatarCircle";
import type { NavBarPropsBase } from "./types";

export interface DesktopNavbarProps extends NavBarPropsBase {
  user?: { uid: string; name: string; avatarUrl: string } | null;
}

export default function DesktopNavbar({ items, user }: DesktopNavbarProps) {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="px-8 mx-auto flex justify-between items-center gap-12 min-h-10">
        <h1 className="text-2xl font-bold select-none">StreamPal</h1>
        <nav>
          <ul className="flex space-x-4">
            {items.map((item, index) => (
              <li key={`desktop-nav-${item.to}-${index}`}>
                <IconLink
                  to={item.to}
                  icon={item.icon && <item.icon width={15} height={15} />}
                  onClick={item.onClick}
                >
                  {item.label}
                </IconLink>
              </li>
            ))}
          </ul>
        </nav>
        {user && (
          <div className="ml-auto flex gap-2 items-center">
            <span>{user.name}</span>
            <AvatarCircle
              src={user.avatarUrl}
              alt={`${user.name} Profile Image`}
            />
          </div>
        )}
      </div>
    </header>
  );
}
