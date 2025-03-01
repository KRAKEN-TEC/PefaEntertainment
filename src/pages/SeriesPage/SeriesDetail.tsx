import { Outlet, useNavigate, useParams } from "react-router";
import { useSingleSerie } from "@/hooks/useSerie";
import { useState } from "react";
import Overview from "@/components/detailData/Overview";

// Ko Oak Kar ၀င်မရေးရ

export default function SeriesDetail() {
  const { serieSlug } = useParams();
  const { data: serie } = useSingleSerie(serieSlug);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleForOV = () => {
    setActiveTab("overview");
    navigate(`/series/${serieSlug}`);
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
                        <li key={genre.name}>{genre.name}</li>
                      ))}
                    </ul>
                    <span>{serie.rating}</span>
                    <span>{serie.isOnGoing ? "Yes" : "No"}</span>

                    <div className="tabs">
                      <button onClick={() => handleForOV()}>OVERVIEW</button>
                      <button onClick={() => setActiveTab("watch")}>
                        WATCH
                      </button>
                    </div>
                  </div>
                </div>

                <div className="tab-content">
                  {activeTab === "overview" && <Overview anyData={serie} />}

                  {activeTab === "watch" && (
                    <div>
                      {serie.seasons.map((s) => (
                        <button
                          key={s.seasonNumber}
                          onClick={() =>
                            navigate(
                              `/series/${serieSlug}/seasons/${s.seasonNumber}/episodes`
                            )
                          }
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DINAMICALLY MOUTS EPISODES */}
            <Outlet />
          </>
        )}
      </div>
    </>
  );
}
