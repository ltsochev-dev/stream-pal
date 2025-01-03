const MovieDBSettings = {
  baseUrl: "https://api.themoviedb.org/3",
  accessToken: (process.env.VITE_MOVIEDB_ACCESS_TOKEN as string) ?? "",
  apiKey: (process.env.VITE_MOVIEDB_KEY as string) ?? "",
} as const;

export default MovieDBSettings;
