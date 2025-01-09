/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    webOS: {
      service: {
        request<T>(
          uri: string,
          options: {
            method: string;
            parameters: { [key: string]: any };
            onSuccess: (response: T) => void;
            onFailure: (error: {
              errorCode: number;
              errorText: string;
            }) => void;
          }
        ): any;
      };
      [key: string]: any; // Add specific types here if the SDK has documentation
    };
  }

  const webOS: {
    [key: string]: any; // Replace `any` with the correct types if available
  };
}

export {};
