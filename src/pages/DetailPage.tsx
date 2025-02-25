import { useParams } from "react-router";
import { FetchMovies, useMovie } from "@/hooks/useMovie";
import { useEffect, useState } from "react";
import Overview from "@/components/detailData/Overview";
import Watch from "@/components/detailData/Watch";
import "./CSS/DetailPage.css";
import { stringSliceWith$ } from "@/helper/GlobalHelper";
import { useMovieStore } from "@/context/useMovieStore";
import { FetchSeries } from "@/hooks/useSerie";
import { FetchPefa } from "@/hooks/usePefa";

export default function DetailPage() {
  const { id } = useParams();
  const { index, text } = stringSliceWith$(id !== undefined ? id : "h");

  const [movieData, setMovieData] = useState<
    FetchMovies | FetchSeries | FetchPefa | null
  >(null);
  const { pefaStore } = useMovieStore();
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    switch (text) {
      case "NR":
        setMovieData(pefaStore[parseInt(index)]);
        break;
      default:
        setMovieData(null);
    }
  }, [index, text, pefaStore]);

  return (
    <div className="s-con">
      {/* Header Section */}
      {movieData ? (
        <div
          className="series-header"
          style={{
            backgroundImage: `url(${movieData?.poster_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "500px",
          }}
        >
          <div className="details-overlay">
            <h1>{movieData?.title}</h1>
            <p>{movieData?.description}</p>
            <div className="genres-box">
              <ul>
                {movieData?.genres.map((genre) => (
                  <li key={genre.name}>{genre.name}</li>
                ))}
              </ul>
              <span>{movieData?.rating}</span>
              {movieData?.isOnGoing && <span>Ongoing</span>}
            </div>

            {/* Tab Navigation (State-Based) */}
            <div className="tabs">
              <button onClick={() => setActiveTab("overview")}>OVERVIEW</button>
              <button onClick={() => setActiveTab("watch")}>WATCH</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Handle the case when movieData is not available yet
      )}

      {/* Tab Content (Conditional Rendering) */}
      <div className="tab-content">
        {activeTab === "overview" && <Overview detailData={movieData} />}
        {activeTab === "watch" && <Watch detailData={movieData} />}
      </div>
    </div>
  );
}
