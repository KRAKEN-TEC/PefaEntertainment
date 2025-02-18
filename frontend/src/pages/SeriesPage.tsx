import { FetchMovie, useMovie } from "@/hooks/useMovie";
import "./CSS/SeriesPage.css";
import useNavDetail from "@/hooks/useNavDetail";

export default function SeriesPage() {
  const { data: series } = useMovie();
  const { callNavForSeriesPage } = useNavDetail();

  const navigate = () => {
    console.log("Hello")
  }

  return (
    <div className="SP-section">
      <h2>Series</h2>
      <div className="SP-scroll-container" >

        <div className="SP-grid">

          {series && series.filter((s) => s.isSerie).map((s) =>
            <div className="SP-box" key={s._id} onClick={() => callNavForSeriesPage(s._id)}>
              <img src={s.poster_url} />
              <div>
                <h3>{s.title}</h3>
                <span>{s.description}</span>
                <ul>
                  {s.genres.map((g) => (
                    <li key={g._id}>{g.name}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}
