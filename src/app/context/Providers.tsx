import type { FC, ReactNode } from "react";
import AuthProvider from "./AuthContext";
import NavigatorProvider from "./NavigatorContext";
import ConfigProvider from "./MovieDBConfigContext";
import FocusProvider from "./FocusProvider";

const Providers: FC<{ children?: ReactNode }> = ({ children }) => (
  <AuthProvider>
    <NavigatorProvider>
      <ConfigProvider>
        {/* @todo finish this */}
        <FocusProvider>{children}</FocusProvider>
      </ConfigProvider>
    </NavigatorProvider>
  </AuthProvider>
);

export default Providers;
