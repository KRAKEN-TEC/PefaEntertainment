import { useParams, useNavigate } from "react-router";
import { FetchMovies } from "@/hooks/useMovie";
import { useEffect, useState } from "react";
import Overview from "@/components/detailData/Overview";
import Watch from "@/components/detailData/Watch";
import "./CSS/DetailPage.css";
import { useMovieStore } from "@/context/useMovieStore";
import {
  FetchEpisodes,
  FetchSeasons,
  FetchSeries,
  useEpisodes,
  useSeasons,
} from "@/hooks/useSerie";
import { useSerieStore } from "@/context/useSerieStore";
import useNavDetail from "@/hooks/useNavDetail";

export default function DetailPage() {
  const { id: rawId, seasonNumber } = useParams();
  const [id, type] = rawId?.split("$") || ["", ""];
  const [videoData, setVideoData] = useState<FetchMovies | FetchSeries | null>(
    null
  );
  const { moviesStore } = useMovieStore();
  const { seriesStore } = useSerieStore();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedSeason, setSelectedSeason] = useState<number>(
    seasonNumber ? parseInt(seasonNumber) : 1
  );
  const { callNavForSeason } = useNavDetail();

  const { data: seriesSeasons } = useSeasons(id); // ✅ Use hook at top level
  const { data: seriesEp } = useEpisodes(id, String(selectedSeason)); // ✅ Use hook at top level

  useEffect(() => {
    if (!id || !type) return;

    if (type === "movie") {
      setVideoData(moviesStore.find((movie) => movie._id === id) || null);
    } else if (type === "series") {
      setVideoData(seriesStore.find((serie) => serie._id === id) || null);
    }
  }, [id, type, moviesStore, seriesStore]);

  const isSeries = type === "series";

  const watchEvent = () => {
    setActiveTab("watch");
  };

  return (
    <div className="s-con">
      <div
        className="header"
        style={{
          backgroundImage: `url(${videoData?.poster_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
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
            <button onClick={() => watchEvent()}>WATCH</button>
          </div>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && <Overview detailData={videoData} />}

        {activeTab === "watch" && (
          <div>
            {isSeries ? (
              <>
                <div className="seasons">
                  {seriesSeasons?.map((season) => (
                    <button
                      key={season._id}
                      className={`season-btn ${
                        selectedSeason === season.seasonNumber ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedSeason(season.seasonNumber);
                      }}
                    >
                      Season {season.seasonNumber}
                    </button>
                  ))}
                </div>

                {seriesEp && (
                  <div className="episodes-list">
                    {seriesEp.map((episode) => (
                      <Watch detailData={episode} key={episode._id} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Watch detailData={videoData} key={videoData?._id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
