export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  status: string;
  tagline: string | null;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface IMovieShort {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  title: string;
}

export interface IMovieListResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
