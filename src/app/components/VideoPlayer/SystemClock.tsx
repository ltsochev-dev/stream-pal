import { useEffect, useState } from "react";
import type { TimeResponse } from "./types";

export default function SystemClock() {
  const [utcTime, setUtcTime] = useState<number | null>(null);
  const [localTime, setLocalTime] = useState<string | null>(null);

  // Request data from the system service
  useEffect(() => {
    const subscription = window.webOS.service.request<TimeResponse>(
      "luna://com.palm.systemservice",
      {
        method: "time/getSystemTime",
        parameters: { subscribe: true },
        onSuccess: function (response: TimeResponse) {
          if (!response.subscribed) {
            console.log("Failed to subscribe the system time information");
            setLocalTime(new Date().toUTCString());
            return;
          }

          setUtcTime(response.utc);
        },
        onFailure: function (error: unknown) {
          console.error("Failed to get system time information", error);
          setLocalTime(new Date().toUTCString());
          return;
        },
      }
    );

    return () => {
      subscription.cancel();
    };
  }, []);

  // Update the time
  useEffect(() => {
    if (utcTime === null) {
      setLocalTime(new Date().toUTCString());
      return;
    }

    const startDate = new Date(utcTime);

    const interval = setInterval(() => {
      const currentTime = new Date(
        startDate.getTime() + (Date.now() - utcTime)
      );
      setLocalTime(currentTime.toUTCString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [utcTime]);

  return <span className="text-white text-sm">{localTime}</span>;
}
