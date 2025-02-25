import "./CSS/Series.css";
import { useNavigate } from "react-router";

import useNavDetail from "@/hooks/useNavDetail";
import { useSerie, FetchSeries } from "@/hooks/useSerie";

export default function Series() {
  const { data: series } = useSerie();
  const { callNav } = useNavDetail();

  const nav = useNavigate();

  const getRandomSeries = (series: FetchSeries[], count = 3) => {
    return series.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const randomSeries = getRandomSeries(series);

  return (
    <div className="series-section">
      <div className="series-title">
        <h2>Series</h2>
        <span onClick={() => nav("series-page")}>See more</span>
      </div>
      <div className="series-scroll-container">
        <div className="series-grid">
          {series &&
            randomSeries.map((s) => (
              <div
                className="series-box"
                key={s._id}
                onClick={() => callNav(s._id)}
              >
                <img src={s.poster_url} />
                <div>
                  <div className="series-text">
                    <h3>{s.title}</h3>
                    <span>{s.description}</span>
                    <ul>
                      {s.genres.map((g) => (
                        <li key={g._id}>{g.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
