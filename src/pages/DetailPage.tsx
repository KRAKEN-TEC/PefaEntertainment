import { useParams } from "react-router";
import { FetchMovies } from "@/hooks/useMovie";
import { useEffect, useState } from "react";
import Overview from "@/components/detailData/Overview";
import Watch from "@/components/detailData/Watch";
import "./CSS/DetailPage.css";
import { stringSliceWith$ } from "@/helper/GlobalHelper";
import { useMovieStore } from "@/context/useMovieStore";
import { FetchSeries } from "@/hooks/useSerie";
import { useSerieStore } from "@/context/useSerieStore";

export default function DetailPage() {
  const { id } = useParams();
  const { index, text } = stringSliceWith$(id !== undefined ? id : "h");

  const [videoData, setVideoData] = useState<FetchMovies | FetchSeries | null>(
    null
  );
  const { moviesStore } = useMovieStore();
  const { seriesStore } = useSerieStore();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  useEffect(() => {
    switch (text) {
      case "movie":
        setVideoData(moviesStore[parseInt(index)]);
        break;
      case "series":
        setVideoData(seriesStore[parseInt(index)]);
        break;
      default:
        setVideoData(null);
    }
  }, [index, text, moviesStore, seriesStore]);

  console.log("Video Data:", videoData);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  const isSeries = text === "series";

  return (
    <div>
      {/* Header Section */}
      <div
        className="header"
        style={{
          backgroundImage: `url(${videoData?.poster_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "97%",
          height: "500px",
        }}
      >
        <div className="details-overlay">
          <h1>{videoData?.title}</h1>
          <p>{videoData?.description}</p>
          <div className="genres-box">
            <ul>
              {videoData?.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
            <span>{videoData?.rating}</span>
            {videoData?.isOnGoing && <span>Ongoing</span>}
          </div>

          <div className="tabs">
            <button onClick={() => setActiveTab("overview")}>OVERVIEW</button>
            <button onClick={() => setActiveTab("watch")}>WATCH</button>
          </div>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && <Overview detailData={videoData} />}

        {/* Watch Section: Different View for Movies and Series */}
        {activeTab === "watch" && (
          <div>
            {isSeries ? (
              <>
                {/* Season Selection for Series */}
                {videoData?.seasons?.length > 0 && (
                  <div className="seasons">
                    {videoData.seasons.map((season, i) => (
                      <button
                        key={season._id}
                        className={`season-btn ${
                          selectedSeason === i ? "active" : ""
                        }`}
                        onClick={() => setSelectedSeason(i)}
                      >
                        Season {season.seasonNumber}
                      </button>
                    ))}
                  </div>
                )}

                {/* Episodes List (Only Show When a Season is Selected) */}
                {selectedSeason !== null && (
                  <div className="episodes-list">
                    {videoData.seasons[selectedSeason].episodes.map(
                      (episode, i) => (
                        <div key={i} className="episode-item">
                          <img
                            src={episode.thumbnail}
                            alt={`Episode ${i + 1}`}
                          />
                          <div>
                            <h3>
                              Episode {i + 1} - {episode.title}
                            </h3>
                            <p>{episode.description}</p>
                            <span>{episode.duration}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              // Movie Watch Section (Only One Box)
              <Watch detailData={videoData}></Watch>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
