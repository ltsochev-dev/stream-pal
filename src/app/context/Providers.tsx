import type { FC, ReactNode } from "react";
import AuthProvider from "./AuthContext";
import NavigatorProvider from "./NavigatorContext";
import ConfigProvider from "./MovieDBConfigContext";
import NavProvider from "@/app/navigation/NavigationContext";

const Providers: FC<{ children?: ReactNode }> = ({ children }) => (
  <AuthProvider>
    <NavigatorProvider>
      <ConfigProvider>
        <NavProvider>{children}</NavProvider>
      </ConfigProvider>
    </NavigatorProvider>
  </AuthProvider>
);

export default Providers;
