import { Outlet, useNavigate, useParams } from "react-router";
import { useSingleSerie } from "@/hooks/useSerie";

export default function SeriesDetail() {
  const { serieSlug } = useParams();
  const { data: serie } = useSingleSerie(serieSlug);
  const navigate = useNavigate();

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
                  </div>
                </div>
              </div>
            </div>

            {/* SEASON TABS */}
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

            {/* DINAMICALLY MOUTS EPISODES */}
            <Outlet />
          </>
        )}
      </div>
    </>
  );
}
