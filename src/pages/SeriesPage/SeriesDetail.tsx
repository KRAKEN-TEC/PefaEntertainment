import { Outlet, useNavigate, useParams } from "react-router";
import { useSingleSerie } from "@/hooks/useSerie";
import { useState } from "react";
import Overview from "@/components/detailData/Overview";
import "../CSS/DetailPage.css";

export default function SeriesDetail() {
  const { serieSlug } = useParams();
  const { data: serie } = useSingleSerie(serieSlug);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeSeason, setActiveSeason] = useState<number | null>(null);

  const handleOverviewClick = () => {
    setActiveTab("overview");
    navigate(`/series/${serieSlug}`);
  };

  const handleWatchClick = () => {
    if (serie && serie.seasons.length > 0) {
      setActiveTab("watch");
      const firstSeason = serie.seasons[0].seasonNumber;
      setActiveSeason(firstSeason);
      navigate(`/series/${serieSlug}/seasons/${firstSeason}/episodes`);
    }
  };

  const handleSeasonClick = (seasonNumber: number) => {
    setActiveSeason(seasonNumber);
    navigate(`/series/${serieSlug}/seasons/${seasonNumber}/episodes`);
  };

  return (
    <>
      <div className="serie-detail">
        {serie && (
          <>
            <div className="s-con">
              <div
                className="header"
                style={{
                  backgroundImage: `url(${serie.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "500px",
                }}
              >
                <div className="details-overlay">
                  <h1>{serie.title}</h1>
                  <p>{serie.description}</p>
                  <div className="genres-box">
                    <ul>
                      {serie.genres.map((genre) => (
                        <li key={genre.name}>{genre.name.toUpperCase()}</li>
                      ))}
                    </ul>
                    <span>{serie.rating}</span>
                    <span>{serie.isOnGoing ? "Yes" : "No"}</span>

                    <div className="tabs">
                      <button onClick={handleOverviewClick}>OVERVIEW</button>
                      <button onClick={handleWatchClick}>WATCH</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content">
                {activeTab === "overview" && <Overview anyData={serie} />}

                {activeTab === "watch" && (
                  <div className="seasons-container">
                    {serie.seasons.map((s) => (
                      <button
                        className={`season-btn ${
                          activeSeason === s.seasonNumber ? "active" : ""
                        }`}
                        key={s.seasonNumber}
                        onClick={() => handleSeasonClick(s.seasonNumber)}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DYNAMICALLY MOUNTS EPISODES */}
            <Outlet />
          </>
        )}
      </div>
    </>
  );
}
