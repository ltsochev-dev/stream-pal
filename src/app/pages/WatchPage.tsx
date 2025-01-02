import { type FC } from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import { movieFetcher } from "@/app/fetchers/movies";
import VideoPlayer from "@/app/components/VideoPlayer/VideoPlayer";
import ChevronLeftIcon from "@/app/icons/chevron-left.svg?react";
import { ErrorBoundary } from "react-error-boundary";

const WatchPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { data } = useSWR(`movie/${id}`, movieFetcher, {
  //   suspense: true,
  // });

  const data = {
    title: "Alita: Battle Angel",
  };

  const handleGoBackButton = () => {
    navigate(`/movie/details/${id}`);
  };

  return (
    <section className="watch-page">
      <ErrorBoundary
        fallback={
          <>
            <div className="fixed top-0 left-0 right-0 pt-4 px-8 pb-16 bg-gradient-to-b from-black to-transparent">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleGoBackButton}
                  title="Go Back"
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">
                      <ChevronLeftIcon />
                    </span>
                    <span className="font-bold text-xl">{data.title}</span>
                  </div>
                </button>
              </div>
            </div>
            <p className="text-center py-28">
              Failed to start the video player
            </p>
          </>
        }
      >
        <VideoPlayer
          title={data.title}
          sources={[
            {
              // src: "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
              src: "https://archive.org/download/movietrailers_202109/20th%20Century%20Studios%20Trailers%2FAlita%20Battle%20Angel%20%20%20Official%20Trailer%20%E2%80%93%20Battle%20Ready%20%5BHD%5D%20%20%2020th%20Century%20FOX.ia.mp4",
              type: "video/mp4",
            },
          ]}
          onGoBack={handleGoBackButton}
        />
      </ErrorBoundary>
    </section>
  );
};

export default WatchPage;
