import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { FetchMovies } from "@/hooks/useMovie";
import { useMovieStore } from "@/context/useMovieStore";
import Overview from "@/components/detailData/Overview";
import Watch from "@/components/detailData/Watch";

export default function MovieDetail() {
  const { id } = useParams(); // Extract ID from URL
  const { moviesStore } = useMovieStore();
  const [movie, setMovie] = useState<FetchMovies | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (!id) return;

    const fetchingMovie = moviesStore.find((m) => m.slug === id) || null;

    if (fetchingMovie) {
      setMovie(fetchingMovie);
    }
  }, [id, moviesStore]);

  return (
    <div className="movie-detail">
      {movie && (
        <div className="s-con">
          <div
            className="header"
            style={{
              backgroundImage: `url(${movie?.poster_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "500px",
            }}
          >
            <div className="details-overlay">
              <h1>{movie?.title}</h1>
              <p>{movie?.description}</p>
              <div className="genres-box">
                <ul>
                  {movie?.genres.map((genre) => (
                    <li key={genre.name}>{genre.name}</li>
                  ))}
                </ul>
                <span>{movie?.rating}</span>
              </div>

              <div className="tabs">
                <button onClick={() => setActiveTab("overview")}>
                  OVERVIEW
                </button>
                <button onClick={() => setActiveTab("watch")}>WATCH</button>
              </div>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === "overview" && <Overview anyData={movie} />}

            {activeTab === "watch" && (
              <Watch movieData={movie} key={movie?._id} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
