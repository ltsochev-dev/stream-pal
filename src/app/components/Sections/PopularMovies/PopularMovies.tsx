import { type FC, useMemo } from "react";
import Slider from "./Slider";
import type { IMovie } from "./types";

// @todo Make slider better, fix positioning issues

export interface PopularMovieProps {
  duration?: number;
  movies: IMovie[];
}

const PopularMovies: FC<PopularMovieProps> = ({ movies, duration = 3000 }) => {
  return (
    <section className="popular-movies">
      <Slider movies={movies} duration={duration} />
    </section>
  );
};

export default PopularMovies;
