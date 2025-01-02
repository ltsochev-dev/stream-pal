import MovieDBSettings from "@/app/http/settings";

export const movieFetcher = async (
  endpointStr: string,
  query?: URLSearchParams,
  opts?: RequestInit
) => {
  const endpoint = endpointStr.startsWith("/")
    ? endpointStr.substring(1)
    : endpointStr;

  const url = new URL(`${MovieDBSettings.baseUrl}/${endpoint}`);
  url.searchParams.append("api_key", MovieDBSettings.apiKey);

  if (query && Array.from(query.keys()).length > 0) {
    query.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "force-cache",
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...opts?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  return response.json();
};
