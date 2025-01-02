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

export interface ConfigResponse {
  change_keys: string[];
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
}
