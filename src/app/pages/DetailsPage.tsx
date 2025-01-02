import { type FC } from "react";
import { NavLink, useParams } from "react-router";

const DetailsPage: FC = () => {
  const { id } = useParams();

  const movie = {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2010-07-16",
    rating: "8.8",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1sQA7lfcF9yUyoLYC0e6Zo3jmxE.jpg",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-64 w-full object-cover object-center md:w-64"
              src={movie.posterUrl}
              alt={movie.title}
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold">
              {movie.title} #{id}
            </h1>
            <p className="mt-2 text-gray-400">{movie.releaseDate}</p>
            <p className="mt-4">{movie.description}</p>
            <div className="mt-4">
              <span className="text-yellow-400">Rating: {movie.rating}</span>
            </div>
            <div className="mt-4">
              <NavLink
                to={`/movie/watch/${id}`}
                className="px-5 py-2 text-lg bg-blue-500 text-white rounded"
              >
                Watch Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
