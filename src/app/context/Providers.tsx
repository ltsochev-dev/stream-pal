import type { FC, ReactNode } from "react";
import AuthProvider from "./AuthContext";
import NavigatorProvider from "./NavigatorContext";
import ConfigProvider from "./MovieDBConfigContext";

const Providers: FC<{ children?: ReactNode }> = ({ children }) => (
  <AuthProvider>
    <NavigatorProvider>
      <ConfigProvider>{children}</ConfigProvider>
    </NavigatorProvider>
  </AuthProvider>
);

export default Providers;
