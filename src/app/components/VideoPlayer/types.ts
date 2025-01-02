export interface TimeResponse {
  subscribed?: boolean;
  timeZoneFile: string;
  utc: number;
  localtime: {
    month: number;
    day: number;
    hour: number;
    minute: number;
    year: number;
    second: number;
  };
  offset: number;
  timezone: string;
  TZ: string;
  systemTimeSource: string;
}
