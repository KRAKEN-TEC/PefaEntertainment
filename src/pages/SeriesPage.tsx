import { genreLi } from "@/components/global/genreLi";
import "./CSS/SeriesPage.css";
import useNavDetail from "@/hooks/useNavDetail";

import { useSerie } from "@/hooks/useSerie";

export default function SeriesPage() {
  const { data: series } = useSerie();
  const { callNavForSeriesPage } = useNavDetail();

  const navigate = () => {
    console.log("Hello");
  };

  return (
    <div className="SP-section">
      <h2>Series</h2>
      <div className="SP-scroll-container">
        <div className="SP-grid">
          {series &&
            series
              .map((s) => (
                <div
                  className="SP-box"
                  key={s._id}
                  onClick={() => callNavForSeriesPage(s._id)}
                >
                  <img src={s.poster_url} />
                  <div className="SP-text">
                    <h3>{s.title}</h3>
                    <span>{s.description}</span>
                    <ul>
                      {s.genres.map((g, index) => (
                        index < 3 &&
                        genreLi(g._id, g.name.toUpperCase())
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
