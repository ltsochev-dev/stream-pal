import { type FC } from "react";
import useSWR from "swr";
import { NavLink } from "react-router";
import PopularMovies from "@/app/components/Sections/PopularMovies";
import { IMovieListResponse } from "@/app/components/Sections/PopularMovies/types";
import Title from "@/app/components/Title";
import { movieFetcher } from "@/app/fetchers/movies";

const HomePage: FC = () => {
  const { data } = useSWR<IMovieListResponse>(
    "movie/popular?language=bg-BG&region=BG&with_release_type=4",
    movieFetcher,
    {
      suspense: true,
      fallbackData: {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      },
    }
  );

  const popularMovies = (data?.results || []).slice(0, 8);
  const extraMovies = (data?.results || []).slice(8, 12);

  return (
    <div className="homepage-page min-h-screen flex flex-col gap-12">
      <section className="popular-section">
        <PopularMovies movies={popularMovies} />
      </section>
      {[
        "What to Watch",
        "Continue Watching",
        "Watch Again",
        "Comedy Movies",
        "Drama Movies",
        "Animated Movies",
        "Family Movies",
        "Thrillers",
      ].map((title, index) => (
        <section className="what-to-watch-section" key={`section-${index}`}>
          <div className="container mx-auto p-5">
            <Title>{title}</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {extraMovies.map((movie, index) => (
                <div
                  className="card rounded-lg border-transparent border-4 transition-all ease-in-out duration-100 overflow-hidden hover:scale-105 hover:border-white"
                  key={`movie-${title}-${index}`}
                >
                  <NavLink to={`/movie/details/${movie.id}`}>
                    <div className="w-full relative overflow-hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Poster for ${movie.title}`}
                        className="object-contain object-center w-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-4 text-white">
                        <h2 className="text-xl px-4 select-none">
                          {movie.title}
                        </h2>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
