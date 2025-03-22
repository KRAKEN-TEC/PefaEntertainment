import Overview from "@/components/detailData/Overview";
import { useSingleMovie } from "@/hooks/useMovie";
import { useParams } from "react-router";
import { useState } from "react";
import WatchingBox from "@/components/detailData/WatchingBox";
import "../CSS/DetailPage.css";
import { useThemeStore } from "@/context/useThemeStore";

// Ko Oak Kar ၀င်မရေးရ

export default function MovieDetail() {
  const { id } = useParams();
  const { data: movie } = useSingleMovie(id);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { dark } = useThemeStore();

  return (
    <div className="movie-main">
      <div className={`movie-details ${dark === true ? "light" : "dark"}`}>
        {movie && (
          <div className="s-con">
            <div
              className="header"
              style={{
                backgroundImage: `url(${movie.poster_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <div className="details-overlay">
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <div className="genres-box">
                  <ul>
                    {movie.genres.map((genre) => (
                      <li key={genre._id}>{genre.name.toUpperCase()}</li>
                    ))}
                  </ul>
                  <span>{movie.rating}</span>
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
                <WatchingBox detailData={movie} key={movie?._id} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
