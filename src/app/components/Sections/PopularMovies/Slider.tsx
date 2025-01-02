import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import type { IMovie } from "./types";

export interface SliderProps {
  movies: IMovie[];
  duration?: number;
}

export default function Slider({ movies, duration = 3000 }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = useMemo(
    () =>
      movies.map((movie) => {
        return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      }),
    [movies]
  );

  return (
    <div className="h-[max(560px,65vh)] overflow-hidden relative">
      <div
        className="flex h-full transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-screen flex-shrink-0">
            <NavLink to={`/movie/details/${movies[index].id}`}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="block w-full h-full object-cover aspect-video object-top"
              />
            </NavLink>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
        {Array.from({ length: images.length }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index % images.length)}
          />
        ))}
      </div>
    </div>
  );
}
