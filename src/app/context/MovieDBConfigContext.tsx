import { FC, createContext, ReactNode, useContext } from "react";
import useSWR from "swr";
import FallbackConfig from "@/app/mocks/configuration.json";
import { movieFetcher } from "@/app/fetchers/movies";
import { ConfigResponse } from "@/app/components/VideoPlayer/types";

const ConfigContext = createContext<ConfigResponse | null>(null);

const ConfigProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: config } = useSWR("/configuration", movieFetcher, {
    suspense: true,
    fallbackData: FallbackConfig,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error("useConfigContext must be used within a ConfigProvider");
  }
  return context;
};

export default ConfigProvider;
